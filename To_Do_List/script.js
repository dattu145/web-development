const all__tasks = document.querySelector(".all__tasks"),
      errorpopup = document.querySelector(".errorpopup"),
      todoList = document.querySelector(".todoList");
let counter = 0;

document.addEventListener('DOMContentLoaded', showData);

function addTask(){
    const task__input = document.querySelector(".task__input"),
          task__textarea = document.querySelector(".task__textarea"),
          task__select = document.querySelector(".task__select"),
          task__date = document.querySelector(".task__date");

    if(task__input.value === "" || task__textarea.value === "" || task__date.value === ""){
        errorMsg();
    } else {
        const listItem = document.createElement('div');
        listItem.className = 'list__item';

        listItem.innerHTML = `
            <div class="left__part">
                <div class="check__box"></div>
            </div>
            <div class="mid__part">
                <div>
                    <div class="list__title">${task__input.value}</div>
                    <div class="list__task">${task__textarea.value}</div>
                </div>
                <div class="list__periority"><span>${task__select.value}</span></div>
            </div>
            <div class="right__part">
                <div class="remainder" title="Set Remainder">
                    <div class="remainder__inactive">
                        <div class="remainder__toggle"></div>
                    </div>
                </div>
                <div class="date">${formatDateTime(task__date.value)}</div>
            </div>
            <div class="remove__task"><i class="fa-solid fa-trash remove__task"></i></div>
        `;

        listItem.classList.add(task__select.value.toLowerCase());
        listItem.setAttribute('data-created',task__date.value)
        all__tasks.appendChild(listItem);
        counter += 1;
        displayToDoList();
        displaySortView()
        saveData();
        clearInputs(task__input, task__date, task__textarea);
    }
}
function saveData(){
    localStorage.setItem('allsaveddata', all__tasks.innerHTML);
}

function showData(){
    const savedData = localStorage.getItem('allsaveddata');
    if(savedData){
        all__tasks.innerHTML = savedData;
        counter = all__tasks.children.length;
        displayToDoList();
        displaySortView();
    }
}

function clearInputs(task__input, task__date, task__textarea){
    task__input.value = "";
    task__date.value = "";
    task__textarea.value = "";
}

all__tasks.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('remove__task')){
        const listItem = e.target.closest('.list__item');
        all__tasks.removeChild(listItem);
        counter -= 1;
        displayToDoList();
        displaySortView();
        saveData();
    }
});

function displayToDoList(){
    if(counter != 0){
        todoList.classList.add('todoList__active');
    } else {
        todoList.classList.remove('todoList__active');
    }
}

function displaySortView(){
    if(counter > 1){
        document.querySelector('.sort__view__section').classList.add('s_v_active');
    }
    else{
        document.querySelector('.sort__view__section').classList.remove('s_v_active');
    }
}


function errorMsg(){
    errorpopup.innerHTML = "Fill all including Date and Time";
    errorpopup.classList.add("errorpopup__active");

    setTimeout(() => {
        errorpopup.classList.remove("errorpopup__active");
    }, 2000);
}

function formatDateTime(inputValue) {
    const date = new Date(inputValue);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
    
    return formattedDate;
}

/** =========   Check box toggle   ========== */

document.addEventListener('click',function(e){
    if(e.target.classList.contains('check__box')){
        e.target.classList.toggle('check__box__active');
        checkBoxActive(e.target.closest('.list__item'));
        saveData();
    }
    if(!e.target.closest('.check__box').classList.contains('check__box__active')){
        checkBoxInactive(e.target.closest('.list__item'));
        saveData();
    }
});

function checkBoxActive(lItem){
    lItem.style.border = '2px solid rgba(255,255,255,0.4)';
    const perior = lItem.querySelector('.mid__part span');
    perior.style.color = 'rgba(255,255,255,0.4)';
    const remainder = lItem.querySelector('.right__part .remainder');
    remainder.style.display = 'none';
    lItem.querySelector('.remove__task i').style.background = 'rgba(255,255,255,0.4)';
    lItem.querySelector('.remove__task').style.padding = 0;
    lItem.querySelector('.list__task').style.textDecoration = 'line-through';
}

function checkBoxInactive(lItem){
    lItem.style.border = '2px solid var(--skin-color)';
    const perior = lItem.querySelector('.mid__part span');
    perior.style.color = 'var(--skin-color)';
    const remainder = lItem.querySelector('.right__part .remainder');
    remainder.style.display = 'flex';
    lItem.querySelector('.remove__task i').style.background = 'var(--skin-color)';
    lItem.querySelector('.remove__task').style.padding = '5px';
    lItem.querySelector('.list__task').style.textDecoration = 'none';
}

/** ==========   Remainder Toggle    =========== */

function remainderToggleHandler(e) {
    const remainderElement = e.target.closest('.remainder__inactive');

    if(remainderElement && (e.target.classList.contains('remainder__inactive') || e.target.classList.contains('remainder__toggle'))){
        remainderElement.classList.toggle('remainder__active');

        if(remainderElement.classList.contains('remainder__active')){
            remainderElement.setAttribute('data-remainder', "true");
            setRemainder(e.target.closest('.list__item'));
        } else {
            remainderElement.setAttribute('data-remainder', "false");
        }
    }
}

document.addEventListener('click', remainderToggleHandler);

function setRemainder(listItem) {
    const reminderTime = listItem.getAttribute('data-created');
    const alertTune = document.querySelector('.audio');
    const reminderDate = new Date(reminderTime);
    const currentDate = new Date();

    const timeDifference = reminderDate - currentDate;

    if (timeDifference < 0) {
        alert("Cannot set reminder (Past in time).");
        const remainderElement = listItem.querySelector('.remainder__inactive');
        remainderElement.classList.remove('remainder__active');
        remainderElement.removeEventListener('click', remainderToggleHandler);
        return;
    }

    setTimeout(() => {
        alertTune.play();

        const userChoice = prompt("It's time for your reminder! Type 'snooze' to snooze for 5 minutes or 'stop' to stop the reminder.");

        if (userChoice === 'snooze') {
            setTimeout(() => {
                alertTune.play();
                prompt("Snoozed reminder! It's time again. Type 'snooze' to snooze again or 'stop' to stop the reminder.");
            }, 300000);
        } else if (userChoice === 'stop') {
            alertTune.pause();
            alertTune.currentTime = 0;

            const remainderElement = listItem.querySelector('.remainder__inactive');
            remainderElement.classList.remove('remainder__active');
            remainderElement.setAttribute('data-remainder', "false");
        }
    }, timeDifference);
}


/** ========  Sorting and filtering  ========= */


const sort__input = document.querySelectorAll('.sort__view__section select');
sort__input.forEach(select => {
    select.addEventListener('change', () => {
        sortAndFilter(select.value.toLowerCase());
    });
});

function filterDivs(priority) {
    const container = document.querySelector('.all__tasks');
    const divs = Array.from(container.children);

    divs.forEach(div => {
        if (priority === 'all' || priority === "don't sort" || div.classList.contains(priority)) {
            div.style.display = 'flex';
        } else if (priority === 'priority') {
            sortDivsByPeriority()
        } else if (priority === 'date'){
            sortDivsByDate()
        }
        else{
            div.style.display = 'none';
        }
    });
}

function sortDivsByPeriority() {
    const container = document.querySelector('.all__tasks');
    const divs = Array.from(container.children);

    divs.sort((a, b) => {
        const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };

        if (priorityOrder[a.classList[1]] !== priorityOrder[b.classList[1]]) {
            return priorityOrder[a.classList[1]] - priorityOrder[b.classList[1]];
        }
    })

    container.innerHTML = '';
    divs.forEach(div => container.appendChild(div));
}


function sortDivsByDate(){
    const container = document.querySelector('.all__tasks');
    const divs = Array.from(container.children);
    divs.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-created'));
        const dateB = new Date(b.getAttribute('data-created'));
        return dateA - dateB;
    })

    container.innerHTML = '';
    divs.forEach(div => container.appendChild(div));
}



function sortAndFilter(priority) {
    filterDivs(priority);
    sortDivs();
}

