const db = require("../database/connect")

class Reservation {
    constructor({ tool_id, email_address, name, phone_number, start_date, end_date }) {
        this.tool_id = tool_id
        this.email_address = email_address
        this.name = name
        this.phone_number = phone_number
        this.start_date = start_date
        this.end_date = end_date
    }


static async create(data) {
    const { tool_id, email_address, name, phone_number, start_date, end_date } = data

    // Check if the tool exists
    const toolCheck = await db.query("SELECT tool_id FROM tool WHERE tool_id = $1", [tool_id])
    if (toolCheck.rows.length === 0) {
        throw new Error("Tool does not exist in the DB")
    }

    // Create a new borrower
    const newBorrower = await db.query("INSERT INTO borrower (email_address, name, phone_number) VALUES ($1, $2, $3) RETURNING borrower_id",
        [email_address, name, phone_number])
    const borrower_id = newBorrower.rows[0].borrower_id

    // Insert reservation into the database
    const response = await db.query("INSERT INTO lending (tool_id, borrower_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *;",
        [tool_id, borrower_id, start_date, end_date])

    return new Reservation(response.rows[0])
}
}

module.exports = Reservation