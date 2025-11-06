const fraseModel = require("../models/fraseModel.js");

const getFrases = async (req, res) => {
  try {
    const { categoria } = req.query;
    const frases = await fraseModel.getFrase(categoria);
    res.json(frases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar frases." });
  }
};

const getFraseById = async (req, res) => {
  try {
    const frase = await fraseModel.getFraseById(req.params.id);
    if (!frase) {
      return res.status(404).json({ message: "frase não encontrada." });
    }
    res.json(frase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar frase." });
  }
};

const createFrase = async (req, res) => {
  try {
    const {
      frase,
      titulo,
      autor_frase,
      categoria,
      curtidas_count,
      usuario_id,
    } = req.body;

    const newFrase = await fraseModel.createFrase(
      frase,
      titulo,
      autor_frase,
      categoria,
      curtidas_count,
      usuario_id
    );
    res.status(201).json(newFrase);
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Frase já cadastrada." });
    }
    res.status(500).json({ message: "Erro ao criar frase." });
  }
};

const updateFrase = async (req, res) => {
    try {
      const { frase, titulo, autor_frase, categoria, curtidas_count, usuario_id } = req.body;
  
      const fraseAtualizada = await fraseModel.updateFrase(
        req.params.id,
        frase,
        titulo,
        autor_frase,
        categoria,
        curtidas_count,
        usuario_id
      );
  
      if (!fraseAtualizada) {
        return res.status(404).json({ message: "Frase não encontrada." });
      }
  
      res.json(fraseAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar frase." });
    }
  };


const deleteFrase = async (req, res) => {
  try {
    const message = await fraseModel.deleteFrase(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Frase não encontrada." });
    }
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao deletar frase." });
  }
};

module.exports = {
  getFrases,
  getFraseById,
  createFrase,
  updateFrase,
  deleteFrase,
};
