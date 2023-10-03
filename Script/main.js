// créer, supprimer, modifier tâches
// tâche : Titre, description, échéance.
// Marqué les tâches comme importantes, terminées
// la couleur du fond de la tâche devient rouge quand l'échéance approche
// Trier les tâches par date d'échéance, de la plus proche à la plus lointaine.
// Créer des catégories personnalisé pour ses tâches avec un fond de couleur personnalisé.
// filtrer les tâches par catégories.

//Liste des tâches au centre ==> par défaut par ordre chronologique (tâche à venir)
//nav bar à gauche pour consulter les tâches à venir, importantes, terminés, 
//Récupération des différents boutons
import{ addTask, renderTasks, closeEditMenu} from "./task.js";

const btnAddTask = document.querySelector(".btnAddTask");
const form = document.querySelector(".addTaskForm");

export const editMenu = document.querySelector(".editContainer");
const btncloseEditMenu = document.querySelector(".btnClose");
btncloseEditMenu.addEventListener("click", ()=>closeEditMenu())

export const editTitle = document.querySelector(".titleContainer input[type='text']");
export const editDate = document.querySelector(".dateContainer input[type='date']");
export const editDescription = document.querySelector(".descriptionContainer textarea");
console.log(editTitle);
console.log(editDate);
console.log(editDescription);

export let tasksList = []

btnAddTask.addEventListener("click", () => addTask());
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
}, {capture : true})

renderTasks();