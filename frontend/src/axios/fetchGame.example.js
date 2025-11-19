import fetchGame from "./fetchGame.js";
// para ejecutar el ejemplo:
// npm run axios
//
// SOLO HAY 16 CASOS DE USO:
// [await ejemplo(1), await ejemplo(2), await ejemplo(3)...]
//
const data = await ejemplo(4);
console.log(data);
// Este ejemplo funciona con Localhost
// asegurate de tener en una terminal abierto el servidor backend.
// si no lo tienes abierto, ejecuta desde la carpeta raiz del proyecto:
// npm run dev
// y espera unos segundos a que se conecte a la base de datos.
// desde otra terminal en la carpeta raiz del proyecto o frontend/ ejecuta:
// npm run axios
//
// Si quieres ejecutar el ejemplo usando el servidor remoto:
// solo necesitas agregar el parametro: true
//
// ejemplo:
// console.log(await ejemplo(4, true));

async function ejemplo(number, remoto = false) {
  let res = "";
  if (!remoto) {
    switch (number) {
      case 1:
        res = await fetchGame(1, "suma");
        break;
      case 2:
        res = await fetchGame(2, "suma");
        break;
      case 3:
        res = await fetchGame(3, "suma");
        break;
      case 4:
        res = await fetchGame(1, "resta");
        break;
      case 5:
        res = await fetchGame(2, "resta");
        break;
      case 6:
        res = await fetchGame(3, "resta");
        break;
      case 7:
        res = await fetchGame(1, "multiplicacion");
        break;
      case 8:
        res = await fetchGame(2, "multiplicacion");
        break;
      case 9:
        res = await fetchGame(3, "multiplicacion");
        break;
      case 10:
        res = await fetchGame(1, "division");
        break;
      case 11:
        res = await fetchGame(2, "division");
        break;
      case 12:
        res = await fetchGame(3, "division");
        break;

      default:
        res = await fetchGame(1, "suma");
        break;
    }
  } else {
    switch (number) {
      case 1:
        res = await fetchGame(1, "suma", true);
        break;
      case 2:
        res = await fetchGame(2, "suma", true);
        break;
      case 3:
        res = await fetchGame(3, "suma", true);
        break;
      case 4:
        res = await fetchGame(1, "resta", true);
        break;
      case 5:
        res = await fetchGame(2, "resta", true);
        break;
      case 6:
        res = await fetchGame(3, "resta", true);
        break;
      case 7:
        res = await fetchGame(1, "multiplicacion", true);
        break;
      case 8:
        res = await fetchGame(2, "multiplicacion", true);
        break;
      case 9:
        res = await fetchGame(3, "multiplicacion", true);
        break;
      case 10:
        res = await fetchGame(1, "division", true);
        break;
      case 11:
        res = await fetchGame(2, "division", true);
        break;
      case 12:
        res = await fetchGame(3, "division", true);
        break;

      default:
        res = await fetchGame(1, "suma", true);
        break;
    }
  }
  return res;
}
