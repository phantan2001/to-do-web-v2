'use strict';
$("#datepicker-start").flatpickr(
    {
        "enableTime": true
    }
);
$("#datepicker-end").flatpickr(
    {
        "enableTime": true
    }
);

let saveButton = document.getElementById('btnSave');
let task_name = document.getElementById('task-name-input');
let date_start = document.getElementById('datepicker-start');
let date_end = document.getElementById('datepicker-end');
let options = document.getElementById('option');
let display = document.querySelector('#display');

let isUpdate = false;
let dsTask = localStorage.getItem("dstask") ? JSON.parse(localStorage.getItem("dstask")) : [];


const inDanhSachTask = arr => {
    let stt = 0;
    const trstring = arr.map(item =>
        `<tr id="list">
            <td>${++stt}</td>
            <td id="task-name" value="${item.taskName}">${item.taskName}</td>
            <td class="date_time">${item.dateStart}</td>
            <td class="date_time">${item.dateEnd}</td>
            <td>${item.option}</td>
            <td>${item.level}</td>
            <td>${item.active ? "" : `<input type = 'checkbox' id= "${stt}" class='checkbox'/>`}</td>
            <td class = "button" ><button type='button'  class="btn btn-primary" onclick='editTask("${item.taskName}")'>Edit</button>
            <button type='button' class="btn btn-danger"  onclick='deleteTask("${item.taskName}")'>Delete</button></td>
            
        </tr>`).join('');
    // console.log(trstring);
    display.innerHTML = trstring;
}

inDanhSachTask(dsTask);

const xoaForm = () => {
    task_name.value = '';
    date_start.value = '';
    date_end.value = '';
    options.value = '';
    //reset radio button
    let gts = document.getElementsByName("level");
    for (let i = 0; i < gts.length; i++)
        gts[i].checked = false;
    
    //tra lại hiện trạng ban đầu
    //cap nhat trang thai - isUpdate = true
    isUpdate = false;
    saveButton.textContent = "Add task";
    task_name.disabled = false;
}

const deleteTask = id => {
    console.log(dsTask);
    let cf = confirm("Cậu chắc chắn xóa chưa?");
    if (cf){
        //tim trong array va xoa
        dsTask = dsTask.filter(item => item.taskName != id);
        //cap nhat vao localstorage
        localStorage.setItem("dstask", JSON.stringify(dsTask));
        //in de test 
        console.log(localStorage.getItem("dstask"));
        inDanhSachTask(dsTask);
    }


    let boxes = document.getElementsByClassName('checkbox').length;
    function save() {	
        for(let i = 1; i <= boxes; i++){
            var checkbox = document.getElementById(String(i));
            localStorage.setItem("checkbox" + String(i), checkbox.checked);	
        }
    }
    for(let i = 1; i <= boxes; i++){
        if(localStorage.length > 0){
            var checked = JSON.parse(localStorage.getItem("checkbox" + String(i)));
            document.getElementById(String(i)).checked = checked;
        }
    }
    save();
}

const editTask = id => {
    let task = dsTask.find(item => item.taskName == id);
    //gan du lieu cu len form
    task_name.value = task.taskName;
    date_start.value = task.dateStart;
    date_end.value = task.dateEnd;
    options.value = task.option;
    //check radio 
    let gts = document.getElementsByName("level");
    for (let i = 0; i < gts.length; i++)
        if (gts[i].value == task.level)
            gts[i].checked = true;
    //cac checkbox

    //cap nhat trang thai - isUpdate = true
    isUpdate = true;
    saveButton.textContent = "Update";
    task_name.disabled = true;
    let boxes = document.getElementsByClassName('checkbox').length;
    function save() {	
        for(let i = 1; i <= boxes; i++){
            var checkbox = document.getElementById(String(i));
            localStorage.setItem("checkbox" + String(i), checkbox.checked);	
        }
    }
    for(let i = 1; i <= boxes; i++){
        if(localStorage.length > 0){
            var checked = JSON.parse(localStorage.getItem("checkbox" + String(i)));
            document.getElementById(String(i)).checked = checked;
        }
    }
    save();
}


saveButton.addEventListener('click', function () {
    let level = document.querySelector('input[name="level"]:checked').value;
    let formData = {
        taskName: task_name.value,
        dateStart: date_start.value,
        dateEnd: date_end.value,
        option: options.value,
        level: level,
    }
    console.log(formData);
    if (!isUpdate)  //dang o trang them them moi
        //them du lieu vao mang dsSV
        dsTask.push(formData);
    else {
        //cap nhat
        let editTask = dsTask.find(item => item.taskName == formData.taskName);
        editTask.taskName = formData.taskName;
        editTask.dateStart = formData.dateStart;
        editTask.dateEnd = formData.dateEnd;
        editTask.option = formData.option;
        editTask.level = formData.level;
    }

    localStorage.setItem("dstask", JSON.stringify(dsTask));
    //in du lieu dc luu
    console.log(localStorage.getItem("dstask"));
    inDanhSachTask(dsTask);

    //reset form
    xoaForm();
    let boxes = document.getElementsByClassName('checkbox').length;
    function save() {	
        for(let i = 1; i <= boxes; i++){
            var checkbox = document.getElementById(String(i));
            localStorage.setItem("checkbox" + String(i), checkbox.checked);	
        }
    }
    for(let i = 1; i <= boxes; i++){
        if(localStorage.length > 0){
            var checked = JSON.parse(localStorage.getItem("checkbox" + String(i)));
            document.getElementById(String(i)).checked = checked;
        }
    }
    save();
});




let boxes = document.getElementsByClassName('checkbox').length;


function save() {	
    for(let i = 1; i <= boxes; i++){
	    var checkbox = document.getElementById(String(i));
        localStorage.setItem("checkbox" + String(i), checkbox.checked);	
    }
}
function remove() {
    for(let i = 1; i <= boxes; i++) {
        localStorage.removeItem("checkbox" + String(i));
    }
}
//loading
for(let i = 1; i <= boxes; i++){
    if(localStorage.length > 0){
        var checked = JSON.parse(localStorage.getItem("checkbox" + String(i)));
        document.getElementById(String(i)).checked = checked;
    }
}
window.addEventListener('change', save);

let btnDeleteAll = document.getElementById("btnDeleteAll");

btnDeleteAll.addEventListener("click", function() {
    let dstask = document.querySelectorAll("#list");
    if(confirm("Cậu chắc chắn muốn xóa hết chứ? hic")) {
        remove();
        for(let i = 0; i < dstask.length; i++) {
            dstask[i].remove();
            localStorage.removeItem("dstask", dstask[i]);
            
        }
        localStorage.clear();
        
    }
    
})

