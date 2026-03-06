import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  cta: {
    buttonText: string;
    buttonLink: string;
  } | null;
  className?: string;
};

export function CtaBanner({ text, cta, className }: Props) {
  return (
    <section className={cn("w-full bg-primary text-white", className)}>
      <div className="px-5 py-16 md:py-24 max-w-9xl mx-auto flex flex-col items-center gap-8 text-center">
        <h2 className="text-4xl md:text-6xl tracking-tight">{text}</h2>
        {cta && (
          <Button href={cta.buttonLink} variant="foreground">
            <span className="flex items-center gap-2">
              {cta.buttonText}
              <svg width="7" height="20" viewBox="0 0 7 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5.01037 11.9875V8.04598L5.64939 8.08556L0.735155 13.0055L0 12.2703L4.91423 7.35606L4.96513 7.99508H1.0066V6.99414L6 7.00545V11.9875H5.01037Z" fill="currentColor"/>
              </svg>
            </span>
          </Button>
        )}
      </div>
    </section>
  );
}
