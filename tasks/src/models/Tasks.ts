import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Tasks = sequelize.define('tasks', {
   id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
   },
   title: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   authorId: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   assignedUserId: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
   },
   status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
   },
   priority: {
      type: DataTypes.STRING,
      defaultValue: 'medium',
   },
   createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
   },
   updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
   },
}, { timestamps: true });

console.log('The table for the User model was just (re)created!');

 
export default Tasks;