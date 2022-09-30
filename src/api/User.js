import axios from "axios";
import store from "../store";

export default class User {
    static router = 'user';

    static async getUserInfo(){
        const result = await axios({
            url: `${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'get',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
        })

        switch (result.data.status){
            case 'success':
                return result.data.data;
            case 'error':
                throw result.data.data;
            default:
                break;
        }
    }

    static async login({user_id, user_password}){
        const result = await axios({
            url: `${process.env.VUE_APP_SERVER_URL}/${this.router}/login`,
            method: 'post',
            data: {
                user_id,
                user_password
            },
            withCredentials: true
        })

        switch (result.data.status){
            case 'success':
                return result.data.data;
            case 'error':
                throw result.data.data;
            default:
                break;
        }
    }

    static async logout(){
        const result = await axios({
            url: `${process.env.VUE_APP_SERVER_URL}/${this.router}/logout`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {},
            withCredentials: true
        })

        switch (result.data.status){
            case 'success':
                return result.data.data;
            case 'error':
                throw result.data.data;
            default:
                break;
        }
    }

    static async join(user_email, user_id, user_nickname, user_password, user_repassword, user_gender) {
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/join`,
            method: 'post',
            data: {
                user_email, user_id, user_nickname, user_password, user_repassword, user_gender
            }
        })

        switch (result.data.status){
            case 'success':
                return result.data.data;
            case 'error':
                throw result.data.data;
            default:
                break;
        }
    }
}