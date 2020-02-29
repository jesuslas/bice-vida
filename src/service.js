const { apiBaseUrl } = require("../config");
const fetch = require("node-fetch");
const datos = require("../assets/datos.json");
console.log("apiBaseUrl", apiBaseUrl);
module.exports.getDatos = async function getDatos() {
  return await fetch(`${apiBaseUrl}`);
  // return datos;
};
