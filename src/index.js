import "./style.css";

const TodoCnstrct = ((title, descr, dueDate, priority, checklist) => {
    return {
        title: title,
        descr: descr,
        dueDate: dueDate,
        priority: priority,
        checklist: checklist
    };
});

const ProjectCnstrct = (() => {
    return [];
});

let todo1 = TodoCnstrct('Test', 'testtest', '15.09', 5);
let project1 = ProjectCnstrct();
project1.push(todo1);

const ProjectMgmt = (() => {
    function addTodo(arr, item) {
        arr.push(item);
    };
    function delTodo(arr, n) {
        arr.splice(n, 1);
    };

    return {addTodo, delTodo};
})();

