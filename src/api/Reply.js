import axios from "axios";
import store from "../store/index";

export default class ReplyApi {

    static router = 'reply';

    static async getReplyList(number){
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

    static async writeReply(number, comment, reply_depth, parent_reply_id, prev_reply_id){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                board_number: number,
                reply_content: comment,
                reply_depth: reply_depth,
                parent_reply_id: parent_reply_id,
                prev_reply_id: prev_reply_id
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

    static async deleteReply(number){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                reply_number: number
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

    static async updateReply(number, comment){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}`,
            method: 'put',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                reply_number: number,
                reply_content: comment
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

    static async evaluateReply(reply_number, evaluateType){
        const result = await axios({
            url:`${process.env.VUE_APP_SERVER_URL}/${this.router}/evaluate`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${store.state.userStore.userAccessToken}`
            },
            data: {
                reply_number: reply_number,
                evaluateType: evaluateType
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