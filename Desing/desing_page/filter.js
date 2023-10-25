document.addEventListener("DOMContentLoaded", function() {
    const colorPicker = document.getElementById("colorPicker");
    const addFilter = document.getElementById("applyFilter");
    const cleatFilter = document.getElementById("clear-filter");
    const selectedColorsContainer = document.querySelector(".selectedColorsContainer");

    addFilter.addEventListener("click", () => {
        const selectedColors = Array.from(colorPicker.selectedOptions).map(option => option.value);

        selectedColors.forEach(color => {
            if (color !== "all") {
                const colorElement = document.createElement("div");
                colorElement.classList.add("selected-color");
                colorElement.textContent = color;
                selectedColorsContainer.appendChild(colorElement);

                const deleteButton = document.createElement("remove-option");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                   
                    selectedColorsContainer.removeChild(colorElement);
                });

                colorElement.appendChild(deleteButton);
                selectedColorsContainer.appendChild(colorElement);
                deleteButton.style.marginLeft = "10px";
                deleteButton.style.backgroundColor = "red"
                
            
            }
        });

        
    });
    cleatFilter.addEventListener("click", () => {
        
        selectedColorsContainer.innerHTML = "";
    });
});
