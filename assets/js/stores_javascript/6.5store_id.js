const STORE_DETAIL_API_BASE = "http://100.91.13.32:5000/api/v1";

function loadStoreDetail(id) {
  if (!id) {
    console.error("Missing store ID; cannot load store detail.");
    return;
  }

  fetch(`${STORE_DETAIL_API_BASE}/stores/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Store detail request failed with status ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (!data || data.status !== "success" || !data.data) {
        console.error("Unexpected API response structure:", data);
        return;
      }

      const detailEl = document.getElementById("store-detail");

      if (!detailEl) {
        console.error("Missing #store-detail element to render store detail.");
        return;
      }

      const s = data.data;
      detailEl.innerHTML = `
        <h2>Store Details</h2>
        <p><strong>ID:</strong> ${s.store_id}</p>
        <p><strong>Name:</strong> ${s.store_name}</p>
        <p><strong>Location:</strong> ${s.store_city}</p>

        <button id="viewSales">View Monthly Sales -></button>
        <button id="viewInventory">View Inventory -></button>
        <button id="viewTransactions">View Sales Transactions -></button>
        <button id="viewForecast">View Forecast -></button>
      `;

      const salesBtn = detailEl.querySelector("#viewSales");
      const inventoryBtn = detailEl.querySelector("#viewInventory");
      const transactionsBtn = detailEl.querySelector("#viewTransactions");
      const forecastBtn = detailEl.querySelector("#viewForecast");

      if (salesBtn) {
        salesBtn.addEventListener("click", () => {
          window.location.href = `../sales/6.8monthly_sales.html?store_id=${id}`;
        });
      }

      if (inventoryBtn) {
        inventoryBtn.addEventListener("click", () => {
          window.location.href = `../inventory/6.6inventory.html?store_id=${id}`;
        });
      }

      if (transactionsBtn) {
        transactionsBtn.addEventListener("click", () => {
          window.location.href = `../sales/6.7sales_transactions.html?store_id=${id}`;
        });
      }

      if (forecastBtn) {
        forecastBtn.addEventListener("click", () => {
          window.location.href = `../forecast/6.10forecast.html?store_id=${id}`;
        });
      }

    })
    .catch(err => console.error("Fetch failed:", err));
}
