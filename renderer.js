
document.getElementById("sendMailButton").addEventListener("click", sendMail);
document.getElementById("saveContentButton").addEventListener("click", saveContent);

document.getElementById("toggleDevTools").addEventListener("click", toggleDevTools);
document.getElementById("showHtml").addEventListener("click", toggleMode);
document.getElementById("showContext").addEventListener("click", toggleMode);
document.getElementById("wordwrapToggle").addEventListener("click", toggleWordWrap);

const previewIframe = document.getElementById("preview-iframe");
const emailToElement = document.getElementById("email-to");
const layoutMain = document.getElementById("flayout-main");

require.config({ paths: { vs: './node_modules/monaco-editor/min/vs' } });

let editor;
let editorMode = 'html';
let wordWrap = false;
let devTools = false;

layoutMain.addEventListener("flayoutStart", onFlayoutDragStart);
layoutMain.addEventListener("flayoutEnd", onFlayoutDragEnd);

require(['vs/editor/editor.main'], function () {
  const content = window.api.getContent('html');
  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: content,
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
    wordWrap: "off",
    scrollbar: {
      horizontal: 'visible'
    }
  });
  const emailTo = window.localStorage.getItem('emailTo') || '';
  emailToElement.value = emailTo;
});

function saveContent() {
  const content = editor.getValue();
  window.api.saveContent({
    editorMode: editorMode,
    content: content
  });
  compileHtml();
}
function toggleDevTools(e) {
  devTools = !devTools;

  if (devTools) {
    e.target.classList.add('on');
  } else {
    e.target.classList.remove('on')
  }
  window.api.toggleDevTools();
}
function toggleMode(event) {
  // First save any non saved content, then swtich mode
  saveContent();

  const mode = event.target.value; 
  const content = window.api.getContent(mode);
  editor.setValue(content);
  monaco.editor.setModelLanguage(editor.getModel(), mode === 'html'? 'html' : 'json');
  editorMode = mode;
}
function compileHtml() {
  const compiledHtml = window.api.compileHtml();
  previewIframe.contentDocument.close();
  previewIframe.contentDocument.write(compiledHtml);
}
function sendMail() {
  const emailTo = emailToElement.value;
  window.localStorage.setItem('emailTo', emailTo);
  window.api.sendMail(emailTo);
}
function toggleWordWrap(e) {
  wordWrap = !wordWrap;

  if (wordWrap) {
      e.target.classList.add('on');
  } else {
    e.target.classList.remove('on')
  }

  editor.updateOptions({ wordWrap: wordWrap? 'on': 'off' })
  //window.api.toggleWordWrap(wordWrap);
}
function onFlayoutDragStart() {
  console.log("onFlayoutDragStart")
  previewIframe.style.pointerEvents = 'none';
}

function onFlayoutDragEnd() {
  console.log("onFlayoutDragEnd")
  previewIframe.style.pointerEvents = 'all';
}
