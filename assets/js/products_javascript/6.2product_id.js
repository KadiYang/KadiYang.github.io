function loadProductDetail(id) {
  fetch(`http://100.91.13.32:5000/api/v1/products/${id}`)
    .then(res => res.json())
    .then(data => {
      const p = data.data;

      document.getElementById("product-detail").innerHTML = `
        <h2>Product Details</h2>
        <p><strong>ID:</strong> ${p.product_id}</p>
        <p><strong>Name:</strong> ${p.product_name}</p>
        <p><strong>Category:</strong> ${p.product_category}</p>
        <p><strong>Cost:</strong> ${p.product_cost}</p>
        <p><strong>Retail Price:</strong> ${p.product_price}</p>
      `;
    });
}
