import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private auth: AuthService) {}

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          // Call the service with the new coordinates
          this.auth.sendLocationToBackend(this.wmUniqueId, this.latitude, this.longitude);
        },
        (error) => {
          console.error(error);
          this.error = 'Location access denied or unavailable.';
        },
        { enableHighAccuracy: true }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }
}