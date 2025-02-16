import User from './User.js';
import Category from './Category.js';
import Expense from './Expense.js';
import Income from './Income.js';

User.hasMany(Category, { foreignKey: 'User_id' });
User.hasMany(Expense, { foreignKey: 'User_id' });
User.hasMany(Income, { foreignKey: 'User_id' });

Category.belongsTo(User, { foreignKey: 'User_id' });
Category.hasMany(Expense, { foreignKey: 'Category_id' });
Category.hasMany(Income, { foreignKey: 'Category_id' });

Expense.belongsTo(User, { foreignKey: 'User_id' });
Expense.belongsTo(Category, { foreignKey: 'Category_id' });

Income.belongsTo(User, { foreignKey: 'User_id' });
Income.belongsTo(Category, { foreignKey: 'Category_id' });

export {
  User,
  Category,
  Expense,
  Income
}; 
