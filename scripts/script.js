// Making an AJAX request
// 1. Creating an XMLHttp Request object
let xhr = new XMLHttpRequest();
// 2. Creating a callback function
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    // Converting string from the response to JSON format
    const employees = JSON.parse(xhr.responseText);
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
    // Appending created HTML elements to the "gallery" div
    document.getElementById('gallery').innerHTML = employeeHTML;
  }
}
/* 3. Opening a request which specifies in a query string
that we want to reguest info about 12 users and that we want to get
the response in JSON format. Also we're interested only in
employees from English-spoken countries so one of query string's
parameters is set accordingly */
xhr.open('GET', 'https://randomuser.me/api/?format=json&results=12&nat=US,AU,GB');
// 4. Sending a request
xhr.send();

/* Function which creates a modal window with additional information
about an employee when they are clicked on */
const revealUserAdditionalInfo = (event) => {
  /* The following conditions make sure that only certain
  HTML elements will trigger the function when they are clicked */
  if (event.target.className === "card"
  || event.target.className === "card-img-container"
  || event.target.className === "card-info-container"
  || event.target.tagName === "IMG"
  || event.target.tagName === "P"
  || event.target.tagName === "H3") {
    const employees = JSON.parse(xhr.responseText);
    /* Looping through data brought by response to our AJAX
    request */
    for (let j = 0; j < employees.results.length; j +=1) {
      /* This function compares the values of first and last employees's
      names in the AJAX response to the text content of the clicked element. If
      the data and content of HTML element are equal, modal window is appended
      to the "gallery" div */
      const findMatches = (triggeringElement) => {
        // Function extracts employees's first and last names
        let employeeName = " ";
        employeeName += employees.results[j].name.first;
        employeeName += " ";
        employeeName += employees.results[j].name.last;
        employeeName += " ";
        /* Function compares text content of the clicked element with
        the extracted names from the AJAX response and creates a
         modal window if there is a match */
        if (triggeringElement.textContent == employeeName) {
          const modalDiv = document.createElement('div');
          modalDiv.setAttribute('class', 'modal-container');
          document.getElementById('gallery').appendChild(modalDiv);
          // Formatting date of birth
          let formattedDOB = employees.results[j].dob.date.substring(0, 10).split("-");
          // Creating HTML elements for modal window
          modalDiv.innerHTML = `
            <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                <img class="modal-img" src="${employees.results[j].picture.large}" alt="profile picture"/>
                <h3 id="name" class="modal-name cap">${employees.results[j].name.first} ${employees.results[j].name.last} </h3>
                <p class="modal-text">${employees.results[j].email}</p>
                <p class="modal-text cap">${employees.results[j].location.city}</p>
                <hr>
                <p class="modal-text">${employees.results[j].cell}</p>
                <p class="modal-text">${employees.results[j].location.street}, ${employees.results[j].location.state}, ${employees.results[j].location.postcode}</p>
                <p class="modal-text">Birthday: ${formattedDOB[1]}/${formattedDOB[2]}/${formattedDOB[0].substring(2, 4)}</p>
              </div>
            </div>`;

        // This function closes the modal window
        const closeModalWindow = () => {
          const modalDiv = document.querySelector('.modal-container');
          document.getElementById('gallery').removeChild(modalDiv);
        }
        // Attaching event listener to "Close" button
        document.getElementById('modal-close-btn').addEventListener('click', closeModalWindow);
        }
      }

      /* Regardless of what HTML element is clicked, function
      revealUserAdditionalInfo traverses
      to header3 in order to get its text content */
      if (event.target.tagName === "H3") {
      findMatches(event.target);
      } else if (event.target.className === "card-info-container") {
      findMatches(event.target.childNodes[1]);
      } else if (event.target.className === "card-img-container") {
      findMatches(event.target.nextSibling.childNodes[1]);
      } else if (event.target.tagName === "IMG") {
      findMatches(event.target.parentNode.nextSibling.childNodes[1]);
      } else if (event.target.tagName === "P") {
      findMatches(event.target.parentNode.childNodes[1]);
      }
    }
  }
}

// Search field
// Appending input field and button to our web page
document.querySelector(".search-container").innerHTML = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
/* Processing input value typed in the searchBox. This function loops
through all headers containing names of employees and shows
 corresponding employee's card while hiding cards of the rest*/
const filterDirectoryByName = () => {
  const search = document.getElementById('search-input').value;
  console.log(search.toLowerCase());
  // Selecting all headers on the page which contain employees' names
  const employeesNames = document.querySelectorAll('h3');
  console.log(employeesNames[0].innerText.toLowerCase());
  console.log(employeesNames[0].parentNode.parentNode);
  // Looping through headers
  for (let q = 0; q < employeesNames.length; q += 1) {
    // Hiding all cards
    employeesNames[q].parentNode.parentNode.style.display = "none";

    /* If header's text content is equal to the search field input
     value, show the card of the matched employee */
    if (employeesNames[q].innerText.toLowerCase().includes(search.toLowerCase())) {
      employeesNames[q].parentNode.parentNode.style.display = "flex";
    }
  }
}


// Event Listeners
document.getElementById('gallery').addEventListener('click', revealUserAdditionalInfo);
document.getElementById('search-submit').addEventListener('click', filterDirectoryByName);
