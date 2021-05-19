/*
 * Created Date: Wed, 19th May 2021, 23:44:47 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import * as R from 'ramda';

export class StockValue {
  sku: string;
  amount: number;
  constructor(sku: string, amount: number) {
    this.sku = sku;
    this.amount = amount;
  }
}

export class Stock {
  state: StockValue[] = [];
  ordersHistory: string[] = [];
  stateToString(): string {
    const string = this.state
      .map((stockValue) => {
        return `${stockValue.sku} ${stockValue.amount}`;
      })
      .reduce((accumulator, currentValue) => {
        if (R.isEmpty(accumulator)) {
          return currentValue;
        }
        return `${accumulator}\n${currentValue}`;
      }, '');
    return string;
  }
}
