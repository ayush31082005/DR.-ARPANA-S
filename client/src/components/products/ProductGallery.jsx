import { useEffect, useMemo, useState } from "react";

export default function ProductGallery({ product }) {
  const galleryImages = useMemo(() => {
    if (!product?.image) {
      return [];
    }

    return Array.from({ length: 4 }, () => product.image);
  }, [product?.image]);

  const [activeImage, setActiveImage] = useState(galleryImages[0] || "");

  useEffect(() => {
    setActiveImage(galleryImages[0] || "");
  }, [galleryImages]);

  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-card">
        {activeImage ? (
          <img
            src={activeImage}
            alt={product?.name}
            className="h-80 w-full object-contain md:h-96"
          />
        ) : (
          <div className="h-80 rounded-[24px] bg-gradient-to-br from-slate-100 to-slate-200 md:h-96" />
        )}
      </div>
    </div>
  );
}
