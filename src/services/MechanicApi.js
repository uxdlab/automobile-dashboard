import axios from "axios";
import { apis } from "../auth/api";

export const addMechanic = async (data) => {
  return await axios.post(`${apis.baseUrl}${apis.mechanic.addMechanic}`, data);
};

export const getAllMechanic = async () => {
  return await axios.get(`${apis.baseUrl}${apis.mechanic.getAllMechanic}`);
};
export const getMechanicId = async (id) => {
  return await axios.get(`${apis.baseUrl}${apis.mechanic.getMechanicId}/${id}`);
};
export const updateMechanic = async (id, data) => {
  return await axios.put(
    `${apis.baseUrl}${apis.mechanic.updateMechanic}/${id}`,
    data
  );
};

export const isActive = async (id) => {
  return await axios.get(`${apis.baseUrl}${apis.mechanic.isActive}/${id}`);
};
export const deleteMechanic = async (id) => {
  return await axios.delete(
    `${apis.baseUrl}${apis.mechanic.deleteMechanic}/${id}`
  );
};
