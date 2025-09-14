export default function template(body) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="public/css/style.css">
    <title>Document</title>
  </head>
  <body>

    <h1>
      Gerador de Lorem Ipsum
    </h1>

    <form method="get" action="/">
      <label for="lorem">Parágrafos:</label>
      <input type="number" name="valor" id="lorem">
      <button type="submit">Enviar</button>
    </form>
    <div>
      <p>
        ${body}
      </p>
    </div>
  </body>
</html>
  `;
}
