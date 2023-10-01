import { tasksList } from "./main.js";

export function addTask(){

    const textInputAddTask = document.querySelector(".taskTitle");

    
    //création de la nouvelle tâche
    const task = {
        //id : tasksList.length + 1,
        title : textInputAddTask.value !== "" ? textInputAddTask.value : "Nouvelle tâche",
        description : null,
        echeance: null,
    }

    //ajouter la nouvelle tâche à la liste des tâches.
    tasksList.push(task);
    console.log(task)
    renderTasks(tasksList);
    textInputAddTask.value ="";
    //récupérer le json en local storage ==> parse it
    //ajouter nouvelle task à cette liste ==> stringify

    
}

export function renderTasks(){
    const tasksContainer = document.querySelector(".tasksContainer");
    tasksContainer.innerHTML ="";
    if(tasksList){
        let index = 0;
        tasksList.forEach(element => {
            //nouvelle tâche
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            //bouton de validation
            const btnValidation = document.createElement("img");
            btnValidation.classList.add("btnValidation");
            btnValidation.src = "Ressources/Icons/check-svgrepo-com.svg"
            btnValidation.setAttribute("height", "30px");

            //Information sur la tâche
            const taskInfo = document.createElement("div");
            taskInfo.classList.add("taskInfo");
            
            const title = document.createElement("div");
            title.textContent = element.title;

            const echeance = document.createElement("div");
            echeance.classList.add("echeanceContainer");

            const calendar = document.createElement("img");
            calendar.src = "Ressources/Icons/calendar-svgrepo-com.svg";
            calendar.setAttribute("height", "10px");

            const btnDelete = document.createElement("img");
            btnDelete.classList.add("btnDelete");
            btnDelete.src = "Ressources/Icons/cross-svgrepo-com.svg";
            btnDelete.setAttribute("height", "30px");

            tasksContainer.appendChild(newTask);

            newTask.appendChild(btnValidation);
            newTask.appendChild(taskInfo);
            newTask.appendChild(btnDelete);

            taskInfo.appendChild(title);
            taskInfo.appendChild(echeance);

            echeance.appendChild(calendar);

            index++;
        });
    }

    
    console.log(tasksList)
    
}

//ajouter un id au boutton supprimer