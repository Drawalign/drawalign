import Image, { type ImageProps } from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { StrapiImage as StrapiImageType } from "@/type";

type BaseProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  image: StrapiImageType;
  alt?: string;
};

type FillProps = BaseProps & { fill: true };
type SizedProps = BaseProps & { fill?: false };

type Props = FillProps | SizedProps;

export function StrapiImage({ image, alt, fill, ...props }: Props) {
  const src = getStrapiImageUrl(image.url);
  const resolvedAlt = alt ?? image.alternativeText ?? "";

  if (fill) {
    return <Image src={src} alt={resolvedAlt} fill {...props} />;
  }

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={image.width}
      height={image.height}
      {...props}
    />
  );
}
