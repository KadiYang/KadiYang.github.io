const INVENTORY_API_BASE = "http://100.91.13.32:5000/api/v1";

function loadInventory(storeId) {
  if (!storeId) {
    console.error("Missing store ID; cannot load inventory.");
    return;
  }

  fetch(`${INVENTORY_API_BASE}/inventory/store/${storeId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Inventory request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.status !== "success" || !Array.isArray(data.data)) {
        console.error("Unexpected API response structure:", data);
        return;
      }

      const tableBody = document.getElementById("table-body");

      if (!tableBody) {
        console.error("Missing #table-body element to render inventory rows.");
        return;
      }

      tableBody.innerHTML = "";

      data.data.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${item.product_id}</td>
          <td>${item.product_name}</td>
          <td>${item.current_stock}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error fetching inventory:", error);
    });
}
