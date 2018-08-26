import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './teleport.page.html'
})
export class TeleportPage {
  constructor(
    private router: Router
  ) {
  }

  onTeleportVideoEnd(): void {
    this.router.navigateByUrl('near-litmo');
  }
}
