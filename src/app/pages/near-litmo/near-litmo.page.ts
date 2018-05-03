import {Component, OnInit, ViewChild} from '@angular/core';
import {Scene} from '../scene';
import {InventoryService} from '../../services/inventory.service';
import {setTimeout} from 'timers';

@Component({
  templateUrl: './near-litmo.page.html',
  styleUrls: ['./near-litmo.css']
})
export class NearLitmoPage extends Scene implements OnInit {

  @ViewChild('navroid') navroid: any;

  constructor(
    inv: InventoryService
  ) {
    super();

  }

  ngOnInit() {
    setTimeout(() => {
      this.startNavroidAnimation();
    }, 1000);
  }

  private startNavroidAnimation() {
    const el = this.navroid.nativeElement;
    el.style.animationPlayState = 'running';

    // restart Navroid animation each 6s
    setInterval(() => {
      console.log('restarting animation');
      el.style.animation = '';
      setTimeout(() => {
        el.style.animation = 'near-litmo-navroid-animation';
      }, 0);
    }, 3000);
  }
}
