function loadMonthlySales(storeId) {
  fetch(`http://100.91.13.32:5000/api/v1/sales/store/${storeId}/summary`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("table-body");

      if (data.status !== "success") {
        console.error("API Error:", data.message);
        return;
      }

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