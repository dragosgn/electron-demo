const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu } = electron

let mainWindow
let addWindow

// Listen for app to be ready
app.on('ready', function() {
	// Create new windos
	mainWindow = new BrowserWindow({})
	// Load html file into window
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'mainWindow.html'),
			protocol: 'file:',
			slashes: true
		})
	)
	// Quit app when closed
	mainWindow.on('closed', function() {
		app.quit() // close big app when closing big window
	})
	// Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
	Menu.setApplicationMenu(mainMenu)
})

// Handle add window
function createAddWindow() {
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add Hopping list item'
	})
	// Load html file into window
	addWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'addWindow.html'),
			protocol: 'file:',
			slashes: true
		})
	)

	addWindow.on('close', function() {
		addWindow = null
	})
}

// Create menu template
const mainMenuTemplate = [
	{},
	{
		label: 'File',
		submenu: [
			{
				label: 'Add Item',
				click() {
					createAddWindow()
				}
			},
			{
				label: 'Clear Items'
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+!',
				click() {
					app.quit()
				}
			}
		]
	}
]
