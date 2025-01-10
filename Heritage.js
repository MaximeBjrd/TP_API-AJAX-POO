// const form = document.getElementById("formulaire")
const nom = document.getElementById("nom")
const mail = document.getElementById("mail")
const statut = document.getElementById("statut")
// const visiteursListe = document.getElementById("visiteurs")
// const adminsListe = document.getElementById("admins")

// form.addEventListener("submit", function(event) {
//     event.preventDefault();

//     const name = nom.value.trim()
//     const email = mail.value
//     const status = statut.value

//     // Créé un nouvel élément <li>
//     const newLi = document.createElement("li")
//     newLi.textContent = name

//     // Ajoute l'élément dans la bonne liste
//     if(status === "visiteur") visiteursListe.appendChild(newLi)
//     else if(status === "admin") adminsListe.appendChild(newLi)

//     form.reset()
// })

class Utilisateur {
    constructor(nom, mail, statut) {
        this.nom = nom
        this.mail = mail
        this.statut = statut
    }

    createElt() {
        const newLi = document.createElement("li")
        newLi.textContent = `${this.nom} (${this.mail})`
        return newLi
    }
}

class Visiteur extends Utilisateur {
    constructor(nom, mail) {
        super(nom, mail, "visiteur")
    }

    appendElt() {
        const visiteursListe = document.getElementById("visiteurs")
        const li = this.createElt()
        visiteursListe.appendChild(li)
    }
}

class Admin extends Utilisateur {
    constructor(nom, mail) {
        super(nom, mail, "admin")
    }

    appendElt() {
        const adminsListe = document.getElementById("admins")
        const li = this.createElt()
        adminsListe.appendChild(li)
    }
}

