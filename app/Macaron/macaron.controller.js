var Macaron = require("./macaron.model");

exports.get_macaron_list = (req, res) => {
    Macaron.getAll((data) => res.send({ result: data }));
};

exports.get_macaron_detail_by_id = (req, res) => {
    Macaron.getByID(req.params.id, (data) => res.send({ result: data }));
};

exports.add_macaron = (req, res) => {
    var data = req.body;
    Macaron.create(data, (response) => {
        res.send({ result: response });
    });
};

exports.update_macaron = (req, res) => {
    var data = req.body;
    Macaron.update(data, (response) => {
        res.send({ result: response });
    });
};

exports.delete_macaron_by_id = (req, res) => {
    var id = req.params.id;
    Macaron.deleteByID(id, (response) => {
        res.send({ result: response });
    });
};
