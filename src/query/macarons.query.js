const QUERY_MACARONS = {
    SELECT_MACARONS: "SELECT * FROM macarons ORDER BY created_at DESC LIMIT 100",
    SELECT_MACARON: "SELECT * FROM macarons WHERE id = ?",
    CREATE_MACARON: "INSERT INTO macarons (name, size, flavor, price, image_url) VALUES (?, ?, ?, ?, ?)",
    UPDATE_MACARON: "UPDATE macarons SET name=?, size=?, flavor=?, price=?, image_url=?",
    DELETE_MACARON: "DELETE FROM macarons WHERE id = ?",
};

export default QUERY_MACARONS;
