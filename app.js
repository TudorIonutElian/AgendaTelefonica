var listaContacte = [
    
];
var status = 'adaugare';
document.querySelector('#addContact').addEventListener('click', adauga);

var indexEditare = -1;

function adauga(form, event) {
    form.preventDefault();
    var pers = {};
    listaContacte.numeC = document.querySelector('[name=numeC]').value;
    if(document.querySelector('[name=numarC]').value < 10){
        document.querySelector('#container-status').innerHTML = 'Numarul trebuie sa contina 10 cifre!';
    }else{
        listaContacte.numarC = document.querySelector('[name=numarC]').value;
        var pers = {};
        var inputs = document.querySelectorAll("input[name]");
        for (var i = 0; i < inputs.length; i++) {
            var a = inputs[i].getAttribute("name");
            var v = inputs[i].value;
            pers[a] = v;
        }
        if (indexEditare === -1) {
            listaContacte.push(pers);
        } else {
            listaContacte.splice(indexEditare, 1, pers);
            indexEditare = -1;
        }
    }
    afiseazaContacte();
    document.querySelector('#adaugaContacte').reset();
}

function afiseazaContacte(){
    var str = "";
    for(var i = 0; i < listaContacte.length; i++){
        str += 
        `
        <tr class="row_result">
            <td>${listaContacte[i].numeC}</td>
            <td>${listaContacte[i].numarC}</td>
            <td><a class="contactEdit" href="#" onclick="editeaza(${i});">Editeaza</a></td>
            <td><a class="contactDelete" href="#" onclick="stergeContact(${i});">Sterge</a></td>
            <td><a class="markContactBtn" href="#" onclick="markContact(${i});">Marcheaza</a></td>
        </tr>
        `;
    }
    document.querySelector('tbody').innerHTML = str;
}

function sortare(coloana) {
    listaContacte.sort(function (a, b) {
        if (a[coloana] > b[coloana]) {
            return 1;
        }
        if (a[coloana] < b[coloana]) {
            return -1;
        }
        return 0;
    });
    afiseazaContacte();
}

function editeaza(idx) {
    var inputs = document.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        var a = inputs[i].getAttribute("name");
        inputs[i].value = listaContacte[idx][a];
        inputs[i].classList.add('editInput');
    }
    var tableRowsForEdit = document.querySelectorAll('tr.row_result');
    if(tableRowsForEdit[idx].classList.contains('editOnProgress')){
        document.querySelector('[name=numeC]').value = '';
        document.querySelector('[name=numarC]').value = '';
    }else{
        tableRowsForEdit[idx].classList.add('editOnProgress');
    }
    indexEditare = idx;
}

function markContact(idx) {
    var tableRowsForEdit = document.querySelectorAll('tr.row_result');
    if(tableRowsForEdit[idx].classList.contains('markContact')){
        tableRowsForEdit[idx].classList.remove('markContact');
        tableRowsForEdit[idx].style.backgroundColor = '#fff';
    }else{
        tableRowsForEdit[idx].classList.add('markContact');
        tableRowsForEdit[idx].style.backgroundColor = '#ff0505cc';
    }
}

function stergeContact(idx) {
    if (confirm("Esti sigur ca vrei sa stergi contactul " + listaContacte[idx].numeC + " ?")) {
        listaContacte.splice(idx, 1);
        afiseazaContacte();
    }
}

document.onload = afiseazaContacte();
