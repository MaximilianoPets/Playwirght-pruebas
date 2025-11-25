import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Descargar imagen de los simpsons', async ({ request }) => {
  const url = 'https://cdn.thesimpsonsapi.com/500/character/100.webp';

  // 1. Descargar imagen
  const response = await request.get(url);
  expect(response.ok()).toBeTruthy();

  const buffer = await response.body();

  // 2. Guardar en el proyecto usando rutas absolutas
  const downloadsDir = path.join(process.cwd(), 'downloads');
  const rutaArchivo = path.join(downloadsDir, 'personaje.webp');

  // Si no existe la carpeta downloads, la crea
  fs.mkdirSync(downloadsDir, { recursive: true });

  fs.writeFileSync(rutaArchivo, buffer);
  console.log('Imagen guardada en:', rutaArchivo);
});
