const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText =
  "Vamos fazer café! Ferva a água até 94 graus Celsius. Vamos usar meu método favorito, que é a :insertx:! Escolha um bom grão, eu gosto de usar :inserty:. A partir do método escolhida, faça a receita que você mais gosta, eu gosto de uma que deixa o café bem :insertz:. Meu amigo Bob recomenda usar a variedade :inserty: e gosta de usar 450 gramas de água, para 30 gramas de café.";

const insertX = ["V60", "Melitta", "Prensa Francesa"];
const insertY = ["arara", "geisha", "bourbon amarelo"];
const insertZ = ["ácido", "equilibrado", "doce"];

randomize.addEventListener("click", result);

function result() {
  let newStory = storyText;
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(":insertx:", xItem);
  newStory = newStory.replace(":inserty:", yItem);
  newStory = newStory.replace(":insertz:", zItem);
  newStory = newStory.replace(":inserty:", yItem);

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("us").checked) {
    const weight1 = Math.round(450 / 28.35) + " onças";
    const weight2 = Math.round(30 / 28.35) + " onças";
    const temperature = Math.round((94 * 9) / 5 + 32) + " Fahrenheit";

    newStory = newStory.replace("94 graus Celsius", temperature);
    newStory = newStory.replace("450 gramas", weight1);
    newStory = newStory.replace("30 gramas", weight2);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}
