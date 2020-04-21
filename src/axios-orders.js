import Axios from "axios";


const instance= Axios.create({
    baseURL:'https://react-my-burger-41860.firebaseio.com/'
})

export default instance