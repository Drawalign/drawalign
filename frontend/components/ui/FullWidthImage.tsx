import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import type { StrapiImage } from "@/type";

export function FullWidthImage({
  image,
  maxHeight = "75vh",
  className,
}: {
  image: StrapiImage;
  maxHeight?: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-accent-peach px-5 py-5", className)}>
      <div
        className="overflow-hidden rounded-lg lg:rounded-2xl"
        style={{ maxHeight }}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: `${image.width}/${image.height}` }}
        >
          <Image
            src={getStrapiImageUrl(image.url)}
            alt={image.alternativeText ?? ""}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
