const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const path = require('path')
const fs = require('fs');
const Handlebars = require("handlebars");
const sendMail = require('./mailer');

const OUT_DIR = './out';
const HTML_FILE = 'mail.html';
const CONTEXT_FILE = 'mail-context.json';


function sendHtmlMail(event, emailTo) {
  const compiledMail = compileMail();
  sendMail(compiledMail, emailTo);
}
function getContent(event, mode) {
  const fileName = `${OUT_DIR}/${mode ===  'html'? HTML_FILE: CONTEXT_FILE}`;
  console.log(fileName)
  const data = fs.readFileSync(fileName, 'utf8');
  event.returnValue = data;
}
function saveContent(event, data) {
  const content = data.content;
  const mode = data.editorMode;
  const file = `${OUT_DIR}/${mode ===  'html'? HTML_FILE: CONTEXT_FILE}`;
  fs.writeFileSync(file, content);
}
function compileHtml (event) {
  event.returnValue = compileMail();
}


function compileHandlebars(html, context) {
  const template = Handlebars.compile(html);
  return template(context);
}
function compileMail () {
  const htmlFile = fs.readFileSync(`${OUT_DIR}/${HTML_FILE}`, 'utf8');
  const contextFile = fs.readFileSync(`${OUT_DIR}/${CONTEXT_FILE}`, 'utf8');
  return compileHandlebars(htmlFile, JSON.parse(contextFile));
}

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      worldSafeExecuteJavaScript: true
    },
  });
  ipcMain.handle('sendMail', sendHtmlMail);
  ipcMain.handle('saveContent', saveContent);

  ipcMain.on('getContent', getContent);
  ipcMain.on('compileHtml', compileHtml);

  win.loadFile(`index.html`);
  win.maximize();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Darwin arch is for MacOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

