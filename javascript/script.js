import { app, auth, db } from "../firebase/initialize.mjs"
import { onAuthStateChanged, signOut, updateEmail } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js'
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"

onAuthStateChanged(auth, (user) => {
    if (user) {

    } else {
        window.location.href = "./pages/login/index.html"
    }
})
const usersRef = collection(db, "users")

const profileShow = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const q = query(usersRef, where("uid", "==", `${user.uid}`));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                document.querySelector(".title").innerHTML = `${doc.data().name}`
                document.querySelector(".profile-container").innerHTML = `
                    <h1>${doc.data().name}</h1>
                    <p>${doc.data().email}</p>
                    <p>${doc.data().phone}</p>
                    <button onclick="logout()">Logout</button>
                    <button onclick="update()">Update Account</button>
                `
            });
        } else {
            console.log("Sign Out");
        }
    });
}

const logout = () => {
    signOut(auth).then(() => {
        window.location.href = "./pages/login/index.html"
    }).catch((error) => {
        console.log(error);
    });
}


const update = async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const q = query(usersRef, where("uid", "==", `${user.uid}`));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                document.querySelector(".title").innerHTML = `${doc.data().name}`
                console.log(doc.data().name);
                document.querySelector(".profile-container").innerHTML = `
                <input type="text" id="uname" value="${doc.data().name}" />
                <input type="text" id="uemail" value="${doc.data().email}" />
                        <input type="text" id="uphone" value="${doc.data().phone}" />
                        <button onclick="set()">Update</button>
                        <button onclick="cancel()">Cancel</button>
                        `
                document.querySelector(".profile-container").classList.add("heih")
            });
        } else {
            console.log("Sign Out");
        }
    });
}

const set = async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                await updateDoc(doc(db, "users", user.uid), {
                    name: document.getElementById("uname").value,
                    email: document.getElementById("uemail").value,
                    phone: document.getElementById("uphone").value,
                });
                updateEmail(auth.currentUser, document.getElementById("uemail").value,).then(() => {
                    // Email updated!
                    window.location.reload()
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("User Sign Out");
        }
    })
}



profileShow()
const cancel = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const q = query(usersRef, where("uid", "==", `${user.uid}`));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                document.querySelector(".profile-container").classList.remove("heih")
                document.querySelector(".profile-container").innerHTML = `
                <h1>${doc.data().name}</h1>
                <p>${doc.data().email}</p>
                <p>${doc.data().phone}</p>
                <button onclick="logout()">Logout</button>
                <button onclick="update()">Update Account</button>
                        `
            });
        } else {
            console.log("Sign Out");
        }
    })

}

window.logout = logout
window.update = update
window.set = set
window.cancel = cancel