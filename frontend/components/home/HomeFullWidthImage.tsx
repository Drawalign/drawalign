import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { StrapiImage } from "@/type";

export function HomeFullWidthImage({ image }: { image: StrapiImage }) {
  return (
    <div className="bg-secondary-light px-5 py-5">
      <div className="relative aspect-video rounded-lg lg:rounded-2xl overflow-hidden">
        <Image
          src={getStrapiImageUrl(image.url)}
          alt={image.alternativeText ?? ""}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
