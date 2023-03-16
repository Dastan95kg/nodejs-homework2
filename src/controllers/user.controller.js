import { UserService } from "../services/user.service.js";

export class UserController {
  static async createUser(req, res, next) {
    const data = req.body;

    try {
      const user = await UserService.createUser(data);

      res.setHeader("Location", `${req.baseUrl}/${user.id}`);
      res.status(201).send(user);
    } catch (error) {
      return next(error);
    }
  }

  static async getUsersList(req, res, next) {
    const { loginSubstring = "", limit = 10 } = req.query;

    try {
      const list = await UserService.getUsersList(loginSubstring, limit);

      res.send(list);
    } catch (error) {
      return next(error);
    }
  }

  static async getUserById(req, res, next) {
    const id = req.params.id;

    try {
      const user = await UserService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: "User does not exist" });
      } else {
        res.send(user);
      }
    } catch (error) {
      return next(error);
    }
  }

  static async updateUserById(req, res, next) {
    const id = req.params.id;
    const data = req.body;

    try {
      const user = await UserService.updateUserById(id, data);

      if (!user) {
        res.status(404).json({ error: "User does not exist" });
      } else {
        res.send(user);
      }
    } catch (error) {
      return next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    const id = req.params.id;

    try {
      const deleted = await UserService.deleteUserById(id);

      if (!deleted) {
        res.status(404).json({ error: "User does not exist" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      return next(error);
    }
  }
}
