let SELECTIONS = { os: "macos", language: "javascript", ide: "vscode" };
const SELECTION_DISPLAY_NAMES = {
    'vscode': 'Visual Studio Code',
    'visualstudio': 'Visual Studio',
    'intellij': 'IntelliJ IDEA',
    'csharp': 'C#',
    'javascript': 'Javascript',
    'java': 'Java',
    'python': 'Python',
    'ruby': 'Ruby',
    'macos': 'MacOS',
    'linux': 'Linux',
    'windows': 'Windows',

}
const updateSelections = function () {
    let searchParam = window.location.search;
    let localStorage = window.localStorage;
    if (searchParam) {
        updateSelectionFromQS(searchParam);
    } else if (localStorage) {
        updateSelectioFromLS(localStorage);
    }
    if (!searchParam) {
        insertUrlParam();
    }
}

const addClickEventOnSetup = function () {
    document.querySelectorAll(".search").forEach(setOnclickEvent);
}

const updateSelectionFromQS = function (queryString) {
    let searchParam = new URLSearchParams(queryString);
    SELECTIONS.os = searchParam.get('os');
    SELECTIONS.language = searchParam.get('language');
    SELECTIONS.ide = searchParam.get('ide');
    window.localStorage.setItem('os', SELECTIONS.os)
    window.localStorage.setItem('language', SELECTIONS.language)
    window.localStorage.setItem('ide', SELECTIONS.ide)

}

const hasLocalParams = function (localStorage) {
    let localKeys = Object.keys(localStorage);
    return localKeys.includes('os') && localKeys.includes('os') && localKeys.includes('os');
}

const updateSelectioFromLS = function (localStorage) {
    if (!hasLocalParams(localStorage)) return;
    SELECTIONS.os = localStorage.getItem('os');
    SELECTIONS.language = localStorage.getItem('language');
    SELECTIONS.ide = localStorage.getItem('ide');
}

const normalize = function (s) {
    return s.replace(/[&\/\\#,+()$~%.'":*?<>{}\s-]/g, '').toLowerCase();
}

const setBackground = function (button) {
    let name = normalize(button.value);
    if (SELECTIONS[button.name] === name) {
        button.checked = true
        button.parentElement.style.backgroundColor = "rgba(255, 204, 0, 0.1)"
        button.parentElement.style.border = "solid 1px #ffcc00"
    };
}

const changeBackground = function () {
    let radios = document.querySelectorAll('.getting-started-radios');
    radios.forEach(element => {
        if (element.checked) {
            element.parentElement.style.backgroundColor = "rgba(255, 204, 0, 0.1)";
            element.parentElement.style.border = "solid 1px #ffcc00"
        } else {
            element.parentElement.style.backgroundColor = "#f2f2f2";
            element.parentElement.style.border = ""
        }
    });
}

const updateInstallationSetup = function () {
    let appliedFilter = document.querySelectorAll(".applied-filter");
    if (appliedFilter.length < 1) return;
    appliedFilter[0].innerText = SELECTION_DISPLAY_NAMES[SELECTIONS.os] || SELECTIONS.os;
    appliedFilter[1].innerText = SELECTION_DISPLAY_NAMES[SELECTIONS.language] || SELECTIONS.language;
    appliedFilter[2].innerText = SELECTION_DISPLAY_NAMES[SELECTIONS.ide] || SELECTIONS.ide;
}

const updateURLAndSelection = function () {
    insertUrlParam();
    updateInstallationSetup();
    showContents();
    showAlternateMethods();
    updateToc();
}

const setOnclickEvent = function (button) {
    setBackground(button);
    button.onclick = function () {
        let name = normalize(button.value);
        SELECTIONS[button.name] = name;
        changeBackground();
        window.localStorage.setItem(button.name, name);
        updateURLAndSelection();
        showRelevantIde();
    };
};


const insertUrlParam = function () {
    if (history.pushState) {
        let searchParams = new URLSearchParams(SELECTIONS);
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        window.history.pushState({ path: newurl }, '', newurl);
    }
}

const isToggleClass = function (child) {
    return child.classList && child.classList.contains('toggle');
}

const hideOtherInstallation = function (clickedElem) {
    document.querySelectorAll('.collapsible h3').forEach((collapsible) => {
        if (collapsible != clickedElem) {
            collapsible.classList.remove('expand-collapsible');
            var children = collapsible.parentElement.children;
            for (let i = 0; i < children.length; i++) {
                isToggleClass(children[i]) && children[i].classList.add('collapsible-content');
            }
        }
    });
}

const expandInstaller = function () {
    document.querySelectorAll('.collapsible h3').forEach((collapsible) => {
        collapsible.onclick = function () {
            hideOtherInstallation(collapsible);
            var children = collapsible.parentElement.children;
            children[0].classList.toggle('expand-collapsible');
            for (let i = 0; i < children.length; i++) {
                isToggleClass(children[i]) && children[i].classList.toggle('collapsible-content');
            }
        }
    })
}

const showAlternateMethods = function () {
    document.querySelectorAll('.alternate-methods').forEach(alternateMethod => {
        alternateMethod.onclick = function () {
            let collapsibleClasss = document.querySelectorAll(`.${SELECTIONS.os}+.collapsible`);
            collapsibleClasss.forEach(coll => {
                coll.classList.toggle('inline-display');
            })
        }
    });
}

const detectOs = function () {
    if (navigator.appVersion.indexOf("Win") != -1) SELECTIONS.os = "windows";
    if (navigator.appVersion.indexOf("Mac") != -1) SELECTIONS.os = "macos";
    if (
			navigator.appVersion.indexOf("Linux") != -1 ||
			navigator.appVersion.indexOf("X11") != -1
		)
			SELECTIONS.os = "linux";
}

const addOnloadEvents = function () {
    detectOs();
    if (checkForAlgoliaSearch()) {
        showAlgoliaSearchContents();
        updateTocForAlgolia();
        updateSelections();
    } else {
        updateSelections();
        showContents();
        updateToc();
    }
    addClickEventOnSetup();
    updateInstallationSetup();
    expandInstaller();
    changeFilter();
    showAlternateMethods();
    setLanguageButtons();
    showRelevantIde();
}

window.onload = addOnloadEvents;