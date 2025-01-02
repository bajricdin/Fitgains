// Interactive modal with dynamic content of bodybuilders
function loadModal(){
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
            img: "./images/arnold.jpg",
            moreInfoLink: "#arnold" 
        },
        "Ronnie Coleman": {
            description: "An American professional bodybuilder regarded as one of the greatest in bodybuilding history.",
            achievements: "8x Mr. Olympia, Known as 'The King' of bodybuilding.",
            img: "./images/ronnie.png",
            moreInfoLink: "#ronnie" 
        },
        "Chris Bumstead": {
            description: "A Canadian professional bodybuilder dominating the Classic Physique division.",
            achievements: "4x Classic Physique Mr. Olympia, Social Media Influencer.",
            img: "./images/cbum.jpg",
            moreInfoLink: "#cbum" 
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
            
            const viewMoreBtn = document.getElementById("modalViewMore");
            viewMoreBtn.setAttribute("href", bodybuilder.moreInfoLink);
            
            document.getElementById("modalViewMore").addEventListener("click", () => {
                const modal = document.querySelector('.modal');
            
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
                modal.style.display = 'none';
            
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
            
                document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
            });
        });
    });
}

loadModal()