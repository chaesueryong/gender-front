import Auth from "../api/Auth";
import User from "../api/User";
import router from "../router";

export default {
    namespaced: true,
    state: () => (
        {
            userJoinEmail: '',
            userAccessToken: '',
            userInfo: {
                user_email: "",
                user_gender: "",
                user_id: "",
                user_nickname: "",
                user_profile: null,
                userStatus: {
                    user_status_level: 0,
                    user_status_point: 0,
                    user_status_suspension: null,
                    user_status_withdrawal: false
                }
            }
        }
    ),
    getters: {},
    mutations: {
        setDefaultData(state) {
            state.userAccessToken = '';
            state.userInfo = {
                user_email: "",
                user_gender: "",
                user_id: "",
                user_nickname: "",
                user_profile: null,
                userStatus: {
                    user_status_level: 0,
                    user_status_point: 0,
                    user_status_suspension: null,
                    user_status_withdrawal: false
                }
            }
        },

        setUserJoinEmail(state, value) {
            state.userJoinEmail = value;
        },

        setUserInfo(state, value) {
            state.userInfo = value;
        },

        setAccessToken(state, value) {
            state.userAccessToken = value;
        }
    },
    actions: {
        persistLogin: async ({commit, dispatch}) => {
            try {
                const { user_accessToken } = await Auth.refreshToken();

                commit('setAccessToken', user_accessToken);

                if(user_accessToken !== ''){
                    dispatch('getUserInfo');
                }
            }catch (e){
                switch (e){
                    case 'no accessToken':
                        alert('no accessToken')
                        break;
                    default:
                        console.error(e);
                        break;
                }
            }
        },

        login: async ({commit, dispatch}, payload) => {
            try {
                const { user_accessToken } = await User.login(payload);

                commit('setAccessToken', user_accessToken);

                dispatch('getUserInfo');
            } catch (e) {
                console.log(e);
                alert(e);
            }
        },

        logout: async ({commit}) => {
            try {
                await User.logout();

                commit('setDefaultData');
            } catch (e) {
                console.log(e);
                alert(e);
            }
        },

        // eslint-disable-next-line no-unused-vars
        sendJoinEmail: async ({commit}, payload) => {
            try {
                const {token} = await Auth.generateJoinToken(`${payload.emailId}@${payload.emailHost}`);
                await Auth.sendJoinEmail(token);

                alert('이메일 확인 해주세요');
            } catch (e) {
                switch (e) {
                    case '입력하신 이메일 주소는 이미 사용중입니다':
                        alert(e);
                        break;
                    default:
                        console.log(e);
                        break;
                }
            }
        },

        // eslint-disable-next-line no-unused-vars
        join: async ({commit}, payload) => {
            try {
                const { user_email } = await Auth.verifyToken(payload.id);

                await User.join(
                    user_email,
                    payload.userId,
                    payload.userNickname,
                    payload.userPassword,
                    payload.userRePassword,
                    payload.userGender
                );

                await router.push('/');
            } catch (e) {
                console.error(e)
                alert(e)
            }
        },

        // eslint-disable-next-line no-unused-vars
        getUserInfo: async ({commit}) => {
            try {
                const {userInfo} = await User.getUserInfo();

                commit('setUserInfo', userInfo);
            } catch (e) {
                alert(e)
            }
        },
    },
}