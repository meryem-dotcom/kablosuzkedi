const electron = require('electron');
const {
    ipcRenderer
} = electron;


ipcRenderer.on('todoList_geldi', (event, data) => {
    console.log(data);
    //

    let myP = document.createElement('p');
    myP.innerText = data[data.length - 1].text;
    //
    let myBtn = document.createElement("button");
    myBtn.innerText = "X";
    myBtn.title = 'tamamlandı';
    myBtn.className = "w3-button w3-circle w3-white";
    myBtn.addEventListener("click", (e) => {
        if (confirm("Bu kaydı silmek istediğinizden emin misiniz???")) {
            e.target.parentNode.parentNode.parentNode.remove();
        };
    });
    //
    let myHalf = document.createElement('div');
    myHalf.className = "w3-col w3-container w3-green";
    myHalf.style.width = '90%';
    myHalf.appendChild(myP);
    //
    let myHalf2 = document.createElement("div");
    myHalf2.className = "w3-col w3-container w3-red w3-display-container";
    myHalf2.style.width = '10%';
    let butonTutucu = document.createElement('div');
    butonTutucu.className = 'w3-display-middle';
    butonTutucu.appendChild(myBtn);
    myHalf2.appendChild(butonTutucu);

    let myDivRow = document.createElement('div');
    myDivRow.className = "w3-row w3-margin";
    myDivRow.style.display = "flex";

    myDivRow.appendChild(myHalf);
    myDivRow.appendChild(myHalf2);

    let todoContent = document.getElementById("todoContent");
    todoContent.appendChild(myDivRow);
    checkTodoCount();
});
/**
 *
 * yeni todo ekleyen metoddur
 * mainHtml sayfasında btnEkle butonuna tıklanınca çalışan methoddur.
 *
 */
function ekle() {
    let electron = require("electron");
    let {
        ipcRenderer
    } = electron;

    let inputEkle = document.getElementById('inputEkle');

    ipcRenderer.send('main_todoEkle', inputEkle.value);
    inputEkle.value = "";
}

function checkTodoCount() {
    let todoContent = document.getElementById("todoContent");
    let todoWarning = document.getElementById("todoWarning");
    if (todoContent.children.length !== 0) {
        todoWarning.style.display = "none";
    } else {
        todoWarning.style.display = "block";
    }
}