// =======================
// 6.10 Forecast JavaScript
// Fetches forecast for a specific store
// =======================

// 1. Get store_id from URL (example URL: ?store_id=3)
const params = new URLSearchParams(window.location.search);
const store_id = params.get("store_id");

// Handle missing store_id
if (!store_id) {
  const el = document.getElementById("forecast");
  if (el) el.textContent = "Error: No store_id provided in the URL.";
  throw new Error("Missing store_id in query parameters.");
}

// 2. Correct API endpoint
const FORECAST_API = `http://100.91.13.32:5000/api/v1/forecast/store/${store_id}`;

// 3. Fetch Forecast Data
async function loadForecast() {
  try {
    const response = await fetch(FORECAST_API);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    displayForecast(data);

  } catch (error) {
    console.error("Forecast API Error:", error);
    document.getElementById("forecast").textContent =
      "Failed to load forecast data.";
  }
}

function displayForecast(data) {
  const container = document.getElementById("forecast");

  if (!data || !data.data || data.data.length === 0) {
    container.innerHTML = "<p>No forecast data available.</p>";
    return;
  }

  const rows = data.data; // your array of product forecasts

  let html = `
    <h2>Product Forecast for Store ${store_id}</h2>
    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Current Stock</th>
          <th>Monthly Avg</th>
          <th>Par Level</th>
          <th>Recommended Order</th>
        </tr>
      </thead>
      <tbody>
  `;

  rows.forEach(item => {
    html += `
      <tr>
        <td>${item.product_id}</td>
        <td>${item.current_stock}</td>
        <td>${item.monthly_average}</td>
        <td>${item.par_level}</td>
        <td>${item.recommended_order}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

loadForecast();
