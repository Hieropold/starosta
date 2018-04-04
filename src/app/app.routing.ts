import { Routes, RouterModule } from '@angular/router';

import { IntroPage } from './pages/intro/intro.page';

const appRoutes: Routes = [
  {path: '', component: IntroPage},
  // {path: 'login', component: LoginPage, data: {label: 'Login'}},
  // {path: 'my-cases', component: MyCasesPage, canActivate: [AuthGuard], data: {label: 'My Cases'}},
  // {path: 'new-case', component: NewCasePage, canActivate: [AuthGuard], data: {label: 'New Case'}},
  // {path: 'change-password', component: ChangePasswordPage, canActivate: [AuthGuard], data: {label: 'Change Password'}},
  // {path: 'manage-users', component: ManageUsersPage, canActivate: [AuthGuard], data: {label: 'Manage Users'}},
  // {path: 'case/:caseId', component: CaseDetailsPage, canActivate: [AuthGuard], data: {label: 'Case'}, pathMatch: 'full'},
  // {path: 'case/:caseId/open-tab/:tabName', component: CaseDetailsPage, canActivate: [AuthGuard], data: {label: 'Case'}},
  // {path: 'case/:caseId/show-task/:taskId', component: CaseDetailsPage, canActivate: [AuthGuard], data: {label: 'Case'}},
  // {path: 'stage/:caseId/:stageId', component: StageDetailsPage, canActivate: [AuthGuard], data: {label: 'Stage'}},
  // {path: 'task/:taskType/:caseId/:stageId/:taskId/edit', component: TaskEditPage, canActivate: [AuthGuard], data: {label: 'Task'}},

  // Otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
