const COMBINATIONS = { 'javascript': ['vscode'], 'java': ['vscode', 'intellij'], 'python': ['vscode'], 'ruby': ['vscode'], 'csharp': ['vscode', 'visualstudio'] };
const SELECTION_CLASSES = ['macos', 'windows', 'linux', 'javascript', 'java', 'python', 'ruby', 'csharp', 'vscode', 'intellij', 'visualstudio'];
const LANGUAGE_CLASSES = ['javascript', 'java', 'python', 'ruby', 'csharp'];
const IDE_CLASSES = ['vscode', 'intellij', 'visualstudio'];

const changeFilter = function () {
    let changeFilterBtn = document.getElementById("change-filter");
    if (!changeFilterBtn) return;
    changeFilterBtn.onclick = showPopup;
    let cancelBtn = document.getElementsByClassName("cancel");
    cancelBtn[0].onclick = hidePopUp;
    let applyBtn = document.getElementsByClassName("modify");
    applyBtn[0].onclick = updateContent;
};

const refreshPage = function () {
    window.location.reload();
}; 

const showPopup = function () {
    let popUp = document.getElementsByClassName("proj-setup-filters");
    popUp[0].classList.remove("hidden");
    Object.values(SELECTIONS).forEach(selection => {
        document.querySelector(`input[value="${selection}"]`).checked = true;
    });
    document.getElementById("proj-setup-filter-section").classList.add('yellow-border');
    document.getElementsByClassName("applied-filters")[0].style.borderRadius = "5px 5px 0 0"
    document.getElementById("change-filter").classList.add('disabled');
};

const hidePopUp = function () {
    document.getElementById("proj-setup-filter-section").classList.remove('yellow-border');
    document.getElementById("change-filter").classList.remove('disabled');
    let popUp = document.getElementsByClassName("proj-setup-filters");
    popUp[0].classList.add("hidden");
    refreshPage();
};

const applyCombination = function (element) {
    let name = normalize(element.value);
    SELECTIONS[element.name] = name;
    window.localStorage.setItem(element.name, name);
    updateURLAndSelection(element);
}

const updateContent = function () {
    let selectionItems = document.querySelectorAll(".selection input");
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
const hasAllSelectionClasses = (selectedClasses) => selectedClasses.every(isSelected);
const isDynamicContent = (element) => element.classList && element.classList.contains('dynamic-content');
const isElementHidden = (element) => element.classList.contains('hidden')

const disableNonRelevantIde = function (ideElement, languageBtn) {
    ideElement.parentElement.classList.remove('disabled');
    ideElement.disabled = false;
    const language = languageBtn.value || SELECTIONS.language;
    if (!isRelevantIde(language, ideElement.value)) {
        ideElement.parentElement.classList.add('disabled');
        ideElement.disabled = true;
    }
}

const makeSelections = function () {
    const selections = document.querySelectorAll(".selection input");
    selections.forEach(selection => {
        if (Object.values(SELECTIONS).includes(selection.value)) {
            selection.checked = true;
        }
    })
}

const resetIdeIfDisabled = function (ideElement) {
    const selectedIde = SELECTIONS["ide"];
    if (isSelectedIdeDisabled(ideElement, selectedIde)) {
        SELECTIONS["ide"] = "vscode";
        updateURLAndSelection();
        updateSelections();
        changeBackground();
    }
}

const select = function (option) {
    const inputs = document.querySelectorAll('.selection input');
    inputs.forEach(input => {
        if (input.value == option) input.checked = true
    });
}

const showRelevantIde = function () {
    const inputs = document.querySelectorAll('input');
    const ideElements = Array.prototype.filter.call(inputs, isIdeClass);

    ideElements.forEach(ideElement => {
        disableNonRelevantIde(ideElement, this);
        resetIdeIfDisabled(ideElement);
    })
    select('vscode');
}

const setLanguageButtons = function () {
    const inputs = document.querySelectorAll('.selection input');
    const languageElements = Array.prototype.filter.call(inputs, isLanguageClass);
    languageElements.forEach(elem => elem.onclick = showRelevantIde.bind(elem))
}

const showContents = function () {
    let dynamicElems = document.querySelectorAll(".dynamic-content");
    dynamicElems.forEach(elem => {
        elem.classList.add('hidden');
        let classes = selectedClasses(elem);
        if (hasAllSelectionClasses(classes)) {
            elem.classList.remove('hidden');
        }
    });
}

const showContentsForSearch = function (searchId) {
    let searchElement = document.querySelector(searchId);
    let parentSearchElement = searchElement.parentElement;
    if (isElementHidden(parentSearchElement)) {
        parentSearchElement.parentElement.childNodes.forEach(element => {
            isDynamicContent(element) && element.classList.add('hidden');
        })
        parentSearchElement.classList.remove('hidden');
    } else if (isElementHidden(searchElement)) {
        searchElement.parentElement.childNodes.forEach(element => {
            isDynamicContent(element) && element.classList.add('hidden');
        })
        searchElement.classList.remove('hidden');
    } else {
        searchElement.childNodes.forEach(element => {
            if (isDynamicContent(element)) {
                element.classList.add('hidden');
                let classes = selectedClasses(element);
                hasAllSelectionClasses(classes) && element.classList.remove('hidden');
            }
        })
    }
}


const updateToc = function () {
    let tocItems = document.querySelectorAll('.localtoc-container > ul > li > ul > li > a > span, .localtoc-container > ul > li > ul > li > ul > li > a > span');
    tocItems.forEach(item => {
        let parentClass = item.parentElement.parentElement.classList;
        if (!Object.values(SELECTIONS).includes(item.classList[0])) {
            parentClass.add('hidden');
        } else {
            parentClass.remove('hidden');
        }
    })
}

const updateTocForSearch = function (searchId) {
    let tocItems = document.querySelectorAll('.localtoc-container > ul > li > ul > li > a > span, .localtoc-container > ul > li > ul > li > ul > li > a > span');
    tocItems.forEach(item => {
        let parentClass = item.parentElement.parentElement.classList;
        if (item.innerText.toLowerCase().replace(':', '').replace(/\s/g, "-") == searchId.substr(1, searchId.length)) {
            parentClass.remove('hidden');
        } else {
            parentClass.add('hidden');
        }
    })
}