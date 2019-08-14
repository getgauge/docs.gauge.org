const updateToc = function () {
    let tocItems = document.querySelectorAll('.localtoc-container > ul > li > a > span');
    tocItems.forEach(item => {
        let parentClass = item.parentElement.parentElement.classList;
        if (!Object.values(SELECTIONS).includes(item.classList[0])) {
            parentClass.add('hidden');
        } else {
            parentClass.remove('hidden');
        }
    })
}