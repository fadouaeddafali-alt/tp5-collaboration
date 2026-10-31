


const students = [

    {
        matricule: "ET001",
        nom: "Alami",
        prenom: "Sara",
        age: 20,
        filiere: "Génie Informatique"
    },

    {
        matricule: "ET002",
        nom: "Benali",
        prenom: "Youssef",
        age: 21,
        filiere: "Cybersecurity"
    },

    {
        matricule: "ET003",
        nom: "Idrissi",
        prenom: "Imane",
        age: 19,
        filiere: "Développement Informatique"
    },

    {
        matricule: "ET004",
        nom: "Tazi",
        prenom: "Amine",
        age: 22,
        filiere: "Génie Informatique"
    },

    {
        matricule: "ET005",
        nom: "Alaoui",
        prenom: "Salma",
        age: 20,
        filiere: "Cybersecurity"
    },

    {
        matricule: "ET006",
        nom: "Berrada",
        prenom: "Hamza",
        age: 23,
        filiere: "Développement Informatique"
    },

    {
        matricule: "ET007",
        nom: "Rahmani",
        prenom: "Nadia",
        age: 19,
        filiere: "Génie Informatique"
    },

    {
        matricule: "ET008",
        nom: "Mansouri",
        prenom: "Omar",
        age: 21,
        filiere: "Cybersecurity"
    }

];



const searchInput =
    document.getElementById("searchInput");

const filterFiliere =
    document.getElementById("filterFiliere");

const studentsTableBody =
    document.getElementById("studentsTableBody");

const totalStudents =
    document.getElementById("totalStudents");

const visibleStudents =
    document.getElementById("visibleStudents");

const emptyMessage =
    document.getElementById("emptyMessage");



function normalizeText(text) {

    return String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}

function filterStudents() {

   
    const searchValue =
        normalizeText(searchInput.value);

   
    const selectedFiliere = filterFiliere.value;

   
    return students.filter(student => {

        const studentInformation = normalizeText(
            student.nom + " " +
            student.prenom + " " +
            student.matricule + " " +
            student.filiere
        );

        
        const matchesSearch =
            studentInformation.includes(searchValue);

       
        const matchesFiliere =
            selectedFiliere === "all" ||
            student.filiere === selectedFiliere;

        return matchesSearch && matchesFiliere;

    });

}




function displayStudents(filteredStudents) {

    
    studentsTableBody.innerHTML = "";

   
    filteredStudents.forEach(student => {

       
        const row = document.createElement("tr");

        
        const values = [
            student.matricule,
            student.nom,
            student.prenom,
            student.age
        ];

        values.forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

       
        const filiereCell = document.createElement("td");

        const badge = document.createElement("span");

        badge.className = "filiere-badge";

        badge.textContent = student.filiere;

        filiereCell.appendChild(badge);

        row.appendChild(filiereCell);

        // Ajouter la ligne au tableau
        studentsTableBody.appendChild(row);

    });

}




function updateCounters(filteredStudents) {

    // Nombre total des etudiants
    totalStudents.textContent = students.length;

    // Nombre des resultats affiches
    visibleStudents.textContent = filteredStudents.length;

}



function updateEmptyMessage(filteredStudents) {

    if (filteredStudents.length === 0) {

        emptyMessage.hidden = false;

    } else {

        emptyMessage.hidden = true;

    }

}




function renderStudents() {

    const filteredStudents = filterStudents();

    displayStudents(filteredStudents);

    updateCounters(filteredStudents);

    updateEmptyMessage(filteredStudents);

}




searchInput.addEventListener("input", function() {

    renderStudents();

});



filterFiliere.addEventListener("change", function() {

    renderStudents();

});

function updateStats(list) {
    // Âge moyen
    const avg = list.length
        ? Math.round(list.reduce((sum, s) => sum + s.age, 0) / list.length)
        : 0;
    document.getElementById("averageAge").textContent = avg + " ans";

    // Nombre de filières distinctes
    const filieres = new Set(list.map(s => s.filiere));
    document.getElementById("activeFilieres").textContent = filieres.size;
}

updateStats(students);
renderStudents();
