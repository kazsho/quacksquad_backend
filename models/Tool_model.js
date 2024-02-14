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

static async showRandom() {
    const response = await db.query("SELECT * FROM tool ORDER BY RANDOM() LIMIT 3;")
    if (response.rows.length === 0) {
        throw new Error("No tools found in the database");
    }

    return response.rows.map(t => new Tool(t))
}

static async searchByQuery(query) {

    if (!query) {
        throw new Error('Please enter a valid search item')
    }
    const response = await db.query("SELECT * FROM tool WHERE tool_name LIKE $1", ['%' + query + '%'])

    if (response.rows.length === 0) {
        throw new Error('No items found for the search term')
      }
      
    return response.rows.map(t => new Tool(t))
  }

static async getOneById(id) {
    const response = await db.query("SELECT * FROM tool WHERE tool_id = $1", [id])
    if (response.rows.length != 1) {
        throw new Error("Unable to locate tool.")
    }
    return new Tool(response.rows[0])
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

static async update(id, data){
    const et = await db.query("SELECT tool_id FROM tool WHERE tool_id = $1", [id])
    
    if(et.rows.length === 0){
        throw new Error("Tool does not exist yet")
    }
    let response = await db.query("UPDATE tool SET tool_name = $1, location_id = $2, price_per_day = $3, description = $4, image_URL = $5, status = $6 WHERE tool_id = $7 RETURNING *;",[data.tool_name, data.location_id, data.price_per_day, data.description, data.image_URL, data.status, id])
    return new Tool(response.rows[0])
}


static async destroy(id){
    let response = await db.query("DELETE FROM tool WHERE tool_id = $1 RETURNING *;", [id])
    return new Tool(response.rows[0])
}

}

module.exports = Tool