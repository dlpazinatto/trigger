import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

//console.log('Host: '+process.env.HOST_REMOTO);

const legado = axios.create({
  baseURL: process.env.HOST_REMOTO,
});

export default legado;