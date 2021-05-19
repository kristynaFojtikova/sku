/*
 * Created Date: Thu, 20th May 2021, 00:27:02 am
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import { numbersRegex } from './Regex';

export function toNumber(x: string): number {
  if (!numbersRegex.test(x)) {
    throw Error('Invalid Input');
  }
  return parseInt(x, 10);
}
