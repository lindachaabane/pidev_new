import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {ManageDepartementComponent} from './manage-departement/manage-departement.component';
import {AffectUserToDepComponent} from './affect-user-to-dep/affect-user-to-dep.component';
import {UserByDepComponent} from './user-by-dep/user-by-dep.component';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  {path: 'updateuser/:id', component: UpdateUserComponent},
  {path: 'user_managment', component: ManageUsersComponent},
  {path: 'departments-management', component: ManageDepartementComponent},
  {path: 'affectusertodep', component: AffectUserToDepComponent},
  {path: 'userbydep/:id', component: UserByDepComponent},
  {path: 'admindashboard', component: DashboardAdminComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
