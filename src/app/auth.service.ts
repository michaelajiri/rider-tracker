import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from './config/ApiConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = ApiConfig.BASE_URL;

  constructor(private http: HttpClient) {}

  sendLocationToBackend(wmUniqueId: string, latitude: number, longitude: number): void {
    if (wmUniqueId && latitude != null && longitude != null) {
      const payload = {
        wmUniqueId: wmUniqueId,
        latitude: latitude,
        longitude: longitude
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.put(`${this.baseUrl}/service/riders/current-location`, payload, { headers })
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
