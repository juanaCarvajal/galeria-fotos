import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  // Inyectamos el servicio PhotoService en el constructor como público para acceder a photos en la vista HTML.
  // ChangeDetectorRef (agregado en la migración a Android, Persona 3): Angular 22 funciona sin zone.js
  // ("zoneless"), por lo que NO detecta solo los cambios que ocurren después de un "await"
  // (cámara, Filesystem, Preferences). Con él le avisamos que vuelva a dibujar la galería.
  constructor(
    public photoService: PhotoService,
    private cdr: ChangeDetectorRef,
  ) {
    // Registramos el ícono de la cámara importado desde ionicons
    addIcons({ camera });
  }

  // Hook del ciclo de vida de Angular que se ejecuta al inicializar el componente
  async ngOnInit() {
    // Carga las fotografías guardadas previamente desde el almacenamiento local
    await this.photoService.loadSaved();
    // Refresca la vista para mostrar las fotos recuperadas al reabrir la app
    this.cdr.markForCheck();
  }

  /**
   * Invoca el método para tomar una foto desde el servicio PhotoService.
   */
  async addPhotoToGallery() {
    // Se espera (await) a que la foto se tome y se guarde antes de refrescar
    await this.photoService.addNewToGallery();
    // Refresca la vista para que la nueva foto aparezca en la galería
    this.cdr.markForCheck();
  }
}