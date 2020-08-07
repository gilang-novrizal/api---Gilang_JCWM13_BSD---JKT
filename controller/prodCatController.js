const database = require("../database");
const { asyncQuery } = require("../helper/queryHelp");

module.exports = {
  getProdCat: async (req, res) => {
    try {
      const query = `SELECT pk.id, pk.produk_id, p.nama_produk, k.kategori FROM produk p
              JOIN pro_kat pk ON p.id = pk.produk_id
              JOIN kategori k on pk.kategori_id = k.id`;
      const result = await asyncQuery(query);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getProdCatById: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const query = `SELECT pk.id, pk.produk_id, p.nama_produk, k.kategori FROM produk p
              JOIN pro_kat pk ON p.id = pk.produk_id
              JOIN kategori k on pk.kategori_id = k.id
              WHERE pk.produk_id = ${Id}`;
      const result = await asyncQuery(query);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addProdCat: async (req, res) => {
    const { produk_id, kategori_id } = req.body;
    try {
      const getCategoryId = `WITH RECURSIVE category_path (id, kategori, parent_id) AS(
        SELECT id, kategori, parent_id
        FROM kategori
        WHERE id =${kategori_id}
        UNION ALL
        SELECT k.id, k.kategori, k.parent_id
          FROM category_path AS cp JOIN kategori AS k
          ON cp.parent_id = k.id
      )
      SELECT id FROM category_path
      ORDER BY id`;

      const categoryId = await asyncQuery(getCategoryId);

      // insert
      let value = "";
      categoryId.forEach((item) => (value += `(${produk_id}, ${item.id}),`));
      const insertQuery = `INSERT INTO pro_kat (produk_id, kategori_id)
      VALUES ${value.slice(0, -1)}`;
      const result = await asyncQuery(insertQuery);

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  deleteProductCategory: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const checkId = `SELECT * FROM pro_kat WHERE produk_id = ${Id}`;
      const resultId = await asyncQuery(checkId);
      if (resultId.length === 0) {
        return res
          .status(400)
          .send(`Product category with id : ${Id} not found`);
      }
      const deletePC = `DELETE FROM pro_kat WHERE produk_id = ${Id}`;
      const result = await asyncQuery(deletePC);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  editProdCat: async (req, res) => {
    const Id = parseInt(req.params.id);
    const { kategori_id } = req.body;
    try {
      const checkId = `SELECT * FROM pro_kat WHERE produk_id = ${Id}`;
      const resultId = await asyncQuery(checkId);
      if (resultId.length === 0) {
        return res
          .status(400)
          .send(`Product category with id : ${Id} not found`);
      }
      const deletePC = `DELETE FROM pro_kat WHERE produk_id = ${Id}`;
      const resultdel = await asyncQuery(deletePC);

      const getCategoryId = `WITH RECURSIVE category_path (id, kategori, parent_id) AS(
            SELECT id, kategori, parent_id
            FROM kategori
            WHERE id =${kategori_id}
            UNION ALL
            SELECT k.id, k.kategori, k.parent_id
              FROM category_path AS cp JOIN kategori AS k
              ON cp.parent_id = k.id
          )
          SELECT id FROM category_path
          ORDER BY id`;

      const categoryId = await asyncQuery(getCategoryId);

      // insert
      let value = "";
      categoryId.forEach((item) => (value += `(${Id}, ${item.id}),`));
      const insertQuery = `INSERT INTO pro_kat (produk_id, kategori_id)
          VALUES ${value.slice(0, -1)}`;
      const result = await asyncQuery(insertQuery);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
