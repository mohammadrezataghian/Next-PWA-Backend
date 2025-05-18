//   const dicomServer = "http://127.0.0.1:11811";
const { Readable } = require("stream");
const dicomBride = function (app, dicomServer) {
    app.post("/v/api/dicom/instance/getList", (req, res) => {
        fetch(`${dicomServer}/v/api/dicom/instance/getList`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        })
            .then((response) => response.json())
            .then((result) => {
                res.send(result);
            });
    });
    app.post("/v/api/dicom/instance/readFile", (req, res) => {
        fetch(`${dicomServer}/v/api/dicom/instance/readFile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        }).then((response) => {
            res.header("Content-Type", response.body.type);
            let readStream = Readable.fromWeb(response.body);
            readStream.pipe(res);
        });
    });
    app.get("/v/api/dicom/instance/getVideo/*", (req, res) => {
        fetch(`${dicomServer}${req.path}`, {
            method: "GET",
        }).then((response) => {
            res.header("Content-Type", response.body.type);
            let readStream = Readable.fromWeb(response.body);
            readStream.pipe(res);
        });
    });
    app.get("/v/api/dicom/instance/getPDF/*", (req, res) => {
        fetch(`${dicomServer}${req.path}`, {
            method: "GET",
        }).then((response) => {
            res.header("Content-Type", response.body.type);
            let readStream = Readable.fromWeb(response.body);
            readStream.pipe(res);
        });
    });
}

module.exports = dicomBride