import { Component } from '@angular/core';
import { Scene } from '../scene';
import { DialogsService } from '../../services/dialogs.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './future.page.html',
  styleUrls: ['./future.css']
})
export class FuturePage extends Scene {

  constructor(
    private router: Router,
    private dialogs: DialogsService
  ) {
    super();
  }

  onTalkVasily() {
    this.dialogs.show('future', 'vasily');

    window.setTimeout(() => {
      this.router.navigateByUrl('near-litmo');
    }, 10000);
  }
}
