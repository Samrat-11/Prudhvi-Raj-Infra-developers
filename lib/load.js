// Dynamically add external stylesheets and custom styles to the document head
document.head.innerHTML += `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.7.0/fonts/remixicon.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">
  <style>ul{list-style:none} a{text-decoration:none}</style>
`;

// Load external HTML components into specified containers
function loadComponent(url, containerId) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById(containerId);
      container.innerHTML = html;
      container.querySelectorAll('script').forEach(script => {
        const s = document.createElement('script');
        if (script.src) { s.src = script.src;}
        else {s.textContent = script.textContent;}
        document.body.appendChild(s);
      });
    });
}

// Determine paths based on current location
const p = location.pathname.endsWith("index.html") ? "lib/" : "";
const SplashUrl = `${p}splash-screen.html`;
const NavUrl = `${p}navbar.html`;
const FooterUrl = `${p}footer.html`;
const ResidencesUrl = `${p}residences.html`;

// Load all components
if (typeof SplashUrl !== "undefined") { loadComponent(SplashUrl, 'splash-container'); }
if (typeof NavUrl !== "undefined") { loadComponent(NavUrl, 'navbar-container'); }
if (typeof FooterUrl !== "undefined") { loadComponent(FooterUrl, 'footer-container'); }
if (typeof ResidencesUrl !== "undefined") { loadComponent(ResidencesUrl, 'residences-container'); }
