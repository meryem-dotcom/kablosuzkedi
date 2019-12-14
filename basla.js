const electron = require('electron');
const url = require('url');
const path = require('path');

const {
    app,
    BrowserWindow,
    Menu,
    ipcRenderer,
    ipcMain
} = electron;



let mainWindow;
let addWindow;
let todoList = [];

app.on('ready', () => {

    const screenElectron = electron.screen;
    const display = screenElectron.getPrimaryDisplay();
    const dimensions = display.workAreaSize;

    //console.log(process.env);
    let pageOptions = {
        //minWidth: 602,
        //minHeight: 402,
        //height: 402,
        //width: 602,
        //opacity: 0.92,
        // resizable: false,
        width: parseInt(dimensions.width * 0.7),
        height: parseInt(dimensions.height * 0.6),
        minWidth: parseInt(dimensions.width * 0.3),
        minHeight: parseInt(dimensions.height * 0.3),
        maxWidth: dimensions.width,
        maxHeight: dimensions.height,
        webPreferences: {
            nodeIntegration: true
        }
    };



    mainWindow = new BrowserWindow(pageOptions);
    mainWindow.on('closed', () => {
        mainWindow = null
    });

    let deger = url.format({
        protocol: "file:",
        slashes: true,
        pathname: path.join(__dirname, "main.html")
    });
    //console.log(deger);
    mainWindow.loadURL(deger);
    //mainWindow.loadURL('http://youtube.com');
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    ipcMain.on('key', (err, data) => {
        // if (err) {
        //     console.log(err);
        // } else {
        console.log(data);
        // }
    });
    ipcMain.on('key2', (event, data) => {
        console.log(data);
    });

    ipcMain.on('btnPencereAc', (event, data) => {

        let adim = "meryem";

        yeniPencereAc(adim);

    });


    ipcMain.on('iptalBtn', () => {
        console.log('iptalBTN fonksiyonu çalıştı');
        addWindow.close();
        addWindow = null;
    });

    ipcMain.on('modal_btnSave', (event, data) => {
        if (data) {
            todoList.push({
                id: todoList.length + 1,
                text: data
            });
            console.log(todoList);
            addWindow.close();
            addWindow = null;

            mainWindow.webContents.send('todoList_geldi', todoList);
        }
    });
    ipcMain.on('main_todoEkle', (event, data) => {
        if (data) {
            todoList.push({
                id: todoList.length + 1,
                text: data
            });
            console.log(todoList);
            mainWindow.webContents.send("todoList_geldi", todoList);

        }
    });


    mainWindow.on('close', () => {
        app.quit();
    });

    ipcMain.on('btnModalTikla', (event, data) => {
        console.log('data' + data);
        addWindow.webContents.send('gelendata', data);
    });
    ipcMain.on('anasayfa_cikisYapBtn', (event, data) => {
        console.log('bu fonksiyon çalıştı :)');
        app.quit();
    });

});
/*************app.on ready bitti*****************/

const mainMenuTemplate = [{
        label: "Dosya",
        submenu: [{
                label: "Yeni TODO ekle",
                click() {
                    yeniPencereAc();
                },
                accelerator: process.platform == "darwin" ? "Command+B" : "Ctrl+B"
            },
            {
                label: "Hepsini sil"
            },
            {
                label: "Çıkış",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                role: "quit"
            }
        ]
    }

]
if (process.platform == "linux") {
    mainMenuTemplate.unshift({
        label: "TODO",
        role: "TODO"
    })
}

/*aşağısı henüz çalışmıyor*/
if (process.env.NODE_ENV != "production") {
    mainMenuTemplate.push({
        label: "DevTools",
        submenu: [{
                label: "Aç / Kapat",
                accelerator: process.platform == "darwin" ? "Command+O" : "Ctrl+O",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: "Yenile",
                role: "reload"
            }
        ]
    })
}

function yeniPencereAc(isim) {
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 482,
        height: 199,
        title: 'Yeni Pencere',
        resizable: false,
        frame: false,

    });

    let deger = url.format({
        protocol: "file:",
        slashes: true,
        pathname: path.join(__dirname, "modal.html")
    });
    addWindow.loadURL(deger);

    addWindow.webContents.send('adimiGonder', isim);

    addWindow.on('close', () => {
        addWindow = null;
    });
}