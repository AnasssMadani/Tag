"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Key, Briefcase, Wallet } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with MapLibre
const MapSection = dynamic(() => import("./MapSection"), { ssr: false });

export default function ScrollRevealDemo() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 0.5], [35, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

    return (
        <section ref={ref} className="py-24 md:py-36 overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-6 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display font-bold mb-4"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                    Visualisez où sont vos affaires
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[var(--text-secondary)] text-lg"
                >
                    En temps réel, partout au Maroc
                </motion.p>
            </div>

            <div className="max-w-4xl mx-auto px-6" style={{ perspective: "1200px" }}>
                <motion.div
                    style={{ rotateX, scale, opacity }}
                    className="relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-2xl"
                >
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <MapSection />

                        {/* Top bar overlay */}
                        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between pointer-events-none bg-gradient-to-b from-[#0A0A0F]/80 to-transparent">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-md bg-[var(--accent-primary)]/20 flex items-center justify-center">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4EFFC5" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" /><path d="M2 12h20" /></svg>
                                </div>
                                <span className="text-xs text-[var(--accent-primary)] font-mono font-bold">Find My</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                                <span className="text-xs text-[var(--text-muted)]">3 objets connectés</span>
                            </div>
                        </div>

                        {/* Bottom card overlay */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pointer-events-none bg-gradient-to-t from-[#0A0A0F]/80 to-transparent">
                            <div className="glass rounded-xl p-3 flex items-center gap-3 pointer-events-auto">
                                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)]">
                                    <Key size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">Smart Finder — Clés</p>
                                    <p className="text-xs text-[var(--text-secondary)]">Maarif, Casablanca • Vu il y a 2 min</p>
                                </div>
                                <button className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-primary)] text-[var(--primary-bg)] flex-shrink-0">
                                    Itinéraire
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
