const db = require("../database/connect")

class Location{
constructor({location_id, street_address, post_code}) {
    this.location_id = location_id
    this.street_address = street_address
    this.post_code = post_code
}

static async getAll() {
    const response = await db.query("SELECT * FROM location;")
    if (response.rows.length === 0){
        throw new Error("No locations in the database")
    }

    return response.rows.map(l => new Location(l))
}


static async getOneById(id) {
    const response = await db.query("SELECT * FROM location WHERE location_id = $1", [id])
    if (response.rows.length != 1) {
        throw new Error("Unable to locate location.")
    }
    return new Location(response.rows[0])
}
}

module.exports = Location