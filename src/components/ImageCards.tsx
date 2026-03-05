import React from "react";
import { motion } from "framer-motion";

interface ImageCardProps {
  images: string[]; 
}

export default function ImageCard({ images }: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="grid grid-cols-1 gap-3">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="overflow-hidden rounded-2xl shadow-md"
          >
            <img
              src={src}
              alt={`Imagem ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}