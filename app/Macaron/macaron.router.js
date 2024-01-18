module.exports = (router) => {
    const macaronController = require("./macaron.controller");

    router.get("/macaron/list", macaronController.get_macaron_list);
    router.get("/macaron/detail/:id", macaronController.get_macaron_detail_by_id);

    router.post("/macaron/add", macaronController.add_macaron);

    router.put("/macaron/update/:id", macaronController.update_macaron_by_id);

    router.delete("/macaron/delete/:id", macaronController.delete_macaron_by_id);
};