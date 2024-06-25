const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  sendMail: (args) => ipcRenderer.invoke('sendMail', args),
  saveContent: (args) => ipcRenderer.invoke('saveContent', args),
  toggleDevTools: (args) => ipcRenderer.invoke('toggleDevTools', args),
  getContent: (args) => ipcRenderer.sendSync('getContent', args),
  compileHtml: (args) => ipcRenderer.sendSync('compileHtml', args),
  // we can also expose variables, not just functions
})
