// I generated this js code using ChatGPT so i can display table and use mock API for fetching data
// Only code regarding inserting data into the table from object is generated using ChatGPT and will be rewritten by myself in the next commits
// I used ChatGPT code before because for the first assigment we didnt learn JS but i needed it to display table

function validateInput(input, isValid) {
    if (isValid) {
        input.classList.add('valid'); 
        input.classList.remove('invalid');  
    } else {
        input.classList.add('invalid'); 
        input.classList.remove('valid');
    }
}

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

    // If age or weight is invalid, show an alert and stop the form submission
    if (!ageIsValid || !weightIsValid) {
        alert("Please enter valid age (16-100) and weight (30-300).");
        return;
    }

    // Show loader
    document.getElementById('loader-container').classList.remove('d-none');

    // Prepare the data to send
    var formData = {
        age: age,
        fitnessLevel: fitnessLevel,
        goal: goal,
        gender: gender,
        weight: weight,
        duration: duration,
        days: days,
        split: split
    };

    // Send the data to the JSONPlaceholder API
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // Hide loader
            document.getElementById('loader-container').classList.add('d-none');

            // Show workout plan table
            document.getElementById('workoutPlanContainer').classList.remove('d-none');

            // Add table rows based on generated plan
            var tableBody = document.getElementById('workoutTableBody');
            tableBody.innerHTML = ''; // Clear any previous rows

            // Sample plan (this should be dynamically generated based on the form input)
            var plan = [
                { day: 'Day 1', workout: 'Push-Ups', repsSets: '3 sets of 10 reps' },
                { day: 'Day 2', workout: 'Squats', repsSets: '4 sets of 12 reps' },
                { day: 'Day 3', workout: 'Pull-Ups', repsSets: '3 sets of 8 reps' }
            ];

            // Loop to fill the table with generated workouts
            plan.forEach(function (item) {
                var row = document.createElement('tr');
                row.innerHTML = `<td>${item.day}</td><td>${item.workout}</td><td>${item.repsSets}</td>`;
                tableBody.appendChild(row);
            });

            // Log the API response (for testing purposes)
            console.log("Response from API:", data);
        })
        .catch(error => {
            // Hide loader
            document.getElementById('loader-container').classList.add('d-none');
            console.error("Error:", error);
            alert("There was an error submitting the form. Please try again.");
        });
    }