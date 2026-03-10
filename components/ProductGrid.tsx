"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductGrid() {
    return (
        <section id="products" className="py-24 md:py-36 relative">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(123,92,245,0.08) 0%, transparent 60%)",
                }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-mono font-bold text-[var(--accent-warm)] bg-[var(--accent-warm)]/10 border border-[var(--accent-warm)]/20 mb-6">
                        Nos produits
                    </span>
                    <h2
                        className="font-display font-bold mb-4"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        Choisissez votre <span className="gradient-text">Smart Finder</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                        Deux formats, une même mission : ne plus jamais perdre vos objets.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <Link href={`/product/${product.slug}`} className="block group">
                                <div className="glass rounded-3xl p-6 md:p-8 transition-all duration-500 hover:border-[var(--accent-primary)]/40 hover:shadow-[0_0_40px_rgba(78,255,197,0.1)] h-full flex flex-col">
                                    {/* Product Image */}
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[var(--surface)] mb-6 flex items-center justify-center">
                                        <Image
                                            src={product.colors[0].images[0]}
                                            alt={product.name}
                                            width={400}
                                            height={400}
                                            className="object-contain w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Compatibility badge */}
                                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                                            {product.compatibility}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                                            {product.tagline}
                                        </p>

                                        {/* Color swatches preview */}
                                        <div className="flex items-center gap-2 mb-6">
                                            {product.colors.map((c) => (
                                                <span
                                                    key={c.name}
                                                    className="w-5 h-5 rounded-full border-2 border-[var(--border-subtle)]"
                                                    style={{ backgroundColor: c.hex }}
                                                    title={c.name}
                                                />
                                            ))}
                                            <span className="text-xs text-[var(--text-muted)] ml-1">
                                                {product.colors.length} couleurs
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="mt-auto flex items-end justify-between">
                                            <div>
                                                <span className="text-sm text-[var(--text-muted)] line-through mr-2">
                                                    {product.oldPrice} DHS
                                                </span>
                                                <span className="font-mono text-2xl font-bold text-[var(--gold)]">
                                                    {product.price} DHS
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform">
                                                Voir →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Trust line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-[var(--text-secondary)] mt-12"
                >
                    🚚 Livraison gratuite partout au Maroc • 💳 Paiement à la livraison
                </motion.p>
            </div>
        </section>
    );
}
