import { test, expect } from '@playwright/test';

test('PokeAPI Ditto test', async ({ request }) => {
  const res = await request.get('https://pokeapi.co/api/v2/move-learn-method/4/');
  expect(res.status()).toBe(200);
  
  const responseBody = await res.json();
  console.log('Respuesta de la API:', JSON.stringify(responseBody, null, 2));
});

test('PokeAPI Pikachu test', async ({ request }) => {
  const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  expect(res.status()).toBe(200);
  
  const responseBody = await res.json();
  console.log('Respuesta de la API:', JSON.stringify(responseBody, null, 2));
});

test('Validar nombre del Pokémon Pikachu', async ({ request }) => {
  const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  expect(res.status()).toBe(200);
  
  const responseBody = await res.json();
  expect(responseBody.name).toBe('pikachu');
});

test('Validar tipo del Pokémon Pikachu', async ({ request }) => {
  const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  expect(res.status()).toBe(200);
  
  const responseBody = await res.json();
  expect(responseBody.types).toBeDefined();
  expect(responseBody.types.length).toBeGreaterThan(0);
  expect(responseBody.types[0].type.name).toBe('electric');
});

test('Validar stats del Pokémon Pikachu', async ({ request }) => {
  const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  expect(res.status()).toBe(200);
  
  const responseBody = await res.json();
  expect(responseBody.stats).toBeDefined();
  expect(responseBody.stats.length).toBe(6);
  
  const hpStat = responseBody.stats.find((stat: any) => stat.stat.name === 'hp');
  const attackStat = responseBody.stats.find((stat: any) => stat.stat.name === 'attack');
  const speedStat = responseBody.stats.find((stat: any) => stat.stat.name === 'speed');
  
  expect(hpStat.base_stat).toBe(35);
  expect(attackStat.base_stat).toBe(55);
  expect(speedStat.base_stat).toBe(90);
});

test('Validar peso del Pokémon Pikachu', async ({ request }) => {
  const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  expect(res.status()).toBe(200);
  
  const responseBody = await res.json();
  expect(responseBody.weight).toBe(60);
});

test('Validar sprites del Pokémon Pikachu', async ({ request }) => {
  const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  expect(res.status()).toBe(200);
  
  const responseBody = await res.json();
  expect(responseBody.sprites).toBeDefined();
  expect(responseBody.sprites.front_default).toBeDefined();
  expect(responseBody.sprites.front_default).toContain('25.png');
  expect(responseBody.sprites.back_default).toBeDefined();
  expect(responseBody.sprites.other).toBeDefined();
  expect(responseBody.sprites.other['official-artwork']).toBeDefined();
});