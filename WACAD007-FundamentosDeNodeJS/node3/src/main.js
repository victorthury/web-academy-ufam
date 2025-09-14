import fsPromise from "fs/promises";
import dotenv from "dotenv";
import http from "http";
import template from "./lib/template.js";
import { LoremIpsum } from "lorem-ipsum";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 20,
    min: 10,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const server = http.createServer(async (req, res) => {
  let valor = 0;

  if (req.url.includes("valor=")) {
    const splitUrl = req.url.split("valor=");
    if (splitUrl[1] !== "") {
      valor = parseInt(splitUrl[1]);
    }
  }

  if (req.url === "/public/css/style.css") {
    res.writeHead(200, { "content-type": "text/css;charset=utf-8" });
    const css = await fsPromise.readFile("./public/css/style.css");
    res.write(css);
    res.end();
    return;
  }

  const stringToPrint =
    valor === 0
      ? ""
      : lorem.generateParagraphs(valor).replaceAll("\n", "<br><br>");

  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  res.write(template(`${stringToPrint}`));
  res.end();
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na port ${PORT}`);
});
