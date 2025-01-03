// Select buttons
const smallBtnDesktop = document.getElementById('font-small-desktop');
const mediumBtnDesktop = document.getElementById('font-medium-desktop');
const largeBtnDesktop = document.getElementById('font-large-desktop');

const smallBtnMobile = document.getElementById('font-small-mobile');
const mediumBtnMobile = document.getElementById('font-medium-mobile');
const largeBtnMobile = document.getElementById('font-large-mobile');

function setFontSize(size) {
  document.querySelectorAll('p').forEach((p) => {
    p.style.fontSize = size;
  });
  localStorage.setItem('fontSize', size);
  activateButtons(size);
}

// Activate correct buttons (desktop and mobile)
function activateButtons(size) {
  [smallBtnDesktop, mediumBtnDesktop, largeBtnDesktop, smallBtnMobile, mediumBtnMobile, largeBtnMobile].forEach((btn) => {
    btn.classList.remove('active');
  });

  if (size === '14px') {
    smallBtnDesktop.classList.add('active');
    smallBtnMobile.classList.add('active');
  } else if (size === '18px') {
    mediumBtnDesktop.classList.add('active');
    mediumBtnMobile.classList.add('active');
  } else if (size === '32px') {
    largeBtnDesktop.classList.add('active');
    largeBtnMobile.classList.add('active');
  }
}


const savedFontSize = localStorage.getItem('fontSize') || '14px';
setFontSize(savedFontSize);

smallBtnDesktop.addEventListener('click', () => setFontSize('14px'));
mediumBtnDesktop.addEventListener('click', () => setFontSize('18px'));
largeBtnDesktop.addEventListener('click', () => setFontSize('32px'));

smallBtnMobile.addEventListener('click', () => setFontSize('14px'));
mediumBtnMobile.addEventListener('click', () => setFontSize('18px'));
largeBtnMobile.addEventListener('click', () => setFontSize('32px'));

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

// Function to update the navigation bar based on the current route
function updateNavLinks() {
    const navlinks = document.querySelectorAll(".nav-link");

    navlinks.forEach(navlink => {
        navlink.classList.remove("nav-active");
    });

    const currentView = window.location.hash.replace("#", "") || "home";

    navlinks.forEach(navlink => {
        if (navlink.getAttribute("href").includes(currentView)) {
            navlink.classList.add("nav-active");
        }
    });
}

// Add click event listeners to all nav links to handle route changes
document.querySelectorAll(".nav-link").forEach(navlink => {
    navlink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.hash = navlink.getAttribute("href").substring(1);
        updateNavLinks();
    });
});

// Close the mobile navbar when a link is clicked
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', hideNavbarMobile);
    function hideNavbarMobile(){
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    }});

