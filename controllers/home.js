exports.home = (req, res) => {
    res.send({
        routes: [
            { get: ['/', '/api/test'] }
        ]
    });
};