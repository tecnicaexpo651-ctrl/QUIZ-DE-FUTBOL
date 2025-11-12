// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8W71jchdjJQRs6UnDRrGOvAJ6Y-Umu8c",
    authDomain: "quiz-futbol-f0e95.firebaseapp.com",
    projectId: "quiz-futbol-f0e95",
    storageBucket: "quiz-futbol-f0e95.firebasestorage.app",
    messagingSenderId: "1592263101",
    appId: "1:1592263101:web:42540e3b8b1313baa9d2d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btnPasapalabras = document.getElementById('btn-rank-pasapalabras');
const btnQuiz = document.getElementById('btn-rank-quiz');
const rankingList = document.getElementById('ranking-list');

/**
 * Muestra el ranking de una colección específica de Firebase.
 * @param {string} collectionName - El nombre de la colección en Firestore (ej. "ranking").
 */
async function showRanking(collectionName) {
    rankingList.innerHTML = '<p class="loading-msg">Cargando ranking...</p>'; // Mensaje de carga

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

// --- EVENT LISTENERS PARA LOS BOTONES ---

btnPasapalabras.addEventListener('click', () => {
    // Marcar como activo y el otro no
    btnPasapalabras.classList.add('active');
    btnQuiz.classList.remove('active');
    
    // Cargar el ranking del Pasapalabras (colección "ranking")
    showRanking('ranking');
});

btnQuiz.addEventListener('click', () => {
    // Marcar como activo y el otro no
    btnQuiz.classList.add('active');
    btnPasapalabras.classList.remove('active');

    // Cargar el ranking del Quiz desde la colección 'ranking-quiz'
    showRanking('ranking-quiz'); 
});

// Cargar el ranking de Pasapalabras por defecto al entrar a la página
document.addEventListener('DOMContentLoaded', () => {
    showRanking('ranking');
});