import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { UserPhoto } from './photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // Arreglo en memoria que almacena la lista de fotografías del usuario
  public photos: UserPhoto[] = [];
  
  // Clave utilizada para guardar y recuperar el arreglo de fotos en el almacenamiento local
  private PHOTO_STORAGE: string = 'photos';

  constructor() { }

  /**
   * Captura una fotografía utilizando la cámara del dispositivo o emulador,
   * la guarda en el sistema de archivos local y actualiza la galería.
   */
  public async addNewToGallery(): Promise<void> {
    // Toma la foto utilizando el plugin de Capacitor Camera
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // Retorna la ruta URI del archivo original
      source: CameraSource.Camera,     // Utiliza la cámara del dispositivo directamente
      quality: 100                     // Define la calidad máxima de captura (100%)
    });

    // Guarda la imagen en el sistema de archivos del dispositivo y obtiene el objeto formateado
    const savedImageFile = await this.savePicture(capturedPhoto);

    // Agrega la nueva foto al inicio del arreglo para que aparezca primero en la galería
    this.photos.unshift(savedImageFile);

    // Persiste el arreglo actualizado de fotos en Preferences (almacenamiento local)
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  }

  /**
   * Guarda la foto en el almacenamiento de archivos del dispositivo mediante Filesystem.
   * @param photo Objeto de tipo Photo capturado por el plugin Camera.
   * @returns Promesa con el objeto UserPhoto que contiene las rutas de acceso.
   */
  private async savePicture(photo: Photo): Promise<UserPhoto> {
    // Convierte la foto a formato base64 para poder leerla y escribirla con Filesystem
    const base64Data = await this.readAsBase64(photo);

    // Define un nombre de archivo único utilizando la marca de tiempo actual
    const fileName = `${new Date().getTime()}.jpeg`;

    // Escribe el archivo en el directorio Data del dispositivo
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    // Retorna la estructura de la foto lista para ser consumida en la vista web
    return {
      filepath: fileName,
      webviewPath: photo.webPath!
    };
  }

  /**
   * Convierte la foto dada por Capacitor Camera a una cadena codificada en Base64.
   * @param photo Objeto Photo capturado.
   * @returns Cadena Base64 de la imagen.
   */
  private async readAsBase64(photo: Photo): Promise<string> {
    // Lee el archivo desde la ruta URI del navegador
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    // Convierte el Blob a una representación de cadena en formato Base64
    return await this.convertBlobToBase64(blob) as string;
  }

  /**
   * Promisifica FileReader para transformar un objeto Blob en una cadena de datos Base64.
   */
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  /**
   * Carga las fotografías guardadas desde Preferences al iniciar la aplicación.
   */
  public async loadSaved(): Promise<void> {
    // Recupera la lista de fotos guardada bajo la clave PHOTO_STORAGE
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

    // Recorre cada foto para asegurarse de que las rutas se lean correctamente
    for (let photo of this.photos) {
      // Lee el archivo guardado en el sistema de archivos
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
      });

      // En el navegador web se asigna el formato Base64 a webviewPath para renderizar la imagen
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }
}