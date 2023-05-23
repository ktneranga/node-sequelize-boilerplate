'use strict';
import {Model, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize'
module.exports = (sequelize:any, DataTypes:any) => {
  class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number;
    title!:string;
    status!:string;
    static associate(models:any) {
      // define association here
      Project.belongsToMany(models.User, {
        through: 'ProjectAssignments'
      })
    }
  }
  Project.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};