// Importa funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
    getFirestore,
    getDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCTvxDzvMWRYq6WIbjJtrl1mBLiszROMRE",
    authDomain: "teak-store-466823-e8.firebaseapp.com",
    projectId: "teak-store-466823-e8",
    storageBucket: "teak-store-466823-e8.firebasestorage.app",
    messagingSenderId: "83050040422",
    appId: "1:83050040422:web:782fc01b16534bd5ec31a7"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Imagem padrão
const imgSafe = "https://imgs.search.brave.com/JGeDLeQDMYCJ7BhwEqDT2CTraiRKAE_-BlvqSijRsMc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9oYXBw/eS1uZXJkLTQ1Njk5/MzguanBn";

// Função para preencher dados na interface
function fillUserData(userData) {
    const displayName = userData.displayName ?? userData.firstName ?? "Usuário";

    // Separar firstName e lastName
    const nameParts = displayName.split(" ");
    const firstName = userData.firstName ?? nameParts[0] ?? "";
    const lastName = userData.lastName ?? nameParts.slice(1).join(" ") ?? "";

    document.getElementById("welcomeName").innerText = `Bem-vindo à sua conta ${firstName}!`;
    document.getElementById("loggedUserDisplayName").innerText = displayName;
    document.getElementById("loggedUserFName").innerText = firstName;
    document.getElementById("loggedUserLName").innerText = lastName;
    document.getElementById("loggedUserEmail").innerText = userData.email ?? "";
    document.getElementById("loggedUserPhoto").setAttribute("src", userData.photoURL);

    // Toca áudio se não tiver foto
    if (!userData.photoURL || userData.photoURL === imgSafe) {
        const audio = new Audio("b.mp3");
        audio.play();
    }
}

// Monitora autenticação
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        // Redireciona somente se não estivermos na página de login
        if (!window.location.href.includes("index.html")) {
            window.location.href = "index.html";
        }
        return;
    }

    try {
        // Busca dados no Firestore pelo uid
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userDataFirestore = docSnap.data();

            // Prepara objeto final priorizando dados do Firebase Auth
            const finalUserData = {
                displayName: user.displayName ?? userDataFirestore.firstName,
                firstName: userDataFirestore.firstName,
                lastName: userDataFirestore.lastName,
                email: user.email ?? userDataFirestore.email,
                photoURL: user.photoURL ?? userDataFirestore.photoURL ?? imgSafe
            };

            fillUserData(finalUserData);
        } else {
            // Se não houver Firestore, usa dados do Firebase Auth
            fillUserData({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL ?? imgSafe
            });
        }
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);

        // fallback: usa apenas dados do Auth
        fillUserData({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL ?? imgSafe
        });
    }
});

// Logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
});
