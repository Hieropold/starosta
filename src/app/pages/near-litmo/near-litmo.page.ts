import { Component } from '@angular/core';
import { Scene } from '../scene';
import { InventoryService } from '../../services/inventory.service';

@Component({
  templateUrl: './near-litmo.page.html'
})
export class NearLitmoPage extends Scene {

  constructor(
    private inv: InventoryService
  ) {
    super();
  }
}