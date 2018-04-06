import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './start.page.html'
})
export class StartPage {

  constructor(
    private router: Router
  ) {
  }

  skipHistory(): void {
    this.router.navigateByUrl('near-litmo');
  }
}
