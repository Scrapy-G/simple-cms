import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { NavItemComponent } from './nav-list/nav-item/nav-item.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingItemComponent } from './listings/listing-item/listing-item.component';
import { CreateComponent } from './listings/create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageInputComponent } from './image-input/image-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavListComponent,
    NavItemComponent,
    HomeComponent,
    AboutComponent,
    ListingsComponent,
    ListingItemComponent,
    CreateComponent,
    ImageInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
