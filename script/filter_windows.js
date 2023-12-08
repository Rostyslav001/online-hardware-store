var productList = $(".product_list");

    function applyFilters() {
        var selectedCategory = $('#categorySelect').val();

        console.log('Selected Category:', selectedCategory);



        if (selectedCategory !== 'all') {
            productList.find('li').hide();
            productList.find('li[data-category="' + selectedCategory + '"]').show();
        } else {
            productList.find('li').show();
        }
    }

    

    $('#applyFilter').click(function () {
        applyFilters();
    });

    $('#clearButton').click(function () {
        $('#categorySelect').val('all');
        $('#price-list').val('buy');
        $('#colorPicker').val('all');
        $('#filterName').val('');
        $('.product_list > li').show();
    });

    $('#categorySelect').change(function () {
        applyFilters();
    });

    $('#closeFilterWindow').click(function () {
        $('#filterWindow').hide();
    });

    $('#showFilterBtn').click(function () {
        $('#filterWindow').toggle();
    });