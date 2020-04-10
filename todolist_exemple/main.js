var todoItems = JSON.parse(localStorage.getItem("todoStorage"));
console.log(todoItems);
var parent = document.getElementById("todo");
var input = document.querySelector(".todoForm input");
function initialize(){
    input.value = "";
    for(var i=0; i<todoItems.length; i++){
        createTodoItem(todoItems[i], true);
    }
}
initialize();
function createTodoItem(todoText, isStart){
    if(input.value != "" || isStart){
        // récupérer input
        if(input.value != ""){
            todoItems.push(input.value);
            // sauvegarder ma nouvelle todo Items
            localStorage.setItem("todoStorage", JSON.stringify(todoItems));
        }
        // Création de la div "finale"
        var newTodoItem = document.createElement("div");
        // Creation de nouveaux éléments HTML
        var check = document.createElement("input");
        check.type = "checkbox";
        var texte = document.createElement("p");
        texte.innerHTML = todoText;
        var todoActions = document.createElement("div");
        var mod = document.createElement("i");
        var suppr = document.createElement("i");
        // Attribution de styles
        newTodoItem.className = "todoItem";
        todoActions.className = "todoActions";
        mod.className = "fa fa-edit";
        suppr.className = "fas fa-times";
        // Ajouter dynamiquement des écouteurs d'évenements
        suppr.addEventListener("click", deleteTodoItem);
        // Ajout des éléments au DOM
        todoActions.appendChild(mod);
        todoActions.appendChild(suppr);
        newTodoItem.appendChild(check);
        newTodoItem.appendChild(texte);
        newTodoItem.appendChild(todoActions);
        parent.appendChild(newTodoItem);
    }
}
function deleteTodoItem(event){
    // supprimer l'élément du HTML
    var btnSupprimer = event.target;
    var divASupprimer = btnSupprimer.parentNode.parentNode;
    parent.removeChild(divASupprimer);
    // supprimer l'élément du tableau
    var chaineATrouver = divASupprimer.childNodes[1].innerHTML;
    var index = todoItems.indexOf(chaineATrouver);
    todoItems.splice(index, 1);
    localStorage.setItem("todoStorage", JSON.stringify(todoItems));
}
var bouton = document.querySelector(".btnValider");
bouton.addEventListener("click", function(){ createTodoItem(input.value, false) });