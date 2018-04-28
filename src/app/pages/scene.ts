import { HostListener } from '@angular/core';

import { InventoryService } from '../services/inventory.service';

export class Scene {
  @HostListener('document:contextmenu', ['$event'])

  private inv: InventoryService;

  constructor() {
  }

  onRightClick($event) {
    $event.preventDefault();
    const i = <InventoryService>this.inv;
    // dbg code
    i.dump();
    i.receive({name: 'test1'});
  }
}
