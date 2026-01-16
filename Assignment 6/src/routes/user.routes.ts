import Router from "express";
import {
  GetAllUsers,
  GetUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
} from "../controllers/user.controller";
import { CheckJWT } from "../middlewares/checkJWT";
import { AuthorizeRole } from "../middlewares/authorizeRoles";

const userRouter = Router();

userRouter.get("/users/", CheckJWT, AuthorizeRole(["admin"]), GetAllUsers);
userRouter.get("/users/:id", CheckJWT, AuthorizeRole(["admin"]), GetUserById);

userRouter.post("/auth/register", CreateUser);
userRouter.post("/auth/login", LoginUser);

userRouter.put("/users/:id", CheckJWT, AuthorizeRole(["admin"]), UpdateUser);

userRouter.delete("/users/:id", CheckJWT, AuthorizeRole(["admin"]), DeleteUser);

export default userRouter;
