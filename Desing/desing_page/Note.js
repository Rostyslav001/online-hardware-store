document.addEventListener("DOMContentLoaded", function () {

    const gripViewButton = document.getElementById("grip-view");
    const listViewButton = document.getElementById("list-view");
    const productListView = document.getElementById("product_list");
    const categorySelect = document.getElementById("categorySelect");
    const productItems = document.querySelectorAll(".product");
    
    
    gripViewButton.addEventListener("click", function () {
        productListView.classList.remove("list-view");
        productListView.classList.add("grid-view");
    });

    listViewButton.addEventListener("click", function () {
        productListView.classList.remove("grid-view");
        productListView.classList.add("list-view");
    });

    productListView.classList.remove("list-view");
    productListView.classList.add("grid-view");

}); 
