
// Fetch product data from API
fetch("http://100.91.13.32:5000/api/v1/products")
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById("table-body");
  if (data.status != "success") {
    console.error("API error:",data.message);
    return;
  }
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
