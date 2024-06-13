import { Routes } from '@angular/router';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: WeatherDashboardComponent },
  { path: 'cities', component: TableComponent },
];