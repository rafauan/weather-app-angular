import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WeatherService } from '../weather.service';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { catchError } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, WeatherFormComponent, MatIconModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate(500)
      ])
    ])
  ]
})
export class WeatherDashboardComponent implements OnInit {
  weatherData: any;
  errorMessage: string | null = null;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    // Przykładowa lokalizacja: Londyn
    this.getWeather(51.5074, -0.1278);
  }

  getWeather(lat: number, lon: number): void {
    this.weatherService.getWeather(lat, lon).pipe(
      catchError(error => {
        this.errorMessage = error;
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
        return of(null); // Zwróć Observable z wartością null, aby kontynuować strumień
      })
    ).subscribe(data => {
      if (data) {
        this.weatherData = data;
        this.errorMessage = null; // Wyzeruj komunikat o błędzie, jeśli żądanie zakończyło się sukcesem
      }
    });
  }

  handleCitySelected(location: { lat: number, lon: number }): void {
    this.getWeather(location.lat, location.lon);
  }
}
