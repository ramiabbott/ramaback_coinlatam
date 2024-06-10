import { IRouter, Router } from "express";
import {authRoute} from "../routes/auth/auth.routes"
import {protectedRouter} from "../routes/auth/protect.routes"
import { testRoute } from "./test/test.routes";

const route:IRouter = Router()
  route.use(authRoute)
  route.use(protectedRouter)
  route.use(testRoute)

 route.get("/", authRoute) 
 route.get("/", protectedRouter)
 route.get("/", testRoute)

route.get('/', (req, res) => {
    res.send(`
      <h1>Login</h1>
      <a href=/auth/google>Login with Google</a>
    `);
  });
  

export default route