import { Injectable } from '@angular/core';

import { Item } from '../models/item.model';

@Injectable()
export class InventoryService {

  private inv: Array<Item>;

  constructor() {
    // Fill in items
    this.inv = [
      {
        id: 'purse',
        name: 'Кошелек',
        taken: false
      }
    ];
  }

  take(itemId: string): void {
    for (let i = 0; i < this.inv.length; i++) {
      if (this.inv[i].id === itemId) {
        this.inv[i].taken = true;
      }
    }
  }

  dump(): void {
    console.log(this.inv);
  }

  isTaken(itemId: string): boolean {
    for (let i = 0; i < this.inv.length; i++) {
      if (this.inv[i].id === itemId) {
        return this.inv[i].taken;
      }
    }

    console.log(`Unknown item id: ${itemId}`);

    return false;
  }

  getState(): Array<Item> {
    return this.inv;
  }
}
