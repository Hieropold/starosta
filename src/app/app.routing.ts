import { Routes, RouterModule } from '@angular/router';

import { IntroPage } from './pages/intro/intro.page';
import { MenuPage } from './pages/menu/menu.page';
import { StartPage } from './pages/start/start.page';
import { NearLitmoPage } from './pages/near-litmo/near-litmo.page';
import { RucksackPage } from './pages/rucksack/rucksack.page';
import { FuturePage } from './pages/future/future.page';
import { TeleportPage } from './pages/teleport/teleport.page';

const appRoutes: Routes = [
  {path: '', component: IntroPage},
  {path: 'menu', component: MenuPage},
  {path: 'start', component: StartPage},
  {path: 'future', component: FuturePage},
  {path: 'teleport', component: TeleportPage},
  {path: 'near-litmo', component: NearLitmoPage},
  {path: 'rucksack/:return', component: RucksackPage},
  //{path: 'my-cases', component: MyCasesPage, canActivate: [AuthGuard], data: {label: 'My Cases'}},

  // Otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
