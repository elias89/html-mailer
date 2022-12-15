
document.getElementById("sendMailButton").addEventListener("click", sendMail);
document.getElementById("saveContentButton").addEventListener("click", saveContent);
document.getElementById("compileHtmlButton").addEventListener("click", compileHtml);

document.getElementById("showHtml").addEventListener("click", toggleMode);
document.getElementById("showContext").addEventListener("click", toggleMode);

const previewIframe = document.getElementById("preview-iframe");
const emailToElement = document.getElementById("email-to");

require.config({ paths: { vs: './node_modules/monaco-editor/min/vs' } });

let editor;
let editorMode = 'html';
require(['vs/editor/editor.main'], function () {
  const content = window.api.getContent('html');
  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: content,
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
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