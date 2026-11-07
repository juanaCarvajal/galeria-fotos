import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonFab, 
  IonFabButton, 
  IonIcon, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonImg 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonFab, 
    IonFabButton, 
    IonIcon, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonImg
  ]
})
export class Tab2Page implements OnInit {

  // Inyectamos el servicio PhotoService en el constructor como público para acceder a photos en la vista HTML
  constructor(public photoService: PhotoService) {
    // Registramos el ícono de la cámara importado desde ionicons
    addIcons({ camera });
  }

  // Hook del ciclo de vida de Angular que se ejecuta al inicializar el componente
  async ngOnInit() {
    // Carga las fotografías guardadas previamente desde el almacenamiento local
    await this.photoService.loadSaved();
  }

  /**
   * Invoca el método para tomar una foto desde el servicio PhotoService.
   */
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}