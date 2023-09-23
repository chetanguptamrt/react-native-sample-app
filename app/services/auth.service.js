import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthHeader = async () => {
    const token = await AsyncStorage.getItem('token')
    return {
        'headers': {
            'AUTHORIZATION': `BEARER ${token}`
        }
    }
}

const isLogin = async () => {
    const token = await AsyncStorage.getItem('token')
    return !!token;
}

const getSessionData = async () => {
    return JSON.parse(await AsyncStorage.getItem('session'))
}


module.exports = {
    isLogin,
    getAuthHeader,
    getSessionData,
}