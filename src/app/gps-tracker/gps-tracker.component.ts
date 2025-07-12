import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gps-tracker',
  templateUrl: './gps-tracker.component.html',
  styleUrls: ['./gps-tracker.component.css']
})
export class GpsTrackerComponent {
  latitude: number | null = null;
  longitude: number | null = null;
  address: string = '';
  error: string = '';
  wmUniqueId: string = '';

  constructor(private http: HttpClient) {}

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.sendLocationToBackend();
        },
        (error) => {
          this.error = 'Location access denied or unavailable.';
        },
        { enableHighAccuracy: true }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  sendLocationToBackend() {
    if (this.latitude !== null && this.longitude !== null) {
      const payload = {
        wmUniqueId: this.wmUniqueId,
        latitude: this.latitude,
        longitude: this.longitude
      };
      this.http.post('http://localhost:4040/api/v1/location/update', payload)
        .subscribe({
          next: () => alert('Location sent successfully!'),
          error: () => alert('Failed to send location.')
        });
    }
  }
}