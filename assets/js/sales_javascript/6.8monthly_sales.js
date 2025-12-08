const SALES_SUMMARY_API_BASE = "http://100.91.13.32:5000/api/v1";

function loadMonthlySales(storeId) {
  if (!storeId) {
    console.error("Missing store ID; cannot load monthly sales.");
    return;
  }

  fetch(`${SALES_SUMMARY_API_BASE}/sales/store/${storeId}/summary`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Monthly sales request failed with status ${response.status}`);
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
        console.error("Missing #table-body element to render monthly sales.");
        return;
      }

      tableBody.innerHTML = "";

      // Loop through results and add rows
      data.data.forEach(record => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${record.month}</td>
          <td>${record.product_id}</td>
          <td>${record.product_name}</td>
          <td>${record.units_sold}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error fetching sales summary:", error);
    });
}
