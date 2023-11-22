document.addEventListener("DOMContentLoaded", function () {
    const colorPicker = document.getElementById("colorPicker");
    const addFilter = document.getElementById("applyFilter");
    const categorySelect = document.getElementById("categorySelect");
    const clearFilter = document.getElementById("clear-button");
    const priceList = document.getElementById("price-list");
    const productItems = document.querySelectorAll(".product");
    const allFilter = document.getElementById("allcategory");
    const filterwindows = document.getElementById("filterWindow");
    const filterButton = document.getElementById("filterButton");
    const filterNameInput = document.getElementById("filterName");
    const filtersContainer = document.querySelector(".filter-selected");
    const selectedPriceRange = priceList.value;

    addFilter.addEventListener("click", () => {
        const selectedCategories = Array.from(categorySelect.selectedOptions).map(option => option.value);
        const selectedCategoriesSet = new Set(selectedCategories);

        if (selectedCategoriesSet.has("all")) {
            productItems.forEach(product => {
                product.style.display = "block";
            });
        } else {
            productItems.forEach(product => {
                const productCategory = product.dataset.category;
                product.style.display = selectedCategoriesSet.has(productCategory) ? "block" : "none";
            });
        }

        selectedCategories.forEach(category => {
            if (category !== "all" && !filtersContainer.querySelector(`.selected-category[title='${category}']`)) {
                const categoryElement = document.createElement("div");
                categoryElement.classList.add("selected-category");
                categoryElement.textContent = category;
                categoryElement.title = category;
                filtersContainer.appendChild(categoryElement);

                const icon = document.createElement("img");
                icon.src = "D:/site_shop/Desing/imag/icon/Group 120.svg";
                icon.alt = "Delete";
                icon.style.width = "24px";
                icon.style.height = "24px";
                icon.style.marginLeft = "5px";
                categoryElement.appendChild(icon);

                icon.addEventListener("click", () => {
                    filtersContainer.removeChild(categoryElement);
                });
            }
        });

        selectedPriceRange.forEach(price => {
            if (price !== "custom-option") {
                // Check if the category filter already exists
                if (!filtersContainer.querySelector(".selected-price[title='" + price + "']")) {
                    const priceList = document.createElement("div");
                    priceList.classList.add("selected-price");
                    priceList.textContent = price;
                    priceList.title = price; // Add a title attribute for identification
                    filtersContainer.appendChild(priceList);

                    const icon = document.createElement("img");
                    icon.src = "D:/site_shop/Desing/imag/icon/Group 120.svg";
                    icon.alt = "Delete";
                    icon.style.width = "24px";
                    icon.style.height = "24px"; 
                    icon.style.marginLeft = "5px"
                    priceList.appendChild(icon);


                    icon.addEventListener("click", () => {
                        filtersContainer.removeChild(priceList);
                    });
                }
            }
        });

        selectedColors.forEach(color => {
            if (color !== "all") {
                // Check if the color filter already exists
                if (!filtersContainer.querySelector(".selected-color[title='" + color + "']")) {
                    const colorElement = document.createElement("div");
                    colorElement.classList.add("selected-color");
                    colorElement.textContent = color;
                    colorElement.title = color; // Add a title attribute for identification
                    filtersContainer.appendChild(colorElement);

                    const icon = document.createElement("img");
                    icon.src = "D:/site_shop/Desing/imag/icon/Group 120.svg";
                    icon.alt = "Delete";
                    icon.style.width = "24px";
                    icon.style.height = "24px"; 
                    icon.style.marginLeft = "5px"
                    colorElement.appendChild(icon);


                    icon.addEventListener("click", () => {
                        filtersContainer.removeChild(colorElement);
                    });
                }
            }
        });
    });


    clearFilter.addEventListener("click", () => {
        filtersContainer.innerHTML = "";
        filterNameInput.value = "";

        // Display all products when clearing filters
        productItems.forEach(product => {
            product.style.display = "block";
        });
    });


    
});
