let container = document.getElementById("container");

function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
}

window.addEventListener("load", () => {
  var token = getCookie("token");
  // console.log(token);
  if (!token) {
    alert(`Login First!.`);
    return (window.location.href = "./html/login.html");
  } else {
    getData(token);
  }
});

async function getData(token) {
  let res = await fetch("http://localhost:8080/post/", {
    headers: {
      Authorization: getCookie("token"),
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  res = await res.json();
  appendData(res);
}

function appendData(data) {
  console.log(data);
  container.innerHTML = null;
  data.forEach((el, i) => {
    let div = document.createElement("div");
    let innerdiv = document.createElement("div");
    let left = document.createElement("div");
    let right = document.createElement("div");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let name = document.createElement("p");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let score = document.createElement("p");
    let like = document.createElement("button");
    let comment = document.createElement("button");
    let footer = document.createElement("div");

    div.className = "cards";
    editBtn.className = "edit";
    innerdiv.className = "top-flex";
    editBtn.textContent = "Edit";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    left.className = "left";
    right.className = "right";
    like.textContent = "Like";
    comment.textContent = "Comment";
    like.className = "like";
    comment.className = "comment";
    footer.className = "foot";

    p.textContent = el.content;
    img.src = el.user.image;
    score = el.score;
    name.innerText = el.user.name;

    right.append(editBtn, deleteBtn);
    left.append(img, name);
    footer.append(like, comment);
    innerdiv.append(left, right);
    div.append(innerdiv, p, score, footer);
    container.append(div);
  });
}

//modal
document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "block";
  let add = document.getElementById("add");
  add.addEventListener("click", handlePost);
});

document.getElementById("closeModalBtn").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "none";
});

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
  });

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
});
//modal

function handlePost(e) {
  e.preventDefault();
  let date = new Date();
  console.log(date.toLocaleString());
  let content = document.getElementById("content").value;
  let url = document.getElementById("url").value;
  let payload = {
    content,
    createdAt:
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
    score: 0,
    user: {
      image: url,
    },
    replies: [],
  };
  Post(payload)
    .then((res) => {
      alert(` ${res.msg}`);
      getData();
    })
    .catch((err) => {
      alert(`${err}`);
    });
}

async function Post(payload) {
  let res = await fetch("http://localhost:8080/post/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: getCookie("token"),
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  res = await res.json();
  return res;
}
