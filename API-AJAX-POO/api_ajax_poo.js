class HTTPRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async get(endpoint) {
        try {
            const reponse = await fetch(`${this.baseUrl}${endpoint}`)
            if(!reponse.ok) {
                throw new Error(`GET request failed: ${reponse.statusText}`)
            }
            return await reponse.json()
        }
        catch(error) {
            console.error("Error in GET:", error)
            throw error
        }
    }

    async post(endpoint, body) {
        try {
            const reponse = await fetch(`${this.baseUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            if(!reponse.ok) {
                throw new Error(`POST request failed: ${reponse.statusText}`)
            }
            return await reponse.json()
        }
        catch(error) {
            console.error("Error in POST:", error)
            throw error
        }
    }

    async put(endpoint, body) {
        try {
            const reponse = await fetch(`${this.baseUrl}${endpoint}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            if(!reponse.ok) {
                throw new Error(`PUT request failed: ${reponse.statusText}`)
            }
            return await reponse.json()
        }
        catch(error) {
            console.error("Error in PUT:", error)
            throw error
        }
    }

    async delete(endpoint) {
        try {
            const reponse = await fetch(`${this.baseUrl}${endpoint}`, {
                method: "DELETE",
            })
            if(!reponse.ok) {
                throw new Error(`DELETE request failed: ${reponse.statusText}`)
            }
            return {
                success: true, 
                message: "Resource deleted successfully"
            }
        }
        catch(error) {
            console.error("Error in DELETE:", error)
            throw error
        }
    }
}

document.addEventListener("DOMContentLoaded", async() => {
    const api = new HTTPRequest("https://jsonplaceholder.typicode.com")

    const userList = document.getElementById("user-list")
    const addUserForm = document.getElementById("add-user-form")
    const message = document.getElementById("message")

    async function loadUsers() {
        try {
            const users = await api.get("/users")
            userList.innerHTML = users
                .map((user) => `
                    <li>
                        ${user.name} (id=${user.id})
                        <button onclick="updateUser(${user.id}, "New name", "new.mail@exemple.com")">Modifier</button>
                        <button onclick="deleteUser(${user.id})">Supprimer</button>
                    </li>
                `)
                .join("")
        }
        catch(error) {
            console.error("Error loading users:", error)
        }
    }

    async function addUSer(event) {
        event.preventDefault()

        const name = addUserForm.name.value
        const mail = addUserForm.mail.value

        try {
            const newUser = await api.post("/users", {name, mail})
            message.textContent = `User ${newUser.name} (id=${newUser.id}) has been successfully added.`
            addUserForm.reset()
        }
        catch(error) {
            message.textContent = "Error adding user. Please try again."
            console.error("Error adding user:", error)
        }
    }

    async function updateUser(id, name, mail) {
        try {
            const updateUser = await api.put(`/users/${id}`, {name, mail})
            console.log(`User (id=${id}) updated successfully:`, updateUser)
        }
        catch(error) {
            console.error("Error updating user:", error)
        }
    }

    async function deleteUser(id) {
        try {
            const result = await api.delete(`/users/${id}`)
            console.log(result.message)
        }
        catch(error) {
            console.error("Error deleting user:", error)
        }
    }

    await loadUsers()
    addUserForm.addEventListener("submit", addUSer)
    updateUser(1, "Gaaab", "gab@cefim.com")
    deleteUser(11)
})