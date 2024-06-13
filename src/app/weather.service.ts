import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getCitiesWeather(): Observable<any[]> {
    const cities = [
      { name: 'London', lat: 51.5074, lon: -0.1278 },
      { name: 'Paris', lat: 48.8566, lon: 2.3522 },
      { name: 'New York', lat: 40.7128, lon: -74.0060 },
      { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
      { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
      { name: 'Rome', lat: 41.9028, lon: 12.4964 },
      { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
      { name: 'Moscow', lat: 55.7558, lon: 37.6176 },
      { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
      { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
      { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
      { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
      { name: 'Toronto', lat: 43.6511, lon: -79.3832 },
      { name: 'Mexico City', lat: 19.4326, lon: -99.1332 }
    ];

    return forkJoin(
      cities.map(city =>
        this.getWeather(city.lat, city.lon).pipe(
          map(weather => ({
            city: city.name,
            temperature: weather.current_weather.temperature,
            windSpeed: weather.current_weather.windspeed,
            weatherCode: weather.current_weather.weathercode,
            latitude: city.lat,
            longitude: city.lon
          }))
        )
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = 'Location not found!';
          break;
        default:
          errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
