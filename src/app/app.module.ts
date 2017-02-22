import {RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {AUTH_PROVIDERS, provideAuth} from 'angular2-jwt';
import {HttpModule, BaseRequestOptions} from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AuthGuard} from "./common/auth.guards";
import {HomeComponent} from './home/home.component';
import {UserGroupsComponent} from './user_groups/user.groups.component';
import {ProfileComponent} from './profile/profile.component';
import {GroupsListComponent} from './group/group_list/group.list.component';
import {GroupsDetailsComponent} from "./group/group_detail/group.details.component";
import {ContactComponent} from "./contact/contact.component";
import {UserTasksComponent} from './user_tasks/user.tasks.component';
import {RegisterComponent} from './register/register.component';

import {AuthenticationService} from "./services/authentication.service";
import {UserGroupsService} from "./services/user.groups.service";
import {UserTasksService} from "./services/user.tasks.service";
import {RegisterService} from "./services/registration.service";
import {GroupsService} from "./services/group.service";
import {EqualValidator} from "./common/equal.validate";

let options: ToastOptions = new ToastOptions({
  animate: 'fade',
  positionClass: 'toast-bottom-center',
  toastLife: 4000
});

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ToastModule.forRoot(options),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'registration',
        component: RegisterComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'user_groups',
        component: UserGroupsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'groups',
        component: GroupsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'group_detail/:id',
        component: GroupsDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user_tasks',
        component: UserTasksComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    UserGroupsComponent,
    ProfileComponent,
    GroupsListComponent,
    EqualValidator,
    UserTasksComponent,
    RegisterComponent,
    GroupsDetailsComponent
  ],
  providers: [
    BaseRequestOptions,AuthGuard, AuthenticationService, UserGroupsService, UserTasksService, RegisterService, GroupsService, AUTH_PROVIDERS,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'Bearer',
      tokenName: 'id_token',
      tokenGetter: (() => localStorage.getItem('id_token')),
      globalHeaders: [{'Content-Type':'application/json'}],
      noTokenScheme: true
    })
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
