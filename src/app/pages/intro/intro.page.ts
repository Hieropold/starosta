import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './intro.page.html'
})
export class IntroPage {
  constructor(
    private router: Router
  ) {
  }

  onSkipIntro(): void {
    this.router.navigateByUrl('menu');
  }
}
