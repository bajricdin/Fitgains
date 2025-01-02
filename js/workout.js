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
            // alert("Form submitted successfully!");
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
            // alert("There was an error submitting the form. Please try again.");
            showToast("There was an error submitting the form. Please try again.", "red")
        });
});


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
        // alert("Please fill in all required fields.");
        showToast("Please fill in all required fields.", "red")
        return;
    }

    const ageInput = document.getElementById('age');
    const weightInput = document.getElementById('weight');
    const ageIsValid = parseInt(age, 10) >= 16 && parseInt(age, 10) <= 100;
    const weightIsValid = parseFloat(weight) >= 30 && parseFloat(weight) <= 300;

    if (!ageIsValid || !weightIsValid) {
        // alert("Please enter valid age (16-100) and weight (30-300).");
        showToast("Please enter valid age (16-100) and weight (30-300).", "red")
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
                // showToast('Molimo unesite sve podatke za pretraživanje.', 'red');
                var tableBody = document.getElementById('workoutTableBody');
                tableBody.innerHTML = '';

                // Populate the table with data from the JSON file
                const plan = data.workouts;
                plan.forEach(function (item) {
                    var row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.day}</td>
                    <td>${item.workout}</td>
                    <td>${item.repsSets}</td>
                    <td>
                        <button class="btn-delete">Delete</button>
                        <button class="btn-edit">Edit</button>
                    </td>
                    `;
                    tableBody.appendChild(row);

                    // Delete button functionality
                    row.querySelector('.btn-delete').addEventListener('click', function () {
                        row.remove();
                        // alert("Entry deleted.");
                        showToast('Entry deleted!', "red");
                    });

                    // Edit button functionality
                    row.querySelector('.btn-edit').addEventListener('click', function () {
                        const cells = row.querySelectorAll('td:not(:last-child)');
                        if (this.textContent === 'Edit') {
                            cells.forEach(cell => cell.setAttribute('contenteditable', 'true'));
                            this.textContent = 'Save';
                        } else {
                            cells.forEach(cell => cell.setAttribute('contenteditable', 'false'));
                            this.textContent = 'Edit';
                            // alert("Changes saved.");
                            showToast('Changes saved.', "green");
                        }
                    });
                });showToast("Form submitted successfully!", "green")
            }, 2000);
        })
        .catch(error => {
            document.getElementById('loader-container').classList.add('d-none');
            console.error("Error loading workouts:", error);
            // alert("There was an error loading the workout plan. Please try again.");
            showToast("There was an error loading the workout plan. Please try again.", "red")
        });
}

// Nutriotion section 
const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.content');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.style.display = 'none');
            
        button.classList.add('active');
        const target = button.getAttribute('data-target');
        document.getElementById(target).style.display = 'block';
        });
    });

// Nutrition and Calorie API
document.getElementById('food-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const foodItem = document.getElementById('food-input').value.trim();
    const resultsDiv = document.getElementById('nutrition-results');

    if (!foodItem) {
        resultsDiv.style.border = 'none';
        resultsDiv.innerHTML = "Please enter a food item.";
        return;
    }

    const apiKey = 'ba8efdfa2542be47cffa653ca365e24a'; 
    const appId = 'acddd836';  

    try {
        const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': appId,
                'x-app-key': apiKey,
            },
            body: JSON.stringify({ query: foodItem })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from the API.");
        }

        const data = await response.json();
        const food = data.foods[0];

        if (!food) {
            resultsDiv.style.border = 'none';
            resultsDiv.innerHTML = "No data available for the entered food item.";
            return;
        }

        resultsDiv.style.border = '2px solid white';
        resultsDiv.innerHTML = `
            <h3>${foodItem.toUpperCase()}</h3>
            <p>Calories: ${food.nf_calories} kcal</p>
            <p>Protein: ${food.nf_protein} g</p>
            <p>Fats: ${food.nf_total_fat} g</p>
            <p>Carbs: ${food.nf_total_carbohydrate} g</p>
            <p>Serving Size: ${food.serving_qty} ${food.serving_unit}</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.style.border = 'none';
        resultsDiv.innerHTML = "Failed to fetch data. Please try again.";
    }
});