/**
 * This function uses the "w3 include method" to include HTML templates.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    }
  }
  initialsOf();
  hideSidebar();
  searchAndHideElements();
}

/**
 * This function hides parts of the header on the legal and privacy pages.
 */
async function searchAndHideElements() {
  let isToHide = document.querySelectorAll("[isToHide]")
  if (isToHide.length > 0) {
    let elements = document.querySelectorAll("[toHideElement]")
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("hideElement");
    }
  }
}

/**
 * This function hides parts of the sidebar on legalResticted.html and privacyRestricted.html.
 */
async function hideSidebar() {
  let hideSidebar = document.querySelectorAll("[hideSidebar]")
  if (hideSidebar.length > 0) {
    let sidebar = document.querySelectorAll("[toHideSidebar]")
    for (let i = 0; i < sidebar.length; i++) {
      sidebar[i].classList.add("hideElement");
    }
  }
}

/**
 * This function switches the navbar on or out if the user clicks on the circle in the top corner.
 */
function openNavbar() {
  document.getElementById('navbar').classList.toggle('d-none');
}

/**
 * This function hides the navbar if the user clicks on the main container.
 */
function closeNavbar() {
  document.getElementById('navbar').classList.add('d-none');
}

/**
 * function gets the initials of the name of the user which is logged in and gives them to the next function.
 */
async function initialsOf() {
  if (actualUser && actualUser["name"]) {
    let words = actualUser["name"].split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      initials += word.charAt(0).toUpperCase();
    }
    addInitialsToHeader(initials);
  } else {
    addLetterGToHeader();
  }
}
/**
 * function inserts the initials into the div with the id='initialname'
 * @param {string} initials
 */
function addInitialsToHeader(initials) {
  let insert = document.getElementById("initialname");
  insert.innerHTML = "";
  insert.innerHTML = `${initials}`;
}

/**
 * function adds letter G for guest into the div with the id='initialname'
 */
function addLetterGToHeader() {
  let insert = document.getElementById("initialname");
  insert.innerHTML = "";
  insert.innerHTML = "G";
}