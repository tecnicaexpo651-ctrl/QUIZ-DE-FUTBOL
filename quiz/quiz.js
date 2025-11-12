// Importaciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB8W71jchdjJQRs6UnDRrGOvAJ6Y-Umu8c",
    authDomain: "quiz-futbol-f0e95.firebaseapp.com",
    projectId: "quiz-futbol-f0e95",
    storageBucket: "quiz-futbol-f0e95.firebasestorage.app",
    messagingSenderId: "1592263101",
    appId: "1:1592263101:web:42540e3b8b1313baa9d2d4"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- BANCO DE PREGUNTAS ---
const preguntasFacil = [
    { pregunta: "¿Quién ganó el Mundial de Fútbol 2022?", opciones: ["Brasil", "Argentina", "Francia", "España"], respuestaCorrecta: 1 },
    { pregunta: "¿Cuántos jugadores hay en un equipo de fútbol en el campo?", opciones: ["10", "11", "12", "9"], respuestaCorrecta: 1 },
    { pregunta: "¿Qué jugador tiene más Balones de Oro?", opciones: ["Cristiano Ronaldo", "Neymar", "Lionel Messi", "Pelé"], respuestaCorrecta: 2 },
    { pregunta: "¿Qué país ha ganado más Copas del Mundo?", opciones: ["Argentina", "Alemania", "Brasil", "Italia"], respuestaCorrecta: 2 },
    { pregunta: "¿De qué color es la tarjeta de expulsión?", opciones: ["Amarilla", "Roja", "Azul", "Verde"], respuestaCorrecta: 1 },
    { pregunta: "¿Cuántos minutos dura cada tiempo del partido?", opciones: ["40", "45", "50", "60"], respuestaCorrecta: 1 },
    { pregunta: "¿Qué club español tiene más Champions League?", opciones: ["Barcelona", "Real Madrid", "Atlético Madrid", "Sevilla"], respuestaCorrecta: 1 },
    { pregunta: "¿Quién es conocido como 'El Rey del Fútbol'?", opciones: ["Maradona", "Pelé", "Cruyff", "Martin Carolo"], respuestaCorrecta: 1 },
    { pregunta: "¿En qué estadio juega el Manchester United?", opciones: ["Anfield", "Old Trafford", "Stamford Bridge", "Emirates"], respuestaCorrecta: 1 },
    { pregunta: "¿Cuántas sustituciones se permiten en un partido oficial?", opciones: ["3", "5", "7", "Ilimitadas"], respuestaCorrecta: 1 },
    { pregunta: "¿Quién es el máximo goleador histórico de la selección argentina?", opciones: ["Diego Maradona", "Gabriel Batistuta", "Lionel Messi", "Sergio Agüero"], respuestaCorrecta: 2 },
    { pregunta: "¿En qué país se encuentra el famoso estadio de Wembley?", opciones: ["Alemania", "Italia", "Francia", "Inglaterra"], respuestaCorrecta: 3 },
    { pregunta: "¿Qué equipo de la Premier League es conocido como 'Los Diablos Rojos'?", opciones: ["Liverpool", "Manchester United", "Arsenal", "Chelsea"], respuestaCorrecta: 1 },
    { pregunta: "¿Cómo se llama la pena máxima que se cobra desde los once metros?", opciones: ["Tiro de esquina", "Saque de banda", "Penal", "Tiro libre"], respuestaCorrecta: 2 },
    { pregunta: "¿Qué jugador brasileño era famoso por su regate llamado 'la elástica'?", opciones: ["Neymar", "Pelé", "Ronaldinho", "Kaká"], respuestaCorrecta: 2 }
];

const preguntasDificil = [
    { pregunta: "¿En qué año se celebró el primer Mundial de Fútbol?", opciones: ["1930", "1950", "1920", "1940"], respuestaCorrecta: 0 },
    { pregunta: "¿Qué selección ganó la Eurocopa 2021?", opciones: ["Inglaterra", "España", "Italia", "Francia"], respuestaCorrecta: 2 },
    { pregunta: "¿Cómo se llamaba el trofeo de la Copa del Mundo antes de 1974?", opciones: ["Copa Stanley", "Copa FIFA", "Copa Jules Rimet", "Trofeo Mundial"], respuestaCorrecta: 2 },
    { pregunta: "¿Quién es el máximo goleador histórico de la Champions League?", opciones: ["Lionel Messi", "Cristiano Ronaldo", "Raúl González", "Robert Lewandowski"], respuestaCorrecta: 1 },
    { pregunta: "¿Qué equipo ganó la primera Copa Libertadores en 1960?", opciones: ["Boca Juniors", "Santos", "Olimpia", "Peñarol"], respuestaCorrecta: 3 },
    { pregunta: "Franz Beckenbauer ganó el mundial como jugador y como...", opciones: ["Árbitro", "Presidente de la FIFA", "Entrenador", "Periodista"], respuestaCorrecta: 2 },
    { pregunta: "¿Cuál de estos equipos nunca ha descendido de la primera división española?", opciones: ["Atlético de Madrid", "Valencia", "Sevilla", "Athletic Club"], respuestaCorrecta: 3 },
    { pregunta: "¿Quién marcó el famoso gol de 'La Mano de Dios'?", opciones: ["Pelé", "Diego Maradona", "Zinedine Zidane", "Johan Cruyff"], respuestaCorrecta: 1 },
    { pregunta: "¿Qué jugador es conocido como 'El Fenómeno'?", opciones: ["Ronaldo Nazário", "Ronaldinho", "Cristiano Ronaldo", "Adriano"], respuestaCorrecta: 0 },
    { pregunta: "¿Qué país fue sede del Mundial de 1994?", opciones: ["Francia", "Italia", "Estados Unidos", "México"], respuestaCorrecta: 2 },
    { pregunta: "¿Qué club ganó la primera edición de la Premier League en 1992-93?", opciones: ["Liverpool", "Arsenal", "Blackburn Rovers", "Manchester United"], respuestaCorrecta: 3 },
    { pregunta: "¿En qué mundial se utilizó por primera vez el sistema de videoarbitraje (VAR)?", opciones: ["Brasil 2014", "Sudáfrica 2010", "Rusia 2018", "Qatar 2022"], respuestaCorrecta: 2 },
    { pregunta: "¿Qué jugador ostenta el récord de más goles en un solo año calendario (91 goles)?", opciones: ["Cristiano Ronaldo", "Lionel Messi", "Gerd Müller", "Pelé"], respuestaCorrecta: 1 },
    { pregunta: "¿Cuál es el único equipo que ha ganado el 'Sextete' (6 títulos en un año) dos veces?", opciones: ["Real Madrid", "Bayern Munich", "FC Barcelona", "Manchester City"], respuestaCorrecta: 2 },
    { pregunta: "¿Quién fue el primer futbolista en ganar cuatro Botas de Oro europeas?", opciones: ["Thierry Henry", "Cristiano Ronaldo", "Lionel Messi", "Gerd Müller"], respuestaCorrecta: 1 }
];

// --- VARIABLES GLOBALES ---
let preguntas;
let preguntaActual = 0;
let respuestasUsuario = {}; // Cambiado a objeto para guardar más detalles
let score = 0;
let tiempoRestante = 120; // 2 minutos
let intervaloTiempo;

// --- ELEMENTOS DEL DOM ---
const startModal = document.getElementById('start-modal-overlay');
const endModal = document.getElementById('end-modal-overlay');
const quizContent = document.getElementById('quizContent');
const btnComenzar = document.getElementById('btnComenzar');
const difficultySelector = document.getElementById('difficulty-quiz');

// --- FUNCIONES DEL JUEGO ---

function comenzarJuego() {
    const dificultad = difficultySelector.value;
    preguntas = (dificultad === 'facil' ? preguntasFacil : preguntasDificil).sort(() => 0.5 - Math.random());

    startModal.style.display = 'none';
    quizContent.style.display = 'block';
    inicializarQuiz();
}

function inicializarQuiz() {
    preguntaActual = 0;
    respuestasUsuario = {};
    score = 0;
    tiempoRestante = 120; // Reiniciar a 2 minutos
    clearInterval(intervaloTiempo);

    mostrarPregunta();
    iniciarCronometro();
}

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    document.getElementById('preguntaNumero').textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
    const progreso = ((preguntaActual + 1) / preguntas.length) * 100;
    document.getElementById('barraProgreso').style.width = progreso + '%';
    document.getElementById('preguntaTexto').textContent = pregunta.pregunta;

    const opcionesGrid = document.getElementById('opcionesGrid');
    opcionesGrid.innerHTML = '';
    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'opcion-btn';
        boton.textContent = opcion;
        boton.onclick = () => seleccionarRespuesta(index, boton);
        opcionesGrid.appendChild(boton);
    });
}

function seleccionarRespuesta(indiceOpcion, botonSeleccionado) {
    const preguntaInfo = preguntas[preguntaActual];
    const esCorrecta = indiceOpcion === preguntaInfo.respuestaCorrecta;
    respuestasUsuario[preguntaActual] = { esCorrecta: esCorrecta, pregunta: preguntaInfo };

    if (esCorrecta) {
        score += 100;
    } else {
        score -= 50;
    }

    // Deshabilitar todos los botones para evitar más clics
    const botones = document.querySelectorAll('.opcion-btn');
    botones.forEach(btn => btn.disabled = true);

    // Marcar visualmente la respuesta
    if (esCorrecta) {
        botonSeleccionado.classList.add('correcta');
    } else {
        botonSeleccionado.classList.add('incorrecta');
        // Opcional: mostrar la correcta
        botones[preguntaInfo.respuestaCorrecta].classList.add('correcta');
    }

    // Pausa antes de pasar a la siguiente pregunta
    setTimeout(() => {
        if (preguntaActual < preguntas.length - 1) {
            preguntaActual++;
            mostrarPregunta();
        } else {
            terminarQuiz(false);
        }
    }, 1000);
}

function iniciarCronometro() {
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        actualizarCronometro();
        if (tiempoRestante <= 0) {
            terminarQuiz(true);
        }
    }, 1000);
}

function actualizarCronometro() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const tiempoFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    document.getElementById('tiempo').textContent = tiempoFormateado;

    const cronometro = document.getElementById('cronometro');
    if (tiempoRestante <= 30) {
        cronometro.classList.add('urgente');
    } else {
        cronometro.classList.remove('urgente');
    }
}

function terminarQuiz(tiempoAgotado) {
    clearInterval(intervaloTiempo);
    quizContent.style.display = 'none';

    const aciertos = Object.values(respuestasUsuario).filter(r => r.esCorrecta).length;
    const fallos = Object.values(respuestasUsuario).length - aciertos;

    endModal.style.display = 'flex';
    document.getElementById('modal-final-score').textContent = score;

    // Actualizar estadísticas
    document.getElementById('correct-count-stat').textContent = aciertos;
    document.getElementById('fail-count-stat').textContent = fallos;

    // Resetear y configurar el botón de ver respuestas
    const btnShowAnswers = document.getElementById('btnShowAnswers');
    const failedAnswersList = document.getElementById('failed-answers-list');
    failedAnswersList.style.display = 'none';
    const failedAnswersContent = document.getElementById('failed-answers-content');
    if (failedAnswersContent) {
        failedAnswersContent.innerHTML = '';
    }
    btnShowAnswers.style.display = fallos > 0 ? 'block' : 'none';

    document.getElementById('save-score-view').style.display = 'block';
    document.getElementById('ranking-view').style.display = 'none';
    document.getElementById('usernameInput').value = '';
    document.getElementById('usernameInput').disabled = false;
    document.getElementById('btnSaveScore').disabled = false;
    document.getElementById('btnSaveScore').textContent = 'Guardar y Ver Ranking';
    document.getElementById('usernameInput').focus();
}

function reiniciarQuiz() {
    endModal.style.display = 'none';
    startModal.style.display = 'flex';
}

// --- FUNCIONES DE FIREBASE ---

async function saveScore(collectionName) {
    const usernameInput = document.getElementById('usernameInput');
    const saveButton = document.getElementById('btnSaveScore');
    const username = usernameInput.value.trim();

    if (!username) {
        alert('Por favor, ingresa un nombre de usuario.');
        return;
    }

    usernameInput.disabled = true;
    saveButton.disabled = true;
    saveButton.textContent = 'Guardando...';

    try {
        await addDoc(collection(db, collectionName), {
            username: username,
            score: score,
            timestamp: new Date() // Usar la fecha local para evitar errores de timestamp del servidor
        });
        document.getElementById('save-score-view').style.display = 'none';
        document.getElementById('ranking-view').style.display = 'block';
        showRanking(collectionName);
    } catch (e) {
        console.error("Error al guardar: ", e);
        alert('Hubo un error al guardar la puntuación.');
        usernameInput.disabled = false;
        saveButton.disabled = false;
        saveButton.textContent = 'Guardar y Ver Ranking';
    }
}

async function showRanking(collectionName) {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = 'Cargando ranking...';

    try {
        const q = query(collection(db, collectionName), orderBy("score", "desc"), limit(100));
        const querySnapshot = await getDocs(q);
        rankingList.innerHTML = '';
        let position = 1;

        if (querySnapshot.empty) {
            rankingList.innerHTML = '<p>¡Sé el primero en aparecer en el ranking!</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const item = document.createElement('div');
            item.classList.add('ranking-item');
            if (position === 1) item.classList.add('rank-gold');
            if (position === 2) item.classList.add('rank-silver');
            if (position === 3) item.classList.add('rank-bronze');

            const date = data.timestamp ? data.timestamp.toDate() : new Date();
            const formattedDateTime = date.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

            item.innerHTML = `
                <span class="rank-pos">${position}º</span>
                <span class="rank-name">${data.username}</span>
                <span class="rank-score">${data.score} Pts</span>
                <span class="rank-time">${formattedDateTime}</span>
            `;
            rankingList.appendChild(item);
            position++;
        });
    } catch (error) {
        console.error("Error al obtener el ranking: ", error);
        rankingList.innerHTML = '<p>No se pudo cargar el ranking.</p>';
    }
}

function showFailedAnswers() {
    const listContainer = document.getElementById('failed-answers-list');
    const btnShowAnswers = document.getElementById('btnShowAnswers');
    const listContent = document.getElementById('failed-answers-content');
    listContent.innerHTML = '';

    for (const index in respuestasUsuario) {
        const respuesta = respuestasUsuario[index];
        if (!respuesta.esCorrecta) {
            const preguntaInfo = respuesta.pregunta;
            const respuestaCorrectaTexto = preguntaInfo.opciones[preguntaInfo.respuestaCorrecta];
            const item = document.createElement('div');
            item.classList.add('failed-answer-item');
            item.innerHTML = `<b>Pregunta:</b> ${preguntaInfo.pregunta}<br><b>Respuesta:</b> ${respuestaCorrectaTexto}`;
            listContent.appendChild(item);
        }
    }

    listContainer.style.display = 'block';
    btnShowAnswers.style.display = 'none';
}

// --- INICIALIZACIÓN Y EVENTOS ---

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar modal de inicio al cargar
    startModal.style.display = 'flex';

    // Asignar eventos a los botones
    btnComenzar.addEventListener('click', comenzarJuego);
    document.getElementById('btnSaveScore').addEventListener('click', () => saveScore('ranking-quiz'));
    document.getElementById('btnShowAnswers').addEventListener('click', showFailedAnswers);
    document.getElementById('btnCloseAnswers').addEventListener('click', () => {
        document.getElementById('failed-answers-list').style.display = 'none';
        document.getElementById('btnShowAnswers').style.display = 'block';
    });
    document.getElementById('btnPlayAgain').addEventListener('click', reiniciarQuiz);
});