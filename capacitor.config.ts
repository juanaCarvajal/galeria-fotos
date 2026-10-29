/**
 * capacitor.config.ts
 * ---------------------------------------------------------------------------
 * Configuración de Capacitor, el puente entre el código web (Angular/Ionic)
 * y las funciones nativas del dispositivo (cámara, sistema de archivos,
 * almacenamiento clave-valor).
 *
 * Este archivo lo usan los comandos:
 *   ionic build          -> compila Angular y genera la carpeta "www"
 *   npx cap add android  -> crea el proyecto nativo de Android (Persona 3)
 *   npx cap sync         -> copia "www" y los plugins al proyecto nativo
 * ---------------------------------------------------------------------------
 */

// Tipo que valida que la configuración tenga las propiedades correctas.
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Identificador único de la app (formato dominio invertido).
  // Será el "package name" en Android; no debe cambiarse después de agregar Android.
  appId: 'com.ucompensar.galeriafotos',

  // Nombre visible de la app en el celular/emulador.
  appName: 'Galería de Fotos',

  // Carpeta donde Angular deja la app compilada (resultado de "ionic build").
  // Capacitor copia este contenido dentro del proyecto Android.
  webDir: 'www',

  // Plugins usados en el proyecto (instalados con npm, ver README):
  //  - @capacitor/camera      -> tomar la foto con la cámara del dispositivo/emulador.
  //  - @capacitor/filesystem  -> guardar la imagen como archivo en el dispositivo.
  //  - @capacitor/preferences -> guardar la lista de fotos (almacenamiento local).
  // Estos plugins no requieren opciones adicionales aquí; Capacitor los detecta
  // automáticamente desde package.json al ejecutar "npx cap sync".
};

export default config;
