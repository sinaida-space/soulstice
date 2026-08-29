// GitHub Pages serves 404.html for any missing path under the site.
// Hand control to the app and show the styled 404 view.
// Kept in its own file so the page needs no inline script under CSP.
location.hash = "#/404";
