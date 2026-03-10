import { products, getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "./ProductDetail";

// Generate static paths for all products
export function generateStaticParams() {
    return products.map((p) => ({ slug: p.slug }));
}

// Generate metadata per product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return {};
    return {
        title: `${product.name} — SmartFinder Maroc`,
        description: product.description.slice(0, 160),
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    return (
        <main>
            <Navbar />
            <ProductDetail product={product} />
            <Footer />
        </main>
    );
}
