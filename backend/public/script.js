let token = "";

async function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  alert((await res.json()).message);
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    token = data.token;
    document.getElementById("auth").style.display = "none";
    document.getElementById("tool").style.display = "block";
  } else {
    alert(data.message);
  }
}

async function encryptText() {
  const text = document.getElementById("inputText").value;
  const password = document.getElementById("encPassword").value;
  const res = await fetch("/encrypt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, password })
  });
  const data = await res.json();
  document.getElementById("outputText").value = data.result;
}

async function decryptText() {
  const text = document.getElementById("inputText").value;
  const password = document.getElementById("encPassword").value;
  const res = await fetch("/decrypt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, password })
  });
  const data = await res.json();
  document.getElementById("outputText").value = data.result;
}

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
