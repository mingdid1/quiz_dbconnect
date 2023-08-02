const memberDAO = require("../../database/member/member_dao");

const getList = async() => {
    const result = await memberDAO.getList();
    console.log("ser getList: ", result);
    return result.rows;
}

const loginCheck = async(body) => {
    let result = await memberDAO.getMember(body.id);
    console.log("1: ", result);
    let msg = "", url = "", msgPack={};
    if (result.rows.length === 1){
        result = result.rows[0];
        console.log("2: ", result);
        if (result[1] == body.pwd){
            msg ="로그인 성공";
            url = "/";
            msgPack.result = 0;
        }else {
            msg = "비밀번호 실패";
            url = "/member/login";
        }
    }else {
        msg = "일치하는 회원이 없습니다";
        url = "/member/login";
    }
    msgPack.msg = getMessage(msg, url);
    return msgPack;
}

const insert = async (body) => {
    const result = await memberDAO.insert(body);
    console.log("ser insert : ", result);
    
    let msg = "", url = "";
    if(result == 0){
        msg= "문제 발생";
        url= "/member/register_form";
    }else {
        msg= "등록 성공";
        url= "/member/list";
    }
    const msgPack = getMessage(msg, url);
    return msgPack;
}

const getMessage = (msg, url)=> {
    return `<script>
            alert("${msg}");
            location.href="${url}";
            </script>`
}

const getMember = (mId)=> {
    console.log("ser getMem: ", memberDAO.getMember(mId));
    return memberDAO.getMember(mId);
}

const modify = async (body) => {
    const result = await memberDAO.modify(body);
    let msg="", url="";
    if (result == 0){
        msg= "문제 발생";
        url= "/member/modify_form?id=" + body.id;
    }else {
        msg= "수정 되었습니다";
        url= "/member/member_view/" + body.id;
    }
    return getMessage(msg, url);
}

const deleteMember = async(body)=>{
    const result = await memberDAO.deleteMember(body);
    let msg="", url="";
    if (result == 0){
        msg= "문제 발생";
        url= "/member/view/" + body.id;
    }else {
        msg= "삭제 되었습니다";
        url= "/member/list";
    }
    return getMessage(msg, url);
}

module.exports = { getList, insert, getMember, modify, deleteMember, loginCheck };