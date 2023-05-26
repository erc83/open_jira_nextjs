import axios  from "axios";


const entriesApis = axios.create({
    baseURL: '/api'  // baseURL palabra reservada y como esta en el mismo servidor
})

export default entriesApis;
