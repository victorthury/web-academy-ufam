let todos: [string, Date, Date, string][] = [];

const form = document.querySelector("form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;
const descriptionInput = document.getElementById(
  "description"
) as HTMLInputElement;
const cardsContainer = document.getElementById(
  "cardsContainer"
) as HTMLDivElement;

const editForm = document.getElementById("editForm") as HTMLFormElement;
const editTitleInput = document.getElementById("editTitle") as HTMLInputElement;
const editDueDateInput = document.getElementById(
  "editDueDate"
) as HTMLInputElement;
const editDescriptionInput = document.getElementById(
  "editDescription"
) as HTMLInputElement;

function renderTodos() {
  cardsContainer.innerHTML = "";

  todos.forEach(([titulo, insercao, limite, descricao], index) => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card">
        <div class="card-body bg-light">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text"><small class="text-muted">
            Inserção: ${insercao.toLocaleString()}
          </small></p>
          <p class="card-text"><small class="text-muted">
            Data limite: ${
              isNaN(limite.getTime())
                ? "Sem limite"
                : limite.toLocaleDateString()
            }
          </small></p>
          <p class="card-text">${descricao}</p>
          
          <button 
            class="btn btn-warning w-100 mb-2 btn-edit" 
            data-bs-toggle="modal" 
            data-bs-target="#editModal"
            data-index="${index}">
            Editar
          </button>
          
          <button 
            class="btn btn-danger w-100 btn-delete" 
            data-index="${index}">
            Excluir
          </button>
        </div>
      </div>
    `;

    cardsContainer.appendChild(col);
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt((e.target as HTMLButtonElement).dataset.index!);
      todos.splice(index, 1);
      renderTodos();
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const titulo = titleInput.value;
  const descricao = descriptionInput.value;
  const limite = new Date(dueDateInput.value);
  const insercao = new Date();

  todos.push([titulo, insercao, limite, descricao]);

  form.reset();

  const modal = document.querySelector("#exampleModal") as HTMLElement;
  modal.dispatchEvent(new Event("hide.bs.modal"));

  renderTodos();
});

cardsContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("btn-edit")) {
    const index = parseInt(target.dataset.index!);
    const [titulo, , limite, descricao] = todos[index];

    editTitleInput.value = titulo;
    editDescriptionInput.value = descricao;
    editDueDateInput.value = isNaN(limite.getTime())
      ? ""
      : limite.toISOString().split("T")[0];

    editForm.dataset.index = index.toString();
  }
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const index = parseInt(editForm.dataset.index!);
  const [_, insercao] = todos[index];

  const novoTitulo = editTitleInput.value;
  const novaDescricao = editDescriptionInput.value;
  const novoLimite = new Date(editDueDateInput.value);

  todos[index] = [novoTitulo, insercao, novoLimite, novaDescricao];

  editForm.reset();

  renderTodos();
});

renderTodos();
