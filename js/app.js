// Netlify Identity pour gérer l'admin
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) console.log("Personne connecté");
  });

  window.netlifyIdentity.on("login", user => {
    console.log("Connecté :", user);
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline";
    document.getElementById("cms").style.display = "block";
    window.netlifyIdentity.close();
  });

  window.netlifyIdentity.on("logout", () => {
    console.log("Déconnecté");
    document.getElementById("login-btn").style.display = "inline";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("cms").style.display = "none";
  });
}

document.getElementById("login-btn").onclick = () => {
  window.netlifyIdentity.open();
};

document.getElementById("logout-btn").onclick = () => {
  window.netlifyIdentity.logout();
};

// Exemple simple pour afficher catalogue (tu peux remplacer par fetch JSON)
const chevaux = [
  {nom:"Silver", race:"Arabe", prix:100},
  {nom:"Thunder", race:"Mustang", prix:120}
];

const legumes = [
  {nom:"Carottes", prix:5},
  {nom:"Pommes de terre", prix:3}
];

const displayCatalog = () => {
  const chevauxDiv = document.getElementById("chevaux");
  chevaux.forEach(c => {
    const p = document.createElement("p");
    p.textContent = `${c.nom} - ${c.race} - ${c.prix} $`;
    chevauxDiv.appendChild(p);
  });

  const legumesDiv = document.getElementById("legumes");
  legumes.forEach(l => {
    const p = document.createElement("p");
    p.textContent = `${l.nom} - ${l.prix} $`;
    legumesDiv.appendChild(p);
  });
};

if (document.getElementById("chevaux")) displayCatalog();
