import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { Scene } from '../scene';
import { InventoryService } from '../../services/inventory.service';

@Component({
  templateUrl: './near-litmo.page.html',
  styleUrls: ['./near-litmo.css']
})
export class NearLitmoPage extends Scene implements OnInit {

  public isNavroidAnimationRunning = false;

  private vomitSound: Howl;

  constructor(
    inv: InventoryService
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
}
