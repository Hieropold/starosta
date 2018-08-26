import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Scene } from '../scene';

import { DialogsService } from '../../services/dialogs.service';
import { DossiersService } from '../../services/dossiers.service';

@Component({
  templateUrl: './future.page.html',
  styleUrls: ['./future.css']
})
export class FuturePage extends Scene {

  constructor(
    private router: Router,
    private dialogs: DialogsService,
    private dossiers: DossiersService
  ) {
    super();

    setTimeout(() => {
      this.dossiers.show('lukich');
    }, 1000);

    setTimeout(() => {
      this.dossiers.hide();
    }, 10000);
  }

  onTalkVasily() {
    this.dialogs.show('future', 'vasily');

    window.setTimeout(() => {
      this.router.navigateByUrl('teleport');
    }, 10000);
  }
}
