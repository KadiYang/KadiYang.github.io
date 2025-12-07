function loadStoreDetail(id) { 
  fetch(`http://100.91.13.32:5000/api/v1/stores/${id}`)
    .then(res => res.json())
    .then(data => {
      const s = data.data;

      document.getElementById("store-detail").innerHTML = `
        <h2>Store Details</h2>
        <p><strong>ID:</strong> ${s.store_id}</p>
        <p><strong>Name:</strong> ${s.store_name}</p>
        <p><strong>Location:</strong> ${s.store_city}</p>

        <button id="viewSales">View Monthly Sales →</button>
        <button id="viewInventory">View Inventory →</button>
      `;

      // Sales button
      document.getElementById("viewSales").addEventListener("click", () => {
        window.location.href = `../sales/6.8monthly_sales.html?store_id=${id}`;
      });

      // ⭐ Inventory button (THIS IS THE NEW PART)
      document.getElementById("viewInventory").addEventListener("click", () => {
        window.location.href = `../inventory/6.6inventory.html?store_id=${id}`;
      });
    })
    .catch(err => console.error("Fetch failed:", err));
}
