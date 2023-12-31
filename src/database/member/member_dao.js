const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;

const getList = async() =>{
    oracledb.outFormat = oracledb.OBJECT;
    let con = await oracledb.getConnection(dbConfig);
    let result = await con.execute("select * from member");
    await con.close();
    console.log("dao getList: ", result);
    return result;
}

const insert = async(body) =>{
    let con = await oracledb.getConnection(dbConfig);
    const sql = `insert into member(m_id, m_pwd, m_name, m_addr)
                values(:id, :pwd, :name, :addr)`;
    let result = 0;
    try{
        result = await con.execute(sql, body);
        console.log("dao insert: ", result);
    }catch(err){
        console.log(err);
    }
    return result;
}

const getMember = async(mId) => {
    let con = await oracledb.getConnection(dbConfig);
    console.log(mId);
    const sql = `select * from member where m_id='${mId}'`;
    let member;
    try {
        member = await con.execute(sql);
        console.log("dao getmember : ", member);
    } catch (err) {
        console.log(err);
    }
    return member;
}

const modify = async (body)=> {
    const sql = `update member set pwd='${body.pwd}',
                name='${body.name}', addr='${body.addr}'
                where id='${body.id}'`;
    let con = await oracledb.getConnection(dbConfig);
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err){
        console.log(err);
    }
    return result;
}

const deleteMember = async(body)=> {
    const sql= "delete from member where m_id=:id";
    
    let con = await oracledb.getConnection(dbConfig);
    let result = 0;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err);
    }
    return result;
}

module.exports = { getList , insert, getMember, modify, deleteMember };