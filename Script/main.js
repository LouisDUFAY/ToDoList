// Marqué les tâches comme importantes, terminées
// la couleur du fond de la tâche devient rouge quand l'échéance approche
// Trier les tâches par date d'échéance, de la plus proche à la plus lointaine.
// Créer des catégories personnalisé pour ses tâches avec un fond de couleur personnalisé.
// filtrer les tâches par catégories.

//Liste des tâches au centre ==> par défaut par ordre chronologique (tâche à venir)
//nav bar à gauche pour consulter les tâches à venir, importantes, terminés, 
//Récupération des différents boutons
import{ addTask, renderTasks, closeEditMenu, } from "./task.js";

const btnAddTask = document.querySelector(".btnAddTask");
const form = document.querySelector(".addTaskForm");

export const editMenu = document.querySelector(".editContainer");
const btncloseEditMenu = document.querySelector(".btnClose");
btncloseEditMenu.addEventListener("click", ()=>closeEditMenu());

//Champ d'edition des tâches
export const editTitle = document.querySelector(".titleContainer input[type='text']");
export const editDate = document.querySelector(".dateContainer input[type='date']");
export const editDescription = document.querySelector(".descriptionContainer textarea");
const inputContainer = document.querySelectorAll(".inputContainer")

export let tasksList = [];

export let taskLists = {
    all : [],
    termine : [],
    aVenir : [],
    importantes : [],
}

export let activeTaskList = taskLists.all;
export let lastActiveTaskList = activeTaskList;
let lastId = "all";

export function editLastActiveTaskList(value){
    lastActiveTaskList = value;
}

//Sauvegarde des modifications via le formulaire de modification
export const btnEnregistrer = document.querySelector(".btnEnregistrer");
btnEnregistrer.addEventListener("click", (e) => {
    let elementId = e.target.dataset.elementId;
    let elementToEdit = activeTaskList.find((task) => task.id === parseInt(elementId));
    
    editTitle.value !== "" ? elementToEdit.title = editTitle.value : elementToEdit.title = "--";
    editDate.value !== null ? elementToEdit.echeance = editDate.value : elementToEdit.echeance = elementToEdit.echeance;
    editDescription.value !== "" ? elementToEdit.description = editDescription.value : elementToEdit.description = elementToEdit.description;
    
    renderTasks(activeTaskList);
});


btnAddTask.addEventListener("click", () => {
    if(lastId === "all"){
        activeTaskList = taskLists.all;
    }
    addTask()
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(lastId === "all"){
        activeTaskList = taskLists.all;
    }
    addTask();
}, {capture : true});


//Bouton filtres
inputContainer.forEach((element) => {
    element.addEventListener("click", (e) => {

        switch (e.target.id) {
            case "all":
                lastId = "all";
                activeTaskList = taskLists.all;
                break;
            case "aVenir":
                lastId = "aVenir"
                activeTaskList = taskLists.aVenir;
                break;
            case "importantes":
                lastId = "importantes";
                activeTaskList = taskLists.importantes;
                break;
            default:
                break;
        }

        renderTasks(activeTaskList);

        console.log(e.target.id);
        
    })
})

console.log(taskLists.all, "yo");
renderTasks(activeTaskList);