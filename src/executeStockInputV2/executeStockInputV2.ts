/*
 * Created Date: Wed, 19th May 2021, 23:51:49 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import * as R from 'ramda';

import { StockCommand } from '../models/stockActionModel';
import { commandRegex } from '../util/Regex';
import { splitIntoWords } from '../util/stringUtilFunctions';
import {
  toNumber,
  parseStringToCommand,
} from '../util/stringUtilFunctions';

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

function regexIndexOf(
  regex: RegExp,
  input: string,
  startpos: number,
): number {
  const indexOf = input.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
}

function getIndicesOf(regex: RegExp, input: string): number[] {
  const startingIndices: number[] = [];
  let indexOccurence = regexIndexOf(regex, input, 0);
  while (indexOccurence >= 0) {
    startingIndices.push(indexOccurence);
    indexOccurence = regexIndexOf(regex, input, indexOccurence + 1);
  }
  return startingIndices;
}

export function executeStockInputInputV2(input: string): string {
  let state: { [sku: string]: number } = {};

  // temporary values
  let command = '';
  let commandWordIndex = 0;
  let characterIndex = 0;
  let orderNo = '';
  let skus: string[] = [];
  let amounts: number[] = [];

  const resetTempValues = () => {
    commandWordIndex = 0;
    orderNo = '';
    skus = [];
    amounts = [];
  };

  const executeCurrentActionOn = (currentState: {
    [sku: string]: number;
  }): { [sku: string]: number } => {
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

    return newState;
  };

  const commandStartingIndices = getIndicesOf(commandRegex, input);

  const wordValues = splitIntoWords(input);

  const updateState = (value: string, wordIndex: number) => {
    let newState = state;

    const newCommand = commandStartingIndices.includes(
      characterIndex,
    );
    const firstCommand = wordIndex == 0;
    const lastWord = wordIndex + 1 == wordValues.length;

    if (newCommand && !firstCommand) {
      newState = executeCurrentActionOn(state);
      resetTempValues();
    }

    if (newCommand) {
      command = value;
    } else {
      const isOrderCommand = command == StockCommand.ORDER;
      const skuRemainder = isOrderCommand ? 0 : 1;
      if (isOrderCommand && commandWordIndex == 1) {
        orderNo = value;
      } else if (commandWordIndex % 2 == skuRemainder) {
        skus.push(value);
      } else {
        amounts.push(toNumber(value));
      }
    }

    if (lastWord) {
      newState = executeCurrentActionOn(state);
      resetTempValues();
    }

    commandWordIndex += 1;
    characterIndex += value.length + 1;
    console.log('Update state', newState);
    state = newState;
  };

  wordValues.map((value: string, index: number) => {
    updateState(value, index);
  });

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
