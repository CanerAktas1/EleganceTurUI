$(document).ready(function () {
    $('select').niceSelect();

    $('#Kids').on('change', function () {
        const count = parseInt($(this).val());
        const $container = $('#childAgesContainer');
        $container.empty();

        const $row = $('<div class="row g-2"></div>'); 

        for (let i = 0; i < count; i++) {
            const $col = $('<div>').addClass('col-md-4 mb-2');
            const $label = $('<label>').text(`Çocuk ${i + 1} Yaşı`);
            const $select = $('<select>')
                .addClass('nice-select-sm w-100')
                .attr('name', `KidAges[${i}]`);

            for (let age = 2; age <= 12; age++) {
                $select.append($('<option>').val(age).text(age));
            }

            $col.append($label).append($select);
            $row.append($col);
        }

        $container.append($row);

        $('select').niceSelect();
    });
});
