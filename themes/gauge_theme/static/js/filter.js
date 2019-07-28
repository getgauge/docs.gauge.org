const SELECTION_CLASSES = ['macos','windows','linux','javascript','java','python','ruby','csharp','vscode','intellij','visualstudio'];
const COMBINATIONS = ['javascript-vscode','java-vscode','python-vscode','ruby-vscode','csharp-vscode','java-intellij','csharp-visualstudio'];

function changeFilter() {
    const changeFilterBtn = document.getElementById("change-filter");
    if (!changeFilterBtn) return;
    changeFilterBtn.onclick = showPopup;
    const cancelBtn = document.getElementsByClassName("cancel");
    cancelBtn[0].onclick = hidePopUp;

    const applyBtn = document.getElementsByClassName("apply-filter");
    applyBtn[0].onclick = showContent;

    showContent();
};

const showPopup = function () {
    const popUp = document.getElementsByClassName("proj-setup-filters");
    const changeFilterBtn = document.getElementById("change-filter");
    changeFilterBtn.classList.add("change-filter-btn");
    popUp[0].classList.remove("hidden");
};

const hidePopUp = function () {
    const popUp = document.getElementsByClassName("proj-setup-filters");
    const changeFilterBtn = document.getElementById("change-filter");
    changeFilterBtn.classList.remove("change-filter-btn");
    popUp[0].classList.add("hidden");
};

const changeSelectedDetails = function (selectedItems) {
    const appliedFilters = document.querySelectorAll(".applied-filter");

    appliedFilters.forEach((appliedFilter, index) => {
        appliedFilter.innerText = selectedItems[index];
    });
};

const isSelectionClass = function(className){
    return SELECTION_CLASSES.includes(className);
}

const hasSelectedClasses = function(selectedItems, className){
    return selectedItems.includes(className)
}

const showContent = function() {
    const dynamicElems = document.querySelectorAll(".dynamic-content");
    const selectionItems = document.querySelectorAll(".selection");
    const selectedItems = [];
    const selectedValues = [];

    selectionItems.forEach(selection => {
        for (e of selection.children) {
            if (e.firstChild.checked) {
                selectedItems.push(e.firstChild.value.split(" ").join("").toLowerCase());
                selectedValues.push(e.firstChild.value);
            }
        }
    });

    const selectedLanguage = selectedItems[1];
    const selectedIde = selectedItems[2];
    const selectedCombination = `${selectedLanguage}-${selectedIde}`
    if(!COMBINATIONS.includes(selectedCombination)) return;

    const isSelected = hasSelectedClasses.bind(null, selectedItems);

    dynamicElems.forEach(elem => {
        const elemSelectionClasses = elem.classList.value.split(" ").filter(isSelectionClass);
        const hasAllSelections = elemSelectionClasses.every(isSelected);
        elem.classList.remove('hidden');
        if(!hasAllSelections){
            elem.classList.add('hidden');
        }
    });
    hidePopUp();
    changeSelectedDetails(selectedValues);
};
