
//login
const formRegister = document.querySelector("#formRegister");
const formLogin = document.querySelector("#formLogin");
const logOut = document.querySelector("#logOut");
const login = document.querySelector("#login");
const register = document.querySelector("#register");
const afterRegister = document.querySelector("#afterRegister");
const logOutBtn = document.querySelector("#logOutBtn");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btnClose = document.querySelector("#btnClose");
const loginNotice=document.querySelector("#loginNotice")
const offcanvasRegister = new bootstrap.Offcanvas(".offcanvasRegister");
const offcanvasLogin = new bootstrap.Offcanvas(".offcanvasLogin");


function reloadPage() {
  // The last "domLoading" Time //
  let currentDocumentTimestamp =
  new Date(performance.timing.domLoading).getTime();
  // Current Time //
  let now = Date.now();
  // Ten Seconds //
  let tenSec = 10 * 1000;
  // Plus Ten Seconds //
  let plusTenSec = currentDocumentTimestamp + tenSec;
  if (now > plusTenSec) {
  location.reload();
  } else {}
  }

const DoAfterRegister = () => {
  logOut.classList.remove("d-none");
  afterRegister.classList.add("d-none");
  deleteArticle.disabled=false;
  saveChange.disabled=false;
};

const DoAfterLogin = () => {
  const storage = JSON.parse(localStorage.getItem("js-login-js"));
  if (
    formLogin.email.value === storage.email &&
    formLogin.password.value === storage.password
  ) {
    console.log("successful");
    logOut.classList.remove("d-none");
    afterRegister.classList.add("d-none")
    loginNotice.classList.add("d-none"); 
    offcanvasLogin.hide();  
  } else {
    console.log("something wrong");
    loginNotice.classList.remove("d-none")
  }
  deleteArticle.disabled=false;
  saveChange.disabled=false;
  
};

// webpage refresh
window.addEventListener("load", () => {
  if (localStorage.getItem("js-login-js")) {
    DoAfterRegister();
    reloadPage();
  }
});

//formregister
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get("loginName"),
    email: formData.get("loginEmail"),
    password: formData.get("loginPassword"),
  };
  localStorage.setItem("js-login-js", JSON.stringify(data));
  DoAfterRegister();
  reloadPage();
});

//formLogin
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  DoAfterLogin();
});

//formLogout
logOutBtn.addEventListener("click", (e) => {
  afterRegister.classList.remove("d-none");
  register.classList.add("d-none");
  logOut.classList.add("d-none");
  deleteArticle.disabled=true;
  saveChange.disabled=true;
});



