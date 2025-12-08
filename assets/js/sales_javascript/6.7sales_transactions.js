const LIMIT = 100;

// Get store_id from URL
const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get("store_id");

// Base endpoint
const BASE_URL = "http://100.91.13.32:5000/api/v1/sales/store";

let totalRows = null;
let totalPages = 1;

// Load page N
async function loadPage(page = 1) {
  if (!storeId) {
    renderTable([]);
    console.error("Missing store_id in query string; cannot load sales.");
    return;
  }

  const offset = (page - 1) * LIMIT;

  const url = `${BASE_URL}/${storeId}?limit=${LIMIT}&offset=${offset}`;

  console.log("Fetching:", url);

  try {
    const res = await fetch(url);
    const json = await res.json();

    const rows = json.data || [];

    renderTable(rows);

    // Set total rows
    if (json.total) {
      totalRows = json.total;
    } else if (rows.length < LIMIT) {
      totalRows = offset + rows.length;
    }

    totalPages = totalRows ? Math.ceil(totalRows / LIMIT) : page + 1;

    renderPagination(page);

  } catch (error) {
    console.error("Error loading sales:", error);
  }
}

// Render rows into table
function renderTable(rows) {
  const body = document.getElementById("salesBody");
  body.innerHTML = "";

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.sale_id}</td>
      <td>${r.date}</td>
      <td>${r.product_id}</td>
      <td>${r.units}</td>
    `;
    body.appendChild(tr);
  });
}

// Render pagination buttons
function renderPagination(current) {
  const div = document.getElementById("pagination");
  div.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "page-btn" + (i === current ? " active" : "");
    btn.onclick = () => loadPage(i);
    div.appendChild(btn);
  }
}

// Load FIRST PAGE (only if store id is available)
window.onload = () => loadPage(1);

document.getElementById("goBack").addEventListener("click", () => {
  if (storeId) {
    window.location.href = `../stores/6.5store_id.html?id=${storeId}`;
  } else {
    // Fallback if no store id is present in the query string
    window.history.back();
  }
});
