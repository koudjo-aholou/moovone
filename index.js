const mod = require('./compile/script-compiled');

const cells = [1, 0, 1, 1]; // Has to be an array
const steps = 2; // Has to be an integer and > 0
const result = mod.displayFinalConfiguration(cells, steps);

// eslint-disable-next-line no-console
console.log(result);
