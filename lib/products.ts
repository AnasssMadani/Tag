export interface ProductColor {
    name: string;
    hex: string;
    images: string[];
}

export interface Product {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    price: number;
    oldPrice: number;
    compatibility: string;
    features: string[];
    colors: ProductColor[];
}

export const products: Product[] = [
    {
        slug: "balise-smart-finder",
        name: "Balise Smart Finder",
        tagline: "Compatible avec Android & Apple",
        description:
            "Le Smart Finder en forme de balise se fixe facilement à vos clés, sac ou valise. Grâce à la technologie Apple Find My et la compatibilité Android, retrouvez vos objets en quelques secondes. Design compact, batterie longue durée, et sonnerie puissante pour localiser vos affaires même sous le canapé.",
        price: 249,
        oldPrice: 349,
        compatibility: "Android & Apple",
        features: [
            "Compatible Apple Find My & Android",
            "IP67 résistant à l'eau",
            "Batterie CR-2032 — 8 mois d'autonomie",
            "Sonnerie puissante intégrée",
            "2 bumpers interchangeables inclus",
            "Localisation précise via Bluetooth",
        ],
        colors: [
            {
                name: "Bleu",
                hex: "#4A90D9",
                images: [
                    "/images/balise-blue-1.png",
                    "/images/balise-blue-2.png",
                    "/images/balise-blue-3.png",
                ],
            },
            {
                name: "Noir",
                hex: "#1A1A1A",
                images: [
                    "/images/balise-black-1.png",
                    "/images/balise-black-2.png",
                    "/images/balise-black-3.png",
                ],
            },
            {
                name: "Rose",
                hex: "#E8A0BF",
                images: [
                    "/images/balise-pink-1.png",
                    "/images/balise-pink-2.png",
                    "/images/balise-pink-3.png",
                ],
            },
            {
                name: "Violet",
                hex: "#7B5CF5",
                images: [
                    "/images/balise-purple-1.png",
                    "/images/balise-purple-2.png",
                    "/images/balise-purple-3.png",
                ],
            },
            {
                name: "Blanc",
                hex: "#F0F0F0",
                images: [
                    "/images/balise-white-1.png",
                    "/images/balise-white-2.png",
                    "/images/balise-white-3.png",
                ],
            },
        ],
    },
    {
        slug: "card-smart-finder",
        name: "Card Smart Finder",
        tagline: "Compatible avec iOS",
        description:
            "Ultra-fin et élégant, le Card Smart Finder se glisse dans votre portefeuille comme une carte bancaire. Compatible Apple Find My, il vous permet de retrouver votre portefeuille perdu en un instant. Rechargeable magnétiquement, design premium, et aussi fin qu'une carte de crédit.",
        price: 299,
        oldPrice: 399,
        compatibility: "iOS",
        features: [
            "Compatible Apple Find My",
            "Ultra-fin — format carte bancaire",
            "Rechargeable magnétiquement",
            "IP67 résistant à l'eau",
            "Sonnerie intégrée",
            "Design premium aluminium",
        ],
        colors: [
            {
                name: "Vert",
                hex: "#4EFFC5",
                images: [
                    "/images/card-green-1.png",
                    "/images/card-green-2.png",
                    "/images/card-green-3.png",
                ],
            },
            {
                name: "Blanc",
                hex: "#F0F0F0",
                images: [
                    "/images/card-white-1.png",
                    "/images/card-white-2.png",
                    "/images/card-white-3.png",
                ],
            },
            {
                name: "Noir",
                hex: "#1A1A1A",
                images: [
                    "/images/card-black-1.png",
                    "/images/card-black-2.png",
                    "/images/card-black-3.png",
                ],
            },
        ],
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}
