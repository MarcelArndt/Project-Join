let sortedContactsByName, resetBgColor = 0, lastIndex, editIndex;

/** 
*  Loads functions that are needed upfront.
*/
async function onload() {
    await loadContacts();
    await loadActualUser();
    await initialsOf();
    renderContactList();
}

/**
 *  Show the contact-list inclusive letter, name and email. 
 */
function renderContactList() {
    if (contacts.length != 0) {
        sortedContactsByName = sortContactsByName(contacts);
        let allExistedFirstLetter = allUniqueFirstLetter();

        for (let i = 0; i < allExistedFirstLetter.length; i++) {

            loadFirstLetterContainer(allExistedFirstLetter[i]);
            loadContactsContactPage(allExistedFirstLetter[i]);
        }
    }
}

/**
 *  Loads the existing contact.
 */
function loadContactsContactPage(letter) {
    for (let i = 0; i < contacts.length; i++) {
        if (letter == sortedContactsByName[i]["name"].charAt(0).toUpperCase()) {
            renderContactContainer(i);
        }
    }
}

/**
* Sorts the contacts alphabetically.
 */
function sortContactsByName(contacts) {
    contacts.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    return contacts;
}

/**
 *  Loads the first existing letter from existing contact.
 */
function allUniqueFirstLetter() {
    let firstLetter, allUniqueFirstLetter = [];

    for (let i = 0; i < contacts.length; i++) {
        firstLetter = sortedContactsByName[i]["name"].charAt(0).toUpperCase();
        if (!allUniqueFirstLetter.includes(firstLetter)) {
            allUniqueFirstLetter.push(firstLetter);
        }
    }
    return allUniqueFirstLetter;
}

/**
 *  Show the first letter container.
 */
function loadFirstLetterContainer(firstLetter) {
    let content = document.getElementById('contact-list');

    content.innerHTML += `
        <div class="firstletter-container" id="firstletter">${firstLetter}</div>
        <div class="dividing-line"></div>
    `;
}

/**
 *  Show the contacts in the list.
 */
function renderContactContainer(i) {
    let content = document.getElementById('contact-list');

    content.innerHTML += `
    <div class="preview-contact-container d_flexdirection_r_c" id="contact-container${i}" onclick="openContact(${i})">
      <section class="circle-area d_flex_c_c" id="border-circle${i}" style="background-color: ${sortedContactsByName[i]["color"]};">
        <div class="initial">${sortedContactsByName[i]["initials"]}</div>
    </section>
      <div class="name-email-container d_flex_column_sb">
        <div-white class="first-last-name" id="first-last-name${i}">${sortedContactsByName[i]["name"]}</div-white>
        <div class="email">${sortedContactsByName[i]["email"]}</div>
      </div>
    </div>
    `;
}

/** 
* Show the person card.
*/
function openContact(i) {
    editIndex = i;

    if (screen.width > 1200) {
        if (i != lastIndex) {
            document.getElementById('person-card').classList.remove('d-none');
            renderPrewiewContact(i);
            let phoneNumber = spaceInPhoneNumber(sortedContactsByName[i]["phone"]);
            if (screen.width >= 1201) {
                animationPersonCard();
            }
            renderContact(i, phoneNumber);
            lastIndex = i;
        }
    }
    if (screen.width < 1200) {
        ifScreenMobileDisplayNone();
        showPersonCard(i);
        lastIndex = i;
    }
}

/**
 *  Show the person card.
 */
function showPersonCard(i) {
    renderPrewiewContact(i);
    let phoneNumber = spaceInPhoneNumber(sortedContactsByName[i]["phone"]);
    renderContact(i, phoneNumber);
}

/** 
* Switch display on / off from the ID.
*/
function ifScreenMobileDisplayNone() {
    document.getElementById('width-contact-container').classList.add('d-none');
    document.getElementById('mobile-contact-view').classList.remove('d-none');
    document.getElementById('person-card-mobile').classList.remove('d-none');
    document.getElementById('mobile-addcontact').classList.add('d-none');
    document.getElementById('mobile-option').classList.remove('d-none');
}

/** 
* Show Edit contact container and render its color and border.
*/
function renderPrewiewContact(i) {
    let tablinks;

    document.getElementById(`contact-container${resetBgColor}`).style.backgroundColor = '#FFFFFF';
    document.getElementById(`first-last-name${resetBgColor}`).style.color = '#000000';
    document.getElementById(`border-circle${resetBgColor}`).style.border = '';

    tablinks = document.getElementsByClassName("preview-contact-container");
    for (j = 0; j < tablinks.length; j++) {
        tablinks[j].style.backgroundColor = "";
    }

    document.getElementById(`contact-container${i}`).style.backgroundColor = '#2A3647';
    document.getElementById(`first-last-name${i}`).style.color = '#FFFFFF';
    document.getElementById(`border-circle${i}`).style.border = '2px solid #FFFFFF';
    resetBgColor = i;
}

/** 
*  Render the HTML Code on the desktop and mobile version.
*/
function renderContact(i, phoneNumber) {
    let content = document.getElementById('person-card');
    let contentMobile = document.getElementById('person-card-mobile');

    content.innerHTML = contentMobile.innerHTML = `
    <div class="person-card-headline d_flexdirection_r_c">
    <div class="circle d_flex_c_c" style="background-color: ${sortedContactsByName[i]["color"]};">
      <div class="circle-initial" id="initial">${sortedContactsByName[i]["initials"]}</div>
    </div>
    <div class="mobile-name" id="mobile-name">${sortedContactsByName[i]["name"]}</div>
    <div class="name-container d_flex_column_sb">
      <div class="distance-name"></div>
      <div class="name" id="name">${sortedContactsByName[i]["name"]}</div>
      <div class="d_flexdirection_r_c">
        <div class="edit-delete-container d_flexdirection_r">
          <div class="edit-container d_flexdirection_r" onclick="openEditContact(${i})">
            <img class="edit-icon" src="../img/icons/edit-contact-icon.svg"></img>
            <div class="edit">Edit</div>
          </div>
          <div class="delete-container d_flexdirection_r" onclick="deleteContactOfContactPage(${i})">
            <img class="delete-icon" src="../img/icons/delete-contact-icon.svg"></img>
            <div class="edit">Delete</div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="contact-information">
        <div class="text d_flex_c">Contact Information</div>
        <div class="address d_flex_column_sb">
            <div class="email-container d_flex_column_sb">
                <h2>Email</h2>
                <h3 id="email">${sortedContactsByName[i]["email"]}</h3>
            </div>
            <div class="phone-container d_flex_column_sb">
                <h2>Phone</h2>
                <h4 id="telephonenumber">${phoneNumber}</h4>
            </div>
        </div>
    </div>
    `;
}

/** 
*  This function makes spaces in the phone number.
*/
function spaceInPhoneNumber(string) {
    if(string){     
        let phone = [string.slice(0, 2), " ", string.slice(2, 6), " ", string.slice(6, 8), " ", string.slice(8, 11), " ", string.slice(11, 13), " "].join('');
    return phone;
    } else {
        let phone = '';
        return phone;
    }
}

/** 
*  This function makes a slide effect.
*/
function animationPersonCard() {
    let content = document.getElementById('person-card');
    content.style.animationName = "none";

    requestAnimationFrame(() => {
        content.style.animationName = "";
    });
}

let myStatus = false;
/**
 *  This function checks the validity of input name, e-mail and phone. If it is correct, the function createContact() opens. 
 */
function checkValidityNameEmailPhone(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');
    let email = document.getElementById('ltitleemail').value;
    let isAvailable = isThisEmailAvailable(email);

    if(isAvailable){
        ifEmailAvailableBorderRed();
    } else {
        ifEmailNotAvailableBorderRed();
    if(statusValidationName.checkValidity() && statusValidationEmail.checkValidity() && statusValidationPhone.checkValidity()){
        enableCreateContactButton();
        createTheContact();
    } else {
        disableCreateContactButton();
    }
  }
}

/**
 *  This function created once the edit contact
 */
function createTheContact(){
    let eventButton = document.getElementById('button-createcontact');

    eventButton.addEventListener("click", function () {
        if (!myStatus) {
            createContactOnContactPage();
            myStatus = true;
        }
    });
}
/**
 * This function enable the create contact button and change the color.
 */
function enableCreateContactButton(){
    document.getElementById('button-createcontact').disabled = false;
    document.getElementById('button-createcontact').style.backgroundColor='#2A3647';
    document.getElementById('button-createcontact').style.cursor = "pointer";
}

/**
 * This function enable the create contact button and change the color.
 */
function disableCreateContactButton(){
    document.getElementById('button-createcontact').disabled = true;
    document.getElementById('button-createcontact').style.backgroundColor='#E5E5E5';
    document.getElementById('button-createcontact').style.cursor = "default";
}  

/**
*  This function checks the validity of input name, e-mail and phone. If the mouse is above the button and if the validation isn't correct, 
*  the border of the elements ltitlename, ltitleemail, ltitlephone and text "This field is required" will be red.
*/
function validityFalseAboveButtonRedBorder(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');

    removesFocusFromInputField();
    changeBackColorFromButtonAddContactPage();
    checkValidationByTrueBorderRed(statusValidationName,statusValidationEmail,statusValidationPhone);
}

/**
 *  This function check the Validation from input field and if it true. The color of border will be red.
 */
function checkValidationByTrueBorderRed(statusValidationName,statusValidationEmail,statusValidationPhone){
    if(!statusValidationName.checkValidity() || !statusValidationEmail.checkValidity() || !statusValidationPhone.checkValidity()){
        document.getElementById('requiredtext').style.border = '2px solid red';
    }
    if(!statusValidationName.checkValidity()){
        document.getElementById('ltitlename').style.outline = '2px solid red'; 
        document.getElementById('required-name').innerHTML = "* Fill in your whole name";
    }
    if(!statusValidationEmail.checkValidity()){
        document.getElementById('ltitleemail').style.outline = '2px solid red'; 
        document.getElementById('required-email').innerHTML = "* The email must be a valid email-address";
        }
    if(!statusValidationPhone.checkValidity()){
        document.getElementById('ltitlephone').style.outline = '2px solid red'; 
        document.getElementById('required-phone').innerHTML = "* The phone number must have between 9 and 15 digits";
    }
}


/**
 *  This function change back the color for the create contact button on the addcontact page.
 */
function changeBackColorFromButtonAddContactPage(){
    let eventButton = document.getElementById('button-createcontact');

    if(eventButton.disabled){
        document.getElementById('button-createcontact').style.backgroundColor='#E5E5E5';
        document.getElementById('button-createcontact').style.cursor = "default";
    }
    if(!eventButton.disabled){
        document.getElementById('button-createcontact').style.backgroundColor='#25C0D4';
    }
}

/** 
 * This function remove the focus from input field.
*/    
function removesFocusFromInputField(){
    document.getElementById('ltitlename').blur();
    document.getElementById('ltitleemail').blur();
    document.getElementById('ltitlephone').blur();
} 

/**
*  This function checks the validity of input name, e-mail and phone. If the mouse is above the button and if the validation isn't correct, 
*  the border of the elements ltitlename, ltitleemail, ltitlephone and text "This field is required" will be white.
*/
function validityFalseLeaveButtonWhiteBorder(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');

    changeColorFromButtonAddContactPage();
    checkValidationByTrueBorderInvisible(statusValidationName,statusValidationEmail,statusValidationPhone);
}

/**
 *  This function check the Validation from input field and if it true. The color of border will be invisible.
 */
function checkValidationByTrueBorderInvisible(statusValidationName,statusValidationEmail,statusValidationPhone){
    if(!statusValidationName.checkValidity() || !statusValidationEmail.checkValidity() || !statusValidationPhone.checkValidity()){
        document.getElementById('requiredtext').style.border = '';     
    }
    if(!statusValidationName.checkValidity()){
        document.getElementById('ltitlename').style.outline = ''; 
        document.getElementById('required-name').innerHTML = '';
    }
    if(!statusValidationEmail.checkValidity()){
        document.getElementById('ltitleemail').style.outline = ''; 
        document.getElementById('required-email').innerHTML = '';
    }
    if(!statusValidationPhone.checkValidity()){
        document.getElementById('ltitlephone').style.outline = ''; 
        document.getElementById('required-phone').innerHTML = '';
    }
}