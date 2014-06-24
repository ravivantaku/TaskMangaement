var TM = TM || {};
TM.Tasks = (function() {
//Get all the tasks from localStorage
    var getTasks = function() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    };
//Set task to localStorage
    var setTasks = function(tasks) {
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks',JSON.stringify(tasks));
    };
//Get task by id
    var getTaskById = function(id){
        return _.filter(getTasks(), function(value) {
            return value.id === +id;
        });
    };
    var updateTask = function(task) {
        setTasks(_.map(getTasks(),function(value){
            if(value.id === task.id)
                return task;
            return value;
        }));
    };
    return {
        getTasks : getTasks,
        setTasks:setTasks,
        getTaskById:getTaskById,
        updateTask:updateTask
    };
})();
