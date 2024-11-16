// Empty for now
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

    // Show loader
    document.getElementById('loader-container').classList.remove('d-none');

    // Simulate a delay before showing the workout plan
    setTimeout(function() {
        // Hide loader
        document.getElementById('loader-container').classList.add('d-none');

        // Show workout plan table
        document.getElementById('workoutPlanContainer').classList.remove('d-none');

        // Add table rows based on generated plan
        var tableBody = document.getElementById('workoutTableBody');

        // Sample plan (this should be dynamically generated based on the form input and using openai api but i didnt do it)
        var plan = [
            { day: 'Day 1', workout: 'Push-Ups', repsSets: '3 sets of 10 reps' },
            { day: 'Day 2', workout: 'Squats', repsSets: '4 sets of 12 reps' },
            { day: 'Day 3', workout: 'Pull-Ups', repsSets: '3 sets of 8 reps' }
        ];

        // Loop to fill the table with generated workouts
        plan.forEach(function(item) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${item.day}</td><td>${item.workout}</td><td>${item.repsSets}</td>`;
            tableBody.appendChild(row);
        });
    }, 2000); // Simulate 2 seconds delay
}