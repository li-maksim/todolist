import "./style.css";
import {format} from "date-fns";


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

    function addTodo(title, descr, dueDate, priority, done) {
        let newTodo = {
            title: title,
            descr: descr,
            dueDate: dueDate,
            priority: priority,
            done: false,
        };
        newProj.todos.push(newTodo);
    };

    function delTodo(idx) {
        newProj.todos.splice(idx, 1);
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
        idxNum = -1;
    };
    function displayProjects() {
        clearMenu();
        Projects.arr.forEach(createMenuItem);
    };
    function clearContent() {
        content.textContent = '';
        idx = -1;
    };

    const dataset = {project: 0, note: 0};
    function getDataset() {
        dataset.project = this.dataset.project;
        console.table(dataset.project);
    };
    function getDataNote() {
        dataset.note = this.dataset.note;
        console.table(dataset);
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
            projEditInput.value = Projects.arr[dataset.project].name;
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

        const newNoteBtn = document.querySelectorAll('.new_note');
        const newNoteWindow = document.querySelector('.note_newwindow');
        const newNoteTitle = document.querySelector('#note_newname');
        const newNoteDate = document.querySelector('#note_newdate');
        const newNotePriority = document.querySelector('#note_newpriority');
        const newNoteDescr = document.querySelector('#note_newdescr');
        const newNoteProj = document.querySelector('#note_newproj');
        function createProjOptions() {
            Projects.arr.forEach(function(v, i, a) {
                const option = document.createElement('option');
                option.textContent = a[i].name;
                option.value = i;
                if (i == dataset.project) {
                    console.log(i);
                    option.setAttribute('selected', true);
                };
                newNoteProj.appendChild(option);
            });
        };
        newNoteBtn.forEach(function(a) {a.addEventListener('click', () => {newNoteWindow.showModal()})});
        newNoteBtn.forEach(function(a) {a.addEventListener('click', () => {newNoteProj.textContent = ''})});
        newNoteBtn.forEach(function(a) {a.addEventListener('click', createProjOptions)});

        function addNewNote() {
            const selected = newNoteProj.options[newNoteProj.selectedIndex].value;
            Projects.arr[selected].addTodo(
                newNoteTitle.value,
                newNoteDescr.value,
                newNoteDate.value,
                newNotePriority.value
            );
            newNoteWindow.close();
            clearContent();
            Projects.arr[dataset.project].todos.forEach(createNoteCard);
            newNoteTitle.value = '';
            newNoteDescr.value = '';
            newNoteDate.value = '';
            newNotePriority.value = '';
            console.table(Projects.arr);
        };
        const newNoteAddBtn = document.querySelector('#note_add');
        newNoteAddBtn.addEventListener('click', addNewNote);

        const noteEditWindow = document.querySelector('.note_editwindow');
        const editNoteTitle = document.querySelector('#note_editname');
        const editNoteDate = document.querySelector('#note_editdate');
        const editNotePriority = document.querySelector('#note_editpriority');
        const editNoteDescr = document.querySelector('#note_editdescr');
        const noteSaveBtn = document.querySelector('#note_edit');

        function showNoteEditWindow() {
            editNoteTitle.value = Projects.arr[dataset.project].todos[dataset.note].title;
            editNoteDate.value = Projects.arr[dataset.project].todos[dataset.note].dueDate;
            editNotePriority.value = Projects.arr[dataset.project].todos[dataset.note].priority;
            editNoteDescr.value = Projects.arr[dataset.project].todos[dataset.note].descr;
            noteEditWindow.showModal();
        };

        function saveNote() {
            Projects.arr[dataset.project].todos[dataset.note].title = editNoteTitle.value;
            Projects.arr[dataset.project].todos[dataset.note].dueDate = editNoteDate.value;
            Projects.arr[dataset.project].todos[dataset.note].priority = editNotePriority.value;
            Projects.arr[dataset.project].todos[dataset.note].descr = editNoteDescr.value;
            noteEditWindow.close();
            clearContent();
            Projects.arr[dataset.project].todos.forEach(createNoteCard);
        };

        noteSaveBtn.addEventListener('click', saveNote);

        return {showEditWindow, closeWindow, projEditInput, showNoteEditWindow};

    })();

    function createMenuItem(v, i, a) {

        idxNum++;

        const newMenuItem = document.createElement('div');
        newMenuItem.setAttribute('class', 'menu_item');
        const projName = document.createElement('div');
        projName.setAttribute('class', 'project_name');
        projName.setAttribute('data-project', idxNum);
        projName.textContent = a[i].name;
        projName.addEventListener('click', () => {clearContent()});
        projName.addEventListener('click', getDataset);
        projName.addEventListener('click', () => {Projects.arr[i].todos.forEach(createNoteCard)});

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

    let idx = -1;

    function createNoteCard(v, i, a) {

        idx++;

        const noteCard = document.createElement('div');
        noteCard.setAttribute('class', 'note_card')
        noteCard.setAttribute('data-note', idx);

        const noteBtns = document.createElement('div');
        noteBtns.setAttribute('class', 'note_btns');
        const noteDoneBtn = document.createElement('input');
        noteDoneBtn.type = 'checkbox';
        noteDoneBtn.setAttribute('class', 'checkbox');
        function checkbox() {
            if (noteDoneBtn.checked == true) {
                noteCard.classList.add('done');
                a[i].done = true;
                console.log(a);
            } else {
                noteCard.classList.remove('done');
                a[i].done = false;
                console.log(a);
            };
        };
        noteDoneBtn.addEventListener('click', checkbox);

        const noteDelBtn = document.createElement('button');
        noteDelBtn.classList.add('btn', 'icon-delete');
        function delNote() {
            Projects.arr[dataset.project].delTodo(noteCard.dataset.note);
            console.log(noteCard.dataset.note);
            clearContent();
            a.forEach(createNoteCard);
        }
        noteDelBtn.addEventListener('click', delNote);
        const noteHr = document.createElement('hr');

        const cardContent = document.createElement('div');
        cardContent.setAttribute('class', 'card_content');
        cardContent.setAttribute('data-note', idx);
        cardContent.addEventListener('click', getDataNote);
        cardContent.addEventListener('click', Windows.showNoteEditWindow);
        const noteTitle = document.createElement('h2');
        noteTitle.textContent = a[i].title;
        const noteDate = document.createElement('div');
        noteDate.setAttribute('class', 'note_date');
        noteDate.textContent = format(a[i].dueDate, "dd/MM/yyyy");
        const notePriority = document.createElement('div');
        notePriority.setAttribute('class', 'note_priority');
        notePriority.textContent = a[i].priority;
        const noteDescr = document.createElement('div');
        noteDescr.setAttribute('class', 'note_descr');
        noteDescr.textContent = a[i].descr;

        noteBtns.appendChild(noteDoneBtn);
        noteBtns.appendChild(noteDelBtn);
        cardContent.appendChild(noteTitle);
        cardContent.appendChild(noteDate);
        cardContent.appendChild(notePriority);
        cardContent.appendChild(noteDescr);
        noteCard.appendChild(noteBtns);
        noteCard.appendChild(noteHr);
        noteCard.appendChild(cardContent);
        content.appendChild(noteCard);

    };

    return {clearMenu, displayProjects, createNoteCard};

})();

Project('One');
Project('Two');
Project('Three');
Project('Four');
Display.displayProjects();

Projects.arr[0].addTodo('Test', 'test text', '2024-10-24', 3);
Projects.arr[0].addTodo('Double test', 'another text', '2024-10-25', 2);
Projects.arr[0].todos.forEach(Display.createNoteCard);