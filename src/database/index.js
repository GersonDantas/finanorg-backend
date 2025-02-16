import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const dbConfig = config.development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('🎉 Conexão com o banco estabelecida com sucesso!');
    await sequelize.sync({ alter: true });
    console.log('🎉 Modelos sincronizados com o banco de dados!');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco:', error);
  }
}

testConnection();

export default sequelize;
