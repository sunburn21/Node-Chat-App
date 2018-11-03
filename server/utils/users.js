class Users {
    constructor() {
        this.users = []
    }
    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(doc => doc.id !== id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => (user.id === id))[0];
    }

    addUser(id, name, room) {
        this.users.push({ id, name, room })
    }

    getUsersList(room) {
        return this.users.filter((user) => (user.room === room)).map((user) => (user.name));
    }
}

module.exports.Users = Users;