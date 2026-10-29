/**
 * main.ts
 * ---------------------------------------------------------------------------
 * Punto de entrada de la aplicación "Galería de Fotos" (Ionic + Angular + Capacitor).
 * Aquí se arranca (bootstrap) el componente raíz de Angular y se registran los
 * proveedores globales que necesita Ionic.
 *
 * Proyecto creado con:
 *   ionic start galeria-fotos tabs --type=angular --capacitor
 *   - Plantilla: "tabs" (tres pestañas; la galería irá en tab2).
 *   - Framework: Angular (componentes standalone).
 *   - Capacitor: puente nativo para acceder a la cámara y al almacenamiento.
 * ---------------------------------------------------------------------------
 */

// Función de Angular que arranca una aplicación basada en componentes standalone.
import { bootstrapApplication } from '@angular/platform-browser';

// Utilidades del enrutador de Angular: estrategia de reutilización de rutas,
// registro de rutas y precarga de módulos para que la navegación sea más rápida.
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';

// Proveedores de Ionic: IonicRouteStrategy mantiene en memoria las páginas
// de las pestañas al navegar; provideIonicAngular inicializa los componentes de Ionic.
// En Ionic 9, los componentes standalone se importan directamente desde '@ionic/angular'
// (la ruta '@ionic/angular/standalone' de Ionic 8 ya no existe).
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

// PLUGIN @ionic/pwa-elements:
// Capacitor usa la cámara nativa en Android/iOS, pero en el NAVEGADOR no existe
// una cámara nativa. Este paquete agrega componentes web (por ejemplo,
// <pwa-camera-modal>) que permiten tomar fotos con la webcam cuando se prueba
// la app con "ionic serve". Sin esta línea, el plugin Camera falla en el navegador.
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Rutas de la aplicación (tabs/tab1, tabs/tab2, tabs/tab3) y componente raíz.
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Arranque de la aplicación con los proveedores globales.
bootstrapApplication(AppComponent, {
  providers: [
    // Conserva el estado de cada pestaña al cambiar entre ellas.
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Inicializa Ionic (estilos de plataforma, animaciones, componentes).
    provideIonicAngular(),
    // Registra las rutas y precarga todas las páginas en segundo plano.
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

// Registra los elementos web de PWA Elements en la ventana del navegador.
// Se llama después del bootstrap para que estén disponibles cuando el
// servicio de fotos (Persona 2) invoque Camera.getPhoto().
defineCustomElements(window);
