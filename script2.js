document.addEventListener("DOMContentLoaded", function () {
    const session = JSON.parse(localStorage.getItem("session") || "{}");

    if (!session.isLoggedIn) {
        window.location.href = "index.html";
        return;
    }

    const privilege = session.privilege;

    const menu = document.getElementById("menu");
    if (privilege !== 1) { 
        menu.querySelectorAll("li").forEach(item => {
            if (item.textContent === "Registrar Alumnos") {
                item.style.display = "none"; 
            }
        });
    }
});

function logout() {
    localStorage.removeItem("session"); 
    window.location.href = "index.html";
}
