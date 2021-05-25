import { join } from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { TestUser } from './models/test.model';

export class Database {
  private readonly source: Sequelize;

  constructor() {
    this.source = new Sequelize({
      dialect: 'sqlite',
      storage: join(__dirname, '..', 'test.sqlite'),
      dialectModulePath: '@journeyapps/sqlcipher',
      logging: false,
      define: {
        freezeTableName: true
      }
    });
    this.source.sync();
    TestUser.prepareInit(this.source);
    TestUser.sync();
  }

  open(): void {
    this.source.query('PRAGMA cipher_compatibility = 4');
    this.source.query(`PRAGMA key = 'testKey'`);
  }

  async generateTest(): Promise<void> {
    await TestUser.create({
      id: 12345,
      firstname: 'John',
      lastname: 'Doe'
    });
  }
}
