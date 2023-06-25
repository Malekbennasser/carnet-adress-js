let form = document.getElementById("contacts");
let inputNom = document.getElementById("inputNom");
let inputPrenom = document.getElementById("inputPrenom");
let inputEmail = document.getElementById("inputEmail");
let inputNumero = document.getElementById("inputNumero");
let buttonSave = document.getElementById("button");
let messages = document.getElementById("message");
let ulContainer = document.querySelector(".ulContainer");
let liste = document.querySelector(".liste");
let boutonRechercher = document.querySelector(".rechercher");
let nomRechercher = document.querySelector(".saisie");
let sortFilter = document.querySelector(".sortFilter");
let contacts = [];

if (localStorage.length === 0) {
  contacts = [];
} else {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  render(contacts);
}

/**function render() {
  let li = "";
  let button;
  contacts.forEach((Element, index) => {
    li = document.createElement("li");
    li.innerText =
      Element.inputNom +
      Element.inputPrenom +
      Element.inputEmail +
      Element.inputNumero;

    button = document.createElement("button");
    button.innerText = "supprimer";
    button.addEventListener("click", () => {
      contacts.splice(index, 1);
      
      console.log(contacts);
    });
  });
  li.appendChild(button);
  ulContainer.appendChild(li);
}*/
function render(array) {
  // On initialise li à vide
  let li = "";
  // On boucle sur notre tableau contactsArray
  array.forEach((element, index) => {
    // pour chaque élément de contactArray j'ajoute à li une ligne comme ci-dessous
    li =
      li +
      `<li> ${element.inputNom} ${element.inputPrenom} ${element.inputEmail} ${element.inputNumero}  ${element.date} <button class="deleteButton">Supprimer</button></li>`;
    // Fin de la boucle du tableau
  });
  // A l'intérieur de mon container j'affiche ma variable li
  ulContainer.innerHTML = li;
  // Je récupère tout mes boutons supprimer qui ont été crée juste au dessus ligne 14
  let allButton = document.querySelectorAll(".deleteButton"); // result : [button1,button2,button3]

  // On commenche la boucle des boutons
  allButton.forEach((element, index) => {
    // Pour chaque bouton je déclenche un event qui:
    element.addEventListener("click", () => {
      // Supprimer à l'intérieur du tableau contactArray l'index selectionné au moment du click

      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      // On raffraichit le composant render
      render(contacts);
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data = new FormData(form);
  let date = new Date(Date.now());
  let contact = new Contact(
    data.get("Nom"),
    data.get("Prenom"),
    data.get("Email"),
    data.get("Phone"),
    date
  );

  /*let contact = {
    inputNom: ,
    inputPrenom: 
    inputEmail: ,
    inputNumero: ,
    message: function () {
      return (
        "le contact" +
        " " +
        this.inputNom +
        " " +
        this.inputPremon +
        " " +
        "a été créé"
      );
    },
    date: date,
  };*/

  contacts.push(contact);
  form.reset(); // pour reinsaliser le formulaire

  //messages.innerText = contact.message();
  console.log(contacts);
  inputNom = "";
  inputPrenom = "";
  inputEmail = "";
  inputNumero = "";
  localStorage.setItem("contacts", JSON.stringify(contacts));
  render(contacts);
});

boutonRechercher.addEventListener("click", () => {
  //let nomRecherche = nomRechercher.value;

  //let contactsFiltres = contacts.filter(() => contacts.Nom === nomRecherche);
  let filterContacts = contacts.filter((element, index) => {
    return (
      element.inputNom == nomRechercher.value ||
      element.inputNom.toLowerCase().includes(nomRechercher.value.toLowerCase())
      //pour rechercher avec lettre .
    );
  });

  console.log(filterContacts);

  // Si la longueur du tableau filterContacts est superieur a 0  Sinon
  if (filterContacts.length > 0) {
    render(filterContacts);
  } else {
    render(contacts);
  }
});

function sort() {
  // Trier du plus récent au plus vieux
  const sortedDate = contacts.sort((a, b) => b.date - a.date);

  render(sortedDate);
}
sortFilter.addEventListener("click", sort);

/**let reset = document.querySelector(".reset");
    reset.addEventListener("click", function () {
      localStorage.removeItem("ousuis");
      localStorage.removeItem("ousuis1");
      p.innerText = "";
      p1.innerText = "";
      p2.innerText = "";
      p3.innerText = ""; */
/**contact.sort(function (a, b) {
  return a.Date - b.Date;
});*/

function Contact(inputNom, inputPrenom, inputEmail, inputNumero) {
  this.inputNom = inputNom;
  this.inputPrenom = inputPrenom;
  this.inputEmail = inputEmail;
  this.inputNumero = inputNumero;
  this.date = new Date(Date.now());
}
