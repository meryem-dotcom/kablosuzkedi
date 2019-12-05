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
    //console.log(process.env);
    let pageOptions = {
        width: 602,
        height: 402,
        //backgroundColor: '#2e2c29',
        opacity: 0.92,
        // resizable: false,
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
        yeniPencereAc();
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

function yeniPencereAc() {
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 482,
        height: 199,
        title: 'Yeni Pencere',
        resizable: false,
        frame: false
    });

    let deger = url.format({
        protocol: "file:",
        slashes: true,
        pathname: path.join(__dirname, "modal.html")
    });
    addWindow.loadURL(deger);

    addWindow.on('close', () => {
        addWindow = null;
    });
}