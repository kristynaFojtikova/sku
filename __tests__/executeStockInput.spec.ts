/*
 * Created Date: Tue, 18th May 2021, 22:51:18 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import { executeStockInput } from '../src/executeStockInput';
import fs from 'fs';
import path from 'path';
import { executeStockInputInputII } from '../src/executeStockInputII';

describe('Execute stock input', () => {
  test('receive valid output', () => {
    const inputFilePath = path.join(
      process.cwd(),
      '__tests__',
      'stock.txt',
    );
    const outputFilePath = path.join(
      process.cwd(),
      '__tests__',
      'output.txt',
    );

    const input = fs.readFileSync(inputFilePath, 'utf8');
    const output = fs.readFileSync(outputFilePath, 'utf8');

    expect(executeStockInputInputII(input)).toEqual(output);
    // expect(executeStockInput(input)).toEqual(output);
  });
});
