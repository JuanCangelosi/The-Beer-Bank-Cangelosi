import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BeerDashboardComponent } from './beer-dashboard/beer-dashboard.component';
import { HeaderComponent } from './beer-dashboard/header/header.component';
import { BeerCardComponent } from './beer-card/beer-card.component';
import { BeerModalComponent } from './beer-modal/beer-modal.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    BeerDashboardComponent,
    HeaderComponent,
    BeerCardComponent,
    BeerModalComponent,
    FavouritePageComponent,
    AdvancedSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
  ],
  entryComponents: [
    BeerModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
