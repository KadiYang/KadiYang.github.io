function loadInventory(storeId) {
  fetch(`http://100.91.13.32:5000/api/v1/inventory/store/${storeId}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("table-body");

      if (data.status !== "success") {
        console.error("API Error:", data.message);
        return;
      }

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