const PRODUCTS_API_URL = "http://100.91.13.32:5000/api/v1/products";

// Fetch product data from API
fetch(PRODUCTS_API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Products request failed with status ${response.status}`);
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
      console.error("Missing #table-body element to render products.");
      return;
    }

    tableBody.innerHTML = "";

    // Loop through products and add rows
    data.data.forEach(product => {
      const row = document.createElement("tr");

      row.innerHTML = `
  <td>
    <a href="../products/6.2product_id.html?id=${product.product_id}">
      ${product.product_id}
    </a>
  </td>
  <td>${product.product_name}</td>
  <td>${product.product_category}</td>
  <td>${product.product_cost}</td>
  <td>${product.product_price}</td>
`;

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });
