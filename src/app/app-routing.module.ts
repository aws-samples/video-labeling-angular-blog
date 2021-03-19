import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TestsComponent } from './components/tests/tests.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { VideosComponent } from './components/videos/videos.component';

import { AuthGuard } from './guards/auth.guard';

// ROUTE TABLE for the components which will be rendered in <router-outlet></router-outlet>
const routes: Routes = [ // the order of the routes MATTER! (top->down)
  { path: 'home', component: HomeComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] }, // whenever AuthGuard resolves to true...
  { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] }, // the user can access these two...
  
  { path: '**', redirectTo: '/home' } // else/erros (wildcard) - "route safety"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }