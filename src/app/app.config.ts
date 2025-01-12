import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),                      // Routing
    provideHttpClient(withFetch()),                        // HTTP Client
    provideZoneChangeDetection({ eventCoalescing: true }), // Zone optimizations
    provideClientHydration(withEventReplay()),  // Hydration for SSR
    provideAnimationsAsync()                    // Asynchronous animations
  ]
};
