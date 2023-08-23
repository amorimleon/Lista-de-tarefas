let tasks = [];


const createCard = (taskInfo, index) => {
  // Criando elementos necessários
  const taskCardItem = document.createElement("li");
  const taskCardContent = document.createElement("div");
  const taskTitle = document.createElement("span");
  const taskDescription = document.createElement("p");

  // Adicionando o titulo da tarefa como texto do paragrafo
  taskDescription.innerText = taskInfo.title;

  // Adicionando span e paragrafo a div
  taskCardContent.appendChild(taskTitle);
  taskCardContent.appendChild(taskDescription);
  // taskCardContent.appendChild(buttonTrash);
  //Adicionando classe ao span

  if (taskInfo.type == "Urgente") {
    taskTitle.classList.add("span-urgent");
  } else if (taskInfo.type == "Prioritário") {
    taskTitle.classList.add("span-priority");
  } else {
    taskTitle.classList.add("span-normal");
  }

   // Criando botão para deletar tarefa
   const buttonDelete = document.createElement("button");
  
   // adicionando id
   buttonDelete.classList.add('deleteBtt')
   buttonDelete.id = index
   // Adicionando icone ao botão
  buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  /// Adicionando a div e o botão de deletar ao list item
  taskCardItem.appendChild(taskCardContent);
  taskCardItem.appendChild(buttonDelete);

  return taskCardItem;
}

const renderTask = (taskList) => {
  const htmlList = document.querySelector(".tasks");
  htmlList.innerHTML = "";

  // Ajustar a lógica   
  
  for (let i = 0; i < taskList.length; i++) {
    
    const card = createCard(taskList[i],i);
    htmlList.appendChild(card);
  }


}

const addTask = ()=>{
  const button = document.querySelector("#btnSubmit");

  button.addEventListener("click", function (e) {
    e.preventDefault();
  
    // Pegandoo a Tarefa
    let titulo = document.getElementById("input_title");
  
    let valueTitle = titulo.value;
    
    // PEGANDO PRIORIDADE
    let prioridade = document.querySelector("#input_priority");
    let valuePriority = prioridade.value;
  
    const push = tasks.push({ title: valueTitle, type: valuePriority });

    localStorage.setItem('tasksList', JSON.stringify(tasks))
    
    renderTask(tasks);
    removeTask()
    titulo.value = "";
    return push
  });
}

const removeTask = ()=>{

  const deleteButton = document.querySelectorAll(".deleteBtt")
  //criando evento botão deletar

  deleteButton.forEach((btt)=>{

    btt.addEventListener("click",(e)=> {
      
      console.log(e)
      let index = 0;
      for (let i = 0; i < tasks.length; i++) {
        tasks.splice(index, 1);

        console.log(tasks)
        renderTask(tasks);
      }
      localStorage.setItem('tasksList', JSON.stringify(tasks))

      if(tasks.length === 0){
        localStorage.clear()
      }
      removeTask(tasks)
    });
  })

}

const filterTask = ()=>{

  // chamando o input de pesquisa
  
  const inputPesquisa = document.querySelector("#pesquisa");
  // colocando um evento no input
  inputPesquisa.addEventListener("input", function (e) {
    let textoInput = e.target.value.toLowerCase();
    // textoInput.
    //filtrando os titulos do array
    const meuNovoArray = tasks.filter((itens) => {
      //verificadno se o que tem no array é igual ao que está no input
      let textPesquisado = itens.title.toLowerCase().includes(textoInput);
      
      console.log(itens)
      return textPesquisado;
    });
    // passando o novo array como parametro.
    renderTask(meuNovoArray);
  });
}

const readLocalStorage = ()=>{
  const getArray = localStorage.getItem('tasksList')

  if(getArray){
    const arrayParse = JSON.parse(getArray);

    arrayParse.forEach(task => 
      tasks.push(task))

    renderTask(tasks)

  }
  
}


addTask()
readLocalStorage()
removeTask()
filterTask()  