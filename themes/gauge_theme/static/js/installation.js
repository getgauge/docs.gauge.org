let selections = { os: "macos", language: "javascript", ide: "vscode" };

function updateSelections() {
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

function updateSelectionFromQS(queryString) {
    let searchParam = new URLSearchParams(queryString);
    selections.os = searchParam.get('os');
    selections.language = searchParam.get('language');
    selections.ide = searchParam.get('ide');
    window.localStorage.setItem('os', selections.os)
    window.localStorage.setItem('language', selections.language)
    window.localStorage.setItem('ide', selections.ide)

}

function hasLocalParams(localStorage) {
    let localKeys = Object.keys(localStorage);
    return localKeys.includes('os') && localKeys.includes('os') && localKeys.includes('os');
}

function updateSelectioFromLS(localStorage) {
    if (!hasLocalParams(localStorage)) return;
    selections.os = localStorage.getItem('os');
    selections.language = localStorage.getItem('language');
    selections.ide = localStorage.getItem('ide');
}

function normalize(s) {
    return s.replace(/[&\/\\#,+()$~%.'":*?<>{}\s-]/g, '').toLowerCase();
}

function setBackground(button) {
    let name = normalize(button.value);
    if (selections[button.name] === name) {
        button.checked = true
        button.parentElement.style.backgroundColor = "white"
    };
}

function changeBackground() {
    let radios = document.querySelectorAll('.getting-started-radios');
    radios.forEach(element => {
        let bg = element.checked ? "white" : "#fff9e5";
        element.parentElement.style.backgroundColor = bg;
    });
}

function updateInstallationSetup() {
    let appliedFilter = document.querySelectorAll(".applied-filter");
    appliedFilter[0].innerText = selections.os;
    appliedFilter[1].innerText = selections.language;
    appliedFilter[2].innerText = selections.ide;
}

function setOnclickEvent(button) {
    let name = normalize(button.value);
    setBackground(button);
    button.onclick = function () {
        window.localStorage.setItem(button.name, name);
        selections[button.name] = name;
        insertUrlParam();
        changeBackground(button);
        updateInstallationSetup();
        showContents();
    };
};

function showContents() {
    const dynamicElems = document.querySelectorAll(".dynamic-content");
    dynamicElems.forEach(elem => {
        elem.classList.add('hidden');
    });
    Object.keys(selections).forEach(function (s) {
        document.querySelectorAll('.' + selections[s]).forEach(function (e) {
            e.classList.remove('hidden');
        })
    })
}


function insertUrlParam() {
    if (history.pushState) {
        let searchParams = new URLSearchParams(selections);
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        window.history.pushState({ path: newurl }, '', newurl);
    }
}

function isContentClass(child) {
    return child.classList && child.classList.length >= 1;
}

function hideOtherInstallation(coll) {
    for (let i = 0; i < coll.length; i++) {
        coll[i].childNodes.forEach(child => {
            if (isContentClass(child)) {
                child.classList.add('content')
            }
        });
    }
}


function expandInstaller() {
    var coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].onclick = function () {
            hideOtherInstallation(coll);
            coll[i].childNodes.forEach(child => {
                if (isContentClass(child)) {
                    child.classList.remove('content');
                }
            });
        }
    }
}

window.onload = function () {
    updateSelections();
    updateInstallationSetup();
    showContents();
    expandInstaller();
    changeFilter();
}