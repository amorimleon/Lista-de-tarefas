const tasks = [
  {
    title: "Comprar comida para o gato",
    type: "Urgente",
  },
  {
    title: "Consertar Computador",
    type: "Prioritário",
  },
  {
    title: "Beber água",
    type: "Normal",
  }
];

// tasks[1].title.indexOf(tasks[1].title)

function createCard(taskInfo) {
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

  // Adicionando icone ao botão
  buttonDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  //criando evento botão deletar
  buttonDelete.addEventListener("click", function (e) {
    let index = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].title == taskInfo.title) {
        index = i;
        console.log(e.target.parentElement);
      }
    }
    tasks.splice(index, 1);
    renderElements(tasks);
  });

  /// Adicionando a div e o botão de deletar ao list item
  taskCardItem.appendChild(taskCardContent);
  taskCardItem.appendChild(buttonDelete);

  return taskCardItem;
}

function renderElements(taskList) {
  const htmlList = document.querySelector(".tasks");
  htmlList.innerHTML = "";

  // Ajustar a lógica

  for (let i = 0; i < tasks.length; i++) {
    let card = createCard(taskList[i]);
    htmlList.appendChild(card);
  }
}

let button = document.querySelector("#btnSubmit");

button.addEventListener("click", function (e) {
  e.preventDefault();

  // Pegandoo a Tarefa
  let titulo = document.getElementById("input_title");

  let valueTitle = titulo.value;

  // PEGANDO PRIORIDADE
  let prioridade = document.querySelector("#input_priority");
  let valuePriority = prioridade.value;

  tasks.push({ title: valueTitle, type: valuePriority });

  renderElements(tasks);
  titulo.value = "";
});

// chamando o input de pesquisa

const inputPesquisa = document.querySelector("#pesquisa");
// colocando um evento no input
inputPesquisa.addEventListener("input", function (e) {
  let textoInput = e.target.value;
//filtrando os titulos do array
  const meuNovoArray = tasks.filter((itens) => {
    //verificadno se o que tem no array é igual ao que está no input
    let textPesquisado = itens.title.includes(textoInput);

    return textPesquisado;
  });
  // passando o novo array como parametro.
  renderElements(meuNovoArray);
});

renderElements(tasks);
