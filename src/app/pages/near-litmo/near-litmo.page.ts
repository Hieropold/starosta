import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Howl } from 'howler';
import { Scene } from '../scene';
import { DialogsService } from '../../services/dialogs.service';
import {InventoryService} from "../../services/inventory.service";

@Component({
  templateUrl: './near-litmo.page.html',
  styleUrls: ['./near-litmo.css']
})
export class NearLitmoPage extends Scene implements OnInit {

  @HostListener('document:contextmenu', ['$event'])

  public isNavroidAnimationRunning = false;

  private vomitSound: Howl;

  private isPurseTaken: boolean = false;

  constructor(
    private router: Router,
    private dialogs: DialogsService,
    private inv: InventoryService
  ) {
    super();
  }

  ngOnInit() {
    this.vomitSound = new Howl({
      src: ['../../../assets/snd/vomit.webm', '../../../assets/snd/vomit.mp3']
    });

    setTimeout(() => {
      this.startNavroidAnimation();
    }, 1000);

    this.isPurseTaken = this.inv.isTaken('purse');
  }

  private startNavroidAnimation() {
    this.isNavroidAnimationRunning = true;
    this.vomitSound.play();
  }

  onNavroidAnimationEnd(e: Event) {
    this.isNavroidAnimationRunning = false;
    setTimeout(() => {
      this.startNavroidAnimation();
    }, 5000);
  }

  onRightClick($event) {
    $event.preventDefault();
    this.router.navigateByUrl('rucksack/near-litmo');
  }

  onTalkIlya() {
    this.dialogs.show('near-litmo', 'ilya');
  }

  onTalkNavroid() {
    this.dialogs.show('near-litmo', 'navroid');
  }

  onPickPurse() {
    this.inv.take('purse');
    this.isPurseTaken = true;
  }
}
