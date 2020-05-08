const electron = require('electron');

const { app, BrowserWindow, nativeImage, ipcMain, TouchBar } = require('electron');
var fs = require('fs');
const { TouchBarPopover, TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarScrubber, TouchBarSegmentedControl } = TouchBar;
const stockJson = require('./json/stock.json')
let stocks = stockJson.stocks
const path = require('path');
const url = require('url');
const stock1Popover = new TouchBarButton();
const stock2Popover = new TouchBarButton();
const stock3Popover = new TouchBarButton();
const stock4Popover = new TouchBarButton();
const stock5Popover = new TouchBarButton();
const stock1Img = new TouchBarButton({
    click: () => {
        win.loadURL('https://www.cmoney.tw/finance/f00025.aspx?s=' + stocks[0]);
    }
});
const stock2Img = new TouchBarButton({
    click: () => {
        win.loadURL('https://www.cmoney.tw/finance/f00025.aspx?s=' + stocks[1]);
    }
});
const stock3Img = new TouchBarButton({
    click: () => {
        win.loadURL('https://www.cmoney.tw/finance/f00025.aspx?s=' + stocks[2]);
    }
});
const stock4Img = new TouchBarButton({
    click: () => {
        win.loadURL('https://www.cmoney.tw/finance/f00025.aspx?s=' + stocks[3]);
    }
});
const stock5Img = new TouchBarButton({
    click: () => {
        win.loadURL('https://www.cmoney.tw/finance/f00025.aspx?s=' + stocks[4]);
    }
});
const stock1 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock1Img, stock1Popover]
    }),
})
const stock2 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock2Img, stock2Popover]
    }),
})
const stock3 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock3Img, stock3Popover]
    }),
})
const stock4 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock4Img, stock4Popover]
    }),
})
const stock5 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock5Img, stock5Popover]
    }),
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const button = new TouchBarButton({
    // backgroundColor: '#eb4d4b'
});
const touchBar = new TouchBar([
    stock1,
    stock2,
    stock3,
    stock4,
    stock5
]);

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 150, height: 200 });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.setTouchBar(touchBar);
    // ipcMain.on('stock1', (event, arg) => {
    //     button.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    // });
    ipcMain.on('stock1', (event, arg) => {
        stock1.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
        stock1Img.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock2', (event, arg) => {
        stock2.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
        stock2Img.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock3', (event, arg) => {
        stock3.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
        stock3Img.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock4', (event, arg) => {
        stock4.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
        stock4Img.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock5', (event, arg) => {
        stock5.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
        stock5Img.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock1Popover', (event, arg) => {
        stock1Popover.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock2Popover', (event, arg) => {
        stock2Popover.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock3Popover', (event, arg) => {
        stock3Popover.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock4Popover', (event, arg) => {
        stock4Popover.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('stock5Popover', (event, arg) => {
        stock5Popover.icon = nativeImage.createFromBuffer(arg).resize({ height: 23 });
    });
    ipcMain.on('saveJson', (event, arg) => {
        var filepath = "./json/stock.json";
        var tmpJson = {
            "stocks": arg
        }
        fs.writeFile(filepath, JSON.stringify(tmpJson), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            // console.log("The file has been succesfully saved");
        });
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
