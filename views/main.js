const table = document.querySelector('table');
let colIndex = -1;

const sortTable = function(index, type, isSorted) {
    const tbody = table.querySelector('tbody');

    const compare = function (rowA, rowB) {
        const rowDataA = rowA.cells[index].innerHTML;
        const rowDataB = rowB.cells[index].innerHTML;

        switch (type) {
            case 'integer':
                return rowDataA - rowDataB;
                break;
            case "text":
                if (rowDataA < rowDataB) return -1;
                else if (rowDataA > rowDataB) return 1;
                return 0;
                break;
        }
    };

    let rows = [].slice.call(tbody.rows);

    rows.sort(compare);

    if (isSorted) rows.reverse();

    table.removeChild(tbody);

    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }

    table.appendChild(tbody);
};

table.addEventListener('click', (e) => {
    const el = e.target;
    if (el.nodeName !== 'TH') return;

    const index = el.cellIndex;
    const type = el.getAttribute("data-type");

    sortTable(index, type, colIndex===index);
    colIndex = (colIndex === index) ? -1 : index;
});

const tds = document.querySelectorAll('td');

for (let i = 0; i < tds.length; i++) {
    tds[i].addEventListener('click', function func(e) {
        const el = e.target;
        if ( el.attributes.name === undefined ) return;

        const id = el.attributes.itemID.value;
        const name = el.attributes.name.value;
        const form = document.createElement("form");
        const submit = document.createElement("input");
        const cancel = document.createElement("input");
        let input = document.createElement("input");
        const div = document.createElement('div');

        form.method = "post";
        form.className = "temporary";
        switch (name) {
            case 'newTitle':
                input.required = true;
                input.maxLength = 100;
                break;
            case 'newAuthor':
                input.required = true;
                input.maxLength = 80;
                break;
            case 'newDescription':
                input = document.createElement("textarea");
                input.className = "description";
                input.required = true;
                input.maxLength = 250;
                break;
            case 'newDate':
                input.type = "number";
                input.min = "1901";
                input.max = "2020";
                break;
        }
        const test = this.innerHTML;
        cancel.value = "X";
        cancel.type = "button";
        cancel.className = "button";
        input.value = test;
        input.name = name;
        submit.type = "submit";
        submit.value = "OK";
        submit.className = "button";
        submit.formAction = '/update/' + id;

        this.innerHTML = ' ';
        this.appendChild(form);
        form.appendChild(input);
        form.appendChild(div);
        div.appendChild(submit);
        div.appendChild(cancel);

        let td = this;
        cancel.addEventListener('click', function () {
            td.innerHTML = test;
            td.addEventListener('click', func);
        });

        this.removeEventListener('click', func)
    })
}