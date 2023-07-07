import axios from "axios";
import { apis } from "../auth/api";

export const gerAllPayment = async () => {
  return await axios.get(`${apis.baseUrl}${apis.payment.gerAllPayment}`);
};
