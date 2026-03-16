// Next.js page props
export type LocalePageProps = {
	params: Promise<{ locale: string }>;
};

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

// Background variant (shared)
export type Background = "primary" | "secondary" | "accent-peach";

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
	variant: "primary" | "secondary" | null;
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
export type Block = HeroBlock | TextBlock | CTABlock | ImageBlock | AccordionBlock | CardsBlock;

// Article
export type ArticleCard = {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	coverImage: StrapiImage | null;
};

export type Article = ArticleCard & {
	content: Block[];
};

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
	platform: "twitter" | "linkedin" | "github" | "instagram" | "facebook" | "youtube";
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
	teamPhoto: StrapiImage | null;
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

export type HomeSolutionItem = {
	id: number;
	name?: string | null;
	logo?: StrapiImage | null;
	background?: Background | null;
	title?: string | null;
	description?: string | null;
	features?: ListItem[] | null;
	image?: StrapiImage | null;
};

export type MetricItem = {
	id: number;
	label: string;
	before: string | null;
	after: string;
};

export type SolutionCard = {
	id: number;
	name: string | null;
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
};

// Expertises Page
export type SectionHeader = {
	id: number;
	eyebrow: string | null;
	title: string;
};

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

export type CaseCategory = {
	id: number;
	label: string;
};

export type CaseTag = {
	id: number;
	label: string;
};

export type SolutionStep = {
	id: number;
	badge_label: string;
	badge_variant: "primary" | "secondary" | "accent" | null;
	title: string | null;
	items: ListItem[] | null;
	revelation: string | null;
};

export type ClientCase = {
	id: number;
	documentId: string;
	title: string;
	short_title: string | null;
	thumbnail_text: string | null;
	background: "primary" | "secondary";
	features: ListItem[] | null;
	objectives: ListItem[] | null;
	tags: CaseTag[] | null;
	context_text: string | null;
	context_items: ListItem[] | null;
	problem_text: string | null;
	problem_consequence: string | null;
	solution_cycle_name: string | null;
	solution_steps: SolutionStep[] | null;
	roi: string | null;
	results_metrics: MetricItem[] | null;
	results_benefit: string | null;
	results_feedback: string | null;
};

export type ExpertisePage = {
	id: number;
	documentId: string;
	seo: Seo | null;
	hero: PageHeroData | null;
	three_col_cards: ExpertisesSection | null;
	fullWidthImage: StrapiImage | null;
	fullWidthImage2: StrapiImage | null;
	cards_group: SplitSection[];
	client_cases: ClientCase[] | null;
	client_case_header: SectionHeader | null;
};

// Méthode HLDB Page
export type DiagramCard = {
	id: number;
	title: string;
	subtitle: string | null;
	text: string | null;
	background: "primary" | "secondary";
};

export type MethodeHldbPage = {
	id: number;
	documentId: string;
	seo: Seo | null;
	hero: PageHeroData | null;
	hero_diagram: StrapiImage | null;
	diagram_center_title: string | null;
	diagram_center_text: string | null;
	diagram_left: DiagramCard | null;
	diagram_right: DiagramCard | null;
	principles_title: string | null;
	principles_items: ConvictionItem[] | null;
	theoretical_title: string | null;
	theoretical_items: ConvictionItem[] | null;
	section3_cta: CtaLink | null;
	fullWidthImage: StrapiImage | null;
	maturity_title: string | null;
	maturity_text: string | null;
	highlight_title: string | null;
	highlight_text: string | null;
	maturity_cta: CtaLink | null;
	maturity_image: StrapiImage | null;
};

// Solutions Page
export type SolutionIntro = {
	id: number;
	name: string;
	logo: StrapiImage | null;
	image: StrapiImage | null;
	illustration: StrapiImage | null;
	background: Background;
	title: string | null;
	description: string | null;
};

export type HowItWorksSplit = {
	id: number;
	title: string | null;
	description: RichTextNode[] | null;
	card_title: string | null;
	card_items: ListItem[] | null;
	features: ListItem[] | null;
};

export type StepItem = {
	id: number;
	title: string;
	items: ListItem[] | null;
};

export type HowItWorksSteps = {
	id: number;
	title: string | null;
	steps: StepItem[] | null;
};

export type ResultItem = {
	id: number;
	title: string;
	text: string | null;
};

export type ResultSection = {
	id: number;
	title: string | null;
	items: ResultItem[] | null;
};

export type SolutionsPricingCard = {
	id: number;
	name: string;
	description: string | null;
	features: ListItem[] | null;
	price: string | null;
	cta: CtaLink | null;
	logo: StrapiImage | null;
	logo_right: boolean | null;
	subtitle: string | null;
	background: Background | null;
};

export type SolutionsPage = {
	id: number;
	documentId: string;
	seo: Seo | null;
	hero: PageHeroData | null;
	intro_image: StrapiImage | null;
	draw_scan_intro: SolutionIntro | null;
	draw_scan_how: HowItWorksSplit | null;
	atelier_align_intro: SolutionIntro | null;
	atelier_align_how: HowItWorksSteps | null;
	atelier_align_result: ResultSection | null;
	gallery_images: StrapiImage[] | null;
	offers_header: SectionHeader | null;
	pricing_offers: SolutionsPricingCard[] | null;
	pricing_combos: SolutionsPricingCard[] | null;
};

export type TeamMember = {
	id: number;
	documentId: string;
	name: string;
	function: string | null;
	text: string | null;
	image: StrapiImage | null;
	cta: CtaLink | null;
};

export type ContactPage = {
	id: number;
	documentId: string;
	seo: Seo | null;
	hero: PageHeroData | null;
	adress: string | null;
	mail: string | null;
	phone: string | null;
	team_members: TeamMember[] | null;
};

export type PartenairesPage = {
	id: number;
	documentId: string;
	seo: Seo | null;
	hero: PageHeroData | null;
	fullWidthImage: StrapiImage | null;
	fullWidthImage2: StrapiImage | null;
	partenaireTitle: SectionHeader | null;
	three_col_cards: ExpertisesSection | null;
	features: SplitSection | null;
	quote_text: string | null;
	quote_author: string | null;
	quote_function: string | null;
};

export type RessourcesPage = {
	id: number;
	documentId: string;
	seo: Seo | null;
	hero: PageHeroData | null;
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
