/*
 * Created Date: Thu, 20th May 2021, 11:10:24 am
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import * as R from 'ramda';

import { StockCommand } from '../models/stockActionModel';
import { commandRegex } from '../util/Regex';
import {
  splitIntoWords,
  regexIndexOf,
  parseStringToCommand,
} from '../util/stringUtilFunctions';

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
export function getIndicesOf(regex: RegExp, input: string): number[] {
  const startingIndices: number[] = [];
  let indexOccurence = regexIndexOf(regex, input, 0);
  while (indexOccurence >= 0) {
    startingIndices.push(indexOccurence);
    indexOccurence = regexIndexOf(regex, input, indexOccurence + 1);
  }
  return startingIndices;
}

const splitInputByIndexes = (
  input: string,
  indices: number[],
): string[] => {
  const lines: string[] = [];
  const string = input;
  let startIndex = 0;
  indices.map((value, index) => {
    if (value == 0) {
      return;
    }
    const actionLine = string.slice(startIndex, value);
    lines.push(actionLine);
    if (index + 1 == indices.length) {
      const lastLine = string.slice(value);
      lines.push(lastLine);
    }
    startIndex = value;
  });

  return lines;
};

const mapActionLinesIntoObjects = (
  lines: string[],
): { [name: string]: number }[] => {
  const objects: { [name: string]: number }[] = [];

  lines.map((line) => {
    const words = splitIntoWords(line);
    const command: string = parseStringToCommand(words[0]);
    const isOrderCommand = command === StockCommand.ORDER;
    const object: {
      [name: string]: {
        [amount: string]: number;
        // [action: string]: string;
      };
    } = {};

    words.map((w) => {
      // TODO: - Translate into object
    });
  });

  return objects;
};

const reduceActionsIntoState = (
  states: { [name: string]: number }[],
): { [name: string]: number } => {
  // TODO: - Reduce action objects into state
  return {};
};

const parseObjectStateIntoString = (state: {
  [sku: string]: number;
}): string => {
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
};

// Imperative wrapper of the execute stock input logic

export function executeStockInputInputV3(input: string): string {
  const commandStartingIndices = getIndicesOf(commandRegex, input);

  const actionLines = splitInputByIndexes(
    input,
    commandStartingIndices,
  );

  const actionObjects = mapActionLinesIntoObjects(actionLines);

  const state: { [sku: string]: number } = reduceActionsIntoState(
    actionObjects,
  );

  const string = parseObjectStateIntoString(state);

  return string;
}
