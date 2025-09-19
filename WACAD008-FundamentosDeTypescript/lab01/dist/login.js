"use strict";
var user = "admin";
var password = "senha123";
var loginForm = document.getElementById("login");
var userInput = document.getElementById("user");
var passwordInput = document.getElementById("loginPassword");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (userInput.value !== user || passwordInput.value !== password) {
        alert("Usuário ou senha inválido");
        return;
    }
    window.location.href = "lembretes.html";
});
//# sourceMappingURL=login.js.map