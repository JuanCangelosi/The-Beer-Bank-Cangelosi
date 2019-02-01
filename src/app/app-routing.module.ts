import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { BeerDashboardComponent } from './beer-dashboard/beer-dashboard.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {component: FavouritePageComponent, path: 'favourite'},
  {component: BeerDashboardComponent, path: 'home'},
  {component: AdvancedSearchComponent, path: 'advanced-search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
