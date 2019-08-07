const HEADER_HEIGHT = 90;

const updateToc = function () {
    let tocItems = document.querySelectorAll('ul.localtoc>ul>li>a>span');
    tocItems.forEach(item => {
        let parentClass = item.parentElement.parentElement.classList;
        if (!Object.values(SELECTIONS).includes(item.classList[0])) {
            parentClass.add('hidden');
        } else {
            parentClass.remove('hidden');
        }
    })
    updateActiveToc();
}

const isElementInViewport = function (element) {
    let rect = element.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top > HEADER_HEIGHT;
}

const getTocElementBy = function (innerText) {
    for (let a of document.querySelectorAll("ul.localtoc a")) {
        if (a.textContent.includes(innerText)) {
            return a;
        }
    }
}

const removeActiveToc = function (headers) {
    for (let header of headers) {
        let element = getTocElementBy(header.innerText);
        element && element.classList.remove('active-rhs-toc');
    }
}

const updateActiveToc = function () {
    let headers = document.querySelectorAll('h1, h2 :not(.heading)');
    for (let header of headers) {
        let element = getTocElementBy(header.innerText);
        if (isElementInViewport(header)) {
            removeActiveToc(headers)
            element && element.classList.add('active-rhs-toc');
            return;
        }
    }
};