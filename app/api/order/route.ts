import { NextResponse } from "next/server";

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
        const formData = new FormData();
        formData.append("access_key", "5839d373-08c6-4441-919c-85b61f6bd5ea");
        formData.append("subject", `🛒 Nouvelle commande ${orderId} — ${product || "Smart Finder"}`);
        formData.append("from_name", "SmartFinder Maroc");
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("city", city);
        formData.append("message", emailBody);

        const emailRes = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const emailData = await emailRes.json();

        if (!emailData.success) {
            console.error("Web3Forms error:", emailData);
            console.log("=== ORDER (email failed) ===\n", emailBody);
        }

        return NextResponse.json({ success: true, orderId });
    } catch (err) {
        console.error("Order error:", err);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
