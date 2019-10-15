const list = document.getElementById("list");
const input = document.getElementById("input");
const subinput = document.getElementById("subinput");
const subtask = document.getElementById("sub-task");
const stepAside = document.getElementById("step-aside");
const stepAdd = document.getElementById("stepAdd");
const stepsList = document.getElementById("stepsList");
const updateSubTask = document.getElementById("stepAside");
let check = false;
let LIST = [];
let subid=0;
let stepId = 0;
let id=0;

/**
 * method to toggle the container to add steps 
 * @param {sub task Id to match and retrieve the data in subtask array} subId 
 */
function toggleStep(subId){
    let x = document.getElementById("step-aside").style.width;
    if(x == "0px"){
        document.getElementById("step-aside").style.width ="360px";
    } else {
        document.getElementById("step-aside").style.width ="360px";
        for(let j = 0;j<LIST.length;j++) {
            for(let i = 0;i < LIST[j].subArray.length;i++){
                if(LIST[j].subArray[i].id == subId){
                    document.getElementById("stepAside").value =  LIST[j].subArray[i].name
                    document.getElementById("subtask-title-id").textContent = LIST[j].subArray[i].id
                    if(LIST[j].subArray[i].check == true){
                        document.getElementById("stepAside").style.textDecoration ="line-through";  
                    } else{
                        document.getElementById("stepAside").style.textDecoration ="none";
                    }
                }
            }
       }
    }
}

/**
 * method to line through the done tasks
 * @param {sub task Id to match and retrieve the data in subtask array} subId 
 */
function lineThrough(subId){
    for(let j = 0;j<LIST.length;j++) {
        for(let i = 0;i < LIST[j].subArray.length;i++){
            if(LIST[j].subArray[i].id == subId){
                if(LIST[j].subArray[i].check == true){
                    document.getElementById("stepAside").style.textDecoration ="line-through";  
                } else{
                    document.getElementById("stepAside").style.textDecoration ="none";
                }
            }
        }
   }
}

/**
 * method to toggle the nav bar when menu icon clicked
 * @param {id from the nav bar element } toggle 
 */
function toggleSidebar(toogle){
    let availability = document.getElementById(toogle);
    document.getElementById(toogle).className = (availability.classList.contains("nav-open")) ? "nav nav-close" : "nav nav-open";
}

/**
 * method to toggle the nav bar when plus icon clicked
 * @param {id from the nav bar element } toggle 
 */
function taskMenu(toogle){
    document.getElementById(toogle).className = "nav nav-open";
}

/**
 * method to remove the firstchild of the task 
 * @param {task id to match and retrieve the data in task array } id 
 */
function subTaskView(id){
    while (subtask.firstChild) {
        subtask.removeChild(subtask.firstChild);
    }
    getIndexForId(id)
    for(let i = 0;i < LIST.length;i++){
        if(LIST[i].id==id){
            document.getElementById("task-title").textContent =  LIST[i].name;
            document.getElementById("task-title-id").textContent =  LIST[i].id;
        }
    }
}
/**
 * method to add the child for a particular task from object 
 * @param {task id to match and retrieve the data in task array } id 
 */
function getIndexForId(id) {
    for(let i= 0; i < LIST.length; i++){
        if(LIST[i].id==id) {
            for(let j = 0; j < LIST[i].subArray.length; j++) {
                addSubTask(LIST[i].subArray[j].name, LIST[i].subArray[j].id);
                if(LIST[i].subArray[j].check == true){
                    document.getElementsByName("check")[j].checked = true;
                    document.getElementsByName("status")[j].style.textDecoration ="line-through";
                }else {
                    document.getElementsByName("check")[j].checked = false;
                    document.getElementsByName("status")[j].style.textDecoration ="none";
                }
            }
        }
    }
}

/**
 * method to add the task 
 * @param {task name to print } text
 *  @param {id for the particular task } id
 */
function addTodo(text,id){
    const task = `<div class="task-list-align" id=${id} onclick="subTaskView(id)">
                  <i class=" ms-Icon ms-Icon--BulletedList2 iconSize-24 BulletedList-color"></i>
                  <span><li>
                    <p>${text} </p>
                  </li></span>
                  </li></span>
                  </div>`
    const position = "beforeend";
    list.insertAdjacentHTML(position,task);
}

/**
 * event listner to print task when enter key pressed 
 */
input.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        let subArray=[];
        if(toDo){
            addTodo(toDo,id);
            LIST.push(
                {
                name: toDo,
                id: id,
                subArray: subArray
                }
            );
            subTaskView(id)
            id++;
        }
        input.value = "";
        
    }
});

/**
 * method to remove the firstchild of the subtask 
 * @param {subtask id to match and retrieve the data in subtask array } subId 
 */
function stepChild(subId){
    while (stepsList.firstChild) {
        stepsList.removeChild(stepsList.firstChild);
    }
    getIndexForStepId(subId);
}

/**
 * method to add the child for a particular subtask from object 
 * @param {subtask id to match and retrieve the data in task array } subId 
 */
function getIndexForStepId(subId){
    for(let j = 0;j<LIST.length;j++) {
        for(let i = 0;i < LIST[j].subArray.length;i++){
            if(LIST[j].subArray[i].id==subId){
                for(let k = 0; k < LIST[j].subArray[i].stepArray.length; k++) {
                    addSteps(LIST[j].subArray[i].stepArray[k].name, LIST[j].subArray[i].stepArray[k].id);
                }
            }
        }
   }

}

/**
 * method to line through the text when checkbox is clicked
 * @param {subtask id to match and retrieve the data in task array } subId 
 */
function taskDone(subId) {
    for(let i = 0;i<LIST.length;i++){
        for(let j = 0;j<LIST[i].subArray.length;j++){
            if(LIST[i].subArray[j].id == subId){
                if(LIST[i].subArray[j].check == false){
                    LIST[i].subArray[j].check = true;
                    document.getElementsByName("status")[j].style.textDecoration ="line-through";
                    lineThrough(subId);
                }else {
                    LIST[i].subArray[j].check  = false;
                    document.getElementsByName("status")[j].style.textDecoration ="none";
                    lineThrough(subId);
                }
            }
        }
    }
}

/**
 * method to add the subtask 
 * @param {subtask name to print } subTask
 *  @param {id for the particular subtask } subId
 */
function addSubTask(subTask,subId){
    const subTaskText  = `<li>
                          <div class ="disp-inline">
                          <input type="checkbox" name="check" id=${subId} onclick="taskDone(id)"/>
                          <div  id=${subId} onclick="toggleStep(id)">
                          <p id=${subId} name="status" onclick="stepChild(id)">${subTask}</p>
                          </div>
                          </div>
                        </li>`
    const position = "beforeend";
    subtask.insertAdjacentHTML(position,subTaskText);
}

/**
 * event listner to print subtask when enter key pressed 
 */
subinput.addEventListener("keyup",function(event){
    if(event.keyCode == 13) {
        const subTask = subinput.value; 
        let stepArray = [];
        let taskId = document.getElementById("task-title-id").textContent;
        for(let i = 0;i < LIST.length;i++){
            if(LIST[i].id == taskId){
                if(subTask){
                    LIST[i].subArray.push(
                    {
                    name: subTask,
                    id: subid,
                    taskid: LIST[i].id,
                    check: check,
                    stepArray: stepArray
                    }
                    ); 
            addSubTask(subTask,subid,LIST[i].id,check)
            subid++
        }

    }   
        subinput.value = "";
    }
}
})

/**
 * method to add the steps 
 * @param {step name to print } step
 */
function addSteps (step){
    const stepText  = `<li>
                          <p>${step}</p>
                        </li>`
    const position = "beforeend";
    stepsList.insertAdjacentHTML(position,stepText);
}

/**
 * event listner to print step when enter key pressed 
 */
stepAdd.addEventListener("keyup",function(event){
    if(event.keyCode == 13) {
        const step = stepAdd.value;
        let subTaskId = document.getElementById("subtask-title-id").textContent;
        for(let i = 0;i < LIST.length;i++){
            for(let j = 0;j < LIST[i].subArray.length;j++) {
            if(LIST[i].subArray[j].id == subTaskId){
                if(step){
                    LIST[i].subArray[j].stepArray.push(
                    {
                    name: step,
                    id: stepId,
                    subTaskId: subTaskId
                    }
                    );
            addSteps(step,stepId,subTaskId);
            stepId++;
        }

    }   
        stepAdd.value = "";
    }
    }    
    }
})
