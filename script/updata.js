document.addEventListener("DOMContentLoaded", function(){

const loadPageButton = document.getElementById('creatProducts');

loadPageButton.addEventListener('click', function(){

    window.location.href = '/update'; 
    

});




});
function submitForm() {
  const form = document.getElementById('myForm');
  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/submit-form', true);

  // Опції для відправлення FormData
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Обробник події завершення запиту
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Відобразити повідомлення про успіх або виконати інші дії
      console.log('Success:', xhr.responseText);
    } else {
      // Обробити помилку
      console.error('Error:', xhr.status, xhr.statusText);
    }
  };

  // Обробник події помилки
  xhr.onerror = function () {
    console.error('Network error');
  };

  // Відправлення FormData
  xhr.send(formData);

  // Зупиніть стандартну подію форми, щоб уникнути перезавантаження сторінки
  event.preventDefault();
}
