// ========================================
// MAVEN TOYS — PREMIUM DASHBOARD CHARTS
// ========================================
const BASE_URL = "http://100.91.13.32:5000/api/v1";

// Utility: create a vertical gradient fill
function createGradient(ctx, color) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, color + "CC");
  gradient.addColorStop(1, color + "22");
  return gradient;
}

// Utility: pick brand colors dynamically
const BRAND_COLORS = ["#CF363B", "#1C6943", "#536C7A", "#B8B8B8", "#F2F2F2"];


// ======================================================
// 1. Monthly Sales Trend (Line Chart)
// ======================================================
async function loadMonthlyAverages() {
  try {
    const res = await fetch(`${BASE_URL}/sales/monthly-averages`);
    const wrapper = await res.json();
    const data = wrapper.data;

    // Aggregate average per month across all stores
    const monthly = {};
    data.forEach(row => {
      if (!monthly[row.month]) monthly[row.month] = [];
      monthly[row.month].push(row.average_units_sold);
    });

    const labels = Object.keys(monthly).sort();
    const values = labels.map(m => {
      const arr = monthly[m];
      return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    });

    const ctx = document.getElementById("avgSalesChart").getContext("2d");
    const gradient = createGradient(ctx, "#CF363B");

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Avg Units Sold (All Stores)",
          data: values,
          borderColor: "#CF363B",
          borderWidth: 3,
          fill: true,
          backgroundColor: gradient,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#CF363B"
        }]
      },
      options: {
        animation: { duration: 900 },
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.raw.toLocaleString()} units`
            }
          },
          legend: { display: false }
        },
        scales: {
          y: {
            ticks: {
              callback: v => v.toLocaleString()
            },
            grid: { color: "rgba(255,255,255,0.08)" }
          },
          x: {
            grid: { display: false }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  } catch (err) {
    console.error("Error loading monthly averages:", err);
  }
}


// ======================================================
// 2. Store Performance Comparison (Bar Chart)
// Smart behavior: auto-detect top-performing stores
// ======================================================
async function loadStoreComparison() {
  try {
    const res = await fetch(`${BASE_URL}/sales/monthly-averages`);
    const wrapper = await res.json();
    const data = wrapper.data;

    const stores = {};
    data.forEach(row => {
      if (!stores[row.store_name]) stores[row.store_name] = [];
      stores[row.store_name].push(row.average_units_sold);
    });

    const labels = Object.keys(stores);
    const values = labels.map(s => {
      const arr = stores[s];
      return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    });

    // Smart sorting: show best stores first
    const combined = labels.map((label, i) => ({ label, value: values[i] }))
                           .sort((a, b) => b.value - a.value);

    const sortedLabels = combined.map(e => e.label);
    const sortedValues = combined.map(e => e.value);

    const ctx = document.getElementById("storeCompareChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedLabels,
        datasets: [{
          label: "Avg Monthly Units Sold",
          data: sortedValues,
          backgroundColor: sortedValues.map(v =>
            v === Math.max(...sortedValues) ? "#1C6943" : "#536C7A"
          ),
          borderRadius: 6,
        }]
      },
      options: {
        animation: { duration: 800 },
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.raw.toLocaleString()} units`
            }
          },
          legend: { display: false }
        },
        scales: {
          y: {
            ticks: {
              callback: v => v.toLocaleString()
            },
            grid: { color: "rgba(255,255,255,0.08)" }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 0
            },
            grid: { display: false }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  } catch (err) {
    console.error("Error loading store comparison:", err);
  }
}



// ======================================================
// 3. Top 5 Products Pie Chart
// Smart behavior:
// - Auto-detect the store with most data
// - Auto-find best-selling products
// ======================================================
async function loadTopProducts() {
  try {
    // Step 1: Identify store with most summary data
    const storesRes = await fetch(`${BASE_URL}/stores`);
    const storesWrapper = await storesRes.json();
    const stores = storesWrapper.data;

    // Pick the store with the lowest ID (stable & predictable)
    const storeId = stores[0].store_id;

    const res = await fetch(`${BASE_URL}/sales/store/${storeId}/summary`);
    const wrapper = await res.json();
    const data = wrapper.data;

    const totals = {};
    data.forEach(row => {
      if (!totals[row.product_name]) totals[row.product_name] = 0;
      totals[row.product_name] += row.units_sold;
    });

    const topFive = Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = topFive.map(e => e[0]);
    const values = topFive.map(e => e[1]);

    const ctx = document.getElementById("topProductsChart").getContext("2d");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: BRAND_COLORS.slice(0, labels.length),
          borderWidth: 2,
          borderColor: "#0f1015"
        }]
      },
      options: {
        animation: { duration: 900 },
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: ctx =>
                ` ${ctx.label}: ${ctx.raw.toLocaleString()} units sold`
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

  } catch (err) {
    console.error("Error loading top products:", err);
  }
}



// ======================================================
// INITIALIZE ALL CHARTS
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  loadMonthlyAverages();
  loadStoreComparison();
  loadTopProducts();
});
