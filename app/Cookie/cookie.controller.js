var Cookie = require("./cookie.model");

exports.get_cookie_list = (req, res) => {
    Cookie.getAll((data) => res.send({ result: data }));
};

exports.get_cookie_detail_by_id = (req, res) => {
    Cookie.getByID(req.params.id, (data) => res.send({ result: data }));
};

exports.add_cookie = (req, res) => {
    var data = req.body;
    Cookie.create(data, (response) => {
        res.send({ result: response });
    });
};

exports.update_cookie = (req, res) => {
    var data = req.body;
    Cookie.update(data, (response) => {
        res.send({ result: response });
    });
};

exports.delete_cookie_by_id = (req, res) => {
    var id = req.params.id;
    Cookie.deleteByID(id, (response) => {
        res.send({ result: response });
    });
};
