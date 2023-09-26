// static/script.js
document.addEventListener('DOMContentLoaded', function () {
    const careerList = document.getElementById('career-list');
    const careerDetails = document.getElementById('career-details');

    careerList.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('career-item')) {
            const selectedCareer = event.target;
            const careerName = selectedCareer.textContent;
            const salary = selectedCareer.getAttribute('data-salary');
            const description = selectedCareer.getAttribute('data-description');
            const security = selectedCareer.getAttribute('data-security');

            // Update the career details in the HTML
            document.getElementById('career-name').textContent = careerName;
            document.getElementById('career-salary').textContent = salary;
            document.getElementById('career-description').textContent = description;
            document.getElementById('career-security').textContent = security;

            // Show the career details section
            careerDetails.style.display = 'block';
        }
    });
});