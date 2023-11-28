$(document).ready(function () {
    const gripViewButton = $("#grip-view");
    const listViewButton = $("#list-view");
    const productListView = $("#product_list");
    const categorySelect = $("#categorySelect");
    const productItems = $(".product");

    gripViewButton.click(function () {
        productListView.removeClass("list-view").addClass("grid-view");
    });

    listViewButton.click(function () {
        productListView.removeClass("grid-view").addClass("list-view");
    });

    productListView.removeClass("list-view").addClass("grid-view");
});