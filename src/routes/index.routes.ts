import { IRouter, Router } from "express";
import {authRoute} from "../routes/auth/auth.routes"
import {protectedRouter} from "../routes/auth/protect.routes"
import { testRoute } from "./test/test.routes";
import { getGeoInfo } from "../middleware/request-ip/request-ip.middleware";

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

route.get("/ip", (req, res) => {
try {
  const ip = getGeoInfo(req)
  res.status(200).json(ip)
} catch (error) {
  res.status(401).json({msg: "error que se yo"})
}
})

export default route