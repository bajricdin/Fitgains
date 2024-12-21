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
// Functions that checks if the form satisfies some conditions and based on that calls 
// validateInput function to change border accordingly
function validateAndUpdateWeight() {   
    const weightInput = document.getElementById('weight');
    const weight = parseFloat(weightInput.value);
    const weightIsValid = weight >= 30 && weight <= 300;
    validateInput(weightInput, weightIsValid);
}
function validateAndUpdateAge(){
    const ageInput = document.getElementById('age');
    const age = parseInt(ageInput.value, 10);
    const ageIsValid = age >= 16 && age <= 100;
    validateInput(ageInput, ageIsValid);
}
// Basically every time something is typed inside input it calles function to validate form
document.getElementById('age').addEventListener('input', validateAndUpdateAge);
document.getElementById('weight').addEventListener('input', validateAndUpdateWeight);

// Handle form submission using AJAX
let currentId = 101;    
document.getElementById('workoutForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formAction = this.action;

    // Log all form data to the console
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    console.log("Form Data Submitted:", formObject);

    // Perform AJAX request
    fetch(formAction, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to submit form data.");
            }
            return response.json();
        })
        .then(data => {
            alert("Form submitted successfully!");
            console.log("Response data:", {id : currentId});
            currentId++;

            // Reseting the form and setting border to default color
            document.getElementById('workoutForm').reset();
            document.querySelectorAll('.valid, .invalid').forEach(el => {
                el.classList.remove('valid', 'invalid');
            });
        })
        .catch(error => {
            console.error("Error submitting form:", error);
            alert("There was an error submitting the form. Please try again.");
        });
});


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
            setTimeout(() => {
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
            }, 2000);
        })
        .catch(error => {
            document.getElementById('loader-container').classList.add('d-none');
            console.error("Error loading workouts:", error);
            alert("There was an error loading the workout plan. Please try again.");
        });
}
