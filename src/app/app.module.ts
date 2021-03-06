import { Highlight } from './hightlight';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './authentication/signin/signin.component';
import { ButtonComponent } from './component/button/button.component';
import { SinglePropertyComponent } from './single-property/single-property.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminDashboardComponent,
    AdminPropertiesComponent,
    SigninComponent,
    Highlight,
    ButtonComponent,
    SinglePropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
