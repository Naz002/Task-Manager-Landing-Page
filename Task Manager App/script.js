

const input = document.querySelector("#task-input");
const Button = document.querySelector("#add-btn");
const TaskList= document.querySelector(".task-list");
const SavedTask = JSON.parse(localStorage.getItem("tasks")) || []

const allTaskCard = document.querySelector("#all-task");
const pendingCard = document.querySelector("#pending");
const completedCard = document.querySelector("#completed")

const allBtn = document.querySelector("#all-btn")
const pendingBtn = document.querySelector("#pending-btn")
const completedBtn = document.querySelector("#completed-btn")

const searchInput = document.querySelector("#search-input")
const dueDateInput = document.querySelector("#due-date")
const PriorityInput = document.querySelector("#priority")

const sortPriorityBtn = document.querySelector("#sort-by-priority")
const sortDateBtn = document.querySelector("#sort-date-btn");

sortDateBtn.addEventListener("click", function(){
   sortByDate()
})

sortPriorityBtn.addEventListener("click", function(){
   sortByPriority()
})

searchInput.addEventListener("input",function(){
   const searchText = searchInput.value.toLowerCase();
   TaskList.innerHTML = ""

   const filteredTask = SavedTask.filter(function(task){
      return task.text.toLowerCase().includes(searchText)
   })
   filteredTask.forEach(function(task){
      createTask(task.text, task.completed, task.dueDate, task.priority)
   })
})



allBtn.addEventListener("click", function(){
   showAllTask()
})
pendingBtn.addEventListener("click", function(){
   pendingTask()
})
completedBtn.addEventListener("click", function(){
   showCompletedTask()
})

Button.addEventListener("click", function(){

     if (input.value.trim() === ""){
      return;
   }
   createTask(input.value, false, dueDateInput.value, PriorityInput.value)
   console.log(dueDateInput.value)
   SavedTask.push({
      text:input.value,
      completed: false,
      date:new Date().toDateString(),
      dueDate: dueDateInput.value,
      priority: PriorityInput.value
       
   })
 
   localStorage.setItem(
      "tasks",
      JSON.stringify(SavedTask)
     
   );
      updateStats()

   input.value = ""
   dueDateInput.value = ""
   PriorityInput.value = ""
}
)

input.addEventListener("keydown", function(event){
   console.log(event.key)
   if(event.key === "Enter"){
      Button.click()
   }
})


function createTask(taskText , completed = false, dueDate, priority){

     let priorityColor =  "";
   

   if(priority?.trim().toLowerCase() === "high"){
      priorityColor ="red"
   }
    else if(priority?.trim().toLowerCase() === "medium"){
    priorityColor = "#FFA500"
    }
    else if(priority?.trim().toLowerCase() === "low"){
    priorityColor = "green"
    }
    
    const today = new Date()
    today.setHours(0,0,0,0)

    const taskDate = new Date(dueDate)
    if(dueDate){

    taskDate.setHours(0,0,0,0)
    }
    console.log(dueDate, taskDate)


    const task = document.createElement("div");
    task.classList.add("task")

           if(completed){
      task.classList.add("completed")
   }
      if(dueDate && taskDate < today && !completed){
         task.classList.add("overdue")
      }
  

function createTask(taskText , completed = false, dueDate, priority){

     let priorityColor =  "";
   

   if(priority?.trim().toLowerCase() === "high"){
      priorityColor ="red"
   }
    else if(priority?.trim().toLowerCase() === "medium"){
    priorityColor = "#FFA500"
    }
    else if(priority?.trim().toLowerCase() === "low"){
    priorityColor = "green"
    }
    
    const today = new Date()
    today.setHours(0,0,0,0)

    const taskDate = new Date(dueDate)
    if(dueDate){

    taskDate.setHours(0,0,0,0)
    }
    console.log(dueDate, taskDate)


    const task = document.createElement("div");
    task.classList.add("task")

           if(completed){
      task.classList.add("completed")
   }
      if(dueDate && taskDate < today && !completed){
         task.classList.add("overdue")
      }
      //task.classList.add("task")


   task.innerHTML = `
   
 <div class = "task-info">
   <span>${taskText}</span>
   <p>Due: ${dueDate || "No date"}</p>
   <p style = "color: ${priorityColor}">
      Priority: ${priority|| "No priority"}
      </p>
      </div>
         <div class = "task-buttons">
         <button class="complete-btn">Complete</button>
         <button class="edit-btn">Edit</button>
         <button class="hide-btn">Hide</button>
         <button class="delete-btn">Delete</button>
      </div>
   `;

 
   TaskList.appendChild(task)



   task.innerHTML = `
   
 <div class = "task-info">
   <span>${taskText}</span>
   <p>Due: ${dueDate || "No date"}</p>
   <p style = "color: ${priorityColor}">
      Priority: ${priority|| "No priority"}
      </p>
      </div>
         <div class = "task-buttons">
         <button class="complete-btn">Complete</button>
         <button class="edit-btn">Edit</button>
         <button class="hide-btn">Hide</button>
         <button class="delete-btn">Delete</button>
      </div>
   `;

 
   TaskList.appendChild(task)

   }

}

   SavedTask.forEach(function(task){
   createTask(task.text, task.completed, task.dueDate, task.priority)
})
updateStats()

TaskList.addEventListener("click", function(event){
   if(event.target.classList.contains("complete-btn")){
      const task = event.target.closest(".task") 
      const taskText = task.querySelector("span").textContent 
      const index  = SavedTask.findIndex(function(item){
         return item.text === taskText;
      });
         SavedTask[index].completed = true;
         localStorage.setItem(
            "tasks",
            JSON.stringify(SavedTask)
         );
      
      task.classList.add("completed")
         updateStats()
      console.log(task.outerHTML)
   }
   if (event.target.classList.contains("edit-btn")){

  
      const task = event.target.closest(".task")
      const taskText = task.querySelector("span").textContent
      const index = SavedTask.findIndex(function(item){
         return item.text === taskText
      })

   
      console.log(index)
      console.log(SavedTask[index])
      input.value = SavedTask[index].text
      dueDateInput.value =SavedTask[index].dueDate
      PriorityInput.value = SavedTask[index].priority
 
   }
     
   
   
   if (event.target.classList.contains("hide-btn")){
      event.target.closest(".task").style.display = "none"
   }

   if (event.target.classList.contains("delete-btn")){
      const confirmDelete = confirm(
         "This task will be permanantly deleted. Continue"
      );
      if (!confirmDelete){
         return;
      }
      const task  = event.target.closest(".task");

      const taskText = task.querySelector("span").textContent;

      const index = SavedTask.findIndex(function(task){
         return task.text === taskText;
      })
      SavedTask.splice(index, 1);

      localStorage.setItem(
         "tasks",
         JSON.stringify(SavedTask)
      

      )
      task.remove()
      updateStats()
         showAllTask()
   }
})
function updateStats(){
   const allTask = SavedTask.length;

   const completedTask = SavedTask.filter(function(task){
      return task.completed
   }).length
   const pendingTask = allTask - completedTask;

   allTaskCard.textContent = allTask;
   pendingCard.textContent = pendingTask;
   completedCard.textContent = completedTask;


}


   function showCompletedTask(){
      TaskList.innerHTML = ""

const completedTask = SavedTask.filter(function(task){
   return task.completed
})
completedTask.forEach(function(task){
   createTask(task.text, task.completed, task.dueDate, task.priority)
})

   }

function pendingTask(){
   TaskList.innerHTML=""

   const pendingTask = SavedTask.filter(function(task){
      return task.completed === false
   });

   pendingTask.forEach(function(task){
      createTask(task.text, task.completed, task.dueDate, task.priority)
   })
}
function showAllTask(){
   TaskList.innerHTML=""

   SavedTask.forEach(function(task){
      createTask(task.text, task.completed, task.dueDate, task.priority)
   })
}

function sortByPriority(){
   TaskList.innerHTML = ""

   const sortedTasks = [...SavedTask]

   sortedTasks.sort(function(a, b){
      const priorityOrder = {
         High: 1,
         Medium: 2,
         Low: 3
      }

      return priorityOrder[a.priority] - priorityOrder[b.priority]
   })

   sortedTasks.forEach(function(task){
      createTask(
         task.text,
         task.completed,
         task.dueDate,
         task.priority
      )
   })
}
function sortByDate(){
   TaskList.innerHTML = ""

   const sortedTasks = [...SavedTask]

   sortedTasks.sort(function(a, b){
      return new Date(a.dueDate) - new Date(b.dueDate)
   });

   sortedTasks.forEach(function(task){
      createTask(
         task.text,
         task.completed,
         task.dueDate,
         task.priority
      )
   })
}