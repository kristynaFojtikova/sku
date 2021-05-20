/*
 * Created Date: Tue, 18th May 2021, 22:51:18 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import { executeStockInput } from '../src/executeStockInput/executeStockInput';
import fs from 'fs';
import path from 'path';
import { executeStockInputInputV2 } from '../src/executeStockInputV2/executeStockInputV2';
import { executeStockInputInputV3 } from '../src/executeStockInputV3/executeStockInputV3';

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

    expect(executeStockInputInputV3(input)).toEqual(output);
    // expect(executeStockInput(input)).toEqual(output);
  });
});
