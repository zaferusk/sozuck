import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// SENİN FIREBASE AYARLARIN
const firebaseConfig = {
  apiKey: "AIzaSyAFUoJNpQvgt1L-ouMvmRME6AcIB19nG2U",
  authDomain: "sozcuk-187a6.firebaseapp.com",
  projectId: "sozcuk-187a6",
  storageBucket: "sozcuk-187a6.firebasestorage.app",
  messagingSenderId: "842447584162",
  appId: "1:842447584162:web:357980e03d84c062cf90fb",
  measurementId: "G-RDCVHCJ5HZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const kelimeRef = collection(db, "kelimeler");

// Kelimeleri göster
async function displayWords(filterLetters = []) {
  const list = document.getElementById("wordList");
  list.innerHTML = "";

  const snapshot = await getDocs(kelimeRef);
  const allWords = snapshot.docs.map(doc => doc.data().text);

  const filtered = filterLetters.length > 0
    ? allWords.filter(word => filterLetters.every(letter => word.includes(letter)))
    : allWords;

  filtered.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    list.appendChild(li);
  });
}

// Harflerle filtrele
function filterWords() {
  const input = document.getElementById("letterInput").value.toLowerCase().split(",");
  const letters = input.map(l => l.trim()).filter(l => l);
  displayWords(letters);
}

// Yeni kelime ekle
async function addWord() {
  const newWord = document.getElementById("newWordInput").value.toLowerCase().trim();
  if (!newWord) return;

  await addDoc(kelimeRef, { text: newWord });
  document.getElementById("newWordInput").value = "";
  displayWords();
}

window.onload = () => displayWords();
