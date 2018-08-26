import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './menu.page.html'
})
export class MenuPage {

  @ViewChild('syringe') syringe: any;

  constructor(
    private router: Router
  ) {
  }

  onMenuClick(): void {
    const el = this.syringe.nativeElement;
    el.style.animationPlayState = 'running';

    setTimeout(() => {
      console.log('Л\u0463тъ з\u0463 тр\u0463шъ i угаръ бегинъ!');
      this.router.navigateByUrl('start');
    }, 1000);
  }
}
