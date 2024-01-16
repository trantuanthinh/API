var Cake = require("./cake.model");

exports.get_cake_list = (req, res) => {
    Cake.getAll((data) => res.send({ result: data }));
};

exports.get_cake_detail_by_id = (req, res) => {
    Cake.getByID(req.params.id, (data) => res.send({ result: data }));
};

exports.add_cake = (req, res) => {
    var data = req.body;
    Cake.create(data, (response) => {
        res.send({ result: response });
    });
};

exports.update_cake = (req, res) => {
    var data = req.body;
    Cake.update(data, (response) => {
        res.send({ result: response });
    });
};

exports.delete_cake_by_id = (req, res) => {
    var id = req.params.id;
    Cake.deleteByID(id, (response) => {
        res.send({ result: response });
    });
};
