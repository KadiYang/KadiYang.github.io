function loadStoreDetail(id) {
  fetch(`http://100.91.13.32:5000/api/v1/stores/${id}`)
    .then(res => res.json())
    .then(data => {
      const s = data.data;

      console.log(s); // DEBUG — shows real field names

      document.getElementById("store-detail").innerHTML = `
        <h2>Store Details</h2>
        <p><strong>ID:</strong> ${s.store_id}</p>
        <p><strong>Name:</strong> ${s.store_name}</p>
        <p><strong>Location:</strong> ${s.store_city}</p>
      `;
    })
    .catch(err => console.error("Fetch failed:", err));
}
