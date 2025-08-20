// $(document).ready(function () {
//     $('select').niceSelect();

//     $('#Kids').on('change', function () {
//         const count = parseInt($(this).val());
//         const $container = $('#childAgesContainer');
//         $container.empty();

//         const $row = $('<div class="row g-2"></div>');

//         for (let i = 0; i < count; i++) {
//             const $col = $('<div>').addClass('col-md-4 mb-2');
//             const $label = $('<label>').text(`Çocuk ${i + 1} Yaşı`);
//             const $select = $('<select>')
//                 .addClass('nice-select-sm w-100')
//                 .attr('name', `KidAges[${i}]`);

//             for (let age = 2; age <= 12; age++) {
//                 $select.append($('<option>').val(age).text(age));
//             }

//             $col.append($label).append($select);
//             $row.append($col);
//         }

//         $container.append($row);

//         $('select').niceSelect();
//     });

// });


let roomIndex = 1;

$(document).ready(function () {
    $('select').niceSelect();

    // Çocuk sayısı değişimini tüm odalar için dinle
    $(document).on('change', 'select.kid-count', function () {
        const $roomBox = $(this).closest('.room-box');
        const index = $roomBox.data('room-index');
        const count = parseInt($(this).val());
        const $container = $roomBox.find(`#childAgesContainer-${index}`);
        $container.empty();

        for (let i = 0; i < count; i++) {
            const $col = $('<div>').addClass('col-md-4 mb-2');
            const $label = $('<label>').text(`Çocuk ${i + 1} Yaşı`);
            const $select = $('<select>')
                .addClass('nice-select-sm w-100')
                .attr('name', `Rooms[${index}].KidAges[${i}]`);

            for (let age = 2; age <= 12; age++) {
                $select.append($('<option>').val(age).text(age));
            }

            $col.append($label).append($select);
            $container.append($col);
        }

        $('select').not('.nice-select').niceSelect();
    });

    // Yeni oda ekle butonu
    $('#addRoomBtn').on('click', function () {
        const roomHtml = `
        <div class="room-box mb-4 border p-3 rounded position-relative" data-room-index="${roomIndex}">
            <button type="button" class="position-absolute top-0 end-0 m-2 text-danger fs-5 remove-room-btn bg-transparent border-0" aria-label="Odayı Kaldır">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <h6>${roomIndex + 1}. Oda</h6>
            <div class="row g-2">
                <div class="col-md-6">
                    <label>Yetişkin</label>
                    <select class="nice-select-sm w-100" name="Rooms[${roomIndex}].Adults">
                        <option>1</option>
                        <option selected>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label>Çocuk</label>
                    <select class="nice-select-sm w-100 kid-count" name="Rooms[${roomIndex}].Kids">
                        <option selected>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
            </div>
            <div class="row g-2 mt-2 child-ages-container" id="childAgesContainer-${roomIndex}"></div>
        </div>
        `;

        $('#rooms-container').append(roomHtml);
        $('select').not('.nice-select').niceSelect();
        roomIndex++;
        updateRoomIndexes();
    });

    // Oda kaldırma
    $(document).on('click', '.remove-room-btn', function () {
        $(this).closest('.room-box').remove();
        updateRoomIndexes();
    });

    // Oda indexlerini güncelle
    function updateRoomIndexes() {
        $('.room-box').each(function (i) {
            const $room = $(this);
            $room.attr('data-room-index', i);
            $room.find('h6').text(`${i + 1}. Oda`);
            $room.find('select[name$=".Adults"]').attr('name', `Rooms[${i}].Adults`);
            $room.find('select[name$=".Kids"]').attr('name', `Rooms[${i}].Kids`);
            const $childAgeContainer = $room.find('.child-ages-container');
            $childAgeContainer.attr('id', `childAgesContainer-${i}`);
            $childAgeContainer.find('select').each(function (j) {
                $(this).attr('name', `Rooms[${i}].KidAges[${j}]`);
            });
        });
    }
});


$(document).ready(function () {
    let array = [0, 174, 25, 47, 52, 24];
    var lastIndex = array.lastIndexOf(array);
    console.log(lastIndex);

    var userInput = document.getElementById("mainNavbar").value;
    if (userInput == null) {
        throw new Exception("Value can not be null");
    }
    else if (userInput.StatusCode == 401) {
        throw new Exception("Unauthorized");
    }

});