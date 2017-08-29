const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.setToolTip('Timer App');
    this.mainWindow = mainWindow;
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onrightClick.bind(this))
  }

  onClick(event, bounds) {
    console.log(bounds.x, bounds.y); //not the correct event bounds :(
    //Click event bounds
    const { x, y } = bounds;
    // Window height and width
    const { height, width } = this.mainWindow.getBounds();
  //  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    if(this.mainWindow.isVisible()){
      this.mainWindow.hide();
    }else {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      /*Its absolutely not the best way, but there is
      problems with indicator button postitions on linux!!!
      DEBUGGING NEEDED

      INFO: On linux the position is calculated based on the current cursor position,
      because Tray.getBounds() always returns a Rectangle with all values set to zero.
      https://www.npmjs.com/package/electron-traywindow-positioner
      */
      const xPositon = process.platform === 'linux' ? x + width * 3 : x - width / 2;
      this.mainWindow.setBounds({
        x: xPositon,
        y: yPosition,
        height: height,
        width: width
      });
      this.mainWindow.show();
    }
  }

  onrightClick(){
    const menuConfig =  Menu.buildFromTemplate([
      {label: 'Quit',
      click: () => app.quit()
    }
  ]);

  this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
