// Function is reegulating log status of user 
function login(){
const isLoggedIn = localStorage.getItem('isLoggedIn');
const username = localStorage.getItem('username');

if (!isLoggedIn || !username) {
  window.location.href = '#login';
} else {
    document.querySelectorAll('.welcomeMessage').forEach(element => {
        element.textContent = `Logged in as: ${username}!`;
});
    document.querySelectorAll('.btnLogout').forEach(element => {
        element.style.display="block"
    });

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    document.querySelectorAll('.welcomeMessage').forEach(element => {
        element.textContent = `Logged out!`;
    });

    document.querySelectorAll('.btnLogout').forEach(element => {
        element.style.display="none"
    });

    hideNavbarMobile()
    window.location.href = '#login';
  };
};

function hideNavbarMobile(){
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
}

document.querySelectorAll('.btnLogout').forEach(btn => {
    btn.addEventListener('click', login)})
