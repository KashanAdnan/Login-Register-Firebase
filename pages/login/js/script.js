import { db, app, auth } from "../../../firebase/initialize.mjs"
import { signInWithEmailAndPassword, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"
import { setDoc , doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"


const loginUser = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            const userDetails = user.user;
            window.location.href = "../../index.html"
        }).catch((error) => {
            if (error.message === "Firebase: Error (auth/user-not-found).") {
                alert("Email and Password is Wrong.")
            } else {
                console.log(error.message);
            }
        })
}

const googleBtn = document.querySelector(".google")
const twitterBtn = document.querySelector(".twitter")

twitterBtn.addEventListener("click", () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "../../index.html"
        }).catch((error) => {
            console.log(error);
        });
})

googleBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const userDetails = result.user;
            try {
                await setDoc(doc(db, "users", userDetails.uid), {
                    name  : userDetails.displayName,
                    email : userDetails.email,
                    password : "kashanadnan99@99",
                    phone : "Not Given",
                    uid: userDetails.uid
                });
                console.log(userDetails);
                window.location.href = "../../index.html"
            } catch (error) {
                console.log(error);
            }
        }).catch((error) => {
            console.log(error);
        });
})

window.loginUser = loginUser