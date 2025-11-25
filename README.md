# Playwright Tests con Allure Reports

Este proyecto contiene pruebas automatizadas de Playwright con reportes de Allure que se publican automáticamente en GitHub Pages.

## 🚀 Configuración inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Instalar Allure (globalmente)
```bash
npm install -g allure-commandline
```

### 3. Instalar navegadores de Playwright
```bash
npx playwright install
```

## 🧪 Ejecutar pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo visual
```bash
npm run test:headed
```

### Ejecutar pruebas con UI de Playwright
```bash
npm run test:ui
```

## 📊 Reportes

### Ver reporte HTML de Playwright
```bash
npm run report
```

### Generar y ver reporte de Allure localmente
```bash
# Generar reporte
npm run allure:generate

# Abrir reporte
npm run allure:open

# O servir reporte (se abre automáticamente en el navegador)
npm run allure:serve
```

## 🌐 GitHub Pages

Los reportes de Allure se publican automáticamente en GitHub Pages cuando se hace push a la rama `main` o `master`.

### Configurar GitHub Pages:
1. Ve a Settings → Pages en tu repositorio de GitHub
2. En "Source", selecciona "GitHub Actions"
3. Los reportes estarán disponibles en: `https://tu-usuario.github.io/tu-repositorio`

### URL del reporte:
El reporte se publicará en: `https://[tu-usuario].github.io/[nombre-del-repositorio]`

## 📁 Estructura del proyecto

```
├── .github/
│   └── workflows/
│       └── playwright.yml          # Workflow de CI/CD
├── pruebas/                        # Tests de Playwright
│   ├── apiPokemon.spec.ts
│   ├── apisimpson.spec.ts
│   ├── descargarImagenSimpson.spec.ts
│   ├── login.spec.ts
│   ├── fixtures/
│   └── pages/
├── allure-results/                 # Resultados de Allure (generado)
├── allure-report/                  # Reporte HTML de Allure (generado)
├── playwright-report/              # Reporte HTML de Playwright (generado)
└── test-results/                   # Resultados de pruebas (generado)
```

## 🔧 Características del workflow

El workflow de GitHub Actions (`playwright.yml`) incluye:

- ✅ Ejecución de pruebas en Ubuntu
- 📊 Generación de reportes de Allure
- 🚀 Publicación automática en GitHub Pages
- 📦 Almacenamiento de artefactos (30 días)
- 🔄 Soporte para branches main/master

## 📝 Notas importantes

- Los reportes se generan automáticamente en cada push
- El reporte de Allure es más detallado que el HTML estándar de Playwright
- Los artefactos se mantienen por 30 días en GitHub Actions
- El deploy a Pages solo ocurre en las ramas main/master
