$(function () {
    $('.detail-check').on('change', function () {
        var target = $('#' + $(this).data('target'));
        this.checked ? target.removeClass('hidden') : target.addClass('hidden');
    });
    $('#continueButton').on('click', function () {
        if ($('input[name="mealSelect[]"]:checked').length === 0) return alert(' الرجاء اختر وجبة أولاً');
        $('#formContainer').removeClass('hidden');
        window.scrollTo(0, $('#formContainer').offset().top - 100);
    });
    $('#orderForm').on('submit', function (e) {
        e.preventDefault();

        var name = $('#fullName').val().trim();
        var date = $('#orderDate').val().trim();
        var phone = $('#mobile').val().trim();
        var bank = $('#bankAccount').val().trim();
        var selected = $('input[name="mealSelect[]"]:checked');
        if (!bank) return alert(' الرجاء إدخال رقم الحساب المصرفي');
        if (name && !/^[A-Za-z]+ [A-Za-z]+$/.test(name)) return alert(' الاسم الكامل يجب أن يكون بالإنجليزية مع فراغ واحد فقط بين الاسم والكنية');
        if (phone && !/^(09[3-6|8-9]\d{7})$/.test(phone)) return alert(' رقم الموبايل يجب أن يكون رقماً سورياً صالحاً (MTN أو Syriatel)');
        if (bank && !/^0\d{5}$/.test(bank)) return alert(' رقم الحساب المصرفي يجب أن يكون 6 خانات ويبدأ بصفر');
        var d = new Date(date);
        var fDate = String(d.getDate()).padStart(2, '0') + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + d.getFullYear();
        var total = 0, items = '';
        selected.each(function () {
            total += parseInt($(this).data('price'));
            items += '• ' + this.value + ' ل.س\n';
        });
        var tax = total * 0.1;
        alert(
            'تم استلام طلبكم ينجاح شكراً لثقتكم بنا .\n' + '---\n' +
            ' الوجبة المختارة:\n' + items + '---\n' +
            ' مجموع السعر: ' + total.toLocaleString() + ' ل.س\n' +
            ' المبلغ الصافي للدفع: ' + (total - tax).toLocaleString() + ' ل.س\n' + '---\n' +
            ' اسم العميل: ' + name + '\n' + '---\n'
        );
        this.reset();
        $('#formContainer').addClass('hidden');
        $('input[name="mealSelect[]"]').prop('checked', false);
        $('.detail-check').prop('checked', false).trigger('change');
    });
});
