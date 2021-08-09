const INPUTS = document.querySelectorAll('input');
const BTN_ADD_USER = document.getElementById('btn-add-edit');
const FORM = document.getElementById('register-form');
const TBODY = document.querySelector('tbody');
let data = [];
let editUserIndex = -1;
function updateSubmitBtnText() {
    BTN_ADD_USER.innerHTML = editUserIndex >= 0 ? "Edit user" : "Add user";
}
updateSubmitBtnText();
class User {
    login;
    password;
    email;
    constructor(login, password, email) {
        this.login = login;
        this.password = password;
        this.email = email;
    }
}
function saveUser(index, login, password, email) {
    let user = new User(login, password, email);
    data[index] = user;
    editUserIndex = -1;
    updateSubmitBtnText();
    FORM.reset();
}
function editUser(index) {
    FORM.elements['login'].value = data[index].login;
    FORM.elements['password'].value = data[index].password;
    FORM.elements['email'].value = data[index].email;
}
function deleteUser(index) {
    data.splice(index, 1);
}
function addUser() {
    let obj = {
        login: FORM.elements['login'].value,
        password: FORM.elements['password'].value,
        email: FORM.elements['email'].value
    };
    data.push(obj);
    FORM.reset();
}
function createTd(value) {
    let td = document.createElement('td');
    td.innerHTML = value;
    return td;
}
function createEditButton(index) {
    let btn = document.createElement('button');
    // btn.classList.add('edit');
    btn.classList.add('btn');
    btn.classList.add('btn-warning');
    btn.innerHTML = 'Edit';
    console.log(editUserIndex);
    btn.addEventListener('click', function () {
        editUserIndex = index;
        updateSubmitBtnText();
        editUser(index);
        render();
    });
    return btn;
}
function createDeleteButton(index) {
    let btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('btn-danger');
    btn.innerHTML = 'Delete';
    btn.addEventListener('click', function () {
        deleteUser(index);
        render();
    });
    return btn;
}
function render() {
    TBODY.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        tr.appendChild(createTd(i + 1));
        tr.appendChild(createTd(data[i].login));
        tr.appendChild(createTd(data[i].password));
        tr.appendChild(createTd(data[i].email));
        let btnEdit = createEditButton(i);
        let cellEdit = document.createElement('td');
        cellEdit.appendChild(btnEdit);
        tr.appendChild(cellEdit);
        let btnDelete = createDeleteButton(i);
        let cellDelete = document.createElement('td');
        cellDelete.appendChild(btnDelete);
        tr.appendChild(cellDelete);
        TBODY.appendChild(tr);
    }
}
INPUTS.forEach(input => {
    input.addEventListener('focus', function () {
        this.style.border = '2px solid rgb(65, 195, 255)';
        this.style.outline = 'none';
        this.style.boxShadow = ' 0 0 20px skyblue';
    });
    input.addEventListener('blur', function () {
        this.style.border = '';
        this.style.outline = 'none';
        this.style.boxShadow = '';
    });
});
FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    if (editUserIndex >= 0) {
        saveUser(editUserIndex, event.target['login'].value, event.target['password'].value, event.target['email'].value);
    }
    else if (data.length < 3) {
        addUser();
    }
    render();
});
// Завдання
// Потрібно реалізувати функціонал як на відео UserList, а саме:
// При кліку на кнопку Add user запускаєте функцію addUser() яка робить наступне:
// Стягуєте дані з полів і формує об’єкт.
// Цей об’єкт пушитю в масив.
// Поля зачищає.
// Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.
// При кліку на кнопку Delete запускаєте функцію deleteUser() яка робить наступне:
// Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// По цьому індексу видаляємо елемент з масиву.
// Запускаєм заново функцію render().
// При кліку на кнопку Edit запускаєте функцію editUser() яка робить наступне:
// Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// По цьому індексу витягуємо конкретрний елемент(тобто об’єкт) з масиву.
// З об’єкт достаємо дані і передаємо в форму(тобто у value інпутів).
// Запам’ятовуємо даний індекс в змінну userIndex.
// Показуємо кнопку Edit user і приховуємо Add user.
// При кліку на кнопку Edit User запускаєте функцію saveEditUser() яка робить наступне:
// Стягуєте дані з полів і формує об’єкт через клас.
// Цей об’єкт додається на місце старого об’єкту через userIndex.
// Поля зачищає.
// Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.
