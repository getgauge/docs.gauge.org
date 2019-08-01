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
    let selectionItems = document.querySelectorAll(".selection input");
    let checkedCount = 0;
    selectionItems.forEach(selectedItem => {
        if(selectedItem.checked) checkedCount++;
    });

    if(checkedCount < 3) return;

    selectionItems.forEach(selectedItem => {
        if (selectedItem.checked) applyCombination(selectedItem);
    });

    hidePopUp();
}

const isSelected = selection => Object.values(SELECTIONS).includes(selection);
const isSelectionClass = className => SELECTION_CLASSES.includes(className);
const selectedClasses = element => element.classList.value.split(" ").filter(isSelectionClass);
const isLanguageClass = element => LANGUAGE_CLASSES.includes(element.value);
const isIdeClass = element => IDE_CLASSES.includes(element.value);
const isRelevantIde = (language, ide) => COMBINATIONS[language].includes(ide);
const isSelectedIdeDisabled = (ideElement, selectedIde) => ideElement.value == selectedIde && ideElement.disabled;

const disableNonRelevantIde = function(ideElement, languageBtn){
    ideElement.parentElement.classList.remove('disabled');
    ideElement.disabled = false;
    const language = languageBtn.value || SELECTIONS.language;
    if(!isRelevantIde(language, ideElement.value)) {
        ideElement.parentElement.classList.add('disabled');
        ideElement.disabled = true;
    }
}

const makeSelections = function(){
    const selections = document.querySelectorAll(".selection input");
    selections.forEach(selection => {
        if(Object.values(SELECTIONS).includes(selection.value)) {
            console.log(selection.value);
            selection.checked = true;
        }
    })
}

const resetIdeIfDisabled = function(ideElement){
    const selectedIde = SELECTIONS["ide"];
    if(isSelectedIdeDisabled(ideElement, selectedIde)){
        SELECTIONS["ide"] = "vscode";
        updateURLAndSelection();
        updateSelections();
        changeBackground();
    }
}

const showRelevantIde = function(){
    const inputs = document.querySelectorAll('input');
    const ideElements = Array.prototype.filter.call(inputs,isIdeClass);

    ideElements.forEach(ideElement => {
        disableNonRelevantIde(ideElement, this);
        resetIdeIfDisabled(ideElement);
        ideElement.checked = false;
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