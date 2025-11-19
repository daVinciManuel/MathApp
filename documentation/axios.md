# Como usar: Axios

En este proyecto tenemos una carpeta llamada **axios** dentro de **frontend/src**.

Esa carpeta alberga las funciones personalizadas para hacer las llamadas al servidor usando la libreria **Axios**.

Puedes hacer tus propias funciones ahí. Se recomienda 1 función por archivo.

## Listado:

    1. FetchGame.js

---

## Cómo usar **fetchGame.js**

### Paso 0. - Servidor

Si vas a usar localhost debes dejar el servidor abierto en una terminal.

Desde la terminal en la carpeta Raíz del proyecto, ejecuta:

```
npm run dev
```

Si vas a usar el servidor remoto tendrás que especificarlo al usar la función.

```
fetchGame(nivel,operacion,servidor?)

// peticion al servidor local:
fetchGame(2,'suma')

// peticion al servidor del hosting:
fetchGame(2,'suma', true)
```

---

##### Ejemplo:

Hay un ejemplo de uso en **frontend/src/axios/fetchGame.example.js**  
Puedes ejecutarlo así

```
npm run axios
```

---

### Paso 1. - import

```
import fetchGame from '../axios/fetchGame.js';
```

Esto funcionará si lo estás llamando desde un archivo en la carpeta **frontend/pages** o **frontend/components**.

Asegurate de que al final del archivo ponga **'.js'** (algunos editores lo omiten y da error)

### Paso 2. - Llamar a la funcion

La funcion necesita 2 parametros:

1. **Nivel** (number): valores posibles: 1, 2, 3
2. **Operacion** (string): valores posibles: 'suma', 'resta', multiplicacion', 'division'

parametro opcional:

3. **localhost/remoto** (boolean): indica a que servidor hacemos las peticiones.  
   False (default) = localhost:5000  
   True = https://mathapp-ug8r.onrender.com (Hosting en Alemania)

Como la funcion _fetchGame()_ es **asincrona**.
Hace falta usar la keyword **await** cada vez que vayamos a llamar a la funcion.

```
const gameData = await fetchGame(1,'suma');
```

### Paso 3. - Manejar la respuesta

La respuesta es un array de objetos.
puedes llamar al numero 1 del ejemplo 1 así:

```
const gameData = await fetchGame(1,'resta');
num1 = gameData[0].num1;

```

ejemplo de respuesta:

```
[
  {
    id: 1,
    num1: 9,
    num2: 4,
    operador: 'resta',
    pregunta: '¿Cuánto es 9 - 4?',
    opciones: [ 2, 6, 5, 8 ],
    result: 5
  },
  {
    id: 2,
    num1: 10,
    num2: 3,
    operador: 'resta',
    pregunta: '¿Cuánto es 10 - 3?',
    opciones: [ 3, 8, 7, 12 ],
    result: 7
  },
  {
    id: 3,
    num1: 7,
    num2: 4,
    operador: 'resta',
    pregunta: '¿Cuánto es 7 - 4?',
    opciones: [ 3, 8, 2, -2 ],
    result: 3
  },
  {
    id: 4,
    num1: 8,
    num2: 4,
    operador: 'resta',
    pregunta: '¿Cuánto es 8 - 4?',
    opciones: [ 8, 4, 6, 5 ],
    result: 4
  },
  {
    id: 5,
    num1: 5,
    num2: 4,
    operador: 'resta',
    pregunta: '¿Cuánto es 5 - 4?',
    opciones: [ 6, 0, 1, -1 ],
    result: 1
  },
  {
    id: 6,
    num1: 7,
    num2: 5,
    operador: 'resta',
    pregunta: '¿Cuánto es 7 - 5?',
    opciones: [ -2, 2, -3, 5 ],
    result: 2
  },
  {
    id: 7,
    num1: 6,
    num2: 3,
    operador: 'resta',
    pregunta: '¿Cuánto es 6 - 3?',
    opciones: [ 6, 3, 1, 2 ],
    result: 3
  },
  {
    id: 8,
    num1: 3,
    num2: 3,
    operador: 'resta',
    pregunta: '¿Cuánto es 3 - 3?',
    opciones: [ -5, -2, 0, 2 ],
    result: 0
  },
  {
    id: 9,
    num1: 6,
    num2: 3,
    operador: 'resta',
    pregunta: '¿Cuánto es 6 - 3?',
    opciones: [ 0, 3, 6, 5 ],
    result: 3
  },
  {
    id: 10,
    num1: 7,
    num2: 4,
    operador: 'resta',
    pregunta: '¿Cuánto es 7 - 4?',
    opciones: [ -1, 1, 3, -2 ],
    result: 3
  },
  {
    id: 11,
    num1: 6,
    num2: 5,
    operador: 'resta',
    pregunta: '¿Cuánto es 6 - 5?',
    opciones: [ 3, 1, -4, -1 ],
    result: 1
  }
]
```
