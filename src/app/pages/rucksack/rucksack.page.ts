import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {InventoryService} from "../../services/inventory.service";
import {Item} from "../../models/item.model";

@Component({
  templateUrl: './rucksack.page.html',
  styleUrls: ['./rucksack.css']
})
export class RucksackPage {

  private returnBack: string;
  private sub: any;

  private items: Array<Item>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inv: InventoryService
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.returnBack = params['return'];
    });

    this.items = this.inv.getState();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBackClick() {
    this.router.navigateByUrl(this.returnBack);
  }
}
