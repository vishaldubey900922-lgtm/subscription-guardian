// Same data as transactions.csv (shown on the page)
const transactions = [
    { date: "2026-08-01", merchant: "Netflix", amount: 499, category: "OTT" },
    { date: "2026-08-02", merchant: "Amazon Prime", amount: 299, category: "OTT" },
    { date: "2026-08-03", merchant: "Spotify", amount: 119, category: "Music" },
    { date: "2026-08-05", merchant: "Zomato Gold", amount: 150, category: "Food Delivery" },
    { date: "2026-08-05", merchant: "Swiggy One", amount: 199, category: "Food Delivery" },
    { date: "2026-08-07", merchant: "Gym Membership", amount: 1200, category: "Fitness" },
    { date: "2026-08-10", merchant: "Jio Recharge", amount: 299, category: "Mobile" },
    { date: "2026-08-15", merchant: "Airtel Recharge", amount: 249, category: "Mobile" },
    { date: "2026-08-20", merchant: "Netflix", amount: 499, category: "OTT" },
    { date: "2026-08-22", merchant: "YouTube Premium", amount: 129, category: "OTT" },
    { date: "2026-08-25", merchant: "Google One Storage", amount: 130, category: "Cloud Storage" },
    { date: "2026-08-28", merchant: "Dropbox", amount: 99, category: "Cloud Storage" }
];

// Fill the table when page loads
function loadTable() {
    const tbody = document.getElementById("transactionsBody");
    transactions.forEach(t => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.merchant}</td>
            <td>₹${t.amount}</td>
            <td>${t.category}</td>
        `;
        tbody.appendChild(row);
    });
}

// Handle "Analyze" button click
async function analyzeSubscriptions() {
    const btn = document.getElementById("analyzeBtn");
    const resultSection = document.getElementById("resultSection");
    const loader = document.getElementById("loader");
    const aiText = document.getElementById("aiText");
    const summaryStats = document.getElementById("summaryStats");

    btn.disabled = true;
    btn.textContent = "Analyzing...";
    resultSection.style.display = "block";
    loader.style.display = "block";
    aiText.textContent = "";
    summaryStats.innerHTML = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/analyze");

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        // Show summary stats
        summaryStats.innerHTML = `
            <div class="stat-card">
                <div class="label">Total Monthly Spend</div>
                <div class="value">₹${data.total_spend}</div>
            </div>
            <div class="stat-card">
                <div class="label">Highest Expense</div>
                <div class="value">${data.highest_merchant}</div>
            </div>
        `;

        // Show AI recommendation
        loader.style.display = "none";
        aiText.textContent = data.ai_recommendation;

    } catch (error) {
        loader.style.display = "none";
        aiText.textContent = "⚠️ Could not connect to the backend server. Make sure it's running (Day 5 setup needed).";
    }

    btn.disabled = false;
    btn.textContent = "🔍 Analyze My Subscriptions";
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTable();
    document.getElementById("analyzeBtn").addEventListener("click", analyzeSubscriptions);
});