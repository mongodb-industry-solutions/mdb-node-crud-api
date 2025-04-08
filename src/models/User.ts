/**
 * @typedef {Object} User
 * @property {string} _id - MongoDB unique identifier
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 */

export type User = {
  _id?: string;
  name: string;
  email: string;
};