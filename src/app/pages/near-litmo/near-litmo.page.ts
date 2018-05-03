import { Component } from '@angular/core';
import { Scene } from '../scene';
import { InventoryService } from '../../services/inventory.service';

@Component({
  templateUrl: './near-litmo.page.html',
  styleUrls: ['./near-litmo.css']
})
export class NearLitmoPage extends Scene {

  constructor(
    inv: InventoryService
  ) {
    super();
  }
}
