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

app.on('ready', () => {
    //console.log(process.env);
    let pageOptions = {
        width: 600,
        height: 300,
        //backgroundColor: '#2e2c29',
        title: 'meryem',
        opacity: 0.92,
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
    ipcMain.on('key2', (err, data) => {
        console.log(data);
    });
    ipcMain.on('btnPencereAc', () => {
        yeniPencereAc();
    });
    mainWindow.on('close', () => {
        app.quit();
    });
});
const mainMenuTemplate = [{
        label: "Dosya",
        submenu: [{
                label: "Yeni TODO ekle",
                accelerator: process.platform == "darwin" ? "Command+A" : "Ctrl+A"
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
        width: 482,
        height: 193,
        title: 'Yeni Pencere'
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