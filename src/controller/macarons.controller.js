import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import QUERY_MACARONS from "../query/macarons.query.js";
import logger from "../util/logger.js";

const HttpStatus = {
    OK: { code: 200, status: "OK" },
    CREATED: { code: 201, status: "CREATED" },
    NO_CONTENT: { code: 204, status: "NO_CONTENT" },
    BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
    NOT_FOUND: { code: 404, status: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

// get all list of macarons
export const getMacarons = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching macarons`);
    database.query(QUERY_MACARONS.SELECT_MACARONS, (error, results) => {
        if (!results) {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Macaron`)
            );
        } else {
            res.status(HttpStatus.OK.code).send(
                new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Macaron Retrieved`, {
                    macarons: results,
                })
            );
        }
    });
};

// get a macaron by id
export const getMacaron = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching a macaron`);
    database.query(QUERY_MACARONS.SELECT_MACARON, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Macaron by ID: ${req.params.id}`)
            );
        } else {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Macaron Found`, results[0]));
        }
    });
};

// create a macaron, dont need id
export const createMacaron = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating a macaron`);
    console.log("..........", Object.values(req.body));
    database.query(QUERY_MACARONS.CREATE_MACARON, Object.values(req.body), (error, results) => {
        console.log(results);
        console.log(QUERY_MACARONS.CREATE_MACARON);
        if (!results) {
            logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
                new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Create A Macaron`)
            );
        } else {
            const macaron = {
                id: results.insertedId,
                ...req.body,
                created_at: new Date(),
            };
            res.status(HttpStatus.CREATED.code).send(
                new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `A Macaron Created`, {
                    macaron,
                })
            );
        }
    });
};

// update a macaron by id
export const updateMacaron = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating a macaron`);
    database.query(QUERY_MACARONS.SELECT_MACARON, [req.params.id], (error, results) => {
        if (!results[0]) {
            logger.error(error.message);
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Cannot Found A Macaron`)
            );
        } else {
            database.query(QUERY_MACARONS.UPDATE_MACARON, [...Object.values(req.body), req.params.id], (error, results) => {
                if (!error) {
                    res.status(HttpStatus.OK.code).send(
                        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Macaron Updated`, {
                            id: req.params.id,
                            ...req.body,
                        })
                    );
                } else {
                    logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
                        new Response(
                            HttpStatus.INTERNAL_SERVER_ERROR.code,
                            HttpStatus.INTERNAL_SERVER_ERROR.status,
                            `Cannot Update A Macaron`
                        )
                    );
                }
            });
        }
    });
};

// delete a macaron by id
export const deleteMacaron = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting a macaron`);
    database.query(QUERY_MACARONS.DELETE_MACARON, [req.params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res.status(HttpStatus.NO_CONTENT.code).send(
                new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `A Macaron Deleted`)
            );
        } else {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Macaron by ID: ${req.params.id}`)
            );
        }
    });
};

export default HttpStatus;
