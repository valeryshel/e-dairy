
const profile = document.getElementById('about_meDescription');
const error__about_me = document.getElementById('about_meDescription');

let userMe = {};

function dataAboutMe(element) {
    let name = "<p>"+ 'Имя: '+ element.name + "</p>";
    let email = "<p>"+'Почта: ' + element.email + "</p>";
    let website = "<p>"+'Сайт: '  + element.website + "</p>";
    let company = "<p>"+'Место работы: ' + element.company.name + "</p>";
    return name + email + website + company;
}

function showAboutMe() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        })
        .then((data) => {
            userMe = data;
            profile.innerHTML = dataAboutMe(userMe);
        })
        .catch((error) => {
            error__about_me.textContent = error;
            console.error('Ошибка при выполнении запроса:', error);
        });
}

document.addEventListener('DOMContentLoaded', showAboutMe);