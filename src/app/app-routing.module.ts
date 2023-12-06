import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginregisterfunctionalityComponent } from './loginregisterfunctionality/loginregisterfunctionality.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'top-bar', component: TopBarComponent },
  { path: 'search', component: SearchComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginregisterfunctionalityComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }