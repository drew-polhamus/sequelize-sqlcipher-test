import { DataTypes, Model, Sequelize } from 'sequelize';

interface TestUserAttributes {
  id: number;
  firstname: string;
  lastname: string;
}

export class TestUser extends Model implements TestUserAttributes {
  public static readonly TableName: string = 'TestUsers';
  id!: number;
  firstname!: string;
  lastname!: string;

  public static prepareInit(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.NUMBER,
          primaryKey: true
        },
        firstname: {
          type: DataTypes.STRING(50)
        },
        lastname: {
          type: DataTypes.STRING(50)
        }
      },
      {
        tableName: this.TableName,
        sequelize
      }
    );
  }
}
