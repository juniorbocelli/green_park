import { Sequelize } from 'sequelize';
import { dbConfig } from '../settings/dbConfig';

class ConnectionFactory {
  private connectionURI = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
  private static connection: ConnectionFactory;
  private db: Sequelize;

  private constructor() {
    this.db = new Sequelize('green_park', 'postgres', 'test1234', {host: 'localhost', dialect: 'postgres'});
  };

  public static getConnection(): ConnectionFactory {
    if (!ConnectionFactory.connection)
      ConnectionFactory.connection = new ConnectionFactory();

    return ConnectionFactory.connection;
  };

  private attemptConnect() {
    this.db = new Sequelize(this.connectionURI);
  };

  // TODO: Test conection here
  public getDb() {
    if (!this.db)
      this.attemptConnect();

    return this.db;
  };
}

const connection = ConnectionFactory.getConnection();
export default connection.getDb();