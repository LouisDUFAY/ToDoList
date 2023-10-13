import { tasksList, editMenu, editTitle, editDate, editDescription, btnEnregistrer, taskLists, activeTaskList, lastActiveTaskList, editLastActiveTaskList} from "./main.js";

export function addTask(){
    const textInputAddTask = document.querySelector(".taskTitle");

    

    //création de la nouvelle tâche
    const task = {
        id : tasksList.length,
        title : textInputAddTask.value !== "" ? textInputAddTask.value : "Nouvelle tâche",
        description : null,
        echeance: formaterDate(new Date()),
        complete : Boolean(false),
        importantes : Boolean(false),

        get aVenir() {
            let dateDuJour = new Date();
            return new Date(this.echeance) > dateDuJour;
        }
    }

    //ajouter la nouvelle tâche à la liste des tâches.
    tasksList.push(task);
    console.log(taskLists.all)
    renderTasks(activeTaskList);
    
    textInputAddTask.value ="";
}

//afficher les tâches non terminée à l'écran.
export function renderTasks(tasksToRender){

    taskLists.all = tasksList;
    taskLists.termine = tasksList.filter((task) => task.complete === Boolean(true));
    taskLists.aVenir = tasksList.filter((task) => task.aVenir === Boolean(true));

    const completeTasksContainer = document.querySelector(".tasksContainer.complete");
    const tasksContainer = document.querySelector(".tasksContainer");
    let containerToRender = completeTasksContainer;
    tasksContainer.innerHTML ="";
    containerToRender.innerHTML = "";

    if(tasksToRender){
        tasksToRender.forEach(element => {
            
            if(element.complete){
                containerToRender = completeTasksContainer;
            }else{
                containerToRender = tasksContainer;
            }

            //nouvelle tâche
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            //bouton de validation
            const btnValidation = document.createElement("img");
            btnValidation.classList.add("btnValidation");
            btnValidation.src = "Ressources/Icons/check-svgrepo-com.svg";
            btnValidation.setAttribute("height", "30px");
            
            btnValidation.addEventListener("click", () => markComplete(element));

            //Information sur la tâche
            const taskInfo = document.createElement("div");
            taskInfo.classList.add("taskInfo");
            taskInfo.addEventListener("click", () => showEditMenu(element))
            
            const title = document.createElement("div");
            title.textContent = element.title;

            const echeance = document.createElement("div");
            echeance.classList.add("echeanceContainer");

            const calendar = document.createElement("img");
            calendar.src = "Ressources/Icons/calendar-svgrepo-com.svg";
            calendar.setAttribute("height", "12px");

            const dateEcheance = document.createElement("p")
            dateEcheance.innerText = element.echeance;
            

            const btnDelete = document.createElement("img");
            btnDelete.classList.add("btnDelete");
            btnDelete.src = "Ressources/Icons/cross-svgrepo-com.svg";
            btnDelete.setAttribute("height", "30px");
            btnDelete.dataset.id = element.id;
            btnDelete.addEventListener("click", () => deleteTask(element.id));

            containerToRender.appendChild(newTask);

            newTask.appendChild(btnValidation);
            newTask.appendChild(taskInfo);
            newTask.appendChild(btnDelete);

            taskInfo.appendChild(title);
            taskInfo.appendChild(echeance);

            echeance.appendChild(calendar);
            echeance.appendChild(dateEcheance);

            
        });

        editLastActiveTaskList(tasksToRender);

    }
    
}

//Supprime une tâche
function deleteTask(id){
    activeTaskList.splice(id,1);
    indexTaskList();
    renderTasks(activeTaskList);
}

//Marque une tâche comme terminé.
function markComplete(element){
    element.complete = true;
    renderTasks(activeTaskList);
}

//Re-index toutes les tâches
function indexTaskList(){
    let index = 0;
    activeTaskList.forEach(element => {
        element.id = index;
        index++;
    })
}

//Affiche le menu de modification des tâches
export function showEditMenu(element){
    editMenu.style.visibility = "visible";
    editMenu.style.transform = "translate(0%)";
    fillEditMenu(element);
}

//ferme le menu d'édition des tâches
export function closeEditMenu(){
    editMenu.style.transform = "translate(110%)";
}

//pré-rempli le menu d'édition avec les informations de la tâche.
function fillEditMenu(element){
    editTitle.value = element.title;
    btnEnregistrer.dataset.elementId = element.id;
    editDate.value = element.echeance;
    editDescription.value = element.description;
}

function formaterDate(date) {
    const jour = String(date.getDate()).padStart(2, '0');
    const mois = String(date.getMonth() + 1).padStart(2, '0');
    const annee = date.getFullYear();
    
    return `${annee}-${mois}-${jour}`;
  }