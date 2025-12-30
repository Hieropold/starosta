import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Howl } from 'howler';
import { Scene } from '../scene';
import { DialogsService } from '../../services/dialogs.service';
import {InventoryService} from "../../services/inventory.service";

@Component({
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.css']
})
export class HallPage extends Scene implements OnInit {

  @HostListener('document:contextmenu', ['$event'])

  constructor(
    private router: Router,
    private dialogs: DialogsService,
    private inv: InventoryService
  ) {
    super();
  }

  ngOnInit() {
  }

  onRightClick($event) {
    $event.preventDefault();
    this.router.navigateByUrl('rucksack/hall');
  }
}
