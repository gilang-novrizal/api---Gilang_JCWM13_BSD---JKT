const database = require("../database");
const { asyncQuery, generateQuery } = require("../helper/queryHelp");

module.exports = {
  getProduct: async (req, res) => {
    const { sort, order } = req.query;
    try {
      let query = "";

      if (sort) {
        query += `SELECT p.id, p.nama_produk, p.deskripsi, p.harga, p.stok, p.id, GROUP_CONCAT(DISTINCT kategori ORDER BY kategori_id) AS kategori FROM produk p
                  JOIN pro_kat pk ON p.id = pk.produk_id
                  JOIN kategori k ON pk.kategori_id = k.id
                  GROUP BY p.nama_produk
                  ORDER BY ${sort} ${order};`;
      } else {
        query += `SELECT p.id, p.nama_produk, p.deskripsi, p.harga, p.stok, p.id, GROUP_CONCAT(DISTINCT kategori ORDER BY kategori_id) AS kategori FROM produk p
            JOIN pro_kat pk ON p.id = pk.produk_id
            JOIN kategori k ON pk.kategori_id = k.id
            GROUP BY p.nama_produk
            ORDER BY p.id;`;
      }

      const result = await asyncQuery(query);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getProductByQuery: async (req, res) => {
    try {
      let query = "";
      for (let key in req.query) {
        query += `${key} = ${database.escape(req.query[key])} AND `;
      }
      const getProduct = `SELECT p.id, p.nama_produk, p.deskripsi, p.harga, p.stok, p.id, GROUP_CONCAT(DISTINCT kategori ORDER BY kategori_id) AS kategori FROM produk p
      JOIN pro_kat pk ON p.id = pk.produk_id
      JOIN kategori k ON pk.kategori_id = k.id
      GROUP BY p.nama_produk
      ORDER BY p.id
      WHERE ${query.slice(0, -4)};`;

      const result = await asyncQuery(getProduct);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getProductById: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const query = `SELECT p.id, p.nama_produk, p.deskripsi, p.harga, p.stok, p.id, GROUP_CONCAT(DISTINCT kategori ORDER BY kategori_id) AS kategori FROM produk p
        JOIN pro_kat pk ON p.id = pk.produk_id
        JOIN kategori k ON pk.kategori_id = k.id
        GROUP BY p.nama_produk
        ORDER BY p.id
        WHERE p.id = ${Id};`;
      const result = await asyncQuery(query);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getProductPage: async (req, res) => {
    const { limit, page } = req.params;
    try {
      const query = `SELECT p.id, p.nama_produk, p.deskripsi, p.harga, p.stok, p.id, GROUP_CONCAT(DISTINCT kategori ORDER BY kategori_id) AS kategori FROM produk p
        JOIN pro_kat pk ON p.id = pk.produk_id
        JOIN kategori k ON pk.kategori_id = k.id
        GROUP BY p.nama_produk
        ORDER BY p.id
       LIMIT ${limit} OFFSET ${(page - 1) * limit};`;
      const result = await asyncQuery(query);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addProduct: async (req, res) => {
    const { nama_produk, deskripsi, harga, stok } = req.body;
    try {
      const checkProduct = `SELECT * FROM produk WHERE nama_produk = ${database.escape(
        nama_produk
      )}`;
      const resProduct = await asyncQuery(checkProduct);
      if (resProduct.length > 0) {
        return res.status(400).send(`Product already registered`);
      }

      const addProduct = `INSERT INTO produk (nama_produk, deskripsi, harga, stok) VALUES(${database.escape(
        nama_produk
      )}, ${database.escape(deskripsi)}, ${database.escape(
        harga
      )}, ${database.escape(stok)})`;
      const result = await asyncQuery(addProduct);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  editProduct: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const check = `SELECT * FROM produk WHERE id = ${Id}`;
      const checkResult = await asyncQuery(check);
      if (checkResult.length === 0) {
        return res.status(400).send(`Product with id : ${Id} not found.`);
      }

      const edit = `UPDATE produk SET ${generateQuery(
        req.body
      )} WHERE id = ${Id}`;
      const result = await asyncQuery(edit);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteProduct: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const checkId = `SELECT * FROM produk where id = ${Id}`;
      const checkResult = await asyncQuery(checkId);
      if (checkResult.length === 0) {
        return res.status(400).send(`Product with id : ${Id} not found.`);
      }
      const del = `DELETE FROM produk where id = ${Id}`;
      const result = await asyncQuery(del);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
