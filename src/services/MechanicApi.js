import axios from "axios";
import { apis } from "../auth/api";

export const addMechanic = async (data) => {
  try{
    
    return await axios.post(`${apis.baseUrl}${apis.mechanic.addMechanic}`, data);
  }catch(error){
    return error
  }
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
export const updatePassword = async (id, data) => {
  return await axios.post(
    `${apis.baseUrl}${apis.mechanic.passwordChange}${id}`,
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
export const createPoint = async (data) => {
  return await axios.post(
    `${apis.baseUrl}${apis.point.add}`,data
  );
};
export const allPoint = async () => {
  return await axios.get(
    `${apis.baseUrl}${apis.point.getAll}`
  );
};
export const resetPoint = async (id) => {
  return await axios.get(`${apis.baseUrl}${apis.mechanic.resetPoint}/${id}`);
};