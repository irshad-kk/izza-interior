export interface Project {
  id: string;
  title: string;
  category: 'Living Spaces' | 'Bedroom Interiors' | 'Modern Kitchens' | 'Luxury Residential Interiors';
  location: string;
  image: string;
  description: string;
  palette: string[];
  materials: string[];
  aspectRatio?: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface Founder {
  name: string;
  role: string;
  image: string;
  bio: string;
  phone?: string;
  phoneRaw?: string;
  whatsappUrl?: string;
}

export const FOUNDERS: Founder[] = [
  {
    name: "Abdul Shareef T",
    role: "Founder & Principal Director",
    image: "/images/founders/abdul_shareef.jpg",
    bio: "Guiding the architectural vision, execution precision, and bespoke spatial planning that define Izza Interior's signature residences and commercial spaces.",
    phone: "+91 7907225262",
    phoneRaw: "+917907225262",
    whatsappUrl: "https://wa.me/917907225262"
  },
  {
    name: "Mohammed Noufal Y",
    role: "Founder & Creative Director",
    image: "/images/founders/mohammed_noufal.jpg",
    bio: "Directing interior concepts, curated materiality, and harmonious living environments tailored with enduring warmth and modern functionality.",
    phone: "+91 9895449414",
    phoneRaw: "+919895449414",
    whatsappUrl: "https://wa.me/919895449414"
  }
];


export const COMPANY_INFO = {
  name: "Izza Interior",
  tagline: "Interior Architecture & Design",
  location: "Kasaragod, Kerala, India",
  primaryPhone: "+91 7907225262",
  primaryPhoneRaw: "+917907225262",
  altPhone: "+91 9895449414",
  altPhoneRaw: "+919895449414",
  whatsappUrl: "https://wa.me/917907225262",
  altWhatsappUrl: "https://wa.me/919895449414",
  email: "hello@izzainterior.com",
};

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Residential Interiors",
    description: "Beautifully planned interiors for homes that feel personal, comfortable, and timeless.",
    image: "/images/projects/living_lounge_cane_shelf.jpg",
    features: [
      "Custom living & lounge spatial planning",
      "Bespoke joinery & architectural shelving",
      "Curated warm lighting schemes",
      "Natural stone & timber integration"
    ]
  },
  {
    number: "02",
    title: "Villa & Apartment Interiors",
    description: "Tailored interior solutions that make the most of every space, from compact apartments to spacious villas.",
    image: "/images/projects/foyer_slatted_timber_partition.jpg",
    features: [
      "Double-height volume optimization",
      "Seamless indoor-outdoor courtyard transitions",
      "Apartment space-saving custom furniture",
      "Architectural staircases & statement zones"
    ]
  },
  {
    number: "03",
    title: "Kitchen & Dining Design",
    description: "Functional kitchens, entertaining islands, and thoughtfully designed dining environments with premium finishes.",
    image: "/images/projects/dining_island_stone_feature.jpg",
    features: [
      "Monolithic dining islands & breakfast bars",
      "Concealed appliance & pantry systems",
      "Dry-stacked natural stone accent features",
      "Architectural statement pendant illumination"
    ]
  },
  {
    number: "04",
    title: "Commercial & Boutique Interiors",
    description: "Considered interiors for offices, retail spaces, executive lounges, and bespoke hospitality settings.",
    image: "/images/service_commercial.jpg",
    features: [
      "Boutique corporate studio spaces",
      "Acoustic slatted timber wall systems",
      "Reception & executive consultation zones",
      "Branded architectural environments"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "living-lounge-cane-shelf",
    title: "Contemporary Living Lounge",
    category: "Living Spaces",
    location: "Kasaragod, Kerala",
    image: "/images/projects/living_lounge_cane_shelf.jpg",
    description: "A tailored modern living lounge defined by a custom warm-leather sofa, illuminated fluted cane shelving reveals, and a soothing earthy palette designed for relaxed family living.",
    palette: ["Warm Camel", "Natural Woven Cane", "Ivory Taupe", "Charcoal Slate"],
    materials: ["Top-Grain Leather", "Woven Cane Webbing", "Warm 3000K LED Grazing", "Large-Format Porcelain"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "dining-island-stone-feature",
    title: "Monolithic Dining & Stone Accent",
    category: "Living Spaces",
    location: "Kasaragod, Kerala",
    image: "/images/projects/dining_island_stone_feature.jpg",
    description: "A striking entertaining and dining environment centered around a monumental solid surface dining island, complemented by dry-stacked rustic sandstone wall cladding, fluted glass screens, and twin hanging brass chandeliers.",
    palette: ["Sandstone Ochre", "Smoked Walnut", "Cream Quartzite", "Aged Brass"],
    materials: ["Split-Face Natural Sandstone", "Solid Teak Joinery", "Fluted Ribbed Glass", "Cast Brass Pendants"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "foyer-slatted-timber-partition",
    title: "Architectural Foyer & Slatted Divider",
    category: "Luxury Residential Interiors",
    location: "Kasaragod, Kerala",
    image: "/images/projects/foyer_slatted_timber_partition.jpg",
    description: "A dramatic entry hall featuring full-height vertical teak architectural louvers, subtle directional floor wash lighting, framed minimalist art, and sculptural botanical accents.",
    palette: ["Natural Teak", "Muted Charcoal", "Lush Botanic Green", "Polished Limestone"],
    materials: ["Solid Teak Louver Blades", "Lime Plaster", "Honed Porcelain", "Glazed Ceramic Planter"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "modern-master-suite-cove",
    title: "Minimalist Master Suite",
    category: "Bedroom Interiors",
    location: "Kasaragod, Kerala",
    image: "/images/projects/modern_master_suite_cove.jpg",
    description: "A tranquil bedroom retreat designed around a bold matte-black feature wall with concealed ceiling cove illumination, architectural track spotlights, and floor-to-ceiling textured drapery.",
    palette: ["Matte Charcoal", "Soft Ecru", "Deep Indigo", "Desert Sand"],
    materials: ["Architectural Matte Lacquer", "Concealed Warm LED Cove", "Heavy Belgian Linen Drapes", "Custom Upholstery"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "royal-suite-chandelier-ceiling",
    title: "Royal Suite & Mirrored Chandelier",
    category: "Bedroom Interiors",
    location: "Kasaragod, Kerala",
    image: "/images/projects/royal_suite_chandelier_ceiling.jpg",
    description: "An opulent bedroom suite highlighted by an amber-gold mirrored ceiling recess, a cascading crystal chandelier, vertical fluted timber accents, integrated wall sconces, and rich champagne textile finishes.",
    palette: ["Reflective Amber Gold", "Warm Rosewood", "Champagne Silk", "Brushed Brass"],
    materials: ["Tinted Gold Mirror", "Tiered Crystal Chandelier", "Fluted Wood Slats", "Lustrous Sateen Fabric"],
    aspectRatio: "aspect-[3/4]"
  }
];

export const WALKTHROUGH_SPACES = [
  {
    id: "01",
    name: "01. Living Lounge",
    subtitle: "Custom Leather & Backlit Cane Joinery",
    image: "/images/projects/living_lounge_cane_shelf.jpg",
    caption: "Tailored sofa seating with custom warm LED reveals through fine woven cane shelving."
  },
  {
    id: "02",
    name: "02. Dining Island",
    subtitle: "Natural Stone Feature & Brass Pendants",
    image: "/images/projects/dining_island_stone_feature.jpg",
    caption: "Monolithic solid surface dining counter framed by rustic split-face sandstone and fluted glass."
  },
  {
    id: "03",
    name: "03. Architectural Foyer",
    subtitle: "Floor-to-Ceiling Teak Slatted Louvers",
    image: "/images/projects/foyer_slatted_timber_partition.jpg",
    caption: "Graceful spatial transition separating the foyer while preserving open airflow and diffused illumination."
  },
  {
    id: "04",
    name: "04. Master Retreat",
    subtitle: "Matte Black Accent & Linear Cove Light",
    image: "/images/projects/modern_master_suite_cove.jpg",
    caption: "A restful master sanctuary balancing bold architectural geometry with soft textured drapery."
  }
];


export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the client's needs, preferences, lifestyle, space, and project goals."
  },
  {
    number: "02",
    title: "Plan",
    description: "Develop the design direction, spatial layout, material palette, and functional requirements."
  },
  {
    number: "03",
    title: "Design",
    description: "Refine the interior concept, finishes, furniture choices, lighting, and design details."
  },
  {
    number: "04",
    title: "Deliver",
    description: "Coordinate the agreed project scope and work toward bringing the approved design vision to life."
  }
];

export const WHY_CHOOSE_POINTS = [
  {
    title: "Designs Tailored to Your Lifestyle",
    description: "Every layout and detail is customized around the practical rhythms and personal preferences of how you live and dwell."
  },
  {
    title: "A Balance of Beauty and Function",
    description: "We believe true luxury is effortless usability paired with timeless, understated architectural proportions."
  },
  {
    title: "Thoughtful Material and Finish Selection",
    description: "Every stone, timber grain, metal finish, and fabric is chosen for longevity, tactile warmth, and graceful aging."
  },
  {
    title: "Detail-Oriented Design Approach",
    description: "From invisible shadow gaps to layered ambient lighting, meticulous precision defines every corner we shape."
  }
];
