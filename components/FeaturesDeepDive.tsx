"use client";
import { motion } from "framer-motion";

const features = [
    {
        title: "Apple Find My — Le réseau le plus puissant du monde",
        description: "Le Smart Finder se connecte discrètement à n'importe quel iPhone nearby pour envoyer sa position. Des millions d'appareils Apple forment un réseau invisible qui vous aide à retrouver vos affaires.",
        badge: "Find My Network",
        visual: "network",
    },
    {
        title: "Résistant à l'eau — IP67",
        description: "Plage d'Agadir, oued, pluie de Tanger — le Smart Finder résiste à tout. Certification IP67 : immergeable jusqu'à 1m pendant 30 minutes.",
        badge: "IP67 Waterproof",
        visual: "water",
    },
    {
        title: "Sonnerie intégrée — Retrouvez par le son",
        description: "Vous savez que vos clés sont dans l'appartement mais impossible de les trouver? Utilisez l'app pour déclencher la sonnerie et suivez le son.",
        badge: "Built-in Speaker",
        visual: "sound",
    },
    {
        title: "Batterie longue durée — Remplaçable vous-même",
        description: "8 mois d'autonomie avec la pile incluse. Une pile de rechange est fournie dans la boîte — soit 16 mois total. La CR-2032 se trouve partout au Maroc.",
        badge: "8 Mois d'autonomie",
        visual: "battery",
    },
];

function FeatureVisual({ type }: { type: string }) {
    // Pre-computed positions for 12 dots in a circle (radius 80px) to avoid hydration mismatch
    const networkDots = [
        { x: 80, y: 0 }, { x: 69, y: 40 }, { x: 40, y: 69 },
        { x: 0, y: 80 }, { x: -40, y: 69 }, { x: -69, y: 40 },
        { x: -80, y: 0 }, { x: -69, y: -40 }, { x: -40, y: -69 },
        { x: 0, y: -80 }, { x: 40, y: -69 }, { x: 69, y: -40 },
    ];

    if (type === "network") return (
        <div className="relative w-full h-full flex items-center justify-center">
            {networkDots.map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-[var(--accent-primary)]"
                    style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
            <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] z-10 relative">
                <motion.div className="absolute inset-0 rounded-full bg-[var(--accent-primary)]"
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </div>
    );

    if (type === "water") return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[var(--accent-primary)]/10 border-2 border-[var(--accent-primary)]/30 flex items-center justify-center text-3xl">💧</div>
            {[0, 1, 2].map((i) => (
                <motion.div key={i} className="absolute w-20 h-20 rounded-full border border-[var(--accent-primary)]/20"
                    animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                />
            ))}
        </div>
    );

    if (type === "sound") return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-xl">🔔</div>
            {[0, 1, 2].map((i) => (
                <motion.div key={i} className="absolute rounded-full border-2 border-[var(--accent-primary)]/30"
                    style={{ width: `${60 + i * 40}px`, height: `${60 + i * 40}px` }}
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                />
            ))}
        </div>
    );

    // Battery
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-48 h-20 rounded-xl border-2 border-[var(--text-muted)] relative overflow-hidden">
                <div className="absolute top-0 right-[-8px] w-3 h-8 mt-4 rounded-r bg-[var(--text-muted)]" />
                <motion.div
                    className="h-full rounded-lg"
                    style={{ background: "linear-gradient(90deg, #4EFFC5, #7B5CF5)" }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "80%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-white">8 MOIS</span>
            </div>
        </div>
    );
}

export default function FeaturesDeepDive() {
    return (
        <section id="features-deep" className="py-24 md:py-36">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                        Conçu pour la vraie vie
                    </h2>
                </motion.div>

                <div className="space-y-28">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                        >
                            <div className="flex-1 max-w-md">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border border-[var(--border-glow)] mb-4">
                                    {f.badge}
                                </span>
                                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 leading-tight border-l-2 border-[var(--accent-primary)] pl-4">{f.title}</h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{f.description}</p>
                            </div>
                            <div className="flex-1 h-64 w-full rounded-2xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex items-center justify-center">
                                <FeatureVisual type={f.visual} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
