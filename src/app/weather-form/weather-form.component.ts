import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent {
  @Output() citySelected = new EventEmitter<{ lat: number, lon: number }>();

  lat: number | null = null;
  lon: number | null = null;
  errorMessage: string = '';

  onSubmit(): void {
    if (!this.lat || !this.lon) {
      this.errorMessage = 'Please enter both latitude and longitude values.';
    } else {
      this.errorMessage = '';
      this.citySelected.emit({ lat: this.lat, lon: this.lon });
    }
  }

  hasError(): boolean {
    return !!this.errorMessage;
  }
}
