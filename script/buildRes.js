const fs = require('fs');

const data = fs.readdirSync('./src/res');

const images = data.filter(file => /\.png$/.test(file));
const previous = images.map(file => file.replace(/(@\dx)?\.png/, ''));
const uniq = [...new Set(previous)];
const toCamelCase = uniq.map(file =>
  file.replace(/(?:[\W_]+)(\w)/g, (match, $1) => $1.toUpperCase())
);
const imp = uniq.reduce((pre, cur, idx) => {
  const item = `import ${toCamelCase[idx]} from '../res/${cur}.png';\n`;
  return pre + item;
}, '');

// const exp = uniq.reduce((pre, cur) => {
//     const item = `const ${cur} = require('./${cur}.png')\n`;
//     return pre + item;
//   }, '');

const exp = `\nconst Images = {\n  ${toCamelCase.join(',\n  ')},\n};\nexport default Images;\n`;

console.log(previous);
console.log(imp, exp);

fs.writeFileSync('./src/asset/index.ts', imp + exp);
