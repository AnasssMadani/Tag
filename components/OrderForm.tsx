"use client";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

const cities = ["Casablanca", "Rabat", "Marrakech", "Fès", "Agadir", "Tanger", "Oujda", "Meknès", "Kenitra", "Salé", "Tétouan", "Safi", "El Jadida", "Autre"];

const trustBadges = [
    "✅ Paiement à la livraison",
    "🚚 Livraison 2-4 jours",
    "📱 Support WhatsApp",
    "🔄 Retour facile 7 jours",
];

interface OrderFormProps {
    productName?: string;
    productPrice?: number;
    selectedColor?: string;
}

export default function OrderForm({
    productName = "Smart Finder",
    productPrice = 249,
    selectedColor,
}: OrderFormProps) {
    const [qty, setQty] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const unitPrice = productPrice;
    const discount = qty >= 2 ? 10 : 0;
    const subtotal = unitPrice * qty;
    const discountAmount = Math.round(subtotal * discount / 100);
    const total = subtotal - discountAmount;

    const validate = () => {
        const e: Record<string, string> = {};
        if (!name.trim() || name.trim().length < 3) e.name = "Nom requis (min 3 car.)";
        const clean = phone.replace(/[\s\-]/g, "");
        const phoneRe = /^(0[67]\d{8}|\+212[67]\d{8})$/;
        if (!phoneRe.test(clean)) e.phone = "Numéro marocain invalide";
        if (!city) e.city = "Ville requise";
        if (!address.trim() || address.trim().length < 5) e.address = "Adresse requise";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    phone,
                    city,
                    address,
                    quantity: qty,
                    product: productName,
                    color: selectedColor || "",
                }),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.7 },
                    colors: ["#4EFFC5", "#7B5CF5", "#FFD166"],
                });
            }
        } catch {
            alert("Erreur réseau. Réessayez.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <section id="order-form" className="py-24 md:py-36">
                <div className="max-w-lg mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-3xl p-10"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#34c759] flex items-center justify-center mx-auto mb-6">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-3">Commande confirmée! 🎉</h3>
                        <p className="text-[var(--text-secondary)] mb-6">Vous allez recevoir un SMS de confirmation dans quelques minutes. Notre équipe vous contactera pour confirmer la livraison.</p>
                        <a href="#" className="text-[#25D366] font-semibold hover:underline">Suivre ma commande sur WhatsApp →</a>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="order-form" className="py-24 md:py-36 bg-[var(--secondary-bg)]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-display font-bold mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                        Entrez vos informations de livraison
                    </h2>
                    <p className="text-[var(--text-secondary)]">Paiement uniquement à la réception — Zéro risque</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 lg:order-2"
                    >
                        <div className="glass rounded-2xl p-6 lg:sticky lg:top-20">
                            <Image src="/airtag-single.png" alt={productName} width={200} height={200} className="mx-auto mb-6" />

                            {/* Product info */}
                            <div className="text-center mb-2">
                                <p className="font-display font-bold text-lg">{productName}</p>
                                {selectedColor && (
                                    <p className="text-sm text-[var(--accent-primary)]">Couleur : {selectedColor}</p>
                                )}
                            </div>

                            <div className="text-center mb-6">
                                <p className="text-sm text-[var(--text-muted)] line-through">{productPrice + 100} DHS</p>
                                <p className="font-mono text-3xl font-bold text-[var(--gold)]">{productPrice} DHS</p>
                                <p className="text-xs text-[var(--accent-primary)]">Économisez 100 DHS</p>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-xl hover:border-[var(--accent-primary)] transition-colors">−</button>
                                <span className="font-mono text-xl font-bold w-8 text-center">{qty}</span>
                                <button onClick={() => setQty(Math.min(5, qty + 1))} className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-xl hover:border-[var(--accent-primary)] transition-colors">+</button>
                            </div>
                            {qty >= 2 && <p className="text-center text-xs text-[var(--accent-primary)] mb-4">-10% supplémentaire appliqué!</p>}

                            {/* Price Breakdown */}
                            <div className="border-t border-[var(--border-subtle)] pt-4 space-y-2">
                                <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                                    <span>{qty}x {productName}</span>
                                    <span>{subtotal} DHS</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-sm text-[var(--accent-primary)]">
                                        <span>Remise (-{discount}%)</span>
                                        <span>-{discountAmount} DHS</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                                    <span>Livraison</span>
                                    <span className="text-[#34c759]">GRATUITE</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-[var(--border-subtle)]">
                                    <span>Total</span>
                                    <span className="font-mono text-[var(--gold)]">{total} DHS</span>
                                </div>
                            </div>

                            {/* Trust */}
                            <div className="mt-6 space-y-2">
                                {trustBadges.map((b, i) => (
                                    <p key={i} className="text-xs text-[var(--text-secondary)]">{b}</p>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-3 lg:order-1"
                    >
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Nom complet</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                                    placeholder="Mohammed Alaoui"
                                    className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-5 py-4 text-white outline-none transition-all focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(78,255,197,0.2)] ${errors.name ? "border-red-500" : "border-[var(--border-subtle)]"}`}
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Numéro de téléphone</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                                    placeholder="+212 6XX-XXXXXX"
                                    className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-5 py-4 text-white outline-none transition-all focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(78,255,197,0.2)] ${errors.phone ? "border-red-500" : "border-[var(--border-subtle)]"}`}
                                />
                                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Ville</label>
                                <select
                                    value={city}
                                    onChange={(e) => { setCity(e.target.value); setErrors((p) => ({ ...p, city: "" })); }}
                                    className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-5 py-4 text-white outline-none transition-all appearance-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(78,255,197,0.2)] ${errors.city ? "border-red-500" : "border-[var(--border-subtle)]"}`}
                                >
                                    <option value="" disabled>Sélectionnez votre ville</option>
                                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Adresse complète</label>
                                <textarea
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: "" })); }}
                                    placeholder="Quartier, Rue, N°..."
                                    rows={3}
                                    className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-5 py-4 text-white outline-none transition-all resize-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_rgba(78,255,197,0.2)] ${errors.address ? "border-red-500" : "border-[var(--border-subtle)]"}`}
                                />
                                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative group w-full px-8 py-5 rounded-xl font-bold text-lg text-[var(--primary-bg)] overflow-hidden disabled:opacity-60"
                                style={{ background: "linear-gradient(90deg, #4EFFC5, #7B5CF5)" }}
                            >
                                <span className="relative z-10">{loading ? "Envoi en cours..." : "Confirmer ma commande"}</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>

                            <p className="text-center text-sm text-[var(--text-secondary)]">
                                Vous paierez <span className="font-bold text-[var(--gold)]">{total} DHS</span> à la livraison
                            </p>
                            <p className="text-center text-xs text-[var(--text-muted)]">🔒 Paiement 100% sécurisé à la réception</p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
