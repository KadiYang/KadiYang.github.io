// Fetch store data from API
fetch("http://100.91.13.32:5000/api/v1/stores")
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById("table-body");

    if (data.status != "success") {
      console.error("API error:", data.message);
      return;
    }

    data.data.forEach(store => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <a href="6.5store_id.html?id=${store.store_id}">
            ${store.store_id}
          </a>
        </td>
        <td>${store.store_name}</td>
        <td>${store.store_city}</td>
      `;

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error fetching stores:", error);
  });
