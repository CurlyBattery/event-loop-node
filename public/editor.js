const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

let codeEditor = ace.edit('editorCode');
let defaultCode = 'console.log(\'Hello World\');';
let  consoleMessages = []

let editorLib = {
  clearConsoleScreen() {
    consoleMessages.length = 0;

    while (consoleLogList.firstChild) {
      consoleLogList.removeChild(consoleLogList.firstChild);
    }
  },
  printToConsole() {
    consoleMessages.forEach(log => {
      const newLogItem = document.createElement('li');
      const newLogText = document.createElement('pre');

      newLogText.className = log.class;
      newLogText.textContent = `> ${log.message}`;

      newLogItem.appendChild(newLogText);

      consoleLogList.appendChild(newLogItem);
    })

  },
  init() {


    codeEditor.setTheme('ace/theme/monokai');

    codeEditor.session.setMode('ace/mode/javascript');

    codeEditor.setOptions({
      fontSize: '12pt',
    });

    codeEditor.setValue(defaultCode);
  }
}

executeCodeBtn.addEventListener('click', () => {
  editorLib.clearConsoleScreen();
  const userCode = codeEditor.getValue();
  try {
    new Function(userCode)();
  } catch (err) {
    console.error(err);
  }

  editorLib.printToConsole();


});

resetCodeBtn.addEventListener('click', () => {
  codeEditor.setValue(defaultCode);

  editorLib.clearConsoleScreen();
})

editorLib.init();