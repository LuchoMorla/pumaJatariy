let resultado = document.getElementById('numerologiaA');
let resultado2 = document.getElementById('numerologiaB');
let tipoDeVinculo = document.getElementById('tipoDeVinculo');
async function calcularNumerologia() {
    //agregamos los datos recogidos del formulario
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let a5 = document.getElementById('a5');
    let a6 = document.getElementById('a6');
    let a7 = document.getElementById('a7');
    let a8 = document.getElementById('a8');

    let b1 = document.getElementById('b1');
    let b2 = document.getElementById('b2');
    let b3 = document.getElementById('b3');
    let b4 = document.getElementById('b4');
    let b5 = document.getElementById('b5');
    let b6 = document.getElementById('b6');
    let b7 = document.getElementById('b7');
    let b8 = document.getElementById('b8');

    let numA1 =Number( a1.value)
    let numA2 =Number( a2.value);
    let numA3 =Number( a3.value);
    let numA4 =Number( a4.value);
    let numA5 =Number( a5.value);
    let numA6 =Number( a6.value);
    let numA7 =Number( a7.value);
    let numa8 =Number( a8.value);
    
    let numB1 =Number( b1.value);
    let numB2 =Number( b2.value);
    let numB3 = Number(b3.value);
    let numB4 =Number( b4.value);
    let numB5 =Number( b5.value);
    let numB6 =Number( b6.value);
    let numB7 =Number( b7.value);
    let numB8 =Number( b8.value);

    //calculamos el numero de la numerologia
    let personaA = numA1 + numA2 + numA3 + numA4 + numA5 + numA6 + numA7 + numa8;
    let personaB = numB1 + numB2 + numB3 + numB4 + numB5 + numB6 + numB7 + numB8;

    //Pasamos a digerir los resultados de la suma de los numeros para dividirlo en los dos ultimos numeros
    let numerosPersonaA = await recivoSumaTransformoEnDosNumeros(personaA);
    let numerosPersonaB = await recivoSumaTransformoEnDosNumeros(personaB);

    // hagarramos los numeros y lo sumamos para encontrar la numerología, en caso de ser mayor a 9 se los vuelve a digerir
    let numerologiaAIs = numerosPersonaA[0] + numerosPersonaA[1];
    let numerologiaBIs = numerosPersonaB[0] + numerosPersonaB[1];
    
    // validamos que sea el numero correcto
    let validarNumerologiaA = await validarNumerologiaCompletada(numerologiaAIs);
    let validarNumerologiaB = await validarNumerologiaCompletada(numerologiaBIs);

    //Usare el repeatIfFalse para que si el valor es falso repita la ejecucion de un middleware hasta que sea verdadero
    let repeatNA = await repeatIfFalse(numerologiaAIs, validarNumerologiaA);
    let repeatNB = await repeatIfFalse(numerologiaBIs, validarNumerologiaB);

    // De forma dinamica imprimiremos los mensajes si nos da true y si nos da falso redigereremos nuestro numero de nuevo
    validarNumerologiaA = await validarNumerologiaCompletada(repeatNA);
    validarNumerologiaB = await validarNumerologiaCompletada(repeatNB);    

    // Validamos si esta completada la numerologia imprimimos el resultado
    if(validarNumerologiaA == true) {
        let printCaracteristicas = repeatNA - 1; 
        resultado.innerHTML = "Primera Persona: Tu numero personal es: <strong style='color: black;'>" + repeatNA + "</strong> => " + caracteristicasNumeroPoder[printCaracteristicas];
    }
    if(validarNumerologiaB == true) {
        let printCaracteristicas = repeatNB - 1; 
        resultado2.innerHTML = "Segunda Persona: Tu numero personal es: <strong style='color: black;'>" + repeatNB + "</strong> => " + caracteristicasNumeroPoder[printCaracteristicas];
}

    // Mandamos a calcular la numerologia de la pareja
    let numerologia1 = repeatNA;
    let numerologia2 = repeatNB;
    
    vinculoParejasCalcNumerologia(numerologia1, numerologia2);
}

// Crearemos una funcion que digiera  el resultado de la suma y devuelva sus nuevos sumandos para completar el algoritmo

function recivoSumaTransformoEnDosNumeros(suma) {
    let numeroBase = suma;
    let index = 1;
    let numeroGomuGomu = index * 10;

    while (numeroGomuGomu <= numeroBase) {
        index++;
        numeroGomuGomu = index * 10;
    }
    if (numeroGomuGomu > numeroBase) {
        let restador = numeroGomuGomu - 10;
        let segundoNumero = numeroBase - restador;
        let primeroNumero = restador / 10;

        return [primeroNumero, segundoNumero];
    }
}

function validarNumerologiaCompletada(numero) {
    if (numero > 9) {
        return false;
    } else {
        return true;
    }
}

// FUncion para calcular el vinculo de una apreja por numerologia
 // calculamos numerologia de la pareja
async function vinculoParejasCalcNumerologia(parejaA, parejaB) {
    let vinculo = parejaA + parejaB;
    let validarVinculo = await validarNumerologiaCompletada(vinculo);
    if(validarVinculo == true) {
        let mensaje = vinculo - 1; 
        tipoDeVinculo.innerHTML = "<p style='magin: 6% 3% 3% 3%'>Tu tipo de relacion es: </p><br><strong style='color: white;'>" + validarVinculo + " => " + tiposDeRelacion[mensaje] + "</strong>";
    }
    if (validarVinculo == false) {
        let knowVinculo = await repeatIfFalse(vinculo, validarVinculo);
        let revalidarVinculo = await validarNumerologiaCompletada(knowVinculo);
        if(revalidarVinculo == true) {
            let mensaje = knowVinculo - 1; 
            tipoDeVinculo.innerHTML = "<p style='margin: 6% 3% 3% 3%'>Tu tipo de relacion es: </p><br><strong style='color: white;'>" + knowVinculo + " => " + tiposDeRelacion[mensaje] + "</strong>";
        } else {
            console.warn(err, "Something happened");
        }
    }
}



// funcion que tenga un array de respuestas y segun el numero que salga te imprima ese mensaje
const tiposDeRelacion = [
    "<strong style='color: black;'>Relacion de Amor alegre:</strong> cada uno piensa mucho en su propio bienestar, por ello es posible que este romance tenga buenos momentos, pero también se verán en la cornisa cada vez que el egoísmo haga su aparición.",
    "<strong style='color: black;'>Relacion de Casamiento:</strong> el tiempo afianza el amor, las emociones siguen tan profundas como el primer día.",
    "<strong style='color: black;'>Relacion Hogareña:</strong> logran que el hogar sea un paraíso. La armonía es la principal atracción del hogar.",
    "<strong style='color: black;'>Relacion Programados:</strong> el trabajo los supera y no encuentran un momento para charlar tranquilos. Necesitan días de descanso y distracción en donde puedan recuperar el amor mutuo",
    "<strong style='color: black;'>Relacion Alegres:</strong> todo lo que la pareja inicie tendrá la marca del éxito y la buena estrella por que confían el uno en el otro.",
    "<strong style='color: black;'>Relacion Apasionados:</strong> amantes fogosos que saben cómo darle placer al otro. El sentimiento es intenso aunque puede resultar breve.",
    "<strong style='color: black;'>Relacion de Almas gemelas:</strong> más alla de la pasión existe un sentimiento puro y fundamental que sobrevive a cualquier cosa negativa que le presente la vida. La compatibilidad espiritual es mayor que la fisica.",
    "<strong style='color: black;'>Relacion de Prosperidad:</strong> la pareja se encamina bien y con proyectos. Si pelean por lo que sienten nadie los detendrá.",
    "<strong style='color: black;'>Relación Kármica:</strong> el vínculo es irrompible y necesario, pero estará signado por los desencuentros, la pasión de la reconciliación, el amor y los celos.",
]

const caracteristicasNumeroPoder = [
    'UNO: Es una persona muy original y creativa, otro de los aspectos que más la destaca es su gran ambición y fortaleza. El poder personal lo consigue trabajando y desarrollando estas características. <a href="./assets/posts/uno.html" style=" color: white;""">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
    'DOS: Es una personalidad muy competitiva, el don que posee es que sabe muy bien con que personas le conviene estar y con cuáles no. <a href="./assets/posts/dos.html" style=" color: white;"">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
    'TRES: Este número muestra a un ser muy creativo y con gran facilidad de expresión. Su fuente de poder es su capacidad de entretener y divertir a los demás. <a href="./assets/posts/tres.html" style=" color: white;"">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
    'CUATRO: Es alguien que está en la eterna búsqueda de equilibrio y estabilidad en la vida. Es una persona con gran vitalidad y tiene mucha capacidad de lograr sus objetivos y persuadir a los demás. <a href="./assets/posts/cuatro.html" style=" color: white;"">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
    'CINCO: es una persona con gran necesidad de comunicarse con los demás y demostrar lo que siente, tiene mucha facilidad para ser popular. <a href="./assets/posts/cinco.html"  style=" color: white;"">Aprende más sobre su numero de poder personal" y su personalidad haciendo click aquí</a>',
    'SEIS: es un ser muy espiritual y posee la capacidad para enseñar y brindar ayuda a los demás. También es alguien muy responsable y es allí donde se encuentra su fuerte para triunfar en la vida. <a href="./assets/posts/seis.html" style=" color: white;"">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
    'SIETE: nos encontramos frente a un individuo muy solitario, no soporta sentirse dependiente de alguien, es muy inteligente pero necesita estar solo para desenvolverse mejor en la vida. <a href="./assets/posts/siete.html" style=" color: white;"">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
    'OCHO: personalidad con una gran practicidad para todo lo que sea administración y organización. Es amante del orden y está muy dotado para todo lo que sea dirección de nuevos proyectos. <a href="./assets/posts/ocho.html" style=" color: white;"">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
    'NUEVE: Su gran capacidad para convencer a los demás lo hace alguien admirado. Es una persona muy sensible y comprensiva. Su fuerte está en el saber escuchar. <a href="./assets/posts/nueve.html" style=" color: white;"">Aprende más sobre su numero de poder personal y su personalidad haciendo click aquí</a>',
]

// funcion que si el valor es falso repita la ejecucion de un middleware hasta que sea verdadero
async function repeatIfFalse(numero, validacion) {
   if(validacion == false) {
    let repeating = await recivoSumaTransformoEnDosNumeros(numero);
    let resumar = repeating[0] + repeating[1];
    let revalidar = await validarNumerologiaCompletada(resumar);

    if(revalidar == false) {
        repeatIfFalse(resumar);
    } else {
        return resumar;
    }
   } else {
    return numero;
   }
}

// creare un popUp para el visitante pueda ver sus respuestas
var buttonAbrirPopUp = document.getElementById('button_abrir-popUp'),
    overlay = document.getElementById('overlay'),
    popUp = document.getElementById('popUp'),
    buttonCerrarPopUp = document.getElementById('button_cerrar-popUp');

buttonAbrirPopUp.addEventListener('click', function () {
    overlay.classList.add('active');
    popUp.classList.add('active');
    buttonCerrarPopUp.classList.remove('active');
});

buttonCerrarPopUp.addEventListener('click', cerrarPopUp);

// que la tecla esc sea para cerrar el popUp

document.addEventListener("keydown", teclaEscPressed);
function teclaEscPressed(evento) {
    if (evento.keyCode == 27) {
        cerrarPopUp();
    }
}

//funncion conjunto cerrarPopUp
function cerrarPopUp() {
    buttonCerrarPopUp.classList.add('active');
    overlay.classList.remove('active');
    popUp.classList.remove('active');
} 

// Politica de cokies
/* window.addEventListener('load', function () {
window.cookieconsent.initialise({
    "palette": {
        "popup": {
        "background": "#000000"
        },
        "button": {
        "background": "#f1d600"
        }
    },
    "content": {
        "message": "Este sitio web utiliza cookies para mejorar su experiencia de navegación.",
        "dismiss": "Aceptar",
        "link": "Más información",
        "href": "https://www.cookiesandyou.com/"
    }
    })}
);
 */