import { updateDepartment, updateUserDepartment } from "../Features/Departments";
import { updateDevotionals } from "../Features/Devotionals";
import { updateMessages } from "../Features/Messages";
import { updateSeries } from "../Features/Series";
import { updateUserMessages } from "../Features/UserMessages";

const { makeGetRequest } = require("../Config");

export const getMessages = async (headers = {}, dispatch) => {
    try {
        const res = await makeGetRequest("content/messages", headers);
        dispatch(updateMessages(res.messages));
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}

export const getUserMessages = async (headers = {}, dispatch, user) => {
    try {
        const res = await makeGetRequest(`content/messages/user/${user._id}`, headers);
        dispatch(updateUserMessages(res.messages));
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}

export const getSeries = async (headers = {}, dispatch) => {
    try {
        const res = await makeGetRequest("content/series", headers);
        const series = {};
        res.series.forEach((s, i) => {
            series[s._id] = res.series[i]
        })
        dispatch(updateSeries(series));
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}

export const getDevotionals = async (headers = {}, dispatch) => {
    try {
        const res = await makeGetRequest("content/devotionals", headers);
        dispatch(updateDevotionals(res.devotionals));
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}

export const getDepartments = async (headers = {}, dispatch) => {
    try {
        const res = await makeGetRequest("content/departments", headers);
        const depts = {};
        res.departments.forEach((d, i) => {
            depts[d._id] = res.departments[i]
        })
        dispatch(updateDepartment(depts));
        return res;
    } catch (err) {
        throw (new Error("Network error"));
    }
}



