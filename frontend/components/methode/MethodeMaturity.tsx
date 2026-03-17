import { SplitCard } from "@/components/ui/SplitCard";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { StrapiImage as StrapiImageType } from "@/type";

type Props = {
  maturity_title: string | null;
  maturity_text: string | null;
  highlight_title: string | null;
  highlight_text: string | null;
  maturity_image: StrapiImageType | null;
};

export function MethodeMaturity({
  maturity_title,
  maturity_text,
  highlight_title,
  highlight_text,
  maturity_image,
}: Props) {
  return (
    <SplitCard className="p-5">
      {/* Gauche : image */}
      {maturity_image && (
        <div className="relative min-h-72 bg-secondary md:min-h-0">
          <StrapiImage image={maturity_image} fill className="" />
        </div>
      )}
      {/* Droite : titre + texte + CTA */}
      <div className="flex flex-col justify-between gap-8 bg-primary p-8 lg:p-14">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl text-white md:text-4xl lg:text-40">
            {maturity_title}
          </h2>
          {maturity_text && (
            <p className="text-base text-white leading-tight lg:text-lg">
              {maturity_text}
            </p>
          )}
        </div>
        <div className="border-l px-5">
          {maturity_title && (
            <h3 className="font-bold text-base text-white leading-tight lg:text-2xl">
              {highlight_title}
            </h3>
          )}
          {highlight_text && (
            <p className="text-base text-white leading-tight lg:text-2xl">
              {highlight_text}
            </p>
          )}
        </div>
      </div>
    </SplitCard>
  );
}
