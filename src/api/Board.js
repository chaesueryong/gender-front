import axios from "axios";
import store from "../store/index";

export default class BoardApi {

    static router = 'board';

    static async saveBoard(type, title, html){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                board_type: type,
                board_title: title,
                board_contents: html
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

    static async deleteBoard(number){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                board_number: number
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

    static async getBoard(number){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'get',
            params: {
                board_number: number
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

    static async getBoardList(board_type, page){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/list`,
            method: 'get',
            params: {
                board_type: board_type,
                page: page
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

    static async updateBoard(number, title, html){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'put',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                board_number: number,
                board_title: title,
                board_contents: html
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

    static async evaluateBoard(board_number, evaluateType){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/evaluate`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                board_number: board_number,
                evaluateType: evaluateType,
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