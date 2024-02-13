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

}

module.exports = Tool