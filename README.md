[![Build Status](https://cis.ccd.conacyt.mx/api/badges/componentes/buscador-cvu/status.svg)](https://cis.ccd.conacyt.mx/componentes/buscador-cvu)

# Buscador de Personas Físicas por CVU
El componente de VueJS buscador de Personas Físicas por CVU

## Getting started
Incluye en tu proyecto un archivo `.npmrc` con el siguiente contenido para descargar esta biblioteca:

```properties
registry=https://artifacts.ccd.conacyt.mx/content/groups/npm/
```

O revisa este [link](https://conacyt-arquitectura.github.io/npm/configuracion-cliente-npm) para configurar tu cliente npm con el repostiorio privado.

Para instalar con npm usa `npm i @conacyt/hello-world`  
Para instalar con yarn usa `yarn add @conacyt/hello-world`

## Uso
```
<div id="app">
    <buscador-cvu></buscador-cvu>
</div>
```

## Desarrollo
Para desarrollo con Hot Replace Module usa `npm run serve` para servir la carpeta `example`.

### Building
Usa `npm run build` para generar los archivos de distribución en la carpeta `dist`.