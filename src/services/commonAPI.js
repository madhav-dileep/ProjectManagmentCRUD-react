import axios from "axios";

const commonAPI = async (methodData, urlData, dataBody) => {
    const reqConfig = {
        method: methodData,
        url: urlData,
        data: dataBody
    }
    return await axios(reqConfig).then(response=>response).catch((error)=>error)
}

export default commonAPI