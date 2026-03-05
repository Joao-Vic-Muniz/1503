import { useEffect, useRef, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function HandController() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraRef = useRef<Camera | null>(null);
  const handsRef = useRef<Hands | null>(null);

  const lastY = useRef<number | null>(null);
  const [active, setActive] = useState(false);
  const [pinching, setPinching] = useState(false);

  useEffect(() => {
    if (!active) {
      lastY.current = null;
      setPinching(false);
      return;
    }

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.85,
      minTrackingConfidence: 0.85,
    });

    hands.onResults((results) => {
      if (!results.multiHandLandmarks?.length) {
        lastY.current = null;
        setPinching(false);
        return;
      }

      const hand = results.multiHandLandmarks[0];

      const thumb = hand[4];      // polegar ponta
      const index = hand[8];      // indicador ponta
      const wrist = hand[0];      // pulso
      const middleBase = hand[9]; // base do dedo médio

      // 📏 Distância da pinça
      const dx = thumb.x - index.x;
      const dy = thumb.y - index.y;
      const pinchDistance = Math.sqrt(dx * dx + dy * dy);

      // 📏 Tamanho da mão (normalização)
      const handSize = Math.sqrt(
        Math.pow(wrist.x - middleBase.x, 2) +
        Math.pow(wrist.y - middleBase.y, 2)
      );

      const normalizedPinch = pinchDistance / handSize;

      const isPinching = normalizedPinch < 0.4; // valor estável

      setPinching(isPinching);

      if (!isPinching) {
        lastY.current = null;
        return;
      }

      const currentY = index.y;

      if (lastY.current !== null) {
        const diff = currentY - lastY.current;

        const deadZone = 0.015;

        if (Math.abs(diff) > deadZone) {
          const speed = diff * 1400;

          window.scrollBy({
            top: speed,
            behavior: "auto",
          });
        }
      }

      lastY.current = currentY;
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await hands.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480,
      });

      camera.start();
      cameraRef.current = camera;
      handsRef.current = hands;
    }

    return () => {
      cameraRef.current?.stop();
      handsRef.current?.close();
    };
  }, [active]);

  return (
    <>
      {/* BOTÃO */}
      <button
        onClick={() => setActive(!active)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white shadow-lg"
      >
        {active ? "Desativar Câmera" : "Ativar Câmera"}
      </button>

      {/* INDICADOR VISUAL */}
      {active && (
        <>
          <div
            className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-xl text-white font-semibold transition
            ${pinching ? "bg-green-500" : "bg-red-500"}`}
          >
            {pinching ? "Pinça Ativa" : "Aguardando Pinça"}
          </div>

          <video
            ref={videoRef}
            className="fixed bottom-4 right-4 w-32 rounded-xl opacity-60 z-40"
            autoPlay
            playsInline
          />
        </>
      )}
    </>
  );
}