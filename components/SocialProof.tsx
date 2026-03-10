"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stats = [
    { number: "4.6", label: "Note moyenne", suffix: "/5 ⭐" },
    { number: "18+", label: "Avis vérifiés", suffix: "" },
    { number: "2-4", label: "Jours de livraison", suffix: "jours" },
];

const reviews = [
    { name: "Youssef M. — Casablanca", rating: 5, text: "Walahi produit mzyan bzaf! Connecté en 2 minutes sur mon iPhone 14. Maintenant je retrouve mes clés tout de suite. وصل بسرعة وكيخدم مزيان" },
    { name: "Fatima Z. — Rabat", rating: 5, text: "J'ai mis un sur la valise de mes enfants pour leur voyage scolaire. J'ai pu suivre la valise en temps réel. Incroyable pour le prix!" },
    { name: "Karim B. — Marrakech", rating: 5, text: "Livraison rapide, produit bien emballé. Fonctionne parfaitement avec l'app Find My. Vraiment utile au quotidien." },
    { name: "Nadia A. — Agadir", rating: 4, text: "Super gadget! Je l'ai attaché à mon sac à main. Notification automatique quand je l'oublie quelque part. جاد مفيد" },
    { name: "Hassan R. — Fès", rating: 5, text: "Le paiement à la livraison c'est parfait. Produit reçu en 3 jours. Très satisfait de l'achat!" },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
    return (
        <div className="glass rounded-2xl p-6 min-w-[320px] max-w-[360px] flex-shrink-0">
            <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "#FFD166" : "transparent"} stroke={i < review.rating ? "#FFD166" : "#555568"} />
                ))}
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
            <p className="text-xs font-semibold text-[var(--text-primary)]">{review.name}</p>
        </div>
    );
}

export default function SocialProof() {
    // Duplicate reviews for infinite scroll
    const doubled = [...reviews, ...reviews];

    return (
        <section id="social-proof" className="py-24 md:py-36 bg-[var(--secondary-bg)] overflow-hidden relative">
            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(78,255,197,0.05) 0%, transparent 60%)" }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-4 md:gap-8 mb-20"
                >
                    {stats.map((s, i) => (
                        <div key={i} className="text-center border border-[var(--border-glow)] rounded-2xl py-8 px-4 bg-[var(--card-bg)] glow-box">
                            <span className="font-mono text-3xl md:text-5xl font-bold gradient-text">{s.number}</span>
                            <span className="font-mono text-sm text-[var(--gold)]">{s.suffix}</span>
                            <p className="text-sm text-[var(--text-secondary)] mt-2">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display font-bold text-center mb-12"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                    Ce que disent nos clients
                </motion.h2>
            </div>

            {/* Marquee Row 1 */}
            <div className="relative">
                <div className="flex gap-4 w-max" style={{ animation: "marquee 30s linear infinite" }}>
                    {doubled.map((r, i) => <ReviewCard key={i} review={r} />)}
                </div>
            </div>

            {/* Marquee Row 2 (reverse) */}
            <div className="relative mt-4">
                <div className="flex gap-4 w-max" style={{ animation: "marquee 35s linear infinite reverse" }}>
                    {[...doubled].reverse().map((r, i) => <ReviewCard key={i} review={r} />)}
                </div>
            </div>
        </section>
    );
}
