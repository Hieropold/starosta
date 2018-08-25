import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { IntroPage } from './pages/intro/intro.page';
import { MenuPage } from './pages/menu/menu.page';
import { FuturePage } from './pages/future/future.page';
import { StartPage } from './pages/start/start.page';
import { NearLitmoPage } from './pages/near-litmo/near-litmo.page';
import { RucksackPage } from './pages/rucksack/rucksack.page';

import { InventoryService } from './services/inventory.service';
import { DialogsService } from './services/dialogs.service';

@NgModule({
  declarations: [
    AppComponent,
    IntroPage,
    MenuPage,
    FuturePage,
    StartPage,
    NearLitmoPage,
    RucksackPage
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    InventoryService,
    DialogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
