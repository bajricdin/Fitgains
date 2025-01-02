// Mock database URL
const mockedDBurl = '../json/user.json';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(mockedDBurl);
    const users = await response.json();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);

      document.querySelectorAll('.welcomeMessage').forEach(element => {
        element.textContent = `Logged in as: ${username}!`;
    });
    document.querySelectorAll('.btnLogout').forEach(element => {
        element.style.display="block"
    });

      window.location.href = '#home';
    } else {
      document.getElementById('errorMessage').style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

// Function to toggle the state of navbar links
function toggleNavLinks() {
    const navLinks = document.querySelectorAll(".nav-link");
    const isLoginPage = window.location.href.includes("login");
    const logo = document.querySelectorAll(".logo-home");
  
    navLinks.forEach(link => {
      if (isLoginPage) {
        link.style.pointerEvents = "none";
        link.style.opacity = "0.5";
        logo.forEach(l =>{
            l.style.pointerEvents = "none"
        })        
      } else {
        link.style.pointerEvents = "";
        link.style.opacity = "";

        logo.forEach(l =>{
            l.style.pointerEvents = ""
        })
      }
    });
  }
  
toggleNavLinks();
window.addEventListener("popstate", toggleNavLinks, login);
  

  