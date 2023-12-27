export function getToken() {
  return localStorage.getItem("jwtToken");
}

export function setToken(token: string) {
  localStorage.setItem("jwtToken", token);
}
