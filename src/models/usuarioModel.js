const pool = require("../config/databse.js");

const getUsuario = async (nome) => {
    if (nome) {
    result = await pool.query(
            "SELECT * FROM usuarios WHERE nome ILIKE $1",
            [`%${nome}%`]
        );
        return result.rows;
    }
    else {
    result = await pool.query("SELECT * FROM usuarios");
    }
    return result.rows;
};

const getUsuarioById = async (id) => {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    return result.rows[0];
};

const createUsuario = async ( nome, email, senha) => {
    const result = await pool.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
        [nome, email, senha]
    );
    return result.rows[0];
};


const updateUsuario = async (id, nome, email, senha) => {
    const result = await pool.query(
        "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *", 
        [nome, email, senha, id] 
    );
    return result.rows[0];
};

const deleteUsuario = async (id) => { 
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
    return { message: `usuario com ID ${id}, nome ${result.rows[0].nome} deletada com sucesso.` };
}
module.exports = { getUsuario, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };