export function NavigateToLogin() {
  localStorage.removeItem("appoint-doctor-credentials");
  window.location.href = "/login";
}
