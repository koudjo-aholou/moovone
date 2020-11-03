import {
  configurationAllowed, cellChange, getNeighborsLeftRight, activeInactiveCells, outPut,
} from './module';

describe('CONFIGURATION', () => {
  it('Should Throw Error if cellCircle is not an Array', () => {
    const cellCircle = { quiet: 0, excited: 1 };
    const steps = 1;
    expect(() => configurationAllowed(cellCircle, steps)).toThrow();
  });

  it('Should Throw Error if steps is not an integer Number', () => {
    const cellCircle = [0, 1, 0];
    const steps = 1.4;
    expect(() => configurationAllowed(cellCircle, steps)).toThrow();
  });

  it('Should Throw Error if steps < 1', () => {
    const cellCircle = [0, 1, 0];
    const steps = 0;
    expect(() => configurationAllowed(cellCircle, steps)).toThrow();
  });
});

describe('CELL POSITION', () => {
  it('Should communicate with its left neighbor and right neighbor', () => {
    const initial = [0, 1, 2];
    const index = 1;
    expect(getNeighborsLeftRight(initial, index)).toStrictEqual([0, 2]);
  });

  it('Should communicate with its left and right neighbor when it s the first cell ', () => {
    const initial = [0, 1, 2, 6, 8];
    const index = 0;
    expect(getNeighborsLeftRight(initial, index)).toStrictEqual([8, 1]);
  });

  it('Should communicate with its left and right neighbor when it is the last cell ', () => {
    const initial = [0, 1, 2];
    const index = 2;
    expect(getNeighborsLeftRight(initial, index)).toStrictEqual([1, 0]);
  });
});

describe('ACTIVE / INACTIVE CELLS', () => {
  it('Should change cells 0,1 to 0,0', () => {
    const cells = [0, 1];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 0]);
  });
  it('Should change cells 0,1,0,1 to 0,0,0,0', () => {
    const cells = [0, 1, 0, 1];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 0, 0, 0]);
  });
  it('Should change cells 1,0,1,0 to 0,0,0,0', () => {
    const cells = [1, 0, 1, 0];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 0, 0, 0]);
  });
  it('Should NOT change cells 0,1,1', () => {
    const cells = [0, 1, 1];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 1, 1]);
  });
  it('Should NOT change cells 0,0,0', () => {
    const cells = [0, 0, 0];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 0, 0]);
  });
  it('Should change cells 0,1,0 to 1,0,1', () => {
    const cells = [0, 1, 0];
    expect(activeInactiveCells(cells)).toStrictEqual([1, 0, 1]);
  });
  it('Should NOT change 1,0,1', () => {
    const cells = [1, 0, 1];
    expect(activeInactiveCells(cells)).toStrictEqual([1, 0, 1]);
  });
  it('Should NOT change 1,1,0', () => {
    const cells = [1, 1, 0];
    expect(activeInactiveCells(cells)).toStrictEqual([1, 1, 0]);
  });
  it('Should change 0,0,1 to 1,1,0 ', () => {
    const cells = [0, 0, 1];
    expect(activeInactiveCells(cells)).toStrictEqual([1, 1, 0]);
  });
  it('Should change 1,0,0 to 0,1,1', () => {
    const cells = [1, 0, 0];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 1, 1]);
  });
  it('Should change cells 1,1,1 to 0,0,0', () => {
    const cells = [1, 1, 1];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 0, 0]);
  });
  it('Should change cells 1,0,1,1 to 1,0,1,0', () => {
    const cells = [1, 0, 1, 1];
    expect(activeInactiveCells(cells)).toStrictEqual([1, 0, 1, 0]);
  });
  it('Should change cells 1,0,1,0 to 0,0,0,0', () => {
    const cells = [1, 0, 1, 0];
    expect(activeInactiveCells(cells)).toStrictEqual([0, 0, 0, 0]);
  });
});

describe('CELLS CHANGE with STEPS', () => {
  it('Should Throw Error when steps < 1', () => {
    const cells = [1, 0, 0];
    const steps = 0;
    expect(() => cellChange(cells, steps)).toThrow();
  });

  it('Should change cells 1,0,0 to 0,1,1', () => {
    const cells = [1, 0, 0];
    const steps = 1;
    expect(cellChange(cells, steps)).toStrictEqual([0, 1, 1]);
  });

  it('Should change cells 1,0,1,1 to 0,0,0,0 in 2 steps', () => {
    const cells = [1, 0, 1, 1];
    expect(cellChange(cells, 1)).toEqual([1, 0, 1, 0]);
    expect(cellChange(cells, 2)).toEqual([0, 0, 0, 0]);
  });

  it('Should NOT change cells 0,0,0,0,0,0', () => {
    const cells = [0, 0, 0, 0, 0, 0];
    const steps = 4;
    expect(cellChange(cells, steps)).toStrictEqual([0, 0, 0, 0, 0, 0]);
  });

  it('Should change cells 1,1,1,1,1,1 to 0,0,0,0,0,0', () => {
    const cells = [1, 1, 1, 1, 1, 1];
    const steps = 4;
    expect(cellChange(cells, steps)).toStrictEqual([0, 0, 0, 0, 0, 0]);
  });
});

describe('OUTPUT', () => {
  it('Should display array of numbers with the final configuration concatenated with commas', () => {
    const cells = [1, 0, 1, 1];
    const steps = 2;
    const finalConfiguration = cellChange(cells, steps);
    expect(outPut(finalConfiguration)).toBe('0,0,0,0');
  });
});
