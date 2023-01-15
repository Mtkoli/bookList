const $ = document;
function _id(id) {
    return $.getElementById(id);
}
function create(name) {
    return $.createElement(name);
}
const title = _id('title');
const author = _id('author');
const year = _id('year');
const bookList = _id('book-list');
const addButton = $.querySelector('.btn');
addButton.addEventListener('click', bookHandler);
function bookHandler(e) {
    e.preventDefault();
    if(isValid()){
        content();
        save();
        title.value = '';
        author.value = '';
        year.value = '';
    }else{
        alert('please fill out the form completely')
    }
}
function isValid() {
    let valid = true;
    if(!title.value || !author.value || isNaN(parseInt(year.value))){
        valid = false;
    }
    return valid;
}
function content() {
    let tr = create('tr');
    let titleTh = create('th');
    let authorTh = create('th');
    let yearTh = create('th');
    titleTh.innerText = title.value;
    authorTh.innerText = author.value;
    yearTh.innerText = year.value;
    let elems = [titleTh, authorTh, yearTh];
    elems.forEach(item => {
        tr.appendChild(item);
    });
    bookList.appendChild(tr);
}
function save() {
    let data = [title.value, author.value, year.value];
    let flag = localStorage.getItem('book');
    if(flag == null){
        localStorage.setItem('book', JSON.stringify([data]));
    }else{
        flag = JSON.parse(flag);
        flag.push(data);
        localStorage.setItem('book', JSON.stringify(flag));
    }
}
window.addEventListener('load', loadBooks);
function loadBooks() {
    let local = localStorage.getItem('book');
    if(local != null){
        local = JSON.parse(local);
        for (const iterator of local) {
            let tr = create('tr');
            let title = create('th');
            let author = create('th');
            let year = create('th');
            title.innerText = iterator[0];
            author.innerText = iterator[1];
            year.innerText = iterator[2];
            let elems = [title, author, year];
            for (const item of elems) {
                tr.appendChild(item);
            }
            bookList.appendChild(tr);
        }
    }
}