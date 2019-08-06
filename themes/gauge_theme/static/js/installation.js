let SELECTIONS = { os: "macos", language: "javascript", ide: "vscode" };

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
        }else{
            element.parentElement.style.backgroundColor = "#f2f2f2";
            element.parentElement.style.border = ""
        }
    });
}

const updateInstallationSetup = function () {
    let appliedFilter = document.querySelectorAll(".applied-filter");
    if (appliedFilter.length < 1) return;
    appliedFilter[0].innerText = SELECTIONS.os;
    appliedFilter[1].innerText = SELECTIONS.language;
    appliedFilter[2].innerText = SELECTIONS.ide;
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

const isContentClass = function (child) {
    return child.classList && child.classList.length >= 1;
}

const hideOtherInstallation = function (coll) {
    for (let i = 0; i < coll.length; i++) {
        coll[i].childNodes.forEach(child => {
            if (isContentClass(child)) {
                child.classList.add('collapsible-content')
            }
        });
    }
}

const expandInstaller = function () {
    var coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].onclick = function () {
            hideOtherInstallation(coll);
            coll[i].childNodes.forEach(child => {
                if (isContentClass(child)) {
                    child.classList.remove('collapsible-content');
                }
            });
        }
    }
}

const showAlternateMethods = function () {
    let alternateMethods = document.querySelector(`.${SELECTIONS.os} .alternate-methods`);
    if (!alternateMethods) return;
    alternateMethods.onclick = function () {
        let collapsibleClasss = document.querySelectorAll(`.${SELECTIONS.os}+.collapsible`);
        collapsibleClasss.forEach(coll => {
            coll.style.display = 'inline-block';
        })
    }
}

const addOnloadEvents = function () {
    updateSelections();
    updateInstallationSetup();
    showContents();
    expandInstaller();
    changeFilter();
    showAlternateMethods();
    setLanguageButtons();
    showRelevantIde();
    updateToc();
}

window.onload = addOnloadEvents;