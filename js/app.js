if (window.netlifyIdentity) {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const gatedContent = document.getElementById("gated-content");

  // Initialise Netlify Identity
  netlifyIdentity.init();

  // Si utilisateur déjà connecté
  const user = netlifyIdentity.currentUser();
  if(user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    gatedContent.style.display = "block";
  }

  // Login
  loginBtn.addEventListener("click", () => {
    netlifyIdentity.open();
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    netlifyIdentity.logout();
  });

  // Événements
  netlifyIdentity.on("login", (user) => {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    gatedContent.style.display = "block";
    netlifyIdentity.close();
  });

  netlifyIdentity.on("logout", () => {
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
    gatedContent.style.display = "none";
  });
}
