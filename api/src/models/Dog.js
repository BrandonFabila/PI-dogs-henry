const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING(500),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    weigth: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    life_pan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDB : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }},
  {
    timestamp: false,
  });
};
