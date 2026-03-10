"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Truck, Smartphone } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import OrderForm from "@/components/OrderForm";
import type { Product } from "@/lib/products";

export default function ProductDetail({ product }: { product: Product }) {
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const selectedColor = product.colors[selectedColorIndex];

    const scrollToOrder = () =>
        document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });

    return (
        <>
            <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left — Image Carousel */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ImageCarousel
                                images={selectedColor.images}
                                alt={`${product.name} ${selectedColor.name}`}
                            />
                        </motion.div>

                        {/* Right — Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col"
                        >
                            {/* Compatibility badge */}
                            <span className="inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 mb-4">
                                {product.compatibility}
                            </span>

                            <h1
                                className="font-display font-bold mb-2"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                            >
                                {product.name}
                            </h1>
                            <p className="text-[var(--text-secondary)] mb-6">
                                {product.tagline}
                            </p>

                            {/* Price */}
                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-xl text-[var(--text-muted)] line-through">
                                    {product.oldPrice} DHS
                                </span>
                                <span className="font-mono text-4xl font-bold text-[var(--gold)]">
                                    {product.price} DHS
                                </span>
                                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[var(--accent-warm)]/15 text-[var(--accent-warm)]">
                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </span>
                            </div>

                            {/* Color Selector */}
                            <div className="mb-8">
                                <p className="text-sm font-medium mb-3">
                                    Couleur : <span className="text-[var(--accent-primary)]">{selectedColor.name}</span>
                                </p>
                                <div className="flex items-center gap-3">
                                    {product.colors.map((color, i) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColorIndex(i)}
                                            className={`relative w-10 h-10 rounded-full transition-all duration-300 ${i === selectedColorIndex
                                                    ? "ring-2 ring-[var(--accent-primary)] ring-offset-2 ring-offset-[var(--primary-bg)] scale-110"
                                                    : "hover:scale-105 opacity-70 hover:opacity-100"
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        >
                                            {i === selectedColorIndex && (
                                                <Check
                                                    size={18}
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                    style={{
                                                        color: ["#F0F0F0", "#4EFFC5"].includes(color.hex) ? "#000" : "#fff",
                                                    }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="space-y-3 mb-10">
                                {product.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.06 }}
                                        className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                                    >
                                        <span className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/15 flex items-center justify-center flex-shrink-0">
                                            <Check size={12} className="text-[var(--accent-primary)]" />
                                        </span>
                                        {feature}
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={scrollToOrder}
                                className="relative group w-full px-8 py-5 rounded-2xl font-bold text-lg text-[var(--primary-bg)] overflow-hidden animate-pulse-glow mb-6"
                                style={{ background: "linear-gradient(90deg, #4EFFC5, #7B5CF5)" }}
                            >
                                <span className="relative z-10">
                                    Commander — {product.price} DHS
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>

                            {/* Trust badges */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: Truck, text: "Livraison gratuite" },
                                    { icon: ShieldCheck, text: "Paiement à la livraison" },
                                    { icon: Smartphone, text: `Compatible ${product.compatibility}` },
                                    { icon: Check, text: "Retour facile 7 jours" },
                                ].map(({ icon: Icon, text }, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
                                    >
                                        <Icon size={14} className="text-[var(--accent-primary)]" />
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Order Form */}
            <OrderForm
                productName={product.name}
                productPrice={product.price}
                selectedColor={selectedColor.name}
            />
        </>
    );
}
