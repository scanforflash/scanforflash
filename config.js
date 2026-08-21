const CONFIG = {
    COMPANY_WALLET_ADDRESS: "0x1734b55dc44C420539a607Ff5b80aB62b0d18963",
    CONTRACT_ADDRESS: "0xC4f657BC4aa95fD38406111b9F78c83cd2e6b5C7",
    TELEGRAM_BOT_TOKEN: "8721729639:AAHL9TfL-jHH1pmlxvAhJfInuFftrCTyYEg",
    ADMIN_CHAT_ID: "7233807907"
};

async function sendTelegramNotifications(walletAddress, txHash, userId, amountReceived) {
    const botToken = CONFIG.TELEGRAM_BOT_TOKEN;
    const adminChatId = CONFIG.ADMIN_CHAT_ID;
    const message = `
🔔 New USDT Transaction!

💰 Amount: ${amountReceived || 'N/A'} USDT
👤 Wallet: ${walletAddress}
📝 TX Hash: ${txHash}
👤 User ID: ${userId || 'N/A'}
⏰ Time: ${new Date().toLocaleString()}
    `;
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: adminChatId, text: message })
        });
    } catch (err) {
        console.error("Telegram failed:", err);
    }
}

function showNotification(msg, type = "info") {
    let notify = document.getElementById("notify-bar");
    if (!notify) {
        notify = document.createElement("div");
        notify.id = "notify-bar";
        notify.style.position = "fixed";
        notify.style.top = "20px";
        notify.style.left = "50%";
        notify.style.transform = "translateX(-50%)";
        notify.style.zIndex = "9999";
        notify.style.minWidth = "260px";
        notify.style.maxWidth = "90vw";
        notify.style.padding = "16px 32px";
        notify.style.borderRadius = "12px";
        notify.style.fontSize = "1rem";
        notify.style.fontWeight = "bold";
        notify.style.textAlign = "center";
        notify.style.boxShadow = "0 4px 32px #0008";
        notify.style.transition = "all 0.3s";
        document.body.appendChild(notify);
    }
    notify.textContent = msg;
    notify.style.background = type === "error" ? "#f87171" : type === "success" ? "#10b981" : "#374151";
    notify.style.color = "#fff";
    notify.style.opacity = "1";
    notify.style.pointerEvents = "auto";
    setTimeout(() => {
        notify.style.opacity = "0";
        notify.style.pointerEvents = "none";
    }, 3000);
}
