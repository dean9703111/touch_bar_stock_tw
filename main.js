const electron = require('electron');

const { app, BrowserWindow, nativeImage, ipcMain, TouchBar } = require('electron');
var twseStockPrices = require('twse-stock-prices');
const { TouchBarPopover, TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarScrubber, TouchBarSegmentedControl } = TouchBar;
const stockJson = require('./json/stock.json')
let stocks = stockJson.stocks
// console.log(stocks)
const path = require('path');
const url = require('url');
// stock labels
const stock1TouchBarSegmentedControl = new TouchBarSegmentedControl({
    segmentStyle: 'separated',
    mode: 'buttons'
})
const stock2TouchBarSegmentedControl = new TouchBarSegmentedControl({
    segmentStyle: 'separated',
    mode: 'buttons'
})
const stock3TouchBarSegmentedControl = new TouchBarSegmentedControl({
    segmentStyle: 'separated',
    mode: 'buttons'
})
const stock4TouchBarSegmentedControl = new TouchBarSegmentedControl({
    segmentStyle: 'separated',
    mode: 'buttons'
})
const stock5TouchBarSegmentedControl = new TouchBarSegmentedControl({
    segmentStyle: 'separated',
    mode: 'buttons'
})
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
        items: [stock1Img, stock1TouchBarSegmentedControl]
    }),
})
const stock2 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock2Img, stock2TouchBarSegmentedControl]
    }),
})
const stock3 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock3Img, stock3TouchBarSegmentedControl]
    }),
})
const stock4 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock4Img, stock4TouchBarSegmentedControl]
    }),
})
const stock5 = new TouchBarPopover({
    showCloseButton: true,
    items: new TouchBar({
        items: [stock5Img, stock5TouchBarSegmentedControl]
    }),
})

function Popover (stockItem, stockContent, stockImg) {
    stockItem.segments = [
        { label: '開盤價' + stockContent.o.toString().substring(0, stockContent.o.toString().length - 2) },
        { label: '最高價' + stockContent.h.toString().substring(0, stockContent.h.toString().length - 2) },
        { label: '最低價' + stockContent.l.toString().substring(0, stockContent.l.toString().length - 2) },
        { label: '昨收價' + stockContent.y.toString().substring(0, stockContent.y.toString().length - 2) },
    ]
}
setInterval(function () { updateStock() }, 3000);
updateStock()
function updateStock () {
    twseStockPrices.getCurrentPrice(stocks, function (err, result) {

        let stockObjects = result.msgArray
        let stockLabelArr = []
        // console.log(stockObjects.length)
        stockObjects.forEach(function (stockObject) {
            // ['股票代號','公司簡稱','當盤成交價','當盤成交量','累積成交量','開盤價','最高價','最低價','昨收價']
            // ['c','n','z','tv','v','o','h','l','y']
            // '股票代號','公司簡稱','當盤成交價' (漲跌用紅綠表示)
            if (stockObject.z !== '-') {
                stockObject.price = stockObject.z.toString()
            } else {
                stockObject.price = stockObject.b.substring(0, stockObject.b.indexOf('_'));
            }
            stockObject.price = stockObject.price.substring(0, stockObject.price.length - 2);
            stockLabelArr.push(stockObject)
        })
        // stock1.items = new TouchBar([new TouchBarButton({ label: 'pop' })])
        Popover(stock1TouchBarSegmentedControl, stockLabelArr[0], stock1Img)
        Popover(stock2TouchBarSegmentedControl, stockLabelArr[1], stock2Img)
        Popover(stock3TouchBarSegmentedControl, stockLabelArr[2], stock3Img)
        Popover(stock4TouchBarSegmentedControl, stockLabelArr[3], stock4Img)
        Popover(stock5TouchBarSegmentedControl, stockLabelArr[4], stock5Img)
        // console.log(priceObjects);
    });
}
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
    win = new BrowserWindow({ width: 800, height: 600 });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    win.webContents.openDevTools();

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
