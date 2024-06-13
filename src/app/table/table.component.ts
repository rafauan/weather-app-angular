import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { WeatherService } from '../weather.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface CityWeather {
  city: string;
  temperature: number;
  windSpeed: number;
  weatherCode: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['city', 'temperature', 'windSpeed', 'weatherCode', 'latitude', 'longitude'];
  dataSource: CityWeather[] = [];
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getCityWeather();
  }

  getCityWeather(): void {
    this.weatherService.getCitiesWeather().pipe(
      catchError(error => {
        this.errorMessage = error;
        return of([]);
      })
    ).subscribe(data => {
      this.dataSource = data;
    });
  }
}