import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import QUERY_COOKIES from "../query/cookies.query.js";
import logger from "../util/logger.js";

const HttpStatus = {
    OK: { code: 200, status: "OK" },
    CREATED: { code: 201, status: "CREATED" },
    NO_CONTENT: { code: 204, status: "NO_CONTENT" },
    BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
    NOT_FOUND: { code: 404, status: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

// get all list of cookies
export const getCookies = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching cookies`);
    database.query(QUERY_COOKIES.SELECT_COOKIES, (error, results) => {
        if (!results) {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Cookie`)
            );
        } else {
            res.status(HttpStatus.OK.code).send(
                new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Cookie Retrieved`, {
                    cookies: results,
                })
            );
        }
    });
};

// get a cookie by id
export const getCookie = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching a cookie`);
    database.query(QUERY_COOKIES.SELECT_COOKIE, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Cookie by ID: ${req.params.id}`)
            );
        } else {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Cookie Found`, results[0]));
        }
    });
};

// create a cookie, dont need id
export const createCookie = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating a cookie`);
    database.query(QUERY_COOKIES.CREATE_COOKIE, Object.values(req.body), (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
                new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Create A Cookie`)
            );
        } else {
            const cookie = {
                id: results.insertedId,
                ...req.body,
                created_at: new Date(),
            };
            res.status(HttpStatus.CREATED.code).send(
                new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `A Cookie Created`, {
                    cookie,
                })
            );
        }
    });
};

// update a cookie by id
export const updateCookie = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating a cookie`);
    database.query(QUERY_COOKIES.SELECT_COOKIE, [req.params.id], (error, results) => {
        if (!results[0]) {
            logger.error(error.message);
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Cannot Found A Cookie`)
            );
        } else {
            database.query(QUERY_COOKIES.UPDATE_COOKIE, [...Object.values(req.body), req.params.id], (error, results) => {
                if (!error) {
                    res.status(HttpStatus.OK.code).send(
                        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `A Cookie Updated`, {
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
                            `Cannot Update A Cookie`
                        )
                    );
                }
            });
        }
    });
};

// delete a cookie by id
export const deleteCookie = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting a cookie`);
    database.query(QUERY_COOKIES.DELETE_COOKIE, [req.params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res.status(HttpStatus.NO_CONTENT.code).send(
                new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `A Cookie Deleted`)
            );
        } else {
            res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found A Cookie by ID: ${req.params.id}`)
            );
        }
    });
};

export default HttpStatus;
