const COMBINATIONS = ['javascript-vscode', 'java-vscode', 'python-vscode', 'ruby-vscode', 'csharp-vscode', 'java-intellij', 'csharp-visualstudio'];
const SELECTION_CLASSES = ['macos', 'windows', 'linux', 'javascript', 'java', 'python', 'ruby', 'csharp', 'vscode', 'intellij', 'visualstudio'];

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


const isRightCombination = function () {
    let selectedLanguage = SELECTIONS.language;
    let selectedIde = SELECTIONS.ide;
    let selectedCombination = `${selectedLanguage}-${selectedIde}`
    return COMBINATIONS.includes(selectedCombination);
}

const applyCombination = function (element) {
    let name = normalize(element.value);
    SELECTIONS[element.name] = name;
    if (!isRightCombination()) return;
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
    if (isRightCombination()) hidePopUp();
}

const isSelected = (selection) => Object.values(SELECTIONS).includes(selection);
const isSelectionClass = (className) => SELECTION_CLASSES.includes(className);
const selectedClasses = (element) => element.classList.value.split(" ").filter(isSelectionClass);

const hasSingleSelection = function (selectedClasses) {
    return selectedClasses.length == 1 && isSelected(selectedClasses[0]);
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
        if (hasSingleSelection(classes)) {
            elem.classList.remove('hidden');
        } else if (hasMultipleSelection(classes)) {
            elem.classList.remove('hidden');
        }
    });
}