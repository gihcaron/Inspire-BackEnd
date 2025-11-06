const pool = require("../config/databse.js");

const getFrase = async (categoria) => {
    let result;
    if (categoria) {
        result = await pool.query(
            `SELECT frases.*, usuarios.nome AS usuario_nome, 
            FROM frases
            LEFT JOIN usuarios ON frases.usuario_id = usuarios.id
            WHERE frases.categoria ILIKE $1`,
            [`%${categoria}%`]
        );
    } else {
        result = await pool.query(
            `SELECT frases.*, usuarios.nome AS usuario_nome, usuarios.email AS usuario_email
            FROM frases
            LEFT JOIN usuarios ON frases.usuario_id = usuarios.id`
        );
    }
    return result.rows;
};

const getFraseById = async (id) => {
    const result = await pool.query(`SELECT frases.*, usuarios.nome AS usuario_nome, 
        usuarios.email AS usuario_email 
        FROM frases 
        LEFT JOIN usuarios ON frases.usuario_id = usuarios.id 
        WHERE frases.id = $1`, 
        [id]
    );
    return result.rows[0];
};

const createFrase = async (frase, titulo, autor_frase, categoria, curtidas_count, usuario_id) => {
    const result = await pool.query(
        "INSERT INTO frases (frase, titulo, autor_frase, categoria, curtidas_count, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [frase, titulo, autor_frase, categoria, curtidas_count, usuario_id]
    );
    return result.rows[0];
};


const updateFrase = async (id, frase, titulo, autor_frase, categoria, curtidas_count, usuario_id) => {
    const result = await pool.query(
        "UPDATE frases SET frase = $1, titulo = $2, autor_frase = $3, categoria = $4, curtidas_count = $5, usuario_id = $6 WHERE id = $7 RETURNING *",
        [frase, titulo, autor_frase, categoria, curtidas_count, usuario_id, id]
    );
    return result.rows[0];
};

const deleteFrase = async (id) => { 
    const result = await pool.query("DELETE FROM frases WHERE id = $1 RETURNING *", [id]);
    return { message: `frase com ID ${id}, frase ${result.rows[0].frase} deletada com sucesso.` };
};

module.exports = { getFrase, getFraseById, createFrase, updateFrase, deleteFrase };