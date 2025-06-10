const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'absolute-cache-441609-g0-3537390d03f0.json'); // remplace par le chemin de ton fichier JSON

const rawJson = fs.readFileSync(filePath, 'utf-8');
const obj = JSON.parse(rawJson);

// Remplacer les retours à la ligne dans private_key par \\n (double backslash + n)
obj.private_key = obj.private_key.replace(/\n/g, '\\n');

// Convertir en JSON sur une seule ligne
const singleLineJson = JSON.stringify(obj);

console.log(singleLineJson);
