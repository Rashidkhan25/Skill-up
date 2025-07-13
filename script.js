appeal=("Log in");
const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});
document.getElementById('signInButton').addEventListener('click', function() {
  window.location.href = '../dashboard/index1.html';
});