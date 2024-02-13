const db = require('../database/connect');

class User {

    constructor({ staff_id, staff_username, staff_password, is_admin }) {
        this.staff_id = staff_id;
        this.staff_username = staff_username;
        this.staff_password = staff_password;
        this.isAdmin = is_admin;
    }

    static async getOneById(staff_id) {
        const response = await db.query("SELECT * FROM staff WHERE staff_id = $1", [staff_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(staff_username) {
        const response = await db.query("SELECT * FROM staff WHERE staff_username = $1", [staff_username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { staff_username, staff_password} = data;
        let response = await db.query("INSERT INTO staff (staff_username, staff_password) VALUES ($1, $2) RETURNING staff_id;",
            [staff_username, staff_password]);
        const newId = response.rows[0].staff_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;