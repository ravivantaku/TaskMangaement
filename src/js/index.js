var TM = TM || {};
$(function(){
    TM.taskListSrc = $('#tasksListTemp').html();
    TM.taskListTemp = Handlebars.compile(TM.taskListSrc);

    TM.createTaskSrc = $('#createTaskTemp').html();
    TM.createTaskTemp = Handlebars.compile(TM.createTaskSrc);
    Handlebars.registerPartial('createTask', $('#createTask-partialTemp').html());

    TM.taskDetailsSrc = $('#taskDetailsTemp').html();
    TM.taskDetailsTemp = Handlebars.compile(TM.taskDetailsSrc);

    TM.editTaskSrc = $('#editTaskTemp').html();
    TM.editTaskTemp = Handlebars.compile(TM.editTaskSrc);
    var displayTasks = function() {
        $('#mainContent').html(TM.taskListTemp(TM.Tasks.getTasks()));
    };
    displayTasks();
    TM.currentTask = {};
    //Task click event handler
    $('#mainContent').on('click', '.list-group-item' , function(){
        TM.currentTask = TM.Tasks.getTaskById($(this).attr('id'))[0];
        $('#mainContent').html(TM.taskDetailsTemp(TM.currentTask));
    });
    var resetInputs = function(){
        $('#summary').val('');
        $('#priority').val('Major');
        $('#dueDate').val('');
        $('#description').val('');
        $('#estimateTime').val('');
    };
    //Dashboard button click event handler
    $('#dashboardbtn').click(function() {
        displayTasks();
    });
    //Create Task button click event handlebar
    $('#createtaskbtn').click(function() {
        $('#mainContent').html(TM.createTaskTemp);
    });
    var getInputValues = function() {
        var data = {};
        data.summary = $('#summary').val();
        data.priority = $('#priority').val();
        data.dueDate = $('#dueDate').val();
        data.description = $('#description').val();
        data.estimateTime = $('#estimateTime').val();
        data.actualTime = '';
        data.taskClosed = false;
        data.status = 'open';
        data.comment = '';
       return data;
    };
    //Create task submit button event handler
    $('#mainContent').on('click', '#createbtn', function() {
        var tasks = TM.Tasks.getTasks();
        var data = getInputValues();
        console.log(data);
        data.id = tasks.length ? tasks[tasks.length-1].id + 1 : 1;
        tasks.push(data);
        TM.Tasks.setTasks(tasks);
        displayTasks();
        resetInputs();
    });
    //Edit button click event handler
    $('#mainContent').on('click', '#editbtn', function() {
        $('#mainContent').html(TM.editTaskTemp);
        $('#summary').val(TM.currentTask.summary);
        $('#priority').val(TM.currentTask.priority);
        $('#dueDate').val(TM.currentTask.dueDate);
        $('#description').val(TM.currentTask.description);
        $('#estimateTime').val(TM.currentTask.estimateTime);
    });
    //Update button click event handler
    $('#mainContent').on('click', '#updatebtn', function() {
        var data = getInputValues();
        data.id = TM.currentTask.id;
        TM.Tasks.updateTask(data);
        displayTasks();
    });
});