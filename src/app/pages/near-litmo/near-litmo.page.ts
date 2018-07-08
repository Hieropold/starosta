import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Howl } from 'howler';
import { Scene } from '../scene';

@Component({
  templateUrl: './near-litmo.page.html',
  styleUrls: ['./near-litmo.css']
})
export class NearLitmoPage extends Scene implements OnInit {

  @HostListener('document:contextmenu', ['$event'])

  public isNavroidAnimationRunning = false;

  private vomitSound: Howl;

  constructor(
    private router: Router
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

  onRightClick($event) {
    $event.preventDefault();
    this.router.navigateByUrl('rucksack/near-litmo');
  }
}
