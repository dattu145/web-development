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
        displaySortView();
        saveData();
        clearInputs(task__input, task__date, task__textarea);
    }
}
function saveData() {
    const tasks = Array.from(all__tasks.children).map(task => {
        return {
            html: task.outerHTML,
            reminderActive: task.querySelector('.remainder__inactive')?.classList.contains('remainder__active'),
            reminderTime: task.getAttribute('data-created') // Store the time if a reminder is set
        };
    });
    localStorage.setItem('allsaveddata', JSON.stringify(tasks));
}


function showData() {
    const savedData = localStorage.getItem('allsaveddata');
    if (savedData) {
        const tasks = JSON.parse(savedData);
        all__tasks.innerHTML = ''; // Clear existing tasks
        
        tasks.forEach(task => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = task.html;
            const listItem = tempDiv.firstChild;
            
            all__tasks.appendChild(listItem);
            counter += 1;

            if (task.reminderActive) {
                const remainderToggle = listItem.querySelector('.remainder__inactive');
                remainderToggle.classList.add('remainder__active');
                setRemainder(listItem); // Reinitialize the reminder
            }
        });

        displayToDoList();
        displaySortView();
        saveData(); // Save the data again to ensure consistency
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

    const formattedDate = `${day}/${month}/${year}<br>${hours}:${minutes} ${ampm}`;
    
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

function checkBoxActive(lItem) {
    lItem.style.border = '2px solid rgba(255,255,255,0.4)';
    const perior = lItem.querySelector('.mid__part span');
    perior.style.color = 'rgba(255,255,255,0.4)';
    const remainder = lItem.querySelector('.right__part .remainder');
    remainder.classList.add('visibility__off');
    lItem.querySelector('.remove__task i').style.background = 'rgba(255,255,255,0.4)';
    lItem.querySelector('.remove__task').style.padding = 0;
    lItem.querySelector('.list__task').style.textDecoration = 'line-through';

    const remainderInactive = lItem.querySelector('.remainder__inactive');
    remainderInactive.classList.remove('remainder__active');
    remainderInactive.setAttribute('data-remainder', "false");
}

function checkBoxInactive(lItem) {
    lItem.style.border = '2px solid var(--skin-color)';
    const perior = lItem.querySelector('.mid__part span');
    perior.style.color = 'var(--skin-color)';
    const remainder = lItem.querySelector('.right__part .remainder');
    remainder.classList.remove('visibility__off');
    lItem.querySelector('.remove__task i').style.background = 'var(--skin-color)';
    lItem.querySelector('.remove__task').style.padding = '5px';
    lItem.querySelector('.list__task').style.textDecoration = 'none';

    const remainderInactive = lItem.querySelector('.remainder__inactive');
    if (remainderInactive.classList.contains('remainder__active')) {
        remainderInactive.setAttribute('data-remainder', "true");
    } else {
        remainderInactive.setAttribute('data-remainder', "false");
    }
}


function handleCheckBoxChange(lItem, isChecked) {
    if (isChecked) {
        checkBoxActive(lItem);
    } else {
        checkBoxInactive(lItem);
    }
}

document.querySelectorAll('.check__box').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const lItem = this.closest('.list__item');
        handleCheckBoxChange(lItem, this.checked);
    });
});


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
    saveData();
}

document.addEventListener('click', remainderToggleHandler);

function snoozeIncrement(reminderDate, snoozeMinutes) {
    // Increment the reminder date by the snooze minutes
    const currentMinutes = reminderDate.getMinutes();
    reminderDate.setMinutes(currentMinutes + snoozeMinutes); // Add minutes to the reminder date
    return reminderDate;
}

function setRemainder(listItem) {
    const reminderTime = listItem.getAttribute('data-created');
    const alertTune = document.querySelector('.audio');
    let reminderDate = new Date(reminderTime);
    const currentDate = new Date();

    const timeDifference = reminderDate - currentDate;

    // If the reminder time has already passed
    if (timeDifference < 0) {
        document.querySelector('.remainderFrame').classList.add('remainderFrame__active');
        document.querySelector('.remainder__msg .date').innerHTML = formatDateTime(reminderDate);
        const remainderElement = listItem.querySelector('.remainder__inactive');
        remainderElement.classList.remove('remainder__active');
        remainderElement.removeEventListener('click', remainderToggleHandler);
        return;
    }

    // Set a timeout for the remainder
    setTimeout(() => {
        alertTune.play();
        inputRemainderDetails(listItem);
        document.querySelector('.alertFrame').classList.add('alertFrame__active');

        // Retrieve user choice for snooze time
        const snoozeButton = document.querySelector('.alert__options .snooze');
        const stopButton = document.querySelector('.alert__options .stop');
        const snoozeSelect = document.querySelector('.alert__options select');

        snoozeButton.addEventListener('click', () => {
            alertTune.pause();
            alertTune.currentTime = 0;

            // Get the selected snooze time and convert to minutes
            const userChoice = snoozeSelect.value;
            let snoozeTime;

            switch (userChoice) {
                case '5_min':
                    snoozeTime = 5;
                    break;
                case '10_min':
                    snoozeTime = 10;
                    break;
                case '15_min':
                    snoozeTime = 15;
                    break;
                case '20_min':
                    snoozeTime = 20;
                    break;
                case '25_min':
                    snoozeTime = 25;
                    break;
                case '30_min':
                    snoozeTime = 30;
                    break;
            }

            // Increment the reminder date by the snooze time (in minutes)
            reminderDate = snoozeIncrement(reminderDate, snoozeTime);

            // Save the updated reminder date back to the DOM or state
            listItem.setAttribute('data-created', reminderDate.toISOString());
            console.log(`Updated reminder time: ${reminderDate}`);

            // Hide the alert frame
            document.querySelector('.alertFrame').classList.remove('alertFrame__active');

            // Set a new timeout with the updated snooze time
            setTimeout(() => {
                alertTune.play();
                inputRemainderDetails(listItem);
                document.querySelector('.alertFrame').classList.add('alertFrame__active');
            }, snoozeTime * 60000); // Convert snoozeTime from minutes to milliseconds
        });

        // Stop button event listener
        stopButton.addEventListener('click', () => {
            alertTune.pause();
            alertTune.currentTime = 0;

            const remainderElement = listItem.querySelector('.remainder__inactive');
            remainderElement.classList.remove('remainder__active');
            remainderElement.setAttribute('data-remainder', "false");
            document.querySelector('.alertFrame').classList.remove('alertFrame__active');
        });
    }, timeDifference);
}



document.querySelector('.remainderFrame__close').addEventListener('click',()=>{
    document.querySelector('.remainderFrame').classList.remove('remainderFrame__active');
})


function inputRemainderDetails(listItem){
    alertFrame = document.querySelector('.alertFrame');
    alertFrame.classList.add('alertFrame__active');
    alertFrame.querySelector('.alert__msg .title').innerHTML = listItem.querySelector('.list__title').innerHTML;
    alertFrame.querySelector('.alert__msg .task').innerHTML = listItem.querySelector('.list__task').innerHTML;
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

