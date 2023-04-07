let button = document.getElementById("submit");

button.addEventListener("click", handleLogin);

function setCookie(name,value){
    document.cookie = name + "=" + value + "; path=/";
}

function handleLogin(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let payload = { email, password };
  if (email.length === 0 || password.length === 0) {
    return alert("All feilds must be filled.");
  }
  Login(payload)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.token));

      setCookie("token", res.token);
      alert(`${res.msg}`);
      window.location.href = "../index.html";
    })
    .catch((err) => {
      alert(`Error! ${err}`);
    });
}

async function Login(payload) {
  let res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  res = await res.json();
  return res;
}
