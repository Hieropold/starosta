import { Injectable } from '@angular/core';

import { Item } from '../models/item.model';

@Injectable()
export class InventoryService {

  private inv: Array<Item>;

  constructor() {
    this.inv = [];
  }

  receive(item: Item): void {
    this.inv.push(item);
  }

  dump(): void {
    console.log(this.inv);
  }
}
