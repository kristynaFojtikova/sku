/*
 * Created Date: Wed, 19th May 2021, 23:51:49 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import * as R from 'ramda';

import { StockCommand } from './models/stockActionModel';
import { parseStringToCommand } from './util/parseStringToCommand';
import { commandRegex } from './util/Regex';
import { splitInput } from './util/splitInput';
import { toNumber } from './util/toNumber';

// NOTE: - Lighter second version

const commandAction = (command: StockCommand) => {
  switch (command) {
    case StockCommand.SET:
      return (_: number, change: number) => {
        return change;
      };
    case StockCommand.ADD:
      return (oldVal: number, change: number) => {
        return oldVal + change;
      };
    case StockCommand.ORDER:
      return (oldVal: number, change: number) => {
        return oldVal - change;
      };
    default:
      return (oldVal: number) => {
        return oldVal;
      };
  }
};

export function executeStockInputInputII(input: string): string {
  let state: { [sku: string]: number } = {};

  // temporary values
  let command = '';
  let commandIndex = 0;
  let orderNo = '';
  let skus: string[] = [];
  let amounts: number[] = [];

  const resetTempValues = () => {
    commandIndex = 0;
    orderNo = '';
    skus = [];
    amounts = [];
  };

  const executeCurrentAction = (currentState: {
    [sku: string]: number;
  }) => {
    const newState = currentState;
    skus.map((sku: string, index: number) => {
      const currentAmount: number = R.propOr(0, sku)(state);
      const changeAmount: number =
        amounts.length > index ? amounts[index] : 0;
      const newAmount = commandAction(parseStringToCommand(command))(
        currentAmount,
        changeAmount,
      );
      newState[sku] = newAmount;
    });
    console.log('Update to new state:', newState);
    state = newState;
    resetTempValues();
  };

  splitInput(input)
    .filter((v) => !R.isEmpty(v))
    .map((value, index) => {
      const isOrderCommand = command == StockCommand.ORDER;
      if (value.match(commandRegex)) {
        if (index != 0) {
          executeCurrentAction(state);
        }
        command = value;
        return;
      }

      commandIndex += 1;
      if (isOrderCommand && commandIndex == 1) {
        orderNo = value;
        return;
      }

      const skuRemainder = isOrderCommand ? 0 : 1;
      if (commandIndex % 2 == skuRemainder) {
        skus.push(value);
      } else {
        amounts.push(toNumber(value));
      }
    });

  executeCurrentAction(state);

  const keys = Object.keys(state);

  const string = keys
    .map((key) => `${key} ${state[key]}`)
    .reduce((acc, current) => {
      if (acc == '') {
        return current;
      }
      return `${acc}\n${current}`;
    });

  return string;
}
