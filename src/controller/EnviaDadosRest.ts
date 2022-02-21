import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const legado = axios.create({
  baseURL: process.env.HOST_REMOTO,
});

export default legado;