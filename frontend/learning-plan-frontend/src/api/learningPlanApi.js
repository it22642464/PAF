import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/plans'; // Your backend URL

export const createPlan = (plan) => axios.post(BASE_URL, plan);

export const getPlansByUser = (userId) => axios.get(`${BASE_URL}/user/${userId}`);

export const updatePlan = (id, plan) => axios.put(`${BASE_URL}/${id}`, plan);

export const deletePlan = (id) => axios.delete(`${BASE_URL}/${id}`);
