/** @format */

function formCreate() {
  const createBody = document.getElementById("root");
  createBody.innerHTML = ``;

  const raw = document.createElement(`raw`);

  raw.innerHTML = `
    <form class="row gy-2 gx-3 align-items-center">
    <div class="row col-auto mb-3">
    <input class="form-control" type="text" name="username" id="username" placeholder="username">
    <input class="form-control" type="email" name="email" id="email" placeholder="email">
    <input class="form-control" type="password" name="password" id="password" placeholder="password">
    <button onClick="createUser();" type="submit" class="btn btn-primary">Create</button>
  </div>
  </form>
`;
  createBody.appendChild(raw);

  let email = document.getElementById("email");
  console.log(email.value);
}

function createUser() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let email = document.getElementById("email");

  const raw = JSON.stringify({
    username: username.value,
    email: email.value,
    password: password.value,
  });

  let requestOption = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  document.addEventListener("click", (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/create", requestOption)
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(data);
        formCreate();
      })
      .catch((error) => {
        alert("front end error=" + error);
        console.log("front end error = " + error);
        window.location.replace(formCreate());
      });
  });
}

function getAllUser() {
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const requestOption = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:5000/users", requestOption)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data[1]);
    })
    .catch((error) => console.log("ini error GET ALL USER = " + error));
}
