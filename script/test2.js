$(document).ready(function(){
    var productList = $(".product_list");

    function applyFilters() {
        var selectedCategory = $('#categorySelect').val();

        console.log('Selected Category:', selectedCategory);

        if (selectedCategory !== 'all') {
            productList.find('li[data-category="' + selectedCategory + '"]').show();
            productList.find('li:not([data-category="' + selectedCategory + '"])').hide();
        } else {
            productList.find('li').show();
        }
    }

    $('#applyFilter').click(function () {
        applyFilters();
    });

    $('#categorySelect').change(function () {
        applyFilters();
    });

    $('#showFilterBtn').click(function () {
        $('#filterWindow').toggle();
    });

    $('#closeFilterWindow').click(function () {
        $('#filterWindow').hide();
    });
});