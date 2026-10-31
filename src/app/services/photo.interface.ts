// Define la estructura de cada fotografía capturada y almacenada por el usuario
export interface UserPhoto {
  filepath: string;   // Ruta donde se almacena el archivo en el dispositivo
  webviewPath: string; // Ruta utilizada para renderizar la imagen en la vista HTML
}