let sample = {
    "columns": [
        [2, 1],
        [5],
        [5],
        [5],
        [2]
    ],
    "rows": [
        [3],
        [4],
        [4],
        [4],
        [5]
    ]
}
$(function() { //documentReady jQuery

    let nono = $('#nonogram');
    let html = '<table><tr><td></td>';
    $.each(sample.columns, function(index, items) {
        html += '<td>';
        $.each(items, function(i, item) {
            html += item + '<br>'
        })
        html += '</td>';
    })
    html += '</td></tr>';

    $.each(sample.rows, function(index, item) {
        html += '<tr><td>';
        html += item;
        $.each(sample.columns, function(i, element) {
            html += '<td data-row="' + index + '" data-column="' + i + '" class="case"></td>';
        });
        html += '</td></tr>';
    });






    html += '</table>'
    nono.append(html);

    $('td.case').click(function() {
        // console.log($(this).data('column') + "=" + $(this).data('row'));
        $(this).toggleClass('active');
    });

    $('#test').click(function() {
        let row = 0;
        let active = false;
        let affile = 0;
        let ok = false;
        let rowTemp = sample.rows[row];
        console.log(rowTemp);
        for (let i = 0; i < sample.columns.length; i++) {
            let caseJeu = $('.case[data-row=0][data-column=' + i + ']');
            if (caseJeu.hasClass("active")) {
                active = true;
                affile++;
                if (affile == rowTemp[0]) {
                    console.log('cc' + rowTemp.length);
                    rowTemp.shift();
                    console.log(rowTemp.length)
                    if (rowTemp.length == 0) {
                        console.log('aa')
                        ok = true
                    }
                } else {
                    // affile = 0;
                }
            } else {
                active = false
            }
            console.log();
        }
        console.log(ok)
        console.log(sample.rows[row])
    })



})