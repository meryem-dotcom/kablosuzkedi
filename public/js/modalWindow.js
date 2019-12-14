const electron = require('electron');
const {
    ipcRenderer,
    ipcMain,
    webContents
} = electron;

function save() {
    let inputSave = document.getElementById('inputSave');
    ipcRenderer.send('modal_btnSave', inputSave.value);
}

ipcRenderer.on('gelendata', (event, data) => {
    document.getElementById('sonuc').innerHTML = data;
});

function btnModalTikla() {
    ipcRenderer.send('btnModalTikla', 'bu bilgi gönderildi');
}

function kapat() {

    ipcRenderer.send('iptalBtn');

};

ipcRenderer.on('adimiGonder', (event, data) => {
    document.getElementById('sonuc').innerHTML = 'BUDUR';
    alert(data);
});



document.getElementById('sonuc').innerHTML = 'BUDUR';