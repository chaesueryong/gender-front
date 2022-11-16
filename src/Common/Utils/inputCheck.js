// const onlyKorean = '/^[가-힣]+$/';
// const onlyNumber = '/^[0-9]*$/';
// const onlyEnglish = '/^[a-zA-Z]+$/';
// const koreanAndEnglish = '/^[가-힣a-zA-Z]+$/';

// 아이디: 5글자 이상 20자 미만, 영어 대소문자, 숫자 사용가능
const userId = /^[a-zA-Z0-9]{5,20}$/
// 비밀번호: 4글자 이상 12자 미만, 영어 대소문자, 숫자 사용가능
const userNickname = /^[a-zA-Z0-9가-힣]{4,12}$/
// 비밀번호: 4글자 이상 12자 미만, 영어 대소문자, 숫자 사용가능
const userPassword = /^[a-zA-Z0-9]{4,12}$/
// 공백 체크
const empty = /[\s]/

export default class InputCheck {
    static userId(user_id){
        try {
            if(user_id.length === 0) {
                throw '아이디를 입력해주세요';
            }

            if(this.userEmpty(user_id) === false){
                throw '공백이 입력됬습니다'
            }

            if(userId.test(user_id) === false){
                throw '아이디 확인해주세요'
            }

            return true;
        }catch (e){
            alert(e);
        }
    }

    static userNickname(user_nickname){
        try {
            if(user_nickname.length === 0) {
                throw '닉네임을 입력해주세요';
            }

            if(this.userEmpty(user_nickname) === false){
                throw '공백이 입력됬습니다'
            }

            if(userNickname.test(user_nickname) === false){
                throw '닉네임 확인해주세요'
            }

            return true;
        }catch (e){
            alert(e);
        }
    }

    static userPassword(user_password){
        try {
            if(user_password.length === 0) {
                throw '비밀번호를 입력해주세요';
            }

            if(this.userEmpty(user_password) === false){
                throw '공백이 입력됬습니다'
            }

            if(userPassword.test(user_password) === false){
                throw '비밀번호 확인해주세요'
            }

            return true;
        }catch (e){
            alert(e);
        }
    }

    static userRePassword(user_password, user_repassword){
        try {
            if(user_repassword.length === 0) {
                throw '비밀번호 확인을 입력해주세요';
            }

            if(this.userEmpty(user_repassword) === false){
                throw '공백이 입력됬습니다'
            }

            if(user_password !== user_repassword){
                throw '비밀번호가 다릅니다'
            }

            return true;
        }catch (e){
            alert(e);
        }
    }

    // 공백 체크
    static userEmpty(inputString){
        if(empty.test(inputString) === true){
            return false;
        }

        return true;
    }


}