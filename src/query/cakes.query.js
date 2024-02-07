const QUERY_CAKES = {
    SELECT_CAKES: "SELECT * FROM cakes ORDER by created_at DESC LIMIT 100",
    SELECT_CAKE: "SELECT * FROM cakes where id = ?",
    CREATE_CAKE: "INSERT INTO cakes (name,size,flavor,price,image_url) VALUES (?,?,?,?,?)",
    UPDATE_CAKE: "UPDATE cakes SET name=?,size=?,flavor=?,price=?,image_url=?",
    DELETE_CAKE: "DELETE FROM cakes WHERE id = ?",
};

export default QUERY_CAKES;
