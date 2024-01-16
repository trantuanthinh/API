module.exports = (router) => {
    const cookieController = require("./cookie.controller");

    router.get("/cookie/list", cookieController.get_cookie_list);
    router.get("/cookie/detail/:id", cookieController.get_cookie_detail_by_id);

    router.post("/cookie/add", cookieController.add_cookie);

    // router.put("/cookie/update/:id", cookieController.update_cookie_by_id);
    router.put("/cookie/update", cookieController.update_cookie);

    router.delete("/cookie/delete/:id", cookieController.delete_cookie_by_id);
};
