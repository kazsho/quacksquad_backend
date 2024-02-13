const db = require("../database/connect")

class Tool{
constructor({tool_name, tool_id, location_id, price_per_day, description, image_URL, status}) {
    this.tool_name = tool_name
    this.tool_id = tool_id
    this.location_id = location_id
    this.price_per_day = price_per_day
    this.description = description
    this.image_URL = image_URL
    this.status = status
}

static async getAll() {
    const response = await db.query("SELECT * FROM tool;")
    if (response.rows.length === 0){
        throw new Error("No tools in the database")
    }

    return response.rows.map(t => new Tool(t))
}

static async getOneById(id) {
    const response = await db.query("SELECT * FROM tool WHERE tool_id = $1", [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate tool.")
    }
    return new Tool(response.rows[0]);
}

static async create(data) {
    const {tool_name, location_id, price_per_day, description, image_URL, status} = data
    const et = await db.query("SELECT tool_id FROM tool WHERE tool_id = $1", [this.id])
    
    if(et.rows.length > 0){
        throw new Error("Tool already is in the DB")
    }

    let response = await db.query("INSERT INTO tool (tool_name, location_id, price_per_day, description, image_URL, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [tool_name, location_id, price_per_day, description, image_URL, status])
    return new Tool(response.rows[0])
}

// async update(data){
//     let response = await db.query("UPDATE country SET name = $1, capital = $2, population = $3, languages = $4, fun_fact = $5, map_image_url = $6 WHERE name = $7 RETURNING *;",[data.name, data.capital, data.population, data.languages, data.fun_fact, data.map_image_url, this.name])
//     return new Country(response.rows[0])
// }

// async destroy(){
//     let response = await db.query("DELETE FROM country WHERE name = $1 RETURNING *;", [this.name])
//     return new Country(response.rows[0])
// }


}

module.exports = Tool