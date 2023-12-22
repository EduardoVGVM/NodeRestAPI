import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({message:`${error.message} - falha ao listar livros`})
        }
    }

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroPorId = await livro.findById(id);
            res.status(200).json(livroPorId);
        } catch (error) {
            res.status(500).json({message:`${error.message} - falha ao listar livro`})
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}}
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({message:"Criado com sucesso!", livro:livroCriado});
        } catch (error) {
            res.status(500).json({message:`${error.message} - falha ao cadastrar livro`})
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message:"Livro atualizado!"});
        } catch (error) {
            res.status(500).json({message:`${error.message} - falha ao atualizar livro`})
        }
    }

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message:"Livro excluído!"});
        } catch (error) {
            res.status(500).json({message:`${error.message} - falha ao excluír livro`})
        }
    }
    
    static async listarPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({editora: editora})
            res.status(200).json(livrosPorEditora);
        } catch (error) {
            res.status(500).json({message:`${error.message} - falha ao buscar livro`})
        }
    }
};

export default LivroController;
