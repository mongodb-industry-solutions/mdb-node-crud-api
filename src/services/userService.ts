import { Db, ObjectId } from 'mongodb';
import { User } from '../models/User';

/**
 * @class UserService
 * @classdesc Provides services to manage user operations.
 */
export class UserService {
  /**
   * Retrieve all users from the database
   * @param {Db} db 
   * @returns {Promise<User[]>}
   */
  async getAllUsers(db: Db): Promise<User[]> {
    return await db.collection<User>('users').find().toArray();
  }

  /**
   * Insert a new user into the database
   * @param {Db} db 
   * @param {User} user 
   * @returns {Promise<User>}
   */
  async createUser(db: Db, user: User): Promise<User> {
    const result = await db.collection<User>('users').insertOne(user);
    return { _id: result.insertedId.toString(), ...user };
  }

  /**
   * Update an existing user
   * @param {Db} db 
   * @param {string} id 
   * @param {Partial<User>} updates 
   * @returns {Promise<User | null>}
   */
  async updateUser(db: Db, id: string, updates: Partial<User>): Promise<User | null> {
    const objectId = new ObjectId(id);
    const result = await db.collection<User>('users').findOneAndUpdate(
      { _id: objectId as unknown as any },
      { $set: updates },
      { returnDocument: 'after' }
    );
    if (!result.value) return null;
    return { _id: result.value._id.toString(), name: result.value.name, email: result.value.email };
  }

  /**
   * Delete a user by ID
   * @param {Db} db 
   * @param {string} id 
   */
  async deleteUser(db: Db, id: string): Promise<void> {
    const objectId = new ObjectId(id);
    await db.collection<User>('users').deleteOne({ _id: objectId as unknown as any });
  }
}