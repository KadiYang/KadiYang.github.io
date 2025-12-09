// ========================================
// 6.3 List of Stores That Carry a Product
// ========================================

const PRODUCT_API_BASE = "http://100.91.13.32:5000/api/v1";

async function loadStoresForProduct(product_id) {
  const target = document.getElementById("store-results");

  try {
    const response = await fetch(`${PRODUCT_API_BASE}/products/${product_id}/stores`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.status !== "success" || !data.data) {
      target.innerHTML = `<p class='error'>No stores found for this product.</p>`;
      return;
    }

    renderStoreTable(data.data, product_id);

  } catch (err) {
    console.error("Error fetching store list:", err);
    target.innerHTML = `<p class='error'>Failed to load store list.</p>`;
  }
}

function renderStoreTable(stores, product_id) {
  const target = document.getElementById("store-results");

  if (stores.length === 0) {
    target.innerHTML = `<p>No stores carry product ID ${product_id}.</p>`;
    return;
  }

  let html = `
    <h2>Product ID: ${product_id}</h2>
    <table>
      <thead>
        <tr>
          <th>Store ID</th>
          <th>Store Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
  `;

  // ========================================
  // MAKE STORE_ID A CLICKABLE LINK TO 6.5
  // ========================================
  stores.forEach(store => {
    html += `
      <tr>
        <td>
          <a href="../stores/6.5store_id.html?id=${store.store_id}">
            ${store.store_id}
          </a>
        </td>
        <td>${store.store_name || "N/A"}</td>
        <td>${store.location || "N/A"}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;

  target.innerHTML = html;
}