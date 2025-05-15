import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment.prod'; // O usa `environment.ts` si estás en desarrollo

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);

  constructor() {}

  async guardarUbicacion(nombre: string, url: string): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.db, 'ubicaciones'), {
        nombre,
        url
      });
      console.log('Ubicación guardada con ID:', docRef.id);
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
    }
  }
}
