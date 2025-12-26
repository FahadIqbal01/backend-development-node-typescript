import { Router } from "express";
import {
  GetAllUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/users.controller";

const UserRouter: Router = Router();

UserRouter.get("/users", GetAllUsers);
UserRouter.get("/users/:id", GetUser);
UserRouter.post("/users", CreateUser);
UserRouter.put("/users/:id", UpdateUser);
UserRouter.delete("/users/:id", DeleteUser);

export default UserRouter;
