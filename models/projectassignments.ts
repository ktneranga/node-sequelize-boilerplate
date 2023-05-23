'use strict';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class ProjectAssignments extends Model<InferAttributes<ProjectAssignments>, InferCreationAttributes<ProjectAssignments>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    ProjectId!:number;
    UserId!:string
    static associate(models:any) {
      // define association here
    }
  }
  ProjectAssignments.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'Projects'
        },
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProjectAssignments',
  });
  return ProjectAssignments;
};