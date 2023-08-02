const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;

const ser = require("../../service/member/member_service");

const list = async(req, res)=> {
    const list = await ser.getList();
    console.log("ctrl list : ", list);
    res.render("member/list", {list});
}

const login = (req, res)=>{
    res.render("member/login");
}

const loginCheck = async(req, res) => {
    console.log(req.body);
    const msgPack = await ser.loginCheck(req.body);
    console.log("msgPack : ", msgPack);
    console.log("msgPack.result : ", msgPack.result);
    if (msgPack.result === 0){
        req.session.username = req.body.id;
    }
    res.send(msgPack.msg);
}

const registerForm = (req, res)=> {
    res.render("member/register_form");
}

const register = async (req, res)=> {
    console.log("register: ", req.body );
    let msg = await ser.insert( req.body );
    res.send(msg);
}

const memberView = async (req, res)=>{
    console.log("ctrl memView: ", req.params);
    const member = await ser.getMember(req.params);
    console.log("ctrl memView : ", member);
    res.render("member/view", {member});
}

const modifyForm = async (req, res)=> {
    console.log("ctrl modify : ", req.query);
    const member = await ser.getMember(req.query);
    console.log("ctrl modify : ", member);
    res.render("member/modify_form", {member});
}

const modify = async (req,res) =>{
    console.log("ctrl modify: ", req.body);
    const msg = await ser.modify(req.body);
    res.send(msg);
}

const deleteMember = async(req, res)=>{
    const msg = await ser.deleteMember(req.params);
    res.send(msg);
}

module.exports = { list, registerForm, register, memberView, login, loginCheck,
                 modifyForm, modify, deleteMember };