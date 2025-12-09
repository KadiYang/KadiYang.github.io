const STORES_API_URL = "http://100.91.13.32:5000/api/v1/stores";

// Fetch store data from API
fetch(STORES_API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Stores request failed with status ${response.status}`);
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
      console.error("Missing #table-body element to render stores.");
      return;
    }

    tableBody.innerHTML = "";

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
