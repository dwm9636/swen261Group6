// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MongoDBService } from './mongodb.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginregisterfunctionalityComponent } from './loginregisterfunctionality/loginregisterfunctionality.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';''



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TopBarComponent,
    FooterComponent,
    LoginregisterfunctionalityComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
  
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginregisterfunctionalityComponent }

      // Add more routes as needed
    ]),
    BrowserAnimationsModule
  ],
  providers: [MongoDBService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

