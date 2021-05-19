/*
 * Created Date: Thu, 20th May 2021, 00:29:47 am
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import { separatorRegex } from './Regex';

export function splitInput(text: string) {
  return text.split(separatorRegex);
}
