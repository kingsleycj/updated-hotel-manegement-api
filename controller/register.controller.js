const usersDB = {
    users: require("../models/users.json"),
    setUsers:  function (data) { this.users = data }
};

const fsPromises = require("fs").promises;
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { guest, pwd } = req.body;
    if (!guest || !pwd ) return res.status(400).json({ 'message': 'Username and Password are required' }) ;
    //check for duplicate usernames in the db
    const duplicate= usersDB.users.find(person => person.username === guest);
    if (duplicate) return res.sendStatus(409); //conflict
    try{
        // encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10)
        // storing a new user 
        const newUser = {
            "username": guest, 
            "roles": { "guest" : 1234 },
            "password": hashedPwd
        };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(_dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users)
        res.status(201).json({ 'success': `New user ${guest} created! ` })
    } catch (err) {
        res.status(500).json({ 'message': err.message  })
    }
}
