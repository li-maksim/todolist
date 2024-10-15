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

const Projects = [];

const ProjectCnstrct = ((name) => {
    return {name: name, todos: []};
});

const ProjectMgmt = (() => {

    function addProj(name) {
        let newProj = ProjectCnstrct();
        newProj.name = name;
        Projects.push(newProj);
    };
    function delProj(idx) {
        Projects.splice(idx, 1)
    };
    function addTodo(arr, item) {
        arr.push(item);
    };
    function delTodo(arr, idx) {
        arr.splice(idx, 1);
    };

    return {addProj, delProj, addTodo, delTodo};

})();

const Display = (() => {
    const content = document.querySelector('#content');
    const projMenu = document.querySelector('#proj_menu');


    function createMenuItem(v, i, a) {
        const newMenuItem = document.createElement('div');
        newMenuItem.setAttribute('class', 'menu_item');
        newMenuItem.textContent = a[i].name;
        projMenu.appendChild(newMenuItem);
    };
    function clearMenu() {
        projMenu.textContent = '';
    };
    function displayProjects() {
        clearMenu();
        Projects.forEach(createMenuItem);
    };

    return {clearMenu, displayProjects};

})();

ProjectMgmt.addProj('One');
ProjectMgmt.addProj('Two');
ProjectMgmt.addProj('Three');
ProjectMgmt.addProj('Four');
console.table(Projects);
Display.displayProjects();

ProjectMgmt.delProj(2);
Display.displayProjects();

