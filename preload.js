const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  sendMail: (args) => ipcRenderer.invoke('sendMail', args),
  saveContent: (args) => ipcRenderer.invoke('saveContent', args),
  getContent: (args) => ipcRenderer.sendSync('getContent', args),
  compileHtml: (args) => ipcRenderer.sendSync('compileHtml', args),
  toggleWordWrap: (args) => ipcRenderer.sendSync('toggleWordWrap', args)
  // we can also expose variables, not just functions
})
