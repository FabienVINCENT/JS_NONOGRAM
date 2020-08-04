import { games } from './game.js'


$(function() { //documentReady jQuery
    let sample = games[Math.floor(Math.random() * (games.length))];

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
        html += '<tr class="jeu"><td>';
        html += item;
        $.each(sample.columns, function(i, element) {
            html += '<td data-row="' + index + '" data-column="' + i + '" class="case"><div>&nbsp;</div></td>';
        });
        html += '</td></tr>';
    });

    html += '</table>'
    nono.append(html);


    function testRow(row) {
        // console.warn('On vérifie la row : ' + row);
        let longeurMax = sample.columns.length;
        let infoRow = sample.rows[row];

        //On vérifie que les carres sont pas complet sans trop despaces
        let solution = [];
        let affile = 0;
        for (let i = 0; i <= longeurMax; i++) {
            let caseEnCours = $('[data-row="' + row + '"][data-column="' + i + '"]');
            let isActive = caseEnCours.find('div').hasClass('active');
            if (isActive) {
                affile++;
                if (affile == longeurMax) {
                    solution.push(affile)
                }
            } else {
                if (affile != 0) { solution.push(affile) }
                affile = 0;
            }
        }
        if (JSON.stringify(solution) == JSON.stringify(infoRow)) {
            // console.warn('yes');
            $('[data-row="' + row + '"] div').each(function() {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('disabled');
                    $(this).text('X')
                }
            });
        }
    }

    function testColumn(column) {
        // console.warn('On vérifie la colone : ' + column);
        let longeurMax = sample.rows.length;
        let infoColumn = sample.columns[column];

        //On vérifie que les carres sont pas complet sans trop despaces
        let solution = [];
        let affile = 0;
        for (let i = 0; i <= longeurMax; i++) {
            let caseEnCours = $('[data-row="' + i + '"][data-column="' + column + '"]');
            let isActive = caseEnCours.find('div').hasClass('active');
            if (isActive) {
                affile++;
                if (affile == longeurMax) {
                    solution.push(affile)
                }
            } else {
                if (affile != 0) { solution.push(affile) }
                affile = 0;
            }
        }
        if (JSON.stringify(solution) == JSON.stringify(infoColumn)) {
            // console.warn('yes');
            $('[data-column="' + column + '"] div').each(function() {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('disabled');
                    $(this).text('X')
                }
            });
        }
    }

    function testFin() {
        let $CASES = $('td.case div');
        let fin = false;
        $CASES.each(function() {
            if ($(this).hasClass('')) {
                fin = false;
                return false;
            } else {
                fin = true;
            }
        })
        if (fin) {
            setTimeout(() => { // Fix navigateur qui affiche pas le carré avant l'alerte
                let maSolution = caseToArray();
                if (JSON.stringify(sample) === JSON.stringify(maSolution)) {
                    alert('FINI, Bravo tu as reussi, je pense que cest juste');
                } else {
                    alert('FINI, MAIS :(:(:(:(:(:(:(:(:( tu es nul');
                }
            }, 50);
        }
    }

    function caseToArray() {
        let array = {}
        array.columns = [];
        array.rows = [];

        for (let i = 0; i <= sample.columns.length; i++) {
            let affilej = 0;
            let temp = [];
            for (let j = 0; j <= sample.rows.length; j++) {
                let caseEnCours = $('[data-row="' + j + '"][data-column="' + i + '"] div');
                let isActive = caseEnCours.hasClass('active');
                if (isActive) {
                    affilej++;
                } else {
                    if (affilej > 0) {
                        temp.push(affilej);
                    }
                    affilej = 0;
                }

            }
            if (i < sample.columns.length) {
                array.columns.push(temp);
            }

        }
        for (let i = 0; i <= sample.rows.length; i++) {
            let affilei = 0;
            let temp = [];
            for (let j = 0; j <= sample.columns.length; j++) {
                let caseEnCours = $('[data-row="' + i + '"][data-column="' + j + '"] div');
                let isActive = caseEnCours.hasClass('active');
                if (isActive) {
                    affilei++;
                } else {
                    if (affilei > 0) {
                        temp.push(affilei);
                    }
                    affilei = 0;
                }

            }
            if (i < sample.rows.length) {
                array.rows.push(temp);
            }
        }
        return array;
    }

    let timer = 0;
    let delay = 200;
    let prevent = false;

    $('td.case').click(function() {
        let $that = $(this);
        timer = setTimeout(function() {
            if (!prevent) {
                $that.find('div').html('&nbsp;');
                $that.find('div').toggleClass('active');
                $that.find('div').removeClass('disabled');
                testRow($that.data('row'));
                testColumn($that.data('column'));
                testFin();
            }
            prevent = false
        }, delay)
    });

    $('td.case').dblclick(function() {
        clearTimeout(timer);
        prevent = true;
        $(this).find('div').addClass('disabled');
        $(this).find('div').text('X');
        $(this).find('div').removeClass('active');
        testRow($(this).data('row'));
        testColumn($(this).data('column'));
        testFin();
    });

    function tricheLongueurRow(row) {
        let rowJeu = sample.rows[row];
        let longueurTotal = rowJeu.length - 1;
        $.each(rowJeu, function(i, element) {
            longueurTotal += element;
        });
        if (longueurTotal == sample.columns.length) {
            return 'Sur la ligne ' + (row + 1) + ', Tu peux trouver facilement';
        } else {
            return false;
        }
    }

    function tricheLongueurColumn(column) {
        let columnJeu = sample.columns[column];
        let longueurTotal = columnJeu.length - 1;
        $.each(columnJeu, function(i, element) {
            longueurTotal += element;
        });
        if (longueurTotal == sample.rows.length) {
            return 'Sur la colonne ' + (column + 1) + ', Tu peux trouver facilement';
        } else {
            return false;
        }
    }


    $('#indice').click(function() {
        console.log('Trichons un coup');
        let indiceText = false;
        let i = 0;
        do {
            let rowIndice = Math.floor(Math.random() * (sample.rows.length));
            let columnIndice = Math.floor(Math.random() * (sample.columns.length));
            if (i % 2 === 1) {
                indiceText = tricheLongueurRow(rowIndice);
            } else {
                indiceText = tricheLongueurColumn(columnIndice);
            }
            i++;
            if (i > 100) {
                indiceText = 'Prévention de boucle infini :' + i;
            }
        } while (indiceText == false);
        console.log(indiceText)
    });




    $('#correction').click(function() {
        testFin()
    });



})