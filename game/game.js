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

        // --- SETS DE PREGUNTAS POR DIFICULTAD ---

        const questionsEasy = {
          A: { q: "Comienza con A. País que ganó el mundial 2022.", a: "Argentina" },
          B: { q: "Comienza con B. Club argentino 6 veces campeón de la Copa Libertadores.", a: "Boca Juniors" },
          C: { q: "Comienza con C. Nombre del maximo goleador de la historia.", a: "Cristiano Ronaldo" },
          D: { q: "Contiene D. Nombre de Maradona.", a: "Diego", a: "diego" },
          E: { q: "Comienza con E. País donde se juega LaLiga.", a: "España" },
          F: { q: "Comienza con F. Deporte del que trata este juego.", a: "Fútbol" },
          G: { q: "Comienza con G. Acción de meter la pelota en el arco.", a: "Gol" },
          H: { q: "Contiene H. Selección con la camiseta naranja.", a: "Holanda" },
          I: { q: "Comienza con I. País subcampeón de la Finalissima 2022.", a: "Italia" },
          J: { q: "Comienza con J. País anfitrión del mundial 2002.", a: "Japon" },
          K: { q: "Comienza con K. Jugador argentino apodado El matador.", a: "Kempes" },
          L: { q: "Comienza con L. Nombre del mejor jugador del mundo.", a: "Lionel Messi" },
          M: { q: "Contiene M. Ciudad del club más grande de la historia.", a: "Madrid" },
          N: { q: "Contiene N. Barrio del equipo River Plate.", a: "Nuñez" },
          Ñ: { q: "Contiene Ñ. Selección campeona del mundial 2010.", a: "España" },
          O: { q: "Comienza con O. Actual ganador del Balon de Oro.", a: "Ousmane Dembele" },
          P: { q: "Comienza con P. Jugador 3 veces campeón del mundo.", a: "Pelé" },
          Q: { q: "Comienza con Q. País anfitrión del mundial 2022.", a: "Qatar" },
          R: { q: "Contiene R. Actual presidente de Boca Juniors.", a: "Roman Riquelme", a: "Riquelme", a: "Roman" },
          S: { q: "Comienza con S. Actual DT de la selección Argentina.", a: "Scaloni" },
          T: { q: "Comienza con T. Equipo cordobes apodado la T.", a: "Talleres" },
          U: { q: "Contiene U. Apodo de Franco Armani.", a: "Pulpo", a: "El pulpo" },
          V: { q: "Comienza con V. Herramienta que ayuda en el arbitraje.", a: "var", a: "VAR", a: "Var" },
          W: { q: "Contiene W. Canción del mundial 2010.", a: "Waka Waka" },
          X: { q: "Comienza con X. Actual DT del Real Madrid.", a: "Xabi Alonso" },
          Y: { q: "Comienza con Y. Apellido del actual 10 de Barcelona.", a: "Yamal" },
          Z: { q: "Contiene Z. Exjugador de Boca apodado El Apache.", a: "Tevez", a: "Carlos Tevez"},
        };
        const questionsHard = {
          A: { q: "Comienza con A. 	¿Qué selección ganó el Mundial 2022?", a: "Argentina" },
          B: { q: "Comienza con B.	¿Qué portero fue campeón del mundo con Italia en 2006?", a: "Buffon" },
          C: { q: "Comienza con C. 	¿Qué entrenador ganó más Champions League?", a: ["Carlo Ancelotti", "Carleto Ancelotti"] },
          D: { q: "Contiene D. 	¿Qué club ha ganado más Copas Libertadores?", a: "Independiente" },
          E: { q: "Comienza con E. 	¿Qué selección ganó el Mundial con el menor número de goles recibidos?", a: "España" },
          F: { q: "Comienza con F. ¿Quien fue el ganador del mundial 1998?", a: "Francia" },
          G: { q: "Comienza con G. ¿Qué jugador marcó el gol más tardío en una final de Mundial (pista: Mundial 2014)?", a: ["Götze", "Gotze"] },
          H: { q: "Contiene H. ¿Qué club inglés tiene más títulos de liga?", a: "Manchester United " },
          I: { q: "Comienza con I. ¿Qué selección fue la primera en ganar dos Copas del Mundo consecutivas?", a: "Italia" },
          J: { q: "Comienza con J. Actual 9 del Atletico de Madrid", a: "Julian Alvarez " },
          K: { q: "Comienza con K. ¿Que jugador ha marcado más goles en la historia de los mundiales?", a: ["Klose", "Miroslav Klose"] },
          L: { q: "Comienza con L.  Equipo argentino finalista de la Copa Sudamericana 2025", a: "Lanus" },
          M: { q: "Contiene M.	 ¿Quién fue el futbolista argentino apodado “El Matador” que marcó el gol decisivo en la final del Mundial 1978?", a: ["Mario Kempes", "Mario Alberto Kempes", "Kempes"] },
          N: { q: "Contiene N. 	¿Qué equipo fue el primero en ganar una Champions League invicto?", a: "Manchester United" },
          Ñ: { q: "Contiene Ñ. ¿Que pais fue sede del mundial 1982?", a: "España" },
          O: { q: "Contiene O. 	¿Qué país organizó el Mundial 2002 junto con Japón?", a: "Corea del Sur" },
          P: { q: "Comienza con P. ¿Que club gano la primer Copa Libertadores de la historia (1960)?", a: "Peñarol" },
          Q: { q: "Contiene Q. 	¿Qué club ganó la Copa Sudamericana 2023?", a: "Liga de Quito" },
          R: { q: "Contiene R. ¿En qué país se jugó el primer Mundial con 32 equipos?", a: "Francia 1998" },
          S: { q: "Comienza con S.	¿Qué país fue el primero en organizar un Mundial en África?", a: "Sudafrica" },
          T: { q: "Contiene T. ¿Qué futbolista tiene más partidos jugados en la historia de la Champions League?", a: "Cristiano Ronaldo" },
          U: { q: "Contiene U. ¿Qué portero ha ganado más veces el premio “Guante de Oro” en Mundiales?", a: "Neuer" },
          V: { q: "Comienza con V. 	¿Qué entrenador llevó a España a ganar el Mundial 2010? ", a: "Vicente del Bosque" },
          W: { q: "Comienza con W. 	¿Qué jugador fue el más joven en debutar en un Mundial?", a: "Whiteside" },
          X: { q: "Contiene X. ¿Qué país ha participado más veces en los Mundiales sin ganarlo?", a: ["México", "Mexico"]},
          Y: { q: "Contiene Y. ¿Qué selección fue campeona del Mundial 1950?" , a: "Uruguay"}, 
          Z: { q: "Comienza con Z. ¿Qué entrenador fue campeón de la Champions League tres veces seguidas?", a: ["Zinedine Zidane", "Zidane"] }, 
        };

      // --- LÓGICA PARA SELECCIONAR DIFICULTAD ---
      const urlParams = new URLSearchParams(window.location.search);
      // Si no se especifica la dificultad, se usa 'hard' por defecto.
      const difficulty = urlParams.get('difficulty') || 'hard';

      // Selecciona el set de preguntas.
      const questions = difficulty === 'easy' ? questionsEasy : questionsHard;
      // Muestra la dificultad en la UI
      document.getElementById('game-difficulty').textContent = difficulty === 'easy' ? 'Fácil' : 'Difícil';


      // VARIABLES GLOBALES DEL JUEGO
      let currentIndex = 0; // Índice de la letra actual
      let score = 0; // Puntuación del jugador
      let letterStatus = {}; // Estado de cada letra (pendiente, correcta, incorrecta)
      let passCount = 0; // Contador de "Pasapalabra"
      let incorrectCount = 0; // Contador de fallos
      let gameActive = false; // Si el juego está activo
      const letters = Object.keys(questions); // Array con todas las letras
      let timerInterval; // Variable para el intervalo del temporizador
      let timeLeft = 180; // 3 minutos en segundos

      // NUEVO SISTEMA DE PUNTUACIÓN Y COMBOS
      const BASE_POINTS_CORRECT = 50;
      const BASE_POINTS_INCORRECT = -60;
      let correctCombo = 0;
      let incorrectCombo = 0;

      // INICIALIZAR EL ROSCO DE LETRAS
      // Crea las letras en círculo usando trigonometría
      function initCircle() {
          const circle = document.getElementById('letterCircle');
          const circleSize = circle.offsetWidth; // Obtener el tamaño actual del contenedor
          const radius = circleSize * 0.41; // 41% del tamaño total
          const centerX = circleSize / 2; // Centro X
          const centerY = circleSize / 2; // Centro Y

          letters.forEach((letter, i) => {
              const angle = (i / letters.length) * 2 * Math.PI - Math.PI / 2;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);

              const div = document.createElement('div');
              div.className = 'letter';
              div.textContent = letter;
              div.style.left = x + 'px';
              div.style.top = y + 'px';
              div.id = 'letter-' + letter;
              // El centrado ahora se hace con transform en CSS
              circle.appendChild(div);

              letterStatus[letter] = 'pending'; // Estado inicial: pendiente
          });
      }

      // MEZCLAR ARRAY (Fisher-Yates shuffle)
      function shuffleArray(array) {
          const shuffled = [...array];
          for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
      }

      // COMENZAR EL JUEGO
      function startGame() {
          gameActive = true;
          currentIndex = 0;
          score = 0;
          correctCombo = 0;
          incorrectCombo = 0;
          passCount = 0;
          incorrectCount = 0;
          timeLeft = 180; // Reiniciar tiempo
          clearInterval(timerInterval); // Limpiar intervalo anterior
          startTimer(); // Iniciar temporizador
          
          // Resetear estado de todas las letras
          letters.forEach(letter => {
              letterStatus[letter] = 'pending';
              document.getElementById('letter-' + letter).className = 'letter'; // Limpia todas las clases extra
          });

          // Habilitar controles
          document.getElementById('answerInput').disabled = false;
          document.getElementById('btnAnswer').disabled = false;
          document.getElementById('btnPass').disabled = false;
          document.getElementById('answerInput').value = '';
          document.getElementById('btnStart').disabled = true; // Deshabilitar botón "Comenzar"
          document.getElementById('answerInput').focus();
          document.getElementById('finalMessage').classList.remove('show');
          
          updateScore();
          updateCorrectCount();
          showQuestion();
      }

      // MANEJO DEL TEMPORIZADOR
      function startTimer() {
        const timerElement = document.getElementById('timer');
        // Limpiar clases de color al iniciar
        timerElement.classList.remove('warning', 'danger');

        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Cambiar color según el tiempo restante
            if (timeLeft <= 60) { // Menos de 1 minuto
                timerElement.classList.add('danger');
            } else if (timeLeft <= 90) { // Menos de 1:30 minutos
                timerElement.classList.add('warning');
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (gameActive) {
                    endGame(true); // Terminar el juego por tiempo
                }
            }
        }, 1000);
      }

      // MOSTRAR LA PREGUNTA ACTUAL
      async function showQuestion() {
          if (!gameActive) return;

          // Limpiar la letra activa anterior
          letters.forEach(l => {
            document.getElementById('letter-' + l).classList.remove('active');
          });

          // Lógica de vueltas infinitas con un índice
          let targetLetter = null;
          let searchIndex = currentIndex;
          let looped = false;

          do {
            // Si llegamos al final, es una nueva vuelta
            if (searchIndex >= letters.length) {
                searchIndex = 0; // Volver al inicio
                // Convertir todas las letras pasadas (amarillas) a "segunda vuelta" (negras)
                document.querySelectorAll('.letter.passed').forEach(elem => {
                    elem.classList.remove('passed');
                    elem.classList.add('second-round');
                });
            }
            
            // Si hemos dado una vuelta completa y no encontramos nada, el juego termina.
            const noPendingQuestions = !Object.values(letterStatus).some(s => s === 'pending');
            if ((searchIndex === currentIndex && looped) || noPendingQuestions) {
              endGame();
              return;
            }

            if (letterStatus[letters[searchIndex]] === 'pending') {
                targetLetter = letters[searchIndex];
                currentIndex = searchIndex; // Actualizamos el índice principal
            } else {
                searchIndex++;
                looped = true; // Marcamos que hemos empezado a buscar
            }
          } while (!targetLetter);

          // Si después de todo no hay letra, terminar.
          if (!targetLetter) { 
              endGame(); 
              return;
          }

          // Activar la nueva letra directamente
          const letterElement = document.getElementById('letter-' + targetLetter);
          letterElement.classList.remove('passed', 'second-round'); // Quitar estado "pasado" o "segunda vuelta" si lo tenía
          letterElement.classList.add('active');
          
          // Actualizar interfaz
          document.getElementById('question').textContent = questions[targetLetter].q;
          document.getElementById('answerInput').value = '';
      }

      // VERIFICAR LA RESPUESTA
      function checkAnswer() {
          const input = document.getElementById('answerInput');
          const userAnswer = input.value.toLowerCase().trim();
          
          // Encontrar la letra activa actual
          const currentLetter = letters[currentIndex];
          if (!currentLetter) return;
          
          if (!userAnswer) return; // No permitir respuestas vacías

          // Comparar respuestas (sin tildes ni espacios)
          const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").trim();
          const normalizedUserAnswer = normalize(userAnswer);

          const correctAnswers = questions[currentLetter].a; // Puede ser string o array
          let isCorrect = false;

          if (Array.isArray(correctAnswers)) {
              // Si es una lista, comprobar si la respuesta del usuario está en la lista
              isCorrect = correctAnswers.some(answer => normalize(answer) === normalizedUserAnswer);
          } else {
              // Si es una sola respuesta (string)
              isCorrect = (normalize(correctAnswers) === normalizedUserAnswer);
          }
          
          if (isCorrect) {
              // Respuesta correcta
              correctCombo++;
              incorrectCombo = 0; // Reinicia combo de errores
              score += BASE_POINTS_CORRECT * correctCombo;

              letterStatus[currentLetter] = 'correct';
              document.getElementById('letter-' + currentLetter).classList.remove('active');
              document.getElementById('letter-' + currentLetter).classList.add('correct');
          } else {
              // Respuesta incorrecta
              incorrectCombo++;
              incorrectCount++;
              correctCombo = 0; // Reinicia combo de aciertos
              score += BASE_POINTS_INCORRECT * incorrectCombo;

              letterStatus[currentLetter] = 'incorrect';
              document.getElementById('letter-' + currentLetter).classList.remove('active');
              document.getElementById('letter-' + currentLetter).classList.add('incorrect');
          }
          
          currentIndex++; // Avanzar al siguiente índice
          updateScore();
          updateCorrectCount();
          // Pasar a la siguiente pregunta
          setTimeout(() => showQuestion(), 500);
      }

      // PASAR LA PREGUNTA (PASAPALABRA)
      function passQuestion() {
          const currentLetter = letters[currentIndex];
          if (!currentLetter) return;
          
          // Marcar la letra como "pasada" visualmente
          const letterElement = document.getElementById('letter-' + currentLetter);
          letterElement.classList.remove('active');
          letterElement.classList.add('passed');
          
          // Pasar reinicia los combos
          correctCombo = 0;
          incorrectCombo = 0;
          
          currentIndex++; // Avanzar al siguiente índice
          showQuestion();
      }

      // ACTUALIZAR PUNTUACIÓN
      function updateScore() {
          document.getElementById('score').textContent = score;
      }

      // ACTUALIZAR CONTADOR DE ACIERTOS
      function updateCorrectCount() {
          const correctAnswers = Object.values(letterStatus).filter(s => s === 'correct').length;
          document.getElementById('correct-count').textContent = correctAnswers;
      }

      // TERMINAR EL JUEGO
      function endGame(timeUp = false) {
          gameActive = false;
          clearInterval(timerInterval); // Detener el temporizador
          document.getElementById('answerInput').disabled = true;
          document.getElementById('btnAnswer').disabled = true;
          document.getElementById('btnPass').disabled = true;
          document.getElementById('btnStart').disabled = false; // Habilitar botón "Comenzar"
          
          // Marcar las letras "pasadas" (amarillas) como fallidas (negras)
          let finalPassedCount = 0;
          let finalUnansweredCount = 0;
          letters.forEach(letter => {
            if (letterStatus[letter] === 'pending') {
                const elem = document.getElementById('letter-' + letter);
                if (elem.classList.contains('passed')) {
                    finalPassedCount++;
                }
                if (elem.classList.contains('second-round')) {
                    finalUnansweredCount++;
                }
                elem.classList.remove('passed', 'active', 'second-round');
                elem.classList.add('failed-pass');
            }
          });

          // Configurar y mostrar el modal
          const allCorrect = incorrectCount === 0 && Object.values(letterStatus).every(s => s === 'correct');
          const correctCount = Object.values(letterStatus).filter(s => s === 'correct').length;
          const totalQuestions = letters.length;
          const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

          document.getElementById('modal-title').textContent = allCorrect ? "¡Felicidades!" : "¡Juego Terminado!";
          document.getElementById('modal-subtitle').textContent = allCorrect ? "¡Rosco completado al 100%!" : "";
          document.getElementById('modal-percentage').textContent = `Tuviste un acierto del ${percentage}%`;


          // Mostrar estadísticas
          document.getElementById('pass-count-stat').textContent = finalPassedCount;
          document.getElementById('unanswered-count-stat').textContent = finalUnansweredCount;
          document.getElementById('correct-count-stat').textContent = correctCount;
          document.getElementById('fail-count-stat').textContent = incorrectCount;

          // Ocultar o mostrar el botón de respuestas falladas
          const btnShowAnswers = document.getElementById('btnShowAnswers');
          const failedAnswersList = document.getElementById('failed-answers-list');
          failedAnswersList.style.display = 'none'; // Resetear
          const failedAnswersContent = document.getElementById('failed-answers-content');
          if (failedAnswersContent) {
            failedAnswersContent.innerHTML = ''; // Limpiar solo el contenido, no el botón de cerrar
          }
          btnShowAnswers.style.display = incorrectCount > 0 ? 'block' : 'none';

          // Mostrar la ventana modal
          document.getElementById('modal-overlay').style.display = 'flex';
          document.getElementById('modal-final-score').textContent = score;
          document.getElementById('save-score-view').style.display = 'block'; // Asegurarse que la vista de guardar esté visible
          document.getElementById('ranking-view').style.display = 'none';
          // document.getElementById('usernameInput').value = ''; // No es necesario limpiar aquí
          document.getElementById('usernameInput').disabled = false;
          document.getElementById('btnSaveScore').disabled = false;
          document.getElementById('btnSaveScore').textContent = 'Guardar y Ver Ranking';
          document.getElementById('usernameInput').focus();
      }

      // MOSTRAR RESPUESTAS FALLADAS EN EL MODAL
      function showFailedAnswers() {
        const listContainer = document.getElementById('failed-answers-list');
        const btnShowAnswers = document.getElementById('btnShowAnswers');
        const listContent = document.getElementById('failed-answers-content');
        listContent.innerHTML = ''; // Limpiar por si acaso

        letters.forEach(letter => {
            if (letterStatus[letter] === 'incorrect') {
                const correctAnswer = Array.isArray(questions[letter].a) ? questions[letter].a.join(' / ') : questions[letter].a;
                const item = document.createElement('div');
                item.classList.add('failed-answer-item');
                item.innerHTML = `<b>${letter}:</b> ${correctAnswer}`;
                listContent.appendChild(item);
            }
        });

        if (listContent.innerHTML !== '') {
            listContainer.style.display = 'block';
            btnShowAnswers.style.display = 'none'; // Ocultar el botón
        }
      }


      // GUARDAR PUNTUACIÓN EN FIRESTORE
      async function saveScore(collectionName) {
        const usernameInput = document.getElementById('usernameInput');
        const saveButton = document.getElementById('btnSaveScore');
        const username = usernameInput.value.trim();

        if (!username) {
            alert('Por favor, ingresa un nombre de usuario.');
            return;
        }
        
        // Deshabilitar el formulario para evitar envíos múltiples
        usernameInput.disabled = true;
        saveButton.disabled = true;
        saveButton.textContent = 'Guardando...';

        try {
            // Añadir un nuevo documento a la colección especificada
            const docRef = await addDoc(collection(db, collectionName), {
                username: username,
                score: score,
                timestamp: new Date() // Usar la fecha local para evitar errores de timestamp del servidor
            });

            // Ocultar vista de guardar y mostrar vista de ranking
            document.getElementById('save-score-view').style.display = 'none';
            document.getElementById('ranking-view').style.display = 'block';
            showRanking(collectionName); // Llamar a la función para mostrar el ranking de la colección correcta

        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Hubo un error al guardar la puntuación. Inténtalo de nuevo.');
            // Habilitar de nuevo si hay un error
            usernameInput.disabled = false;
            saveButton.disabled = false;
            saveButton.textContent = 'Guardar y Ver Ranking';
        }
      }

      // MOSTRAR EL RANKING EN EL MODAL
      async function showRanking(collectionName) {
        const rankingList = document.getElementById('ranking-list');
        rankingList.innerHTML = 'Cargando ranking...'; // Mensaje de carga

        try {
            // Crear una consulta para obtener el top 100, ordenado por puntuación
            const q = query(collection(db, collectionName), orderBy("score", "desc"), limit(100));
            const querySnapshot = await getDocs(q);

            rankingList.innerHTML = ''; // Limpiar la lista
            let position = 1;

            if (querySnapshot.empty) {
                rankingList.innerHTML = '<p>¡Sé el primero en aparecer en el ranking!</p>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const item = document.createElement('div');
                item.classList.add('ranking-item');

                // Asignar clases para el podio
                if (position === 1) item.classList.add('rank-gold');
                if (position === 2) item.classList.add('rank-silver');
                if (position === 3) item.classList.add('rank-bronze');

                // Formatear la fecha
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
            rankingList.innerHTML = '<p>No se pudo cargar el ranking. Inténtalo más tarde.</p>';
        }
      }

      // PERMITIR RESPONDER CON ENTER
      document.getElementById('answerInput').addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && gameActive) {
              checkAnswer();
          }
      });

      // ASIGNAR EVENTOS A LOS BOTONES
      document.getElementById('btnStart').addEventListener('click', startGame);
      document.getElementById('btnAnswer').addEventListener('click', checkAnswer);
      document.getElementById('btnPass').addEventListener('click', passQuestion);
      document.getElementById('btnSaveScore').addEventListener('click', () => saveScore('ranking')); // Especificamos la colección para Pasapalabras
      document.getElementById('btnShowAnswers').addEventListener('click', showFailedAnswers);
      document.getElementById('btnCloseAnswers').addEventListener('click', () => {
        document.getElementById('failed-answers-list').style.display = 'none';
        document.getElementById('btnShowAnswers').style.display = 'block'; // Mostrar el botón de nuevo
      });
      document.getElementById('btnPlayAgain').addEventListener('click', () => {
        document.getElementById('modal-overlay').style.display = 'none';
        startGame();
      });

      // DIBUJAR EL CÍRCULO INICIAL
      initCircle();