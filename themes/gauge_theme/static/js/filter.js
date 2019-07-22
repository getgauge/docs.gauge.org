let selections = { os: "macos", language: "javascript", ide: "vscode" };

function updateSelection(searchParam) {
    selections.os = searchParam.get('os');
    window.localStorage.setItem('os', selections.os)
    selections.language = searchParam.get('language');
    window.localStorage.setItem('language', selections.language)
    selections.ide = searchParam.get('ide');
    window.localStorage.setItem('ide', selections.ide)

}

function normalize(s) {
    return s.replace(/[&\/\\#,+()$~%.'":*?<>{}\s-]/g, '').toLowerCase();
}

function setSelections() {
    Object.keys(selections).forEach(function (k) {
        let entry = window.localStorage.getItem(k);
        if (entry)
            selections[k] = normalize(entry);
        else
            window.localStorage.setItem(k, normalize(selections[k]));
    });
}

function showContent() {
    Object.keys(selections).forEach(function (s) {
        document.querySelectorAll('.' + selections[s]).forEach(function (e) {
            e.classList.remove('hidden');
        })
    })
}

function setOnclickEvent(button) {
    let name = normalize(button.value);
    if (selections[button.name] === name) button.checked = true;
    button.onclick = function () {
        window.localStorage.setItem(button.name, name);
        selections[button.name] = name;
        window.location.search = (new URLSearchParams(selections)).toString();
    };
};

window.onload = function () {
    let queryString = window.location.search;
    if (queryString) {
        let searchParam = new URLSearchParams(queryString);
        updateSelection(searchParam);
    }
    setSelections();
    document.querySelectorAll(".search").forEach(setOnclickEvent);
    if (window.location.search === '') {
        window.location.search = (new URLSearchParams(selections)).toString();
    }
    showContent();
}