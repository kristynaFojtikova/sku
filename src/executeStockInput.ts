/*
 * Created Date: Tue, 18th May 2021, 22:48:34 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import * as R from 'ramda';
import { parseInput } from './functions/parseInput';
import { StockAction, StockCommand } from './models/stockActionModel';
import { Stock, StockValue } from './models/stockModel';

// NOTE: - First version, very typed & more robust

const executeCommand = (
  command: StockCommand,
  currentValue: number,
  change: number,
): number => {
  switch (command) {
    case StockCommand.SET:
      return change;
    case StockCommand.ADD:
      return currentValue + change;
    case StockCommand.ORDER:
      return currentValue - change;
    default:
      return currentValue;
  }
};

export function executeStockInput(input: string): string {
  const stock: Stock = new Stock();

  // parse input
  const stockActions: StockAction[] = parseInput(input);

  // execute input
  stockActions.forEach((action) => {
    const newState = stock.state;
    action.payload.executables.map((executable) => {
      const index = stock.state.findIndex(
        (value) => value.sku == executable.sku,
      );

      const newStockValue = new StockValue(
        executable.sku,
        executeCommand(
          action.command,
          R.prop('amount', stock.state[index]) || 0,
          executable.amount,
        ),
      );
      if (index == -1) {
        newState.push(newStockValue);
      } else {
        newState[index] = newStockValue;
      }
    });
    stock.state = newState;
  });

  // return output
  return stock.stateToString();
}
