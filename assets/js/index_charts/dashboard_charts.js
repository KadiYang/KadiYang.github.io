// ===============================
// DASHBOARD CHARTS (API-CONTRACT VERSION)
// ===============================
const BASE_URL = "http://100.91.13.32:5000/api/v1";

// ======================================================
// 1. MONTHLY SALES TREND (Line Chart)
// Uses: GET /sales/monthly-averages
// Aggregates all stores together
// ======================================================
async function loadMonthlyAverages() {
  try {
    const res = await fetch(`${BASE_URL}/sales/monthly-averages`);
    const wrapper = await res.json();
    const data = wrapper.data;

    // Group by month → average across all stores
    const grouped = {};

    data.forEach(row => {
      if (!grouped[row.month]) grouped[row.month] = [];
      grouped[row.month].push(row.average_units_sold);
    });

    const labels = Object.keys(grouped).sort();
    const values = labels.map(month => {
      const arr = grouped[month];
      return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    });

    new Chart(document.getElementById("avgSalesChart"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Average Units Sold (All Stores)",
          data: values,
          borderColor: "#CF363B",
          borderWidth: 2,
          backgroundColor: "rgba(207,54,59,0.25)",
          tension: 0.3
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false
      }
    });

  } catch (err) {
    console.error("Error loading monthly averages:", err);
  }
}



// ======================================================
// 2. STORE PERFORMANCE COMPARISON (Bar Chart)
// Uses: GET /sales/monthly-averages
// Computes overall average per store
// ======================================================
async function loadStoreComparison() {
  try {
    const res = await fetch(`${BASE_URL}/sales/monthly-averages`);
    const wrapper = await res.json();
    const data = wrapper.data;

    const byStore = {};

    data.forEach(row => {
      if (!byStore[row.store_name]) byStore[row.store_name] = [];
      byStore[row.store_name].push(row.average_units_sold);
    });

    const labels = Object.keys(byStore);
    const values = labels.map(store =>
      Math.round(
        byStore[store].reduce((a, b) => a + b, 0) / byStore[store].length
      )
    );

    new Chart(document.getElementById("storeCompareChart"), {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Avg Monthly Units Sold",
          data: values,
          backgroundColor: "#1C6943"
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false
      }
    });

  } catch (err) {
    console.error("Error loading store comparison:", err);
  }
}



// ======================================================
// 3. TOP 5 PRODUCTS PIE CHART (Store-specific summary)
// Uses: GET /sales/store/{id}/summary
// Aggregates units_sold by product_name → top 5
// ======================================================
async function loadTopProducts() {
  try {
    const storeId = 1;  // You may change this
    const res = await fetch(`${BASE_URL}/sales/store/${storeId}/summary`);
    const wrapper = await res.json();
    const data = wrapper.data;

    const productTotals = {};

    data.forEach(row => {
      if (!productTotals[row.product_name]) {
        productTotals[row.product_name] = 0;
      }
      productTotals[row.product_name] += row.units_sold;
    });

    const sorted = Object.entries(productTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sorted.map(e => e[0]);
    const values = sorted.map(e => e[1]);

    new Chart(document.getElementById("topProductsChart"), {
      type: "pie",
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: [
            "#CF363B",
            "#1C6943",
            "#536C7A",
            "#B8B8B8",
            "#F2F2F2"
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });

  } catch (err) {
    console.error("Error loading top products:", err);
  }
}


// ======================================================
// INITIALIZE DASHBOARD
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  loadMonthlyAverages();
  loadStoreComparison();
  loadTopProducts();
});
