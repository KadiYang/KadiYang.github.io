// =======================
// 6.10 Forecast JavaScript (Enhanced UI, No Product Name)
// Fetches forecast for a specific store
// =======================

// Get store_id from URL (example: ?store_id=3)
const params = new URLSearchParams(window.location.search);
const store_id = params.get("store_id");

// Main container
const forecastContainer = document.getElementById("forecast");

// Handle missing store_id
if (!store_id) {
  if (forecastContainer) {
    forecastContainer.textContent = "Error: No store_id provided in the URL.";
  }
  throw new Error("Missing store_id in URL parameters.");
}

// Forecast endpoint
const FORECAST_API_URL = `http://100.91.13.32:5000/api/v1/forecast/store/${store_id}`;

// Helper: format recommended_order as a colored badge
function formatRecommendedOrder(value) {
  if (value > 0) {
    return `<span class="badge badge-red">Order ${value}</span>`;
  }
  if (value === 0) {
    return `<span class="badge badge-blue">At Par</span>`;
  }
  return `<span class="badge badge-green">Overstock ${Math.abs(value)}</span>`;
}

// Fetch forecast data
fetch(FORECAST_API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Forecast request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Validate response structure
    if (!data || data.status !== "success" || !Array.isArray(data.data)) {
      console.error("Unexpected API response structure:", data);
      if (forecastContainer) {
        forecastContainer.innerHTML = "<p>No forecast data available.</p>";
      }
      return;
    }

    let rows = data.data;

    // ====== SMART AGGREGATION / KPIs ======
    const totalProducts = rows.length;
    const belowPar = rows.filter(item => item.recommended_order > 0);
    const belowParCount = belowPar.length;
    const totalUnitsToOrder = belowPar.reduce(
      (sum, item) => sum + item.recommended_order,
      0
    );

    // Sort rows so most urgent orders appear first
    rows = rows.slice().sort((a, b) => b.recommended_order - a.recommended_order);

    // ====== BUILD HEADER + KPI CARDS + TABLE SHELL ======
    forecastContainer.innerHTML = `
      <h2>Product Forecast for Store ${store_id}</h2>

      <div class="card-grid" style="margin-bottom: 1.5rem;">
        <div class="card card-red">
          <div class="metric">
            ${belowParCount}
            <span class="metric-label">Products Below Par</span>
          </div>
        </div>

        <div class="card card-green">
          <div class="metric">
            ${totalUnitsToOrder}
            <span class="metric-label">Total Units to Order</span>
          </div>
        </div>

        <div class="card card-blue">
          <div class="metric">
            ${totalProducts}
            <span class="metric-label">Products Evaluated</span>
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Current Stock</th>
            <th>Monthly Avg</th>
            <th>Par Level</th>
            <th>Recommended Order</th>
          </tr>
        </thead>
        <tbody id="forecast-body"></tbody>
      </table>
    `;

    const tableBody = document.getElementById("forecast-body");

    if (!tableBody) {
      console.error("Missing #forecast-body element to render rows.");
      return;
    }

    // ====== POPULATE TABLE ROWS (WITHOUT PRODUCT NAME) ======
    rows.forEach(item => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <a href="../products/6.2product_id.html?id=${item.product_id}">
            ${item.product_id}
          </a>
        </td>

        <td>${item.current_stock}</td>
        <td>${item.monthly_average}</td>
        <td>${item.par_level}</td>
        <td>${formatRecommendedOrder(item.recommended_order)}</td>
      `;

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error fetching forecast:", error);
    if (forecastContainer) {
      forecastContainer.textContent = "Failed to load forecast data.";
    }
  });
