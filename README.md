# Galería de Fotos — Ionic + Angular + Capacitor

Actividad 4: Ionic/Angular almacenamiento de datos — Desarrollo de Aplicaciones Móviles Híbridas, UCompensar.

App que toma fotos con la cámara (navegador o emulador Android), las guarda en el dispositivo y las muestra en una galería que se conserva al cerrar la app.

## Equipo y responsabilidades

| Persona | Parte | Criterio de la rúbrica |
|---|---|---|
| Persona 1 | Configuración del proyecto, plugins, repositorio e informe final | 1 y 2 |
| Persona 2 | Servicio de fotos (`photo.service.ts`) e interfaz de la galería (tab2) | 3 |
| Persona 3 | Pruebas en navegador, migración a Android y pruebas en emulador | 4 |

## Requisitos

- Node.js (versión LTS) — verificar con `node -v` y `npm -v`
- Ionic CLI: `npm install -g @ionic/cli` — verificar con `ionic -v`
- Visual Studio Code con las extensiones: Ionic, Angular Language Service y Prettier
- Android Studio (solo Persona 3, para el emulador y el build)

## Cómo empezar (Personas 2 y 3)

```bash
git clone <URL-DEL-REPOSITORIO>
cd galeria-fotos
npm install        # instala todas las dependencias, incluidos los plugins
ionic serve        # abre la app en http://localhost:8100
```

## Cómo se creó el proyecto (Persona 1)

```bash
ionic start galeria-fotos tabs --type=angular --capacitor
cd galeria-fotos
npm install @capacitor/camera @capacitor/filesystem @capacitor/preferences
npm install @ionic/pwa-elements
```

- **Plantilla:** `tabs` (tres pestañas; la galería va en `tab2`).
- **Framework:** Angular con componentes standalone.
- **Versión de Ionic:** 9. Todos los componentes y funciones de Ionic se importan desde `'@ionic/angular'`. **No usar `'@ionic/angular/standalone'`**: esa ruta era de Ionic 8 y en Ionic 9 da el error TS2307.
- **Capacitor:** incluido con `--capacitor`; su configuración está en `capacitor.config.ts`.

## Plugins

| Plugin | Para qué se usa | Dónde se configura |
|---|---|---|
| `@capacitor/camera` | Tomar la foto | Se usa en `photo.service.ts` |
| `@capacitor/filesystem` | Guardar la imagen como archivo | Se usa en `photo.service.ts` |
| `@capacitor/preferences` | Guardar la lista de fotos (almacenamiento local) | Se usa en `photo.service.ts` |
| `@ionic/pwa-elements` | Permitir la cámara en el navegador | Registrado en `src/main.ts` |

## Estructura relevante

```
src/
  main.ts                    <- registra PWA Elements (ya hecho)
  app/
    services/photo.service.ts  <- Persona 2
    tab2/                      <- Persona 2: galería (*ngFor + botón FAB)
capacitor.config.ts          <- appId y nombre de la app (ya hecho)
android/                     <- lo crea Persona 3 con "npx cap add android"
docs/capturas/               <- pantallazos para el informe
```

## Forma de trabajo con Git

1. Cada persona trabaja en su propia rama:
   - Persona 2: `feature/servicio-fotos`
   - Persona 3: `feature/android`
2. Hacer commits pequeños con mensajes claros, por ejemplo: `feat: agrega método takePicture`.
3. Al terminar, abrir un Pull Request hacia `main` para que el equipo lo revise.

```bash
git checkout -b feature/servicio-fotos
git add .
git commit -m "feat: crea servicio de fotos"
git push -u origin feature/servicio-fotos
```

## Reglas para la nota máxima

- **Comentar todo el código propio.** La rúbrica exige "la totalidad de los comentarios" en cada criterio.
- **Tomar pantallazos de cada paso** y guardarlos en `docs/capturas/` con nombres numerados, por ejemplo `p2-01-servicio-generado.png`.
- **Escribir 2 o 3 frases por pantallazo** explicando qué se hizo, en tercera persona ("se creó…", "se configuró…"), y enviarlas a Persona 1 para el informe.

## Fechas internas

| Fecha | Entrega |
|---|---|
| 26 de octubre | Proyecto y plugins listos en el repositorio (Persona 1) |
| 31 de octubre | Servicio de fotos y galería funcionando (Persona 2) |
| 4 de noviembre | App en el emulador Android probada (Persona 3) |
| 6 de noviembre | Informe APA unido y revisado; se envía con un día de margen (cierre: 7 de noviembre) |

## Referencias

Ionic Framework. (s.f.). *Your first Ionic app: Angular*. https://ionicframework.com/docs/angular/your-first-app

Ionic Framework. (s.f.). *Introduction to Ionic*. https://ionicframework.com/docs

Capacitor. (s.f.). *Capacitor documentation*. https://capacitorjs.com/docs
