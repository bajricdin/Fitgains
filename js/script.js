// Notifications
function showToast(message, type) {
    const toast = document.getElementById('toast');
    const toastDanger = document.getElementById('toast-danger')
    const toastMessage = document.getElementById('toast-message');
    const toastMessageDanger = document.getElementById('toast-message-danger');
    // If 2 notification pops out, first one dissapears and the latest one is visible
    toast.classList.remove('show');
    toastDanger.classList.remove('showDanger');

    if (type === 'red'){
        toastMessageDanger.textContent = message;
        toastDanger.classList.add('showDanger');
        
        setTimeout(() => {
            toastDanger.classList.remove('showDanger');
        }, 3000);
    }else if (type === 'green'){
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);   
    }   
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
        img: "images/arnold.jpg",
        moreInfoLink: "detail-pages/arnold-details.html" 
    },
    "Ronnie Coleman": {
        description: "An American professional bodybuilder regarded as one of the greatest in bodybuilding history.",
        achievements: "8x Mr. Olympia, Known as 'The King' of bodybuilding.",
        img: "images/ronnie.png",
        moreInfoLink: "detail-pages/ronnie-details.html" 
    },
    "Chris Bumstead": {
        description: "A Canadian professional bodybuilder dominating the Classic Physique division.",
        achievements: "4x Classic Physique Mr. Olympia, Social Media Influencer.",
        img: "images/cbum.jpg",
        moreInfoLink: "detail-pages/cbum-details.html" 
    }
};

document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        const name = img.nextElementSibling.textContent;
        const bodybuilder = bodybuilders[name];

        document.getElementById("modalName").textContent = name;
        document.getElementById("modalImage").src = bodybuilder.img;
        document.getElementById("modalDescription").textContent = bodybuilder.description;
        document.getElementById("modalAchievements").textContent = bodybuilder.achievements;
        
        document.getElementById("modalViewMore").setAttribute("href", bodybuilder.moreInfoLink);
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


