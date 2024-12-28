document.addEventListener("DOMContentLoaded", function () {
    const session = JSON.parse(localStorage.getItem("session") || "{}");

    if (!session.isLoggedIn) {
        window.location.href = "index.html";
        return;
    }

    const privilege = session.userRole;
    const vend = session.vend;
    

    const menu = document.getElementById("menu");
    if (privilege  == "1111"){ 
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

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}
// Función para mostrar las secciones
function showSection(sectionId) {
    // Primero, oculta todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Elimina la clase 'active' de todos los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Muestra la sección seleccionada
    document.getElementById(sectionId).style.display = 'block';
      // Llama a cargarVendedores solo si la sección seleccionada es 'register'
      if (sectionId === 'register') {
        cargarVendedores();
        cargarIdioma();
        cargarSucursal();
        cargarSuc();
        cargarVend();
        cargarIdio();

    }

    // Agrega la clase 'active' al botón correspondiente
    const activeButton = Array.from(buttons).find(button => button.textContent.toLowerCase() === sectionId);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    // Cerrar el menú en pantallas pequeñas
    if (window.innerWidth <= 768) {
        document.getElementById('menu').classList.remove('active');
    }
    
    
}


// Mostrar la sección de bienvenida por defecto cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    showSection('register');
});
