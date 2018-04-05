;import { Component, ViewChild } from '@angular/core';
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
    el.style.animationFillMode = 'forwards';

    setTimeout(() => {
      this.router.navigateByUrl('start');
    }, 1000);
  }
}
