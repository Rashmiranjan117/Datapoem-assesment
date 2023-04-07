let button = document.getElementById("submit");

button.addEventListener("click", handleSignup);

function handleSignup(e) {
  e.preventDefault();
  let image = document.getElementById("image").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let payload = { image, email, password };
  if (email.length === 0 || password.length === 0) {
    return alert("All feilds must be filled.");
  }
  Register(payload)
    .then((res) => {
      alert(`Success : ${res.msg}`)
      window.location.href='./login.html'
    })
    .catch((err) => {
      alert(`Error! ${err}`)
    });
}

async function Register(payload) {
  let res = await fetch("http://localhost:8080/auth/register", {
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
