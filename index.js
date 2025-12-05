document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("openProducts");

    if (btn) {
        btn.addEventListener("click", () => {
            // Correct path to products.html
            window.location.href = "./html/products.html";
        });
    } else {
        console.error("Button not found");
    }
});
