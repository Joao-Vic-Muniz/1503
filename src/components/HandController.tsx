import { useEffect, useRef } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function HandController() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastY = useRef<number | null>(null);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks?.length) {
        const hand = results.multiHandLandmarks[0];

        const indexFingerTip = hand[8]; 
        const currentY = indexFingerTip.y;

        if (lastY.current !== null) {
          const diff = currentY - lastY.current;

          if (Math.abs(diff) > 0.01) {
            window.scrollBy({
              top: diff * 600,
              behavior: "smooth",
            });
          }
        }

        lastY.current = currentY;
      }
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="fixed bottom-4 right-4 w-28 rounded-xl opacity-40 z-50"
      autoPlay
      playsInline
    />
  );
}