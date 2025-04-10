document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro no login.");
        return;
      }

      function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.classList.remove("hidden");
        notification.classList.add("show");

        setTimeout(() => {
          notification.classList.remove("show");
          notification.classList.add("hidden");
          window.location.href = "/dashboard/index.html";
        }, 2000); // 2 segundos
      }
      localStorage.setItem("token", data.token);
      showNotification("Login efetuado com sucesso!");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro inesperado no login.");
    }
  });
});