const user: string = "admin";
const password: string = "senha123";

const loginForm = document.getElementById("login") as HTMLFormElement;
const userInput = document.getElementById("user") as HTMLInputElement;
const passwordInput = document.getElementById(
  "loginPassword"
) as HTMLInputElement;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (userInput.value !== user || passwordInput.value !== password) {
    alert("Usuário ou senha inválido");
    return;
  }

  window.location.href = "lembretes.html";
});
