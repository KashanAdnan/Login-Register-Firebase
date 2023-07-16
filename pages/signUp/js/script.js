import { db, app, auth } from "../../../firebase/initialize.mjs"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"

const registerUser = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
            const userDetails = user.user;
                try {
                    await setDoc(doc(db, "users", userDetails.uid), {
                        name,
                        email,
                        password,
                        phone,
                        uid: userDetails.uid
                    });
                    window.location.href = "../../index.html"
                } catch (error) {
                    console.log(error);
                }
        }).catch((error) => {
            console.log(error);
        })
}


window.registerUser = registerUser