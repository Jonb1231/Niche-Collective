import Image from "next/image";
import type { ProductImage as ProductImageType } from "@/types/catalogue";
export function ProductImage({ image, sizes = "(max-width: 600px) 50vw, 25vw", preload = false, className = "" }: { image: ProductImageType; sizes?: string; preload?: boolean; className?: string }) {
  const artwork = <Image src={image.src} alt={image.alt} fill sizes={image.crop ? "1536px" : sizes} preload={preload} />;
  return <div className={`product-image ${image.crop ? `spec-crop spec-${image.crop}` : ""} ${className}`}>{image.crop ? <div className="spec-window">{artwork}</div> : artwork}</div>;
}
