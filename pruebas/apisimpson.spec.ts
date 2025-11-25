import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Declarar __dirname para TypeScript (disponible en CommonJS)
declare const __dirname: string;

// Función helper para guardar datos en el fixture
function saveCharacterData(characterData: any) {
  // Usar path.resolve para construir la ruta de forma relativa al archivo actual
  // En Playwright, __dirname está disponible en CommonJS
  const fixturesDir = path.join(__dirname, 'fixtures');
  const fixturePath = path.join(fixturesDir, 'data-simpson.json');
  
  // Leer el archivo existente si existe, o inicializar como array vacío
  let data: any[] = [];
  if (fs.existsSync(fixturePath)) {
    try {
      const fileContent = fs.readFileSync(fixturePath, 'utf-8');
      const trimmedContent = fileContent.trim();
      if (trimmedContent) {
        data = JSON.parse(trimmedContent);
        // Asegurar que data sea un array
        if (!Array.isArray(data)) {
          data = [];
        }
      }
    } catch (error) {
      // Si el JSON está corrupto, inicializar como array vacío
      console.log('El archivo JSON está corrupto, se inicializará como array vacío');
      data = [];
    }
  }
  
  // Extraer solo los campos requeridos
  const characterInfo = {
    id: characterData.id,
    name: characterData.name,
    occupation: characterData.occupation,
    gender: characterData.gender,
    birthdate: characterData.birthdate,
    age: characterData.age
  };
  
  // Verificar si el id ya existe
  const existingIndex = data.findIndex((item: any) => item.id === characterInfo.id);
  
  if (existingIndex === -1) {
    // Si no existe, agregarlo
    data.push(characterInfo);
    console.log(`Nuevo personaje agregado: ${characterInfo.name} (ID: ${characterInfo.id})`);
  } else {
    // Si ya existe, mantener el existente
    console.log(`Personaje ya existe en el JSON: ${characterInfo.name} (ID: ${characterInfo.id}) - Se mantiene el existente`);
  }
  
  // Guardar el array actualizado
  fs.writeFileSync(fixturePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Datos guardados en: ${fixturePath}`);
}

test('Extraer datos de los simpson', async ({ request }) => {
  // Hacer la petición a la API
  const res = await request.get('https://thesimpsonsapi.com/api/characters/100');
  
  // Validar que la respuesta sea exitosa
  expect(res.status()).toBe(200);
  
  // Obtener el cuerpo de la respuesta
  const responseBody = await res.json();
  
 
  
  // Loggear las phrases en la consola
  console.log('Phrases:');
  console.log(JSON.stringify(responseBody.phrases, null, 2));
  
  // Guardar los datos del personaje
  saveCharacterData(responseBody);
});
