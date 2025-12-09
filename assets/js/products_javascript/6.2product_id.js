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
      const storeLink = document.getElementById("store-link");
      if (storeLink) {
        storeLink.innerHTML = `
          <a class="btn" href="6.3product_store_id.html?product_id=${p.product_id}">
            View Stores That Carry This Product →
          </a>
        `;
      }

    })
    .catch(err => {
      console.error("Error fetching product detail:", err);
    });
}
