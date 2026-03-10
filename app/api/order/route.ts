import { NextResponse } from "next/server";

const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, city, address, quantity, product, color } = body;

        // Validate
        if (!name || !phone || !city || !address) {
            return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
        }

        // Generate order ID
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

        // Build email content
        const emailBody = `
🛒 NOUVELLE COMMANDE — SmartFinder

📋 Commande: ${orderId}
📅 Date: ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })}

👤 CLIENT
   Nom: ${name}
   Téléphone: ${phone}
   Ville: ${city}
   Adresse: ${address}

📦 PRODUIT
   Produit: ${product || "Smart Finder"}
   Couleur: ${color || "Non spécifiée"}
   Quantité: ${quantity || 1}

💰 TOTAL: ${(quantity || 1) * (product === "Card Smart Finder" ? 299 : 249)} DHS
   Mode: Paiement à la livraison
        `.trim();

        // Send via Web3Forms
        const emailRes = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: `🛒 Nouvelle commande ${orderId} — ${product || "Smart Finder"}`,
                from_name: "SmartFinder Maroc",
                to: "monissisme12@gmail.com",
                message: emailBody,
                // Extra fields for Web3Forms dashboard
                name,
                phone,
                city,
                product: product || "Smart Finder",
                quantity: quantity || 1,
            }),
        });

        const emailData = await emailRes.json();

        if (!emailData.success) {
            console.error("Web3Forms error:", emailData);
            // Still return success to the customer — log the order
            console.log("=== ORDER (email failed) ===\n", emailBody);
        }

        return NextResponse.json({ success: true, orderId });
    } catch (err) {
        console.error("Order error:", err);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
