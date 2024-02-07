import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import QUERY_CAKES from "../query/cakes.query.js";
import logger from "../util/logger.js";

const HttpStatus = {
    OK: { code: 200, status: "OK" },
    CREATED: { code: 201, status: "CREATED" },
    NO_CONTENT: { code: 204, status: "NO_CONTENT" },
    BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
    NOT_FOUND: { code: 404, status: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

//get all list of cakes
export const getCakes = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching cakes`);
    database.query(QUERY_CAKES.SELECT_CAKES, (error, results) => {
        if (!results) {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Cake`)
            );
        } else {
            res.status(HttpStatus.OK.code).send(
                new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Cake Retrived`, {
                    cakes: results,
                })
            );
        }
    });
};

//get a cake by id
export const getCake = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching a cake`);
    database.query(QUERY_CAKES.SELECT_CAKE, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Cake by ID: ${req.params.id} `)
            );
        } else {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Cake Found`, results[0]));
        }
    });
};

//create a cake, dont need id
export const createCake = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, creating a cake`);
    database.query(QUERY_CAKES.CREATE_CAKE, Object.values(req.body), (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
                new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Create A Cake`)
            );
        } else {
            const cake = {
                id: results.insertedId,
                ...req.body,
                created_at: new Date(),
            };
            res.status(HttpStatus.CREATED.code).send(
                new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `A Cake Created`, {
                    cake,
                })
            );
        }
    });
};

//update a cake by id
export const updateCake = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, creating a cake`);
    database.query(QUERY_CAKES.SELECT_CAKE, [req, params.id], (error, results) => {
        if (!results[0]) {
            logger.error(error.message);
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Cannot Found A Cake`)
            );
        } else {
            logger.info(`${req.method} ${req.originalurl}, updating a cake`);
            database.query(QUERY_CAKES.UPDATE_CAKE, [...Object.values(req.body), req.params.id], (error, results) => {
                if (!error) {
                    res.status(HttpStatus.OK.code).send(
                        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Cake Updated`, {
                            id: req.params.id,
                            ...req.body,
                        })
                    );
                } else {
                    logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
                        new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Update A Cake`)
                    );
                }
            });
        }
    });
};

//delete a cake by id
export const deleteCake = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, creating a cake`);
    database.query(QUERY_CAKES.DELETE_CAKE, [req, params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `A Cake Deleted`)
            );
        } else {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Cake by ID: ${req.params.id} `)
            );
        }
    });
};

export default HttpStatus;
