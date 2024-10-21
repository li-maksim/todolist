import "./style.css";


const Projects = {
    arr: [],
    delProj: function(idx) {
        Projects.arr.splice(idx, 1);
    },
    editProj: function(idx, name) {
        Projects.arr[idx].name = name;
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

    function clearMenu() {
        projMenu.textContent = '';
    };
    function displayProjects() {
        clearMenu();
        idxNum = -1;
        Projects.arr.forEach(createMenuItem);
    };

    const dataset = {};
    function getDataset() {
        dataset.project = this.dataset.project;
        Windows.projEditInput.value = Projects.arr[dataset.project].name;
        console.log(dataset.project)
    };

    const Windows = (() => {
        const projNewBtn = document.querySelectorAll('.new_proj');
        const closeBtn = document.querySelectorAll('.close_btn');
        const windows = document.querySelectorAll('.window');
        function closeWindow() {
            windows.forEach(function (a) {a.close()})
        }
        closeBtn.forEach(function (a) {a.addEventListener('click', closeWindow)});

        const projAddWindow = document.querySelector('.proj_addwindow');
        const projAddInput = document.querySelector('#proj_add');
        const projAddBtn = document.querySelectorAll('.proj_addbtn');
        function showAddWindow() {
            projAddWindow.showModal();
        };
        function addProj(evt) {
            evt.preventDefault();
            if (projAddInput.value == '') {
                projAddInput.value = projAddInput.placeholder;
            };
            Project(projAddInput.value);
            displayProjects();
            projAddInput.value = '';
            projAddWindow.close();
        };
        projAddBtn.forEach(function(a) {a.addEventListener('click', addProj)});
        projNewBtn.forEach(function(a) {a.addEventListener('click', showAddWindow)});

        const projEditWindow = document.querySelector('.proj_editwindow');
        function showEditWindow() {
            projEditWindow.showModal();
        };

        const projEditInput = document.querySelector('#proj_edit');
        function projEdit() {
            Projects.editProj(dataset.project, projEditInput.value);
            displayProjects();
            Windows.closeWindow();
            console.table(Projects.arr);
        };

        const projEditWindowBtn = document.querySelector('#proj_editbtn');
        projEditWindowBtn.addEventListener('click', projEdit);

        return {showEditWindow, closeWindow, projEditInput};

    })();

    function createMenuItem(v, i, a) {

        idxNum++;

        const newMenuItem = document.createElement('div');
        newMenuItem.setAttribute('class', 'menu_item');
        const projName = document.createElement('div');
        projName.setAttribute('class', 'project_name');
        projName.textContent = a[i].name;

        const itemIcons = document.createElement('div');
        itemIcons.setAttribute('class', 'item_icons');

        const projEditBtn = document.createElement('button');
        projEditBtn.classList.add('btn');
        projEditBtn.classList.add('icon-edit');
        projEditBtn.setAttribute('data-project', idxNum);
        projEditBtn.addEventListener('click', getDataset);
        projEditBtn.addEventListener('click', Windows.showEditWindow);

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

        itemIcons.appendChild(projEditBtn);
        itemIcons.appendChild(projDelBtn);

        newMenuItem.appendChild(projName);
        newMenuItem.appendChild(itemIcons);
        projMenu.appendChild(newMenuItem);
    };

    return {clearMenu, displayProjects};

})();

Project('One');
Project('Two');
Project('Three');
Project('Four');
console.table(Projects);
Display.displayProjects();
console.log(Projects.arr[1].name);