import { Routes, RouterModule } from '@angular/router';

import { IntroPage } from './pages/intro/intro.page';
import { MenuPage } from './pages/menu/menu.page';
import { StartPage } from './pages/start/start.page';

const appRoutes: Routes = [
  {path: '', component: IntroPage},
  {path: 'menu', component: MenuPage},
  {path: 'start', component: StartPage},
  //{path: 'my-cases', component: MyCasesPage, canActivate: [AuthGuard], data: {label: 'My Cases'}},

  // Otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
