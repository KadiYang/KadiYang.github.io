document.getElementById("openProducts").addEventListener("click", function () {
  window.location.href = "./html/products/6.1products.html";
});


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openSixFour");

  btn.addEventListener("click", () => {
    // ✅ CORRECT PATH: It must include the 'stores' folder
    window.location.href = "./html/stores/6.4.html"; 
  });
});