/*
 * Created Date: Wed, 19th May 2021, 21:21:10 pm
 * Author: Kristyna Fojtikova
 * Email: fojtik.kristyna@gmail.com
 * Copyright (c) 2021 Kristyna Fojtikova
 */

export enum StockCommand {
  SET = 'set-stock',
  ADD = 'add-stock',
  ORDER = 'order',
}

export class StockExecutable {
  sku: string;
  amount: number;
  constructor(sku: string, amount: number) {
    this.sku = sku;
    this.amount = amount;
  }
}

export class StockActionPayload {
  executables: StockExecutable[];

  constructor(executables: StockExecutable[]) {
    this.executables = executables;
  }
}

export class OrderActionPayload extends StockActionPayload {
  orderNo: string;

  constructor(executables: StockExecutable[], orderNo: string) {
    super(executables);
    this.orderNo = orderNo;
  }
}

export class StockAction {
  command: StockCommand;
  payload: StockActionPayload | OrderActionPayload;

  constructor(
    command: StockCommand,
    payload: StockActionPayload | OrderActionPayload,
  ) {
    this.command = command;
    this.payload = payload;
  }
}
