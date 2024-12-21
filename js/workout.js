// Changes border with class swapping according to bool value from valudateAndUpdate function
function validateInput(input, isValid) {
    if (isValid) {
        input.classList.add('valid'); 
        input.classList.remove('invalid');  
    } else {
        input.classList.add('invalid'); 
        input.classList.remove('valid');
    }
}
// Functions that checks if the form satisfies some conditions and based on that calls validateInput function to change border accordingly
function validateAndUpdate() {
    const ageInput = document.getElementById('age');
    const weightInput = document.getElementById('weight');

    const age = parseInt(ageInput.value, 10);
    const weight = parseFloat(weightInput.value);

    const ageIsValid = age >= 16 && age <= 100;
    validateInput(ageInput, ageIsValid);

    const weightIsValid = weight >= 30 && weight <= 300;
    validateInput(weightInput, weightIsValid);
}
// Basically every time something is typed inside input it calles function to validate form
document.getElementById('age').addEventListener('input', validateAndUpdate);
document.getElementById('weight').addEventListener('input', validateAndUpdate);

// Function to handle form submission and workout plan generation
function generatePlan() {
    var age = document.getElementById('age').value;
    var fitnessLevel = document.getElementById('fitnessLevel').value;
    var goal = document.getElementById('goal').value;
    var gender = document.getElementById('gender').value;
    var weight = document.getElementById('weight').value;
    var duration = document.getElementById('duration').value;
    var days = document.getElementById('days').value;
    var split = document.getElementById('split').value;

    if (!age || !fitnessLevel || !goal || !gender || !weight || !duration || !days || !split) {
        alert("Please fill in all required fields.");
        return;
    }

    const ageInput = document.getElementById('age');
    const weightInput = document.getElementById('weight');
    const ageIsValid = parseInt(age, 10) >= 16 && parseInt(age, 10) <= 100;
    const weightIsValid = parseFloat(weight) >= 30 && parseFloat(weight) <= 300;

    if (!ageIsValid || !weightIsValid) {
        alert("Please enter valid age (16-100) and weight (30-300).");
        return;
    }

    document.getElementById('loader-container').classList.remove('d-none');

    // Fetch workout plan from a local JSON file
    fetch("../json/workouts.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load workouts data.");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('loader-container').classList.add('d-none');

            document.getElementById('workoutPlanContainer').classList.remove('d-none');

            var tableBody = document.getElementById('workoutTableBody');
            tableBody.innerHTML = ''; 

            // Populate the table with data from the JSON file
            const plan = data.workouts;
            plan.forEach(function (item) {
                var row = document.createElement('tr');
                row.innerHTML = `<td>${item.day}</td><td>${item.workout}</td><td>${item.repsSets}</td>`;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            document.getElementById('loader-container').classList.add('d-none');
            console.error("Error loading workouts:", error);
            alert("There was an error loading the workout plan. Please try again.");
        });
    }