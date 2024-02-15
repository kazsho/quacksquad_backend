// function logRoutes(req, res, next) {
//     console.log(req.method, req.originalUrl);
//     next();
// }

// module.exports = logRoutes;

function logRoutes(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log("Request body:", req.body);
    console.log("Query parameters:", req.query);

    res.on("finish", () => {
        console.log(`Response status: ${res.statusCode}`);
    });

    next();
}

module.exports = logRoutes;