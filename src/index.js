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
    let idxNum = -1;

    function createMenuItem(v, i, a) {
        idxNum++;
        const newMenuItem = document.createElement('div');
        newMenuItem.setAttribute('class', 'menu_item');
        const projName = document.createElement('div');
        projName.setAttribute('class', 'project_name');
        projName.textContent = a[i].name;

        const projDelBtn = document.createElement('button');
        projDelBtn.classList.add('btn');
        projDelBtn.classList.add('icon-delete');
        projDelBtn.setAttribute('data-project', idxNum);
        function delProj() {
            ProjectMgmt.delProj(projDelBtn.dataset.project);
            console.log(projDelBtn.dataset.project);
        };
        projDelBtn.addEventListener('click', delProj);
        projDelBtn.addEventListener('click', displayProjects);

        newMenuItem.appendChild(projName);
        newMenuItem.appendChild(projDelBtn);
        projMenu.appendChild(newMenuItem);
    };

    function clearMenu() {
        projMenu.textContent = '';
    };
    function displayProjects() {
        clearMenu();
        idxNum = -1;
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
