const QUERY_COOKIES = {
    SELECT_COOKIES: "SELECT * FROM cookies ORDER BY created_at DESC LIMIT 100",
    SELECT_COOKIE: "SELECT * FROM cookies WHERE id = ?",
    CREATE_COOKIE: "INSERT INTO cookies (name, size, flavor, price, image_url) VALUES (?, ?, ?, ?, ?)",
    UPDATE_COOKIE: "UPDATE cookies SET name=?, size=?, flavor=?, price=?, image_url=?",
    DELETE_COOKIE: "DELETE FROM cookies WHERE id = ?",
};

export default QUERY_COOKIES;
