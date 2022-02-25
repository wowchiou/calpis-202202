import axios from 'axios';
import qs from 'qs';

export const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

export const getTime = async () => {
  const res = await axiosInstance.get('actions/getTime.php');
  return res.data;
};

export const getAwardsData = async () => {
  const res = await axiosInstance.get('actions/getAwardsData.php');
  return res.data;
};

export const getUserData = async (data) => {
  const res = await axiosInstance.post(
    'actions/getUserData.php',
    qs.stringify(data)
  );
  return res.data;
};

export const postAddUser = async (data) => {
  const res = await axiosInstance.post(
    'actions/addUser.php',
    qs.stringify(data)
  );
  return res.data;
};

export const postAddSerial = async (data) => {
  const res = await axiosInstance.post(
    'actions/addSerial.php',
    qs.stringify(data)
  );
  return res.data;
};

export const postAddExchange = async (data) => {
  const res = await axiosInstance.post(
    'actions/addExchange.php',
    qs.stringify(data)
  );
  return res.data;
};
