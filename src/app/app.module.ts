import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { IntroPage } from "./pages/intro/intro.page";
import { MenuPage } from "./pages/menu/menu.page";
import { StartPage } from './pages/start/start.page';
import { NearLitmoPage } from './pages/near-litmo/near-litmo.page';
import { RucksackPage } from './pages/rucksack/rucksack.page';

import { InventoryService } from './services/inventory.service';

@NgModule({
  declarations: [
    AppComponent,
    IntroPage,
    MenuPage,
    StartPage,
    NearLitmoPage,
    RucksackPage
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    InventoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
