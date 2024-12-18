// I generated this js code using ChatGPT so i can display table and use mock API for fetching data

function generatePlan() {
    // Get form values
    var age = document.getElementById('age').value;
    var fitnessLevel = document.getElementById('fitnessLevel').value;
    var goal = document.getElementById('goal').value;
    var gender = document.getElementById('gender').value;
    var weight = document.getElementById('weight').value;
    var duration = document.getElementById('duration').value;
    var days = document.getElementById('days').value;
    var split = document.getElementById('split').value;

    // Ensure required fields are filled
    if (!age || !fitnessLevel || !goal || !gender || !weight || !duration || !days || !split) {
        alert("Please fill in all required fields.");
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

// Interactive modal with dynamic content of bodybuilders
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = img.src;
    });
});

const bodybuilders = {
    "Arnold Schwarzenegger": {
        description: "An Austrian-American bodybuilder who revolutionized bodybuilding and became an iconic actor and politician.",
        achievements: "7x Mr. Olympia, 5x Mr. Universe, Actor, and Politician.",
        img: "images/arnold.jpg"
    },
    "Ronnie Coleman": {
        description: "An American professional bodybuilder regarded as one of the greatest in bodybuilding history.",
        achievements: "8x Mr. Olympia, Known as 'The King' of bodybuilding.",
        img: "images/ronnie.png"
    },
    "Chris Bumstead": {
        description: "A Canadian professional bodybuilder dominating the Classic Physique division.",
        achievements: "4x Classic Physique Mr. Olympia, Social Media Influencer.",
        img: "images/cbum.jpg"
    }
};

const thumbnails = document.querySelectorAll(".gallery-img");
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        const name = thumbnail.nextElementSibling.textContent;
        const bodybuilder = bodybuilders[name] || {};

        document.getElementById("modalName").textContent = name;
        document.getElementById("modalImage").src = bodybuilder.img || "";
        document.getElementById("modalDescription").textContent = bodybuilder.description || "Description not found.";
        document.getElementById("modalAchievements").textContent = bodybuilder.achievements || "Achievements not found.";
    });
});

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

    const apiKey = '8f2d05660c8e5054cff8b6b9f3a04e62'; 
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


