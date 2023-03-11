import {
    getDepartments,
    getDevotionals,
    getMessages,
    getSeries,
    getUserMessages
} from './init'
import { getUser } from './profile';


const requests = [
    {
        func: getUser,
        message: "Getting Account Ready"
    },
    {
        func: getMessages,
        message: "Preparing Messages"
    },
    {
        func: getSeries,
        message: "Preparing Series"
    },
    {
        func: getDevotionals,
        message: "Fetching Devotionals"
    },
    {
        func: getUserMessages,
        message: "Setting Up Your Library"
    },
    {
        func: getDepartments,
        message: "Setting Up Your Library"
    }
];


export const fetchAll = async (counter = 0, user, dispatch) => {
    try {
        requests.forEach(req => req.func({
            "x-auth-token": user.token
        }, dispatch, user));
    } catch (err) {
        console.log(err);
    }
}

export const fetchData = async (counter = 0, setHint, user, setAppLoaded, dispatch) => {
    try {
        setHint(requests[counter].message);
        const res = await requests[counter].func({
            "x-auth-token": user.token
        }, dispatch, user);
        if (res.success) {
            if (counter < (requests.length - 1)) {
                fetchData(counter + 1, setHint, user, setAppLoaded, dispatch);
            } else {
                setTimeout(() => {
                    dispatch(setAppLoaded(true));
                }, 300)
            }
        }
    } catch (err) {
        console.log(err);
        setHint("Network error, retrying...");
        setTimeout(() => {
            fetchData(counter, setHint, user, setAppLoaded, dispatch);
        }, 3000)
    }
}