import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { IntroPage } from "./pages/intro/intro.page";
import { MenuPage } from "./pages/menu/menu.page";
import { StartPage } from './pages/start/start.page';


@NgModule({
  declarations: [
    AppComponent,
    IntroPage,
    MenuPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
