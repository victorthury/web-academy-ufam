import http from "http";
import fs from "fs";
import dotenv from "dotenv";
import { createLink } from "./lib/util.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 8000;

const PATH = process.argv[2] ?? "./public";

const server = http.createServer((req, res) => {
  if (req.url != "/") {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });

    fs.readFile(`${PATH}${req.url}`, "utf8", (err, data) => {
      if (err) {
        res.write("deu ruim meu chapa");
        res.end();
        return;
      }
      res.write('<a href="/">Voltar</a><br>');
      res.write(data);
      res.end();
    });
    return;
  }

  fs.readdir(PATH, (error, data) => {
    if (error) {
      console.log("Error", error.message);
      return;
    }

    let fileNames = "";
    data.forEach((val, index) => {
      fileNames += createLink(val);
    });
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    res.write(fileNames);
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
