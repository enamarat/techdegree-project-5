// Making an AJAX request
// 1. Creating an XMLHttp Request object
let xhr = new XMLHttpRequest();
// 2. Creating a callback function
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    //console.log(xhr.responseText);
    //console.log(typeof xhr.responseText);

    // Converting string from the response to JSON format
    const employees = JSON.parse(xhr.responseText);
    console.log(employees);
    //console.log(typeof employee);

    /* Looping through employees and creating HTML elements
     for each of them */
    let employeeHTML = "";
    for (let i = 0; i < employees.results.length; i +=1) {
      employeeHTML += `<div class="card">`;
      employeeHTML +=
      `<div class="card-img-container">
        <img class="card-img" src='${employees.results[i].picture.large}'/>
      </div>`;
      employeeHTML +=
      `<div class="card-info-container">
          <h3 id="name" class="card-name cap"> ${employees.results[i].name.first} ${employees.results[i].name.last} </h3>
          <p class="card-text"> ${employees.results[i].email}</p>
          <p class="card-text cap">${employees.results[i].location.city}, ${employees.results[i].location.state} </p>
        </div>`;
        employeeHTML +=
        `</div>`;
      }

    document.getElementById('gallery').innerHTML = employeeHTML;
  }
}
/* 3. Opening a request which specifies in a query string
that we want to reguest 12 users and that we want to get
the response in JSON format*/
xhr.open('GET', 'https://randomuser.me/api/?format=json&results=12');
// 4. Sending a request
xhr.send();

/* Function which creates an overlay with additional information
about an employee when they are clicked on */
const revealUserAdditionalInfo = (event) => {
  if (event.target.className === "card"
  || event.target.className === "card-img-container"
  || event.target.className === "card-info-container"
  || event.target.tagName === "IMG"
  || event.target.tagName === "P"
  || event.target.tagName === "H3") {
    const employees = JSON.parse(xhr.responseText);

    //console.log(event.target);
    //const h3 = document.getElementsByTagName('h3');

    for (let j = 0; j < employees.results.length; j +=1) {
      if (event.target.tagName === "H3") {
        console.log(event.target.textContent);
        //console.log(employees.results[0].name);
        let employeeName = " ";
        employeeName += employees.results[j].name.first;
        employeeName += " ";
        employeeName += employees.results[j].name.last;
        employeeName += " ";
        console.log(employeeName);
        console.log(employeeName.length);
        console.log(event.target.textContent.length);
        if (event.target.textContent == employeeName) {
          let modalWindow = `
          <div class="modal-container">
            <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                <img class="modal-img" src="${employees.results[j].picture.large}" alt="profile picture"/>
                <h3 id="name" class="modal-name cap">${employees.results[j].name.first} ${employees.results[j].name.last} </h3>
                <p class="modal-text">${employees.results[j].email}</p>
                <p class="modal-text cap">${employees.results[j].location.city}</p>
                <hr>
                <p class="modal-text">${employees.results[j].cell}</p>
                <p class="modal-text">${employees.results[j].location.street}, ${employees.results[j].location.city}, OR ${employees.results[j].location.postcode}</p>
                <p class="modal-text">Birthday: ${employees.results[j].dob.date}</p>
              </div>
            </div>
          </div>
            `;
              console.log(modalWindow);
              document.getElementById('gallery').innerHTML = modalWindow;
        }
      }
    }
  }
}

document.getElementById('gallery').addEventListener('click', revealUserAdditionalInfo);
