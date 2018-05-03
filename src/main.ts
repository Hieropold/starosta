import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('We were moving fast and broke things - sorry for this.');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
