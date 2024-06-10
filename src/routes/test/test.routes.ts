import express, { IRouter, NextFunction, Request, Response } from "express";
import axios from "axios";
import { envs } from "../../config/plugin/env-var";
import requestIp from 'request-ip';
import { addressIp, getGeoInfo } from "../../middleware/request-ip/request-ip.middleware"


const route: IRouter = express.Router();



// Función para obtener información de geolocalización desde ipdata.co


route.get('/test', async (req: Request, res: Response, next: NextFunction) => {
   try {
    const apiKey = envs.IPDATA_KEY;
    const geoInfo = await getGeoInfo(req, apiKey);

    res.json({
        ip: addressIp(req), // Espera a que getAddressIp() se resuelva
        geo: geoInfo || 'No se pudo determinar la ubicación de la IP'
    });
    next()

   } catch (error) {
    throw(error)
   }

});

export { route as testRoute };
