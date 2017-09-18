import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MessagesComponent } from './components/messages/messages.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { PostMessageComponent } from './components/post-message/post-message.component';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: ':user/messages', component: MessagesComponent},
  {path: 'invalid-route', component: PageNotFoundComponent},
  {path: ':user/message', component: PostMessageComponent},
  {path: '*', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }

