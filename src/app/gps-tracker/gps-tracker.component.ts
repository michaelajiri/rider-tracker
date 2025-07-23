import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  sendLocationToBackend(): void {
      if (this.latitude !== null && this.longitude !== null && this.wmUniqueId) {
        const payload = {
          wmUniqueId: this.wmUniqueId,
          latitude: Number(this.latitude),
          longitude: Number(this.longitude)
        };
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.put('http://localhost:4040/api/v1/service/rider/current-location', payload, { headers })
        .subscribe({
          next: () => alert('Location sent successfully!'),
          error: (error) => {
            console.error('Failed to send location:', error);
            alert('Failed to send location.');
          }
        });
      } else {
        alert('Missing coordinates or user ID');
      }
    }
}