const PRODUCT_DETAIL_API_BASE = "http://100.91.13.32:5000/api/v1";

function loadProductDetail(id) {
  if (!id) {
    console.error("Missing product ID; cannot load product detail.");
    return;
  }

  fetch(`${PRODUCT_DETAIL_API_BASE}/products/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Product detail request failed with status ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (!data || data.status !== "success" || !data.data) {
        console.error("Unexpected API response structure:", data);
        return;
      }

      const detailTarget = document.getElementById("product-detail");

      if (!detailTarget) {
        console.error("Missing #product-detail element to render product detail.");
        return;
      }

      const p = data.data;

      // ============================
      // RENDER PRODUCT DETAILS
      // ============================
      detailTarget.innerHTML = `
        <h2>Product Details</h2>
        <p><strong>ID:</strong> ${p.product_id}</p>
        <p><strong>Name:</strong> ${p.product_name}</p>
        <p><strong>Category:</strong> ${p.product_category}</p>
        <p><strong>Cost:</strong> ${p.product_cost}</p>
        <p><strong>Retail Price:</strong> ${p.product_price}</p>
      `;

      // ============================
      // ADD LINK TO 6.3 (Stores carrying this product)
      // ============================
detailTarget.innerHTML += `
  <div style="text-align:center; margin-top: 1.5rem;">
    <button class="btn" onclick="window.location.href='6.3products_store_id.html?product_id=${p.product_id}'">
      View Stores That Carry This Product →
    </button>
  </div>
`;      if (storeLink) {
        storeLink.innerHTML = `
  <button class="btn" onclick="window.location.href='6.3products_store_id.html?product_id=${p.product_id}'">
    View Stores That Carry This Product →
  </button>
`;
      }

    })
    .catch(err => {
      console.error("Error fetching product detail:", err);
    });
}