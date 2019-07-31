const COMBINATIONS = {'javascript':['vscode'],'java':['vscode','intellij'],'python':['vscode'],'ruby':['vscode'],'csharp':['vscode','visualstudio']};
const SELECTION_CLASSES = ['macos', 'windows', 'linux', 'javascript', 'java', 'python', 'ruby', 'csharp', 'vscode', 'intellij', 'visualstudio'];
const LANGUAGE_CLASSES = ['javascript', 'java', 'python', 'ruby', 'csharp'];
const IDE_CLASSES = ['vscode','intellij','visualstudio'];

const changeFilter = function () {
    let changeFilterBtn = document.getElementById("change-filter");
    if (!changeFilterBtn) return;
    changeFilterBtn.onclick = showPopup;
    let cancelBtn = document.getElementsByClassName("cancel");
    cancelBtn[0].onclick = hidePopUp;
    let applyBtn = document.getElementsByClassName("apply-filter");
    applyBtn[0].onclick = updateContent;
};

const showPopup = function () {
    Object.values(SELECTIONS).forEach(selection => {
        document.querySelector(`input[value="${selection}"]`).checked=true;
    });
    let popUp = document.getElementsByClassName("proj-setup-filters");
    let changeFilterBtn = document.getElementById("change-filter");
    changeFilterBtn.classList.add("change-filter-btn");
    popUp[0].classList.remove("hidden");
};

const hidePopUp = function () {
    let popUp = document.getElementsByClassName("proj-setup-filters");
    let changeFilterBtn = document.getElementById("change-filter");
    changeFilterBtn.classList.remove("change-filter-btn");
    popUp[0].classList.add("hidden");
};

const applyCombination = function (element) {
    let name = normalize(element.value);
    SELECTIONS[element.name] = name;
    window.localStorage.setItem(element.name, name);
    updateURLAndSelection(element);
}

const updateContent = function () {
    let selectionItems = document.querySelectorAll(".selection");
    selectionItems.forEach(selectedItem => {
        selectedItem.childNodes.forEach(item => {
            let element = item.firstChild;
            if (element && element.checked) applyCombination(element);
        });
    });
    hidePopUp();
}

const isSelected = selection => Object.values(SELECTIONS).includes(selection);
const isSelectionClass = className => SELECTION_CLASSES.includes(className);
const selectedClasses = element => element.classList.value.split(" ").filter(isSelectionClass);
const isLanguageClass = element => LANGUAGE_CLASSES.includes(element.value);
const isIdeClass = element => IDE_CLASSES.includes(element.value);
const isRelevantIde = (language, ide) => COMBINATIONS[language].includes(ide);

const showRelevantIde = function(){
    const inputs = document.querySelectorAll('input');
    const ideElements = Array.prototype.filter.call(inputs,isIdeClass);

    ideElements.forEach(ideElement => {
        ideElement.parentElement.style.display = 'inline';
        const language = this.value || SELECTIONS.language;

        if(!isRelevantIde(language, ideElement.value)) {
            ideElement.parentElement.style.display = 'none';
        }
    })
}

const setLanguageButtons = function(){
    const inputs = document.querySelectorAll('.selection input');
    const languageElements = Array.prototype.filter.call(inputs,isLanguageClass);
    languageElements.forEach(elem => elem.onclick= showRelevantIde.bind(elem))
}

const hasMultipleSelection = function (selectedClasses) {
    let hasAllselectedClasses = selectedClasses.every(isSelected);
    return hasAllselectedClasses;
}

const showContents = function () {
    let dynamicElems = document.querySelectorAll(".dynamic-content");
    dynamicElems.forEach(elem => {
        elem.classList.add('hidden');
        let classes = selectedClasses(elem);
        if (hasMultipleSelection(classes)) {
            elem.classList.remove('hidden');
        }
    });
}