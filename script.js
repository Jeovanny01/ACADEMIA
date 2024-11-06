document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener los valores de los campos
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // Simular el envío del formulario
    let responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = `Gracias ${name}, hemos recibido tu mensaje y te contactaremos pronto.`;
    responseMessage.style.color = "green";

    // Limpiar el formulario
    document.getElementById('contactForm').reset();
    
 
});

