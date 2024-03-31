document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('surveyForm');


    function saveData() {
        var selectedSeason = document.querySelector('input[name="fav_season"]:checked').value;

        var selectedCountries = [];
        form.querySelectorAll('input[name^="country"]:checked').forEach(function(checkbox) {
            selectedCountries.push(checkbox.value);
        });


        var formData = {
            fname: form.fname.value,
            lname: form.lname.value,
            birthday: form.birthday.value,
            email: form.email.value,
            phone: form.phone.value,
            type_of_rest: form.type_of_rest.value,
            countries: selectedCountries,
            living: form.living.value,
            stars: form.stars.value,
            days: form.days.value,
            color1: form.color1.value,
            fav_season: selectedSeason
        };


        var storedData = localStorage.getItem('surveyData');
        var surveys = storedData ? JSON.parse(storedData) : [];
        surveys.push(formData);
        var surveysJSON = JSON.stringify(surveys);
        localStorage.setItem('surveyData', surveysJSON);
        form.reset();
    }


    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        saveData(); 
    });
});
