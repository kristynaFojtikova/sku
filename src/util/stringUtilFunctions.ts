/*
 * Created Date: Thu, 20th May 2021, 00:29:47 am
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import { separatorRegex, numbersRegex } from './Regex';
import { StockCommand } from '../models/stockActionModel';

export function splitIntoWords(text: string): string[] {
  return text.split(separatorRegex);
}

export function regexIndexOf(
  regex: RegExp,
  input: string,
  startpos: number,
): number {
  const indexOf = input.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
}

export function toNumber(x: string): number {
  if (!numbersRegex.test(x)) {
    throw Error('Invalid Input');
  }
  return parseInt(x, 10);
}

export const parseStringToCommand = (
  string: string,
): StockCommand => {
  switch (string) {
    case 'set-stock':
      return StockCommand.SET;
    case 'add-stock':
      return StockCommand.ADD;
    case 'order':
      return StockCommand.ORDER;
    default:
      throw Error('Invalid input');
  }
};
