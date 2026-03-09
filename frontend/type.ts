// Type Strapi media
export type StrapiImage = {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

// SEO component
export type Seo = {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: StrapiImage | null;
};

// CTA Link (shared)
export type CtaLink = {
  id: number;
  label: string;
  href: string;
};

// Types des composants blocks
export type HeroBlock = {
  __component: "blocks.hero";
  id: number;
  title: string;
  subtitle: string | null;
  backgroundImage: StrapiImage | null;
  variant: "default" | "centered" | "fullscreen" | null;
};

export type RichTextNode = {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  level?: number;
  format?: "ordered" | "unordered";
  children?: RichTextNode[];
};

export type TextBlock = {
  __component: "blocks.text-block";
  id: number;
  content: RichTextNode[];
};

export type CTABlock = {
  __component: "blocks.cta";
  id: number;
  buttonText: string;
  buttonLink: string;
  variant: "primary" | "secondary" | "outline" | "ghost" | null;
};

export type ImageBlock = {
  __component: "blocks.image-block";
  id: number;
  image: StrapiImage | null;
  caption: string | null;
};

export type AccordionItem = {
  id: number;
  title: string;
  content: RichTextNode[] | null;
};

export type AccordionBlock = {
  __component: "blocks.accordion";
  id: number;
  title: string | null;
  items: AccordionItem[];
};

export type CardItem = {
  id: number;
  title: string;
  description: string | null;
  image: StrapiImage | null;
  linkLabel: string | null;
  linkHref: string | null;
};

export type CardsBlock = {
  __component: "blocks.cards";
  id: number;
  items: CardItem[];
};

// Union type pour tous les blocks
export type Block =
  | HeroBlock
  | TextBlock
  | CTABlock
  | ImageBlock
  | AccordionBlock
  | CardsBlock;

// Type de la Page
export type Page = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: Seo | null;
  blocks: Block[];
};

// Navigation / Global
export type NavItem = {
  id: number;
  label: string;
  href: string;
};

export type SocialLink = {
  id: number;
  platform:
    | "twitter"
    | "linkedin"
    | "github"
    | "instagram"
    | "facebook"
    | "youtube";
  url: string;
};

export type FooterData = {
  tagline: string | null;
  address: string | null;
  logo: StrapiImage | null;
  legalLinks: NavItem[] | null;
  socialLinks: SocialLink[] | null;
  logo_esf: StrapiImage | null;
};

export type CtaBannerData = {
  text: string;
  cta: {
    buttonText: string;
    buttonLink: string;
  } | null;
};

export type Global = {
  siteName: string | null;
  logo: StrapiImage | null;
  navVariant: "header" | "sidebar" | null;
  seo: Seo | null;
  navItems: NavItem[] | null;
  footer: FooterData | null;
  ctaBanner: CtaBannerData | null;
};

// Home Single Type
export type HeroBubble = {
  id: number;
  text: string;
};

export type HomeHero = {
  id: number;
  eyebrow: string | null;
  title: string;
  text: RichTextNode[] | null;
  image: StrapiImage | null;
  bubbles: HeroBubble[] | null;
};

export type ExpertiseItem = {
  id: number;
  icon: StrapiImage | null;
  title: string;
  subtitle: string | null;
  text: string | null;
};

export type ExpertisesSection = {
  id: number;
  items: ExpertiseItem[];
  cta: CtaLink | null;
};

export type QuoteSection = {
  id: number;
  image: StrapiImage | null;
  title: string;
  text: string | null;
  cta: CtaLink | null;
};

export type ConvictionItem = {
  id: number;
  title: string;
  text: string | null;
};

export type ConvictionsSection = {
  id: number;
  eyebrow: string | null;
  title: string;
  items: ConvictionItem[];
};

export type ListItem = {
  id: number;
  text: string;
};

export type SolutionCard = {
  id: number;
  name: string;
  logo: StrapiImage | null;
  background: "primary" | "secondary" | null;
  title: string | null;
  description: string | null;
  features: ListItem[] | null;
  image: StrapiImage | null;
};

export type SolutionsSection = {
  id: number;
  eyebrow: string | null;
  title: string | null;
  button: CtaLink | null;
  items: SolutionCard[];
};

export type TestimonialItem = {
  id: number;
  quote: string;
  author: string;
  role: string | null;
};

export type TestimonialsSection = {
  id: number;
  title: string | null;
  eyebrow: string | null;
  items: TestimonialItem[];
};

export type LogosSection = {
  id: number;
  title: string | null;
  logos: StrapiImage[] | null;
};

export type Home = {
  id: number;
  documentId: string;
  seo: Seo | null;
  hero: HomeHero | null;
  expertises: ExpertisesSection | null;
  fullWidthImage: StrapiImage | null;
  quoteSection: QuoteSection | null;
  convictions: ConvictionsSection | null;
  solutions: SolutionsSection | null;
  testimonials: TestimonialsSection | null;
  logos: LogosSection | null;
  teamPhoto: StrapiImage | null;
};

// Expertises Page
export type PageHeroData = {
  id: number;
  eyebrow: string | null;
  title: string;
  text: string | null;
};

export type SplitSection = {
  id: number;
  title: string | null;
  description: string | null;
  features: ListItem[] | null;
  image: StrapiImage | null;
  background: "primary" | "secondary" | null;
};

export type ExpertisePage = {
  id: number;
  documentId: string;
  seo: Seo | null;
  hero: PageHeroData | null;
  cards_group: SplitSection[];
};

// Réponse API Strapi
export type StrapiSingleResponse<T> = {
  data: T;
};

export type StrapiResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
