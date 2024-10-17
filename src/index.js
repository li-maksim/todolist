import "./style.css";


const Projects = {
    arr: [],
    delProj: function(idx) {
        Projects.arr.splice(idx, 1);
    }
};

const Project = function(name) {

    const TodoCnstrct = ((title, descr, dueDate, priority, done, checklist) => {
        return {
            title: title,
            descr: descr,
            dueDate: dueDate,
            priority: priority,
            done: false,
            checklist: checklist
        };
    });

    function addTodo(title, descr, dueDate, priority, done, checklist) {
        let newTodo = TodoCnstrct(title, descr, dueDate, priority, done, checklist);
        newProj.push(newTodo);
    };

    function delTodo(idx) {
        newProj.splice(idx, 1);
    };

    const newProj = {
        name: name, 
        todos: [],
        addTodo,
        delTodo,
    };

    Projects.arr.push(newProj);
    return newProj;
};

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
            Projects.delProj(projDelBtn.dataset.project);
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
        Projects.arr.forEach(createMenuItem);
    };

    return {clearMenu, displayProjects};

})();

Project('One');
Project('Two');
Project('Three');
Project('Four');
console.table(Projects);
Display.displayProjects();