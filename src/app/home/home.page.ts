import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton
  ],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;
  nombre: string = '';

  constructor(private firebaseService: FirebaseService) {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      console.error('Geolocalización no está soportada en este navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('Ubicación obtenida: ', this.latitude, this.longitude);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  get url(): string {
    return `https://www.google.com/maps/place/${this.latitude},${this.longitude}`;
  }

  guardar() {
    if (!this.nombre || this.latitude === null || this.longitude === null) {
      console.error('Nombre o coordenadas no disponibles.');
      return;
    }

    this.firebaseService.guardarUbicacion(this.nombre, this.url);
  }
}
