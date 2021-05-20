/*
 * Created Date: Tue, 18th May 2021, 22:55:53 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

import * as R from 'ramda';
import {
  OrderActionPayload,
  StockAction,
  StockActionPayload,
  StockCommand,
  StockExecutable,
} from '../models/stockActionModel';
import { commandRegex, separatorRegex } from '../util/Regex';
import {
  parseStringToCommand,
  toNumber,
} from '../util/stringUtilFunctions';

function splitIntoWords(text: string) {
  return text.split(separatorRegex);
}

export function parseInput(input: string): StockAction[] {
  const values = splitIntoWords(input);

  // temporary values
  let command = '';
  let commandIndex = 0;
  let orderNo = '';
  let skus: string[] = [];
  let amounts: number[] = [];

  const actions: StockAction[] = [];

  const createActionFromTempValues = () => {
    const isOrderCommand = command == StockCommand.ORDER;
    const executables = skus.map(
      (sku, index) => new StockExecutable(sku, amounts[index]),
    );
    const payload = isOrderCommand
      ? new OrderActionPayload(executables, orderNo)
      : new StockActionPayload(executables);
    actions.push(
      new StockAction(parseStringToCommand(command), payload),
    );
    commandIndex = 0;
    orderNo = '';
    skus = [];
    amounts = [];
  };

  values.map((value, index) => {
    if (R.isEmpty(value)) {
      return;
    }
    const isOrderCommand = command == StockCommand.ORDER;
    if (value.match(commandRegex)) {
      if (index != 0) {
        createActionFromTempValues();
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
      return;
    } else {
      amounts.push(toNumber(value));
      return;
    }
  });

  createActionFromTempValues();

  return actions;
}
