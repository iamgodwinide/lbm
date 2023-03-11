import { updateUserDepartment } from "../Features/Departments";
import { updateUser } from "../Features/User";

const { makePostRequest, makeGetRequest } = require("../Config");



export const getUser = async (headers = {}, dispatch, user) => {
    try {
        const res = await makeGetRequest(`users/get-user-by-id/${user._id}`, headers);
        if (res.success) {
            dispatch(updateUser(res.user));
        }
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}

export const updateProfilePic = async (data, headers = {}, dispatch) => {
    try {
        const res = await makePostRequest("users/update-profile-picture", data, headers);
        if (res.success) {
            dispatch(updateUser(res.user));
        }
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}

export const updateProfile = async (data, headers = {}, dispatch) => {
    try {
        const res = await makePostRequest("users/update-profile", data, headers);
        if (res.success) {
            dispatch(updateUser(res.user));
            dispatch(updateUserDepartment(res.departments))
        }
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}

export const buyToken = async (data, headers = {}, dispatch) => {
    try {
        const res = await makePostRequest("users/buy-token", data, headers);
        console.log(res);
        if (res.success) {
            dispatch(updateUser(res.user));
        }
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}
