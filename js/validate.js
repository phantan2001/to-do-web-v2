let btnAdd = document.getElementById("btnSave");

btnAdd.addEventListener("click", function() {
    let task_name = document.getElementById("task-name-input");
    let date_start = document.getElementById("datepicker-start");
    let date_end = document.getElementById("datepicker-end");
    let option = document.getElementById("option");
    
    if(task_name.value === "") {
        alert("Nhập tên công việc trước nhé cậu!");
    } else if(date_start.value === "") {
        alert("Nhập thời gian bắt đầu của task nhé!!");
    } else if(date_end.value === "") {
        alert("Nhập thời gian kết thúc của task nhé!!");
    } else if (option.value === "") {
        alert("Chọn mức độ ưu tiên của task nhé!");
    }

})