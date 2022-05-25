const text = document.getElementById("text");
const submit = document.getElementById("submit");
const showName = document.getElementById("showName");
const showNameArea = document.getElementById("showNameArea");

const { ipcRenderer } = require("electron");

submit.addEventListener("click", () => {
    ipcRenderer.send("insert-text", text.value);
    text.value = "";
});

showName.addEventListener("click", () => {
    ipcRenderer.send("show-name");
    ipcRenderer.on("show-name-reply", (event, arg) => {
        arg = arg.split("\n").join("<br>");
        showNameArea.innerHTML = arg;
    });
});
