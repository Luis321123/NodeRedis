import UserModel from '../models/users';
import {UserZodSchema} from '../schemas/userZodSchema'; 
import {IUser} from '../interfaces/iUsers';

export class UserService {
  async getUsers(page: number = 1, limit: number = 10) {
      const skip = (page - 1) * limit;
      return UserModel.find().skip(skip).limit(limit);
  }

  async getUserByEmail(email: string) {
      return UserModel.findOne({ email });
  }

  async getUserById(id: string) {
      return UserModel.findById(id);
  }

  async createUser(values: IUser) {
      const validatedData = UserZodSchema.parse(values);

      return new UserModel(validatedData).save().then((user) => user.toObject());
  }

  async deleteUserById(id: string) {
      return UserModel.findOneAndDelete({ _id: id });
  }

  async getUserByCity(ciudad: string) {
      return UserModel.find({ 'direccion.ciudad': { $regex: new RegExp(`^${ciudad}$`, 'i') } });
  }

  async updateUserById(id: string, values: IUser) {
      const validatedData = UserZodSchema.parse(values);

      return UserModel.findByIdAndUpdate(id, validatedData, { new: true });
  }
}