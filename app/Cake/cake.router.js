module.exports = (router) => {
    const cakeController = require("./cake.controller");

    router.get("/cake/list", cakeController.get_cake_list);
    router.get("/cake/detail/:id", cakeController.get_cake_detail_by_id);

    router.post("/cake/add", cakeController.add_cake);

    // router.put("/cake/update/:id", cakeController.update_cake_by_id);
    router.put("/cake/update", cakeController.update_cake);

    router.delete("/cake/delete/:id", cakeController.delete_cake_by_id);
};