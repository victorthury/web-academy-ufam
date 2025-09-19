"use strict";
var todos = [];
var form = document.querySelector("form");
var titleInput = document.getElementById("title");
var dueDateInput = document.getElementById("dueDate");
var descriptionInput = document.getElementById("description");
var cardsContainer = document.getElementById("cardsContainer");
var editForm = document.getElementById("editForm");
var editTitleInput = document.getElementById("editTitle");
var editDueDateInput = document.getElementById("editDueDate");
var editDescriptionInput = document.getElementById("editDescription");
function renderTodos() {
    cardsContainer.innerHTML = "";
    todos.forEach(function (_a, index) {
        var titulo = _a[0], insercao = _a[1], limite = _a[2], descricao = _a[3];
        var col = document.createElement("div");
        col.className = "col";
        col.innerHTML = "\n      <div class=\"card\">\n        <div class=\"card-body bg-light\">\n          <h5 class=\"card-title\">".concat(titulo, "</h5>\n          <p class=\"card-text\"><small class=\"text-muted\">\n            Inser\u00E7\u00E3o: ").concat(insercao.toLocaleString(), "\n          </small></p>\n          <p class=\"card-text\"><small class=\"text-muted\">\n            Data limite: ").concat(isNaN(limite.getTime())
            ? "Sem limite"
            : limite.toLocaleDateString(), "\n          </small></p>\n          <p class=\"card-text\">").concat(descricao, "</p>\n          \n          <button \n            class=\"btn btn-warning w-100 mb-2 btn-edit\" \n            data-bs-toggle=\"modal\" \n            data-bs-target=\"#editModal\"\n            data-index=\"").concat(index, "\">\n            Editar\n          </button>\n          \n          <button \n            class=\"btn btn-danger w-100 btn-delete\" \n            data-index=\"").concat(index, "\">\n            Excluir\n          </button>\n        </div>\n      </div>\n    ");
        cardsContainer.appendChild(col);
    });
    document.querySelectorAll(".btn-delete").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            var index = parseInt(e.target.dataset.index);
            todos.splice(index, 1);
            renderTodos();
        });
    });
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var titulo = titleInput.value;
    var descricao = descriptionInput.value;
    var limite = new Date(dueDateInput.value);
    var insercao = new Date();
    todos.push([titulo, insercao, limite, descricao]);
    form.reset();
    var modal = document.querySelector("#exampleModal");
    modal.dispatchEvent(new Event("hide.bs.modal"));
    renderTodos();
});
cardsContainer.addEventListener("click", function (e) {
    var target = e.target;
    if (target.classList.contains("btn-edit")) {
        var index = parseInt(target.dataset.index);
        var _a = todos[index], titulo = _a[0], limite = _a[2], descricao = _a[3];
        editTitleInput.value = titulo;
        editDescriptionInput.value = descricao;
        editDueDateInput.value = isNaN(limite.getTime())
            ? ""
            : limite.toISOString().split("T")[0];
        editForm.dataset.index = index.toString();
    }
});
// salvar edição
editForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var index = parseInt(editForm.dataset.index);
    var _a = todos[index], _ = _a[0], insercao = _a[1]; // manter a data de inserção original
    var novoTitulo = editTitleInput.value;
    var novaDescricao = editDescriptionInput.value;
    var novoLimite = new Date(editDueDateInput.value);
    todos[index] = [novoTitulo, insercao, novoLimite, novaDescricao];
    editForm.reset();
    renderTodos();
});
renderTodos();
//# sourceMappingURL=lembretes.js.map