// Fetch product data from API
fetch("http://100.91.13.32:5000/api/v1/stores")
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById("table-body");
  if (data.status != "success") {
    console.error("API error:",data.message);
    return;
  }
    // Loop through products and add rows
    data.data.forEach(stores => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${stores.stores_id}</td>
        <td>${stores.stores_name}</td>
        <td>${stores.stores_location}</td>
      `;

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error fetching stores:", error);
  });
