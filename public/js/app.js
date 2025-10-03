let auth0Client = null;

// Configure directement Auth0
const configureClient = async () => {
  auth0Client = await auth0.createAuth0Client({
    domain: "dev-ko2v3nq7vuzwes4u.us.auth0.com",
    client_id: "2xVAKz1NDbPUsZtx8sixgDbn3WxsMKpw",
    cacheLocation: "localstorage"
  });
};

const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
  document.getElementById("btn-login").disabled = isAuthenticated;
  document.getElementById("btn-logout").disabled = !isAuthenticated;

  if (isAuthenticated) {
    document.getElementById("gated-content").classList.remove("hidden");
  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }
};

const login = async () => {
  await auth0Client.loginWithRedirect({ redirect_uri: window.location.origin + "/admin/" });
};

const logout = () => {
  auth0Client.logout({ logoutParams: { returnTo: window.location.origin + "/admin/" } });
};

window.onload = async () => {
  await configureClient();

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/admin/");
  }

  updateUI();
};
