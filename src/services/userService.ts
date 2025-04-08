import { Db, ObjectId } from 'mongodb';
import { User } from '../models/User';

/**
 * @class UserService
 * @classdesc Provides services for CRUD operations on the user collection using MongoDB native driver.
 */
export class UserService {
  /**
   * Fetches all users from the database.
   * @param {Db} db - The database instance.
   * @returns {Promise<User[]>} A promise that resolves to a list of users.
   */
  async getAllUsers(db: Db): Promise<User[]> {
    return await db.collection<User>('users').find().toArray();
  }

  /**
   * Fetches a single user by ID.
   * @param {Db} db - The database instance.
   * @param {string} id - The ID of the user.
   * @returns {Promise<User | null>} A promise that resolves to the user or null.
   */
  async getUserById(db: Db, id: string): Promise<User | null> {
    const objectId = new ObjectId(id);
    const user = await db.collection<User>('users').findOne({ _id: objectId as unknown as any });
    return user ? { _id: user._id.toString(), name: user.name, email: user.email } : null;
  }

  /**
   * Creates a new user in the database.
   * @param {Db} db - The database instance.
   * @param {User} user - The user to be created.
   * @returns {Promise<User>} The created user with assigned ID.
   */
  async createUser(db: Db, user: User): Promise<User> {
    const result = await db.collection<User>('users').insertOne(user);
    return { _id: result.insertedId.toString(), ...user };
  }

  /**
   * Updates a user by ID with given data.
   * @param {Db} db - The database instance.
   * @param {string} id - The ID of the user.
   * @param {Partial<User>} updates - Data to update.
   * @returns {Promise<User | null>} The updated user.
   */
  async updateUser(db: Db, id: string, updates: Partial<User>): Promise<User | null> {
    const objectId = new ObjectId(id);
    const result = await db.collection<User>('users').findOneAndUpdate(
      { _id: objectId as unknown as any },
      { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result.value) return null;
    const { _id, name, email } = result.value;
    return { _id: _id.toString(), name, email };
  }

  /**
   * Deletes a user by ID.
   * @param {Db} db - The database instance.
   * @param {string} id - The ID of the user to delete.
   */
  async deleteUser(db: Db, id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await db.collection<User>('users').deleteOne({ _id: objectId as unknown as any });
  }
}