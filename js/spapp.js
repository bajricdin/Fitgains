$(document).ready(function () {
    var app = $.spapp({
        defaultView: "login",
        templateDir  : './pages/',
        onReady: login()
    });

    // Routes
    app.route({
        view: "home",
        load: "landing.html"
    });

    app.route({
        view: "workout",
        load: "workout-plan.html"
    });

    app.route({
        view: "aboutus",
        load: "about-us-page.html"
    });

    app.route({
        view: "contactus",
        load: "contact-page.html"
    });

    app.route({
        view: "arnold",
        load: "arnold-details.html"
    });

    app.route({
        view: "ronnie",
        load: "ronnie-details.html"
    });

    app.route({
        view: "cbum",
        load: "cbum-details.html"
    });

    app.route({
        view: "login",
        load: "login.html"
    });

    // Scrolls to top of the page insted of the page section
    $(window).on("hashchange", function () {
        window.scrollTo(0, 0);
    });

    app.run();
});

