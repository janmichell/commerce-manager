document.getElementById("toggleSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.width = sidebar.style.width === "0px" ? "250px" : "0px";
});

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message || "Product added successfully!");
    e.target.reset();
  } catch (error) {
    console.error(error);
    alert("Failed to add product.");
  }
});

async function loadProducts() {
  const token = localStorage.getItem("token");
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  try {
    const response = await fetch("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const products = await response.json();

    products.forEach((p) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <strong>${p.name}</strong> (ID externo: ${p.externalId})<br>
        Preço: R$ ${p.price} | Custo: R$ ${p.cost} | Tributo: R$ ${p.tax || 0}<br>
        <small>${p.description || "Sem descrição"}</small>
      `;
      productList.appendChild(div);
    });
  } catch (error) {
    productList.innerHTML = "Erro ao carregar produtos";
  }
}

window.addEventListener("DOMContentLoaded", loadProducts);