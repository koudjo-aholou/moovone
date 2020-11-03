"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configurationAllowed = configurationAllowed;
exports.displayFinalConfiguration = exports.outPut = exports.activeInactiveCells = exports.getNeighborsLeftRight = exports.cellChange = void 0;

/**
 *
 * @param {Array<number>} cells
 * @param {number} index
 * @returns {Array<number>}
 */
const getNeighborsLeftRight = (cells, index) => {
  const [firstCell, lastCell] = [0, cells.length - 1];
  let prev = cells[index - 1];
  let next = cells[index + 1];

  switch (index) {
    case firstCell:
      prev = cells[lastCell];
      return [prev, next];

    case lastCell:
      next = cells[firstCell];
      return [prev, next];

    default:
      return [prev, next];
  }
};
/**
 *
 * @param {Array<number>} cellsRaw
 * @returns {Array<number>}
 */


exports.getNeighborsLeftRight = getNeighborsLeftRight;

const activeInactiveCells = cellsRaw => {
  const cellsUpdate = [];
  cellsRaw.forEach((_, i) => {
    const [left, right] = getNeighborsLeftRight(cellsRaw, i);

    if ((left === 1 || right === 1) && left !== right) {
      cellsUpdate.push(1);
    } else if (left === 1 && right === 1) {
      cellsUpdate.push(0);
    } else {
      cellsUpdate.push(0);
    }
  });
  return cellsUpdate;
};
/**
 *
 * @param {Array<number>} cellsConf
 * @param {number} steps
 * @returns {boolean| Error}
 */


exports.activeInactiveCells = activeInactiveCells;

function configurationAllowed(cellsConf, steps) {
  const cellsType = Array.isArray(cellsConf);
  const stepsType = Number.isInteger(steps);

  if (!cellsType || !stepsType || steps < 1) {
    throw Error('Wrong parameter(s)');
  }

  return cellsType && stepsType;
}
/**
 *
 * @param {Array<number>} cells
 * @param {number} steps
 * @returns {Array<number> | Error}
 */


const cellChange = (cells, steps) => {
  const allowed = configurationAllowed(cells, steps);

  if (!allowed) {
    return allowed;
  }

  let finalConfiguration = cells;

  for (let i = 0; i < steps; i += 1) {
    finalConfiguration = activeInactiveCells(finalConfiguration);
  }

  return finalConfiguration;
};
/**
 *
 * @param {Array<number>} finalConfiguration
 * @returns {string}
 */


exports.cellChange = cellChange;

const outPut = finalConfiguration => finalConfiguration.join(',');
/**
 *
 * @param {Array<number>} cells
 * @param {number} steps
 * @returns {string | Error}
 */


exports.outPut = outPut;

const displayFinalConfiguration = (cells, steps) => {
  const finalConfiguration = cellChange(cells, steps);
  return outPut(finalConfiguration);
};

exports.displayFinalConfiguration = displayFinalConfiguration;
