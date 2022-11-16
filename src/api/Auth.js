import axios from "axios";

export default class Auth {
    static router = 'auth';

    static async refreshToken(){
        const result = await axios({
            url: `${process.env.VUE_APP_SERVER_URL}/${this.router}/refreshtoken`,
            method: 'post',
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

    static async generateToken(obj = {}, type) {
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/generatetoken`,
            method: 'post',
            data: {
                obj: obj,
                type: type
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

    static async generateJoinToken(email) {
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/generatetoken`,
            method: 'post',
            data: {
                obj: {
                    user_email: email
                },
                type: 'join'
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

    static async verifyToken(token) {
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/verifytoken`,
            method: 'post',
            data: {
                token
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

    static async sendJoinEmail(token) {
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/joinemail`,
            method: 'post',
            data: {
                token
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