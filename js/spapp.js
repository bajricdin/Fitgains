$(document).ready(function () {
    var app = $.spapp({
        defaultView: "home",
        templateDir  : './pages/',
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
        load: "contact-page.html",
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

    app.run();
});

