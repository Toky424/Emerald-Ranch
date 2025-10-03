let auth0Client = null;

const fetchAuthConfig = () => fetch("/auth_config.json");
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
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
  await auth0Client.loginWithRedirect({ redirect_uri: window.location.origin });
};

const logout = () => {
  auth0Client.logout({ logoutParams: { returnTo: window.location.origin } });
};

window.onload = async () => {
  await configureClient();

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  updateUI();
};
