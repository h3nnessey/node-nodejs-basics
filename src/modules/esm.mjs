import path from "node:path";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import { fileURLToPath } from "node:url";
import "./files/c.js";

/* For Student 1: we also can create a custom require to import json files
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
*/

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = (await import("./files/a.json", { with: { type: "json" } }))
    .default;
  // unknownObject = require('./files/a.json')
} else {
  unknownObject = (await import("./files/b.json", { with: { type: "json" } }))
    .default;
  // unknownObject = require('./files/b.json')
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
