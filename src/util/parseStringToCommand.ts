/*
 * Created Date: Thu, 20th May 2021, 00:28:41 am
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import { StockCommand } from '../models/stockActionModel';

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
