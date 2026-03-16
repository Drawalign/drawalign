import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAccordion extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordions';
  info: {
    displayName: 'Accordion';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.accordion-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cards';
  info: {
    displayName: 'Cards';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.card-item', true>;
  };
}

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    >;
  };
}

export interface BlocksGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true>;
    layout: Schema.Attribute.Enumeration<['grid', 'masonry', 'carousel']>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['default', 'centered', 'fullscreen']
    >;
  };
}

export interface BlocksImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_blocks';
  info: {
    displayName: 'ImageBlock';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_blocks';
  info: {
    displayName: 'TextBlock';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface BlocksVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_blocks_video_embeds';
  info: {
    displayName: 'VideoEmbed';
  };
  attributes: {
    provider: Schema.Attribute.Enumeration<['YouTube', 'vimeo']>;
    title: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface ElementsAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_accordion_items';
  info: {
    displayName: 'AccordionItem';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsCardItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_card_items';
  info: {
    displayName: 'CardItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    linkHref: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsCtaLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_cta_links';
  info: {
    description: '';
    displayName: 'CTA Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsListItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_list_items';
  info: {
    description: '';
    displayName: 'List Item';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ElementsMetricItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_metric_items';
  info: {
    displayName: 'Metric Item';
    icon: 'chartLine';
  };
  attributes: {
    after: Schema.Attribute.String & Schema.Attribute.Required;
    before: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsNavItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['twitter', 'linkedin', 'github', 'instagram', 'facebook', 'youtube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ExpertisesClientCaseDetail extends Struct.ComponentSchema {
  collectionName: 'components_expertises_client_case_details';
  info: {
    displayName: 'Client Case Detail';
    icon: 'file';
  };
  attributes: {
    context_items: Schema.Attribute.Component<'elements.list-item', true>;
    context_text: Schema.Attribute.Text;
    problem_consequence: Schema.Attribute.Text;
    problem_text: Schema.Attribute.Text;
    results_benefit: Schema.Attribute.Text;
    results_feedback: Schema.Attribute.Text;
    results_metrics: Schema.Attribute.Component<'elements.list-item', true>;
    solution_cycle_name: Schema.Attribute.String;
    solution_steps: Schema.Attribute.Component<
      'expertises.solution-step',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ExpertisesClientCaseList extends Struct.ComponentSchema {
  collectionName: 'components_expertises_client_case_lists';
  info: {
    description: '';
    displayName: 'Client Case List';
    icon: 'grid';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    cta: Schema.Attribute.Component<'elements.cta-link', false>;
    features: Schema.Attribute.Component<'elements.list-item', true>;
    objectives: Schema.Attribute.Component<'elements.list-item', true>;
    tags: Schema.Attribute.Component<'elements.list-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ExpertisesSolutionStep extends Struct.ComponentSchema {
  collectionName: 'components_expertises_solution_steps';
  info: {
    displayName: 'Solution Step';
    icon: 'bulletList';
  };
  attributes: {
    badge_label: Schema.Attribute.String & Schema.Attribute.Required;
    badge_variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'accent']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
    items: Schema.Attribute.Component<'elements.list-item', true>;
    revelation: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeConvictionItem extends Struct.ComponentSchema {
  collectionName: 'components_home_conviction_items';
  info: {
    description: '';
    displayName: 'Conviction Item';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeConvictionsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_convictions_sections';
  info: {
    description: '';
    displayName: 'Convictions Section';
    icon: 'bulletList';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'home.conviction-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeCtaFinal extends Struct.ComponentSchema {
  collectionName: 'components_home_cta_finals';
  info: {
    displayName: 'CTA Final';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.cta-link', false>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeExpertiseItem extends Struct.ComponentSchema {
  collectionName: 'components_home_expertise_items';
  info: {
    displayName: 'Expertise Item';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeExpertisesSection extends Struct.ComponentSchema {
  collectionName: 'components_home_expertises_sections';
  info: {
    displayName: 'Expertises Section';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.cta-link', false>;
    items: Schema.Attribute.Component<'home.expertise-item', true>;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    displayName: 'Home Hero';
  };
  attributes: {
    bubbles: Schema.Attribute.Component<'home.hero-bubble', true>;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHeroBubble extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_bubbles';
  info: {
    displayName: 'Hero Bubble';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeLogosSection extends Struct.ComponentSchema {
  collectionName: 'components_home_logos_sections';
  info: {
    displayName: 'Logos Section';
  };
  attributes: {
    logos: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface HomeQuoteSection extends Struct.ComponentSchema {
  collectionName: 'components_home_quote_sections';
  info: {
    displayName: 'Quote Section';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.cta-link', false>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSolutionCard extends Struct.ComponentSchema {
  collectionName: 'components_home_solution_cards';
  info: {
    displayName: 'Solution Card';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'elements.list-item', true>;
    image: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface HomeSolutionsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_solutions_sections';
  info: {
    displayName: 'Solutions Section';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.cta-link', false>;
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'home.solution-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface HomeTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_home_testimonial_items';
  info: {
    displayName: 'Testimonial Item';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface HomeTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_testimonials_sections';
  info: {
    displayName: 'Testimonials Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'home.testimonial-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface MethodeDiagramCard extends Struct.ComponentSchema {
  collectionName: 'components_methode_diagram_cards';
  info: {
    displayName: 'Diagram Card';
    icon: 'layout';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    subtitle: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBloc2313 extends Struct.ComponentSchema {
  collectionName: 'components_shared_bloc_2_3_1_3s';
  info: {
    displayName: 'bloc-2/3-1/3';
  };
  attributes: {
    illustration: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedBulletList extends Struct.ComponentSchema {
  collectionName: 'components_shared_bullet_lists';
  info: {
    displayName: 'BulletList';
  };
  attributes: {
    item: Schema.Attribute.Component<'elements.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_banners';
  info: {
    displayName: 'CtaBanner';
  };
  attributes: {
    cta: Schema.Attribute.Component<'blocks.cta', false>;
    text: Schema.Attribute.String;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'Footer';
    icon: 'layout-bottom';
  };
  attributes: {
    address: Schema.Attribute.Text;
    legalLinks: Schema.Attribute.Component<'elements.nav-item', true>;
    logo: Schema.Attribute.Media<'images'>;
    logo_esf: Schema.Attribute.Media<'images' | 'files'>;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
    tagline: Schema.Attribute.String;
  };
}

export interface SharedPageHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_heroes';
  info: {
    displayName: 'Page hero';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headers';
  info: {
    description: '';
    displayName: 'Section Header';
    icon: 'heading';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSplitSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_split_sections';
  info: {
    displayName: 'split section';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'elements.list-item', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsHowItWorksSplit extends Struct.ComponentSchema {
  collectionName: 'components_solutions_how_it_works_splits';
  info: {
    displayName: 'How It Works Split';
  };
  attributes: {
    card_items: Schema.Attribute.Component<'elements.list-item', true>;
    card_title: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    features: Schema.Attribute.Component<'elements.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsHowItWorksSteps extends Struct.ComponentSchema {
  collectionName: 'components_solutions_how_it_works_steps';
  info: {
    displayName: 'How It Works Steps';
  };
  attributes: {
    steps: Schema.Attribute.Component<'solutions.step', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsPricingCard extends Struct.ComponentSchema {
  collectionName: 'components_solutions_pricing_cards';
  info: {
    displayName: 'Pricing Card';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'accent-peach']
    >;
    cta: Schema.Attribute.Component<'elements.cta-link', false>;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'elements.list-item', true>;
    logo: Schema.Attribute.Media<'images'>;
    logo_right: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
  };
}

export interface SolutionsResultItem extends Struct.ComponentSchema {
  collectionName: 'components_solutions_result_items';
  info: {
    displayName: 'Result Item';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SolutionsResultSection extends Struct.ComponentSchema {
  collectionName: 'components_solutions_result_sections';
  info: {
    displayName: 'Result Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'solutions.result-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsSolutionIntro extends Struct.ComponentSchema {
  collectionName: 'components_solutions_solution_intros';
  info: {
    displayName: 'Solution Intro';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    description: Schema.Attribute.Text;
    illustration: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    image: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SolutionsStep extends Struct.ComponentSchema {
  collectionName: 'components_solutions_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.list-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.accordion': BlocksAccordion;
      'blocks.cards': BlocksCards;
      'blocks.cta': BlocksCta;
      'blocks.gallery': BlocksGallery;
      'blocks.hero': BlocksHero;
      'blocks.image-block': BlocksImageBlock;
      'blocks.text-block': BlocksTextBlock;
      'blocks.video-embed': BlocksVideoEmbed;
      'elements.accordion-item': ElementsAccordionItem;
      'elements.card-item': ElementsCardItem;
      'elements.cta-link': ElementsCtaLink;
      'elements.list-item': ElementsListItem;
      'elements.metric-item': ElementsMetricItem;
      'elements.nav-item': ElementsNavItem;
      'elements.social-link': ElementsSocialLink;
      'expertises.client-case-detail': ExpertisesClientCaseDetail;
      'expertises.client-case-list': ExpertisesClientCaseList;
      'expertises.solution-step': ExpertisesSolutionStep;
      'home.conviction-item': HomeConvictionItem;
      'home.convictions-section': HomeConvictionsSection;
      'home.cta-final': HomeCtaFinal;
      'home.expertise-item': HomeExpertiseItem;
      'home.expertises-section': HomeExpertisesSection;
      'home.hero': HomeHero;
      'home.hero-bubble': HomeHeroBubble;
      'home.logos-section': HomeLogosSection;
      'home.quote-section': HomeQuoteSection;
      'home.solution-card': HomeSolutionCard;
      'home.solutions-section': HomeSolutionsSection;
      'home.testimonial-item': HomeTestimonialItem;
      'home.testimonials-section': HomeTestimonialsSection;
      'methode.diagram-card': MethodeDiagramCard;
      'shared.bloc-2-3-1-3': SharedBloc2313;
      'shared.bullet-list': SharedBulletList;
      'shared.cta-banner': SharedCtaBanner;
      'shared.footer': SharedFooter;
      'shared.page-hero': SharedPageHero;
      'shared.section-header': SharedSectionHeader;
      'shared.seo': SharedSeo;
      'shared.split-section': SharedSplitSection;
      'solutions.how-it-works-split': SolutionsHowItWorksSplit;
      'solutions.how-it-works-steps': SolutionsHowItWorksSteps;
      'solutions.pricing-card': SolutionsPricingCard;
      'solutions.result-item': SolutionsResultItem;
      'solutions.result-section': SolutionsResultSection;
      'solutions.solution-intro': SolutionsSolutionIntro;
      'solutions.step': SolutionsStep;
    }
  }
}
