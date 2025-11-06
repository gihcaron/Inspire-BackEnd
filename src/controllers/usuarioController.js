const usuarioModel = require('../models/usuarioModel');

const getusuarios = async (req, res) => {
    try {
        const { nome } = req.query;
        const usuarios = await usuarioModel.getUsuario(nome);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuarios." });
    }
};

const getusuarioById = async (req, res) => {
    try {
        const usuario = await usuarioModel.getUsuarioById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "usuario não encontrada." });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuario." });
    }
};

const createUsuario = async (req, res) => {
    try {
        const {nome, email, senha } = req.body;
        const newUsuario = await usuarioModel.createUsuario( nome, email, senha);
        res.status(201).json(newUsuario);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") { 
            return res.status(400).json({ message: "usuario já cadastrada." });

        }
        res.status(500).json({ message: "Erro ao criar usuario." });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const updatedUsuario = await usuarioModel.updateUsuario(req.params.id, nome, email, senha);
        if (!updatedUsuario) {
            return res.status(404).json({ message: "usuario não encontrado." });
        }
        res.json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuario." });
    }
}

const  deleteUsuario = async (req, res) => {
    try {
        const message = await usuarioModel.deleteUsuario(req.params.id);
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao deletar usuario." });
    }
};

module.exports = { getusuarios, getusuarioById, createUsuario, updateUsuario, deleteUsuario };