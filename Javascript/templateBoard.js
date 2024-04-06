function templateRefreshCard(columnNumber, id){
  return `
  <div isCard card-in-column="${columnNumber}" class="card">
    <div class="category">${generateCategory(columnNumber, id)}</div>
    <div class="headline">${list[columnNumber][id]["title"]}</div>
    <div class="content">${setText(columnNumber, id)}</div>
      ${isSubtask(columnNumber, id)}
    <div class="footer-of-card">
      <div class="submit-user-area">
          ${generateAssignedTo(columnNumber, id, true)}
      </div>
      <div class="priority">
        <img src="${setPriorityImage(columnNumber, id)}">
      </div>
    </div>
</div>
  `
}


function templateCard(columnNumber, id){
    
  return `<div id="ColumnNumb-${columnNumber}_Id-${id}" draggable="true" onclick="showBlackBox(), openLightboxCard(${columnNumber}, ${id}, false)" ondragstart="startDragFrom(${columnNumber}, ${id}, false)" ondragend="endDrag(${columnNumber}, true)">
            ${templateRefreshCard(columnNumber, id)}   
          </div>`;
}


function getHTMLCode(categoryColor, text){
  return `<div class="tag ${categoryColor}">${text}</div>`
}


function templateLightboxCards(columnNumber, id){
  return `
  <div class="LightboxCards">
    <div class="frow facenter fs-between padding-top"><div class="category">${generateCategory(columnNumber, id)}</div><div class="exit_button-edit-task" onclick='setEditOff(), hideBlackbox()'><img src="../img/icons/close-icon-addtask_dark.svg"></div></div>
    <h1>${list[columnNumber][id]["title"]}</h1>
    <p class="LightboxContent-P">${list[columnNumber][id]["description"]}</p>
    <p class="LightboxContent-P"><span>Due date:</span><span>${setDateFormat(columnNumber, id)}</span></p>
    <p class="LightboxContent-P"><span>Priority:</span><span></span>${setPriorityName(columnNumber, id)} <img src="${setPriorityImage(columnNumber, id)}"></span></p>
    <h6>Assign To:</h6>
    <ol id="cardLightboxUser">
      ${generateAssignedTo(columnNumber, id, false)}
    </ol>
    <h6>Subtaks:</h6>
    <ol id="cardLightboxSubtask" class="selectabale">
          ${generateListOfSubtask(columnNumber, id)}
    </ol>
    <nav class="lightboxNav">
      <ul>
          <li onclick ="deleteCurrentTask(${columnNumber},${id})">Delete<img src="../img/icons/delete.svg"></li>
          <hr>
          <li onclick ="openEditableMode(${columnNumber},${id})">Edit<img src="../img/icons/edit-black.svg"></li>
      </ul>
    </nav>
  </div>
`
}


function templateLightboxEditTask(columnNumber, id){
  return `
  <div class="lightboxHeader">
  <div class="exit_button-edit-task" onclick='hideBlackbox()'>
      <img src="../img/icons/close-icon-addtask_dark.svg">
  </div>
</div>
<div class="lightboxBuffer"></div>

  <!--#####################################################
      ############             Title         ############## 
      #####################################################-->

  <p class="LightboxContent-P">Title</p>
  <div class="LightboxTextTitle"><input id="lightboxEditTitle" placeholder="Your Title" value="${list[columnNumber][id]["title"]}"></div>

  <!--#####################################################
      #########           Description           ########### 
      #####################################################-->

  <p class="LightboxContent-P">Description</p>
  <textarea id="lightboxEditText" class="LightboxTextArea">${list[columnNumber][id]["description"]}</textarea>

  <!--#####################################################   
      #########              Due date           ########### 
      #####################################################-->

  <div class="due-date-container d_flex_column">
      <p class="LightboxContent-P">Due date</p>
      <input type="date" lang="en" id="ldatename" name="ldatename" value="${list[columnNumber][id]["dueDate"]}"/>
  </div>

  <!--#####################################################   
      #########              Priority           ########### 
      #####################################################-->

  <div class="prio-container d_flex_column">
    <label for="lprioname">Priority</label>
    <div class="d_flexdirection_r d_flex_c_sb">
      <div class="prio-button d_flex_c_c "  id="urgentButton" onclick="setOfValuePrio(1)">Urgent
        <img class="dimension-prio-icon" id="urgentButtonImage"src="../img/icons/urgent-icon.svg"></img>
      </div>                     
      <div class="prio-button d_flex_c_c"  id="mediumButton" onclick="setOfValuePrio(2)">Medium
        <img class="dimension-prio-icon" id="mediumButtonImage" src="../img/icons/medium-icon.svg"></img>
      </div>
      <div class="prio-button d_flex_c_c"  id="lowButton" onclick="setOfValuePrio(3)">Low
        <img class="dimension-prio-icon" id="lowButtonImage" src="../img/icons/low-icon.svg"></img>
      </div>
    </div>  
  </div>

  <!--#####################################################
      #########             Assign to           ########### 
      #####################################################-->
          
<p>Assign to</p>

      <div class="selectInputWrapper">
        <div class="selectInput">
          <div boarder="selectBoarder_1" id="selectBoarder_1" class="selectInputBoarder boarderBlue">
              <div id="selectInputArea" class="selectInputArea">
                  <input id="selectInput_1" placeholder="Search for Contacts" class="selectInputSearchBar">
              </div>
              <div onclick="toggleSelectWindows(1)" id="selectOverlay_1" class="selectInputText">Select Contacts to assign</div>
              <div class="selectSafeSpace selectAreaSelectorFadeBackgound">
                  <div onclick="toggleSelectWindows(1)" id="selectInputButton_1" class="selectInputIcon"></div>
              </div>
          </div>
        </div>

        <div id="selectArea_1" class="selectArea dshow">


              <div class="selectAreaSelector">
                  <div class="selectAreaValue">
                      <div class="selectSafeSpace"><div class="circle red">HF</div></div>
                      <p>Wounderland</p>
                  </div>
                  <div class="selectAreaSelectorFadeBackgound"><img src="../img/icons/check-button-mobile-uncheck.svg"/></div>
              </div>


          </div>
      </div>

      <div id="selectInputRenderIcons">

          <div class="selectSafeSpace smallerSafeSpace"><div class="circle red">HF</div></div>

      </div>

  <!--#####################################################
      #########           Edit SubTask          ########### 
      #####################################################-->
  
      <div id ="selectAddInput_1" class="selectInputWrapper">
          <div class="selectInput">
            <div boarder="selectAddInput_1" class="selectInputBoarder">
                <div onclick="toggleAddWindows(1, true)" id="selectOverlay_1" class="selectInputText overlayshow">Add a new Subtask</div>
                <div class="selectSafeSpace selectAreaSelectorFadeBackgound">
                    <div onclick="toggleAddWindows(1, true)" class="selectInputIcon plusIcon"></div>
                </div>
            </div>
          </div>
      </div>


<ol id="cardLightboxSubtask" class="selectabale">

</ol>

  <!--#####################################################
      #########           Save Button           ########### 
      #####################################################-->
<nav class="buttonMenu">
  <div onclick="showBlackBox(), openLightboxCard(${columnNumber}, ${id}, false)" class="saveButton">
      <p>OK</p><img src="../img/icons/check-mark.svg">
  </div>
</nav>
`
}


function templateSubTask(columnNumber, id){
    return ` 
        <div class="subtask-bar">    
            <div class="bar">
             <div class="progress-bar" style="width:${returnProgressbar(columnNumber, id)}%;"></div>
            </div>
                ${checkSubtaskdone(columnNumber, id)}/${list[columnNumber][id]["subtasks"].length} Subtasks
            </div>
        `
    }