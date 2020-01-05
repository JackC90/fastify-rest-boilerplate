import { Model } from 'objection';

export class User extends Model {
  readonly id!: number;
  username!: string;
  email!: string;
  password!: string;
  isActive!: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  static get tableName() {
    return 'users';
  }
}
