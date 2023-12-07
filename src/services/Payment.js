import axios from "axios";
import { apis } from "../auth/api";

export const gerAllPayment = async () => {
  return await axios.get(`${apis.baseUrl}${apis.payment.gerAllPayment}`);
};
export const getDetails = async (id) => {
  return await axios.get(`${apis.baseUrl}${apis.payment.getDetails}/${id}`);
};
