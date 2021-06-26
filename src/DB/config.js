const sqlite3 = require("sqlite3")
const { open } = require("sqlite")

module.exports = () => {
    //abre conexão com BD
    return open({
        //caminho bd
        filename: './src/DB/rocketq.sqlite',
        driver: sqlite3.Database
    })
}