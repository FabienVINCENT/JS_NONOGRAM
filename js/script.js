let sample = {
    "columns": [
        [1],
        [3, 2],
        [5, 3],
        [2, 5],
        [1, 4],
        [1, 4],
        [2, 5],
        [5, 3],
        [3, 2],
        [1]
    ],
    "rows": [
        [4],
        [2, 2],
        [2, 2],
        [2, 2],
        [2, 2],
        [2, 2],
        [4],
        [6],
        [8],
        [10]
    ]
}
$(function() { //documentReady jQuery

    let nono = $('#nonogram');
    let html = '<table class="mx-auto "><tr><td></td>';
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
            html += '<td data-row="' + index + '" data-column="' + i + '" class="case"><div>&nbsp;</div></td>';
        });
        html += '</td></tr>';
    });

    html += '</table>'
    nono.append(html);



    $('td.case').click(function() {
        // console.log($(this).data('column') + "=" + $(this).data('row'));
        if ($(this).find('div').hasClass('active')) {
            $(this).find('div').removeClass('active');
            $(this).find('div').addClass('disabled');
            $(this).find('div').text('X')
        } else if ($(this).find('div').hasClass('disabled')) {
            $(this).find('div').removeClass('disabled');
            $(this).find('div').html('&nbsp;')
        } else {
            $(this).find('div').addClass('active');
        }
    });


    function testLongeurRow(row) {
        let longeurMax = sample.columns.length;
        let longRow = 0;
        $.each(sample.rows[row], function(index, row) {
            longRow += row;
        })
        longRow += (sample.rows[row].length - 1);
        if (longRow == longeurMax) { // si la longueur max = somme de row + nbrow-1
            let iColumn = 0;
            $.each(sample.rows[row], function(index, nbAffile) {
                for (let i = 1; i <= nbAffile; i++) {
                    let caseJeu = $('.case[data-row=' + row + '][data-column=' + iColumn + ']');
                    caseJeu.find('div').addClass('active')
                    iColumn++;
                }
                iColumn++;
            })

        }
    }



    testLongeurRow(9); //Test la congueur










    // $('#test').click(function() {
    //     let row = 0;
    //     let active = false;
    //     let affile = 0;
    //     let ok = false;
    //     let rowTemp = sample.rows[row];
    //     console.log(rowTemp);
    //     for (let i = 0; i < sample.columns.length; i++) {
    //         let caseJeu = $('.case[data-row=0][data-column=' + i + ']');
    //         if (caseJeu.hasClass("active")) {
    //             active = true;
    //             affile++;
    //             if (affile == rowTemp[0]) {
    //                 console.log('cc' + rowTemp.length);
    //                 rowTemp.shift();
    //                 console.log(rowTemp.length)
    //                 if (rowTemp.length == 0) {
    //                     console.log('aa')
    //                     ok = true
    //                 }
    //             } else {
    //                 // affile = 0;
    //             }
    //         } else {
    //             active = false
    //         }
    //         console.log();
    //     }
    //     console.log(ok)
    //     console.log(sample.rows[row])
    // })



})