import db from "../models/index.js";
const Article = db.Article;
const Op = db.Sequelize.Op;

export const postArticle = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const article = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  try {
    const { data } = await Article.create(article);
    res.send(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getArticles = async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  try {
    const data = await Article.findAll({ where: condition });
    res.send(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Article.findByPk(id);
    if (data) res.send(data);
    else
      res.status(404).json({
        message: `Cannot find Article with id=${id}.`,
      });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateArticle = async (req, res) => {
  console.log(req.body)
  const id = req.params.id;

  try {
    const num = await Article.update(req.body, {
      where: { id: id },
    });
    if (num == 1)
      res.status(201).json({
        message: "Article was updated successfully.",
      });
    else
      res.status(404).json({
        message: `Cannot update Article with id=${id}.`,
      });
  } catch (error) {
    res.status(500).json({
      message: "Error updating Article with id=" + id,
    });
  }
};

export const deleteArticle = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Article.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.status(204).json({
        message: "Article was deleted successfully!",
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Article with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Could not delete Article with id=" + id,
    });
  }
};
