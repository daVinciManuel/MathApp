//GENERADOR DE JUEGO

//---------------------------------------------------------------------------
//                         FUNCIONES AUXILIARES 
//--------------------------------------------------------------------------- 
//Genera un número entero aleatorio usando un rango establecido
const numAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Genera un número decimal aleatorio y se redondea a dos decimales.
const numDecimalAleatorio = (min, max, decimales = 2) => {
    let num = Math.random() * (max - min) + min; 
    const factor = Math.pow(10, decimales);
    return Math.round(num * factor) / factor;
};

//Función para generar opciones de respuesta
const opcionesGeneradas = (respuestaCorrecta) => {
    const opciones = new Set();
    opciones.add(respuestaCorrecta);

    //Genera 3 opciones alternativas
    while (opciones.size < 4) {
        let diferenciaAleatoria;
        
        //Determinar si la respuesta es un entero o decimal.
        if (Number.isInteger(respuestaCorrecta)) {
            diferenciaAleatoria = numAleatorio(-5, 5); //Entero - Fácil e intermedio
        } else {
            diferenciaAleatoria = numDecimalAleatorio(-3, 3); //Decimal - Difícil
        }
        
        let respuestaIncorrecta = respuestaCorrecta + diferenciaAleatoria;

        if (!Number.isInteger(respuestaCorrecta)) {
            respuestaIncorrecta = parseFloat(respuestaIncorrecta.toFixed(2)); //Dos decimales
        }
        
        if (respuestaIncorrecta !== respuestaCorrecta) {
            opciones.add(respuestaIncorrecta);
        }
    }

    //Convierte el Set a Array y lo desordena
    const opcionesArray = Array.from(opciones);
    
    for (let i = opcionesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesArray[i], opcionesArray[j]] = [opcionesArray[j], opcionesArray[i]];
    }

    return opcionesArray;
};

//---------------------------------------------------------------------------
//               FUNCIONES DE LÍMITES POR OPERACIÓN Y NIVEL
//--------------------------------------------------------------------------- 
const limiteSumaResta = (nivel) => {
    switch (nivel) {
        case 'facil': //Enteros Positivos
            return { minNum: 1, maxNum: 10, numGenerado: numAleatorio };
        case 'intermedio': //Enteros Positivos y Negativos
            return { minNum: -20, maxNum: 20, numGenerado: numAleatorio };
        case 'dificil': //Decimales
            return { minNum: -10, maxNum: 10, numGenerado: numDecimalAleatorio };
        default:
            throw new Error(`Nivel de dificultad no válido: ${nivel}`);
    }
};

const limiteMultiplicacion = (nivel) => {
    switch (nivel) {
        case 'facil': //Enteros Positivos
            return { minNum: 1, maxNum: 10, numGenerado: numAleatorio }; 
        case 'intermedio': //Enteros Positivos y Negativos
            return { minNum: -10, maxNum: 10, numGenerado: numAleatorio }; 
        case 'dificil': //Decimales
            return { minNum: -5, maxNum: 5, numGenerado: numDecimalAleatorio }; 
        default:
            throw new Error(`Nivel de dificultad no válido: ${nivel}`);
    }
};

const limiteDivision = (nivel) => {
    switch (nivel) {
        case 'facil': //Enteros Positivos
            return { minFactor: 1, maxFactor: 10, numGenerado: numAleatorio }; 
        case 'intermedio': //Enteros Positivos y Negativos
            return { minFactor: -10, maxFactor: 10, numGenerado: numAleatorio };
        case 'dificil': //Decimales
            return { minFactor: -5, maxFactor: 5, numGenerado: numDecimalAleatorio }; 
        default:
            throw new Error(`Nivel de dificultad no válido: ${nivel}`);
    }
};


//---------------------------------------------------------------------------
//                   FUNCIONES GENERADORAS DE EJERCICIOS
//---------------------------------------------------------------------------
//Generador de suma
export const juegoSuma = (nivel) => {
    const numEjercicios = 11;
    const ejerciciosArray = [];
    
    const { minNum, maxNum, numGenerado } = limiteSumaResta(nivel);

    //Genera los ejercicios
    for (let i = 0; i < numEjercicios; i++) {
        const num1 = numGenerado(minNum, maxNum);
        const num2 = numGenerado(minNum, maxNum);
        
        let resultado = num1 + num2;

        if (nivel === 'dificil') {
             resultado = parseFloat(resultado.toFixed(2));
        }

        const ejercicio = {
            id: i + 1,
            num1: num1,
            num2: num2,
            operador: "suma",
            pregunta: `¿Cuánto es ${num1} + ${num2}?`,
            opciones: opcionesGeneradas(resultado),
            result: resultado,
        };
        
        ejerciciosArray.push(ejercicio);
    }

    return ejerciciosArray;
};

//Generador de resta
export const juegoResta = (nivel) => {
    const numEjercicios = 11;
    const ejerciciosArray = [];
    
    const { minNum, maxNum, numGenerado } = limiteSumaResta(nivel);

    //Genera los ejercicios
    for (let i = 0; i < numEjercicios; i++) {
        let num1 = numGenerado(minNum, maxNum);
        let num2 = numGenerado(minNum, maxNum); 
        
        //Si nivel fácil, solo resultado positivos
        if (nivel === 'facil' && num2 > num1) {
            [num1, num2] = [num2, num1]; 
        }

        let resultado = num1 - num2;

        if (nivel === 'dificil') {
             resultado = parseFloat(resultado.toFixed(2));
        }

        const ejercicio = {
            id: i + 1,
            num1: num1,
            num2: num2,
            operador: "resta",
            pregunta: `¿Cuánto es ${num1} - ${num2}?`,
            opciones: opcionesGeneradas(resultado),
            result: resultado,
        };
        
        ejerciciosArray.push(ejercicio);
    }

    return ejerciciosArray;
};

//Generador de multiplicación
export const juegoMultiplicacion = (nivel) => {
    const numEjercicios = 11;
    const ejerciciosArray = [];
    
    const { minNum, maxNum, numGenerado } = limiteMultiplicacion(nivel);

    //Genera los ejercicios
    for (let i = 0; i < numEjercicios; i++) {
        const num1 = numGenerado(minNum, maxNum);
        const num2 = numGenerado(minNum, maxNum);

        let resultado = num1 * num2;

        if (nivel === 'dificil') {
             resultado = parseFloat(resultado.toFixed(2));
        }

        const ejercicio = {
            id: i + 1,
            num1: num1,
            num2: num2,
            operador: "multiplicacion", 
            pregunta: `¿Cuánto es ${num1} x ${num2}?`,
            opciones: opcionesGeneradas(resultado),
            result: resultado,
        };
        
        ejerciciosArray.push(ejercicio);
    }

    return ejerciciosArray;
};

//Generador de división
export const juegoDivision = (nivel) => {
    const numEjercicios = 11;
    const ejerciciosArray = [];
    
    //Límites para el divisor y el cociente
    const { minFactor, maxFactor, numGenerado } = limiteDivision(nivel);

    for (let i = 0; i < numEjercicios; i++) {
        let divisor, cociente;

        //Generar Divisor y Cociente
        do {
            divisor = numGenerado(minFactor, maxFactor);
            cociente = numGenerado(minFactor, maxFactor);
        } while (divisor === 0); //Evitar división por cero
        
        let dividendo = divisor * cociente;
        
        if (nivel === 'dificil') {
             dividendo = parseFloat(dividendo.toFixed(2));
             //Recalcula el cociente para asegurar la precisión del resultado final
             cociente = parseFloat((dividendo / divisor).toFixed(2)); 
        }

        const ejercicio = {
            id: i + 1,
            num1: dividendo,
            num2: divisor,
            operador: "division", 
            pregunta: `¿Cuánto es ${dividendo} / ${divisor}?`,
            opciones: opcionesGeneradas(cociente),
            result: cociente,
        };
        
        ejerciciosArray.push(ejercicio);
    }


    return ejerciciosArray;
};