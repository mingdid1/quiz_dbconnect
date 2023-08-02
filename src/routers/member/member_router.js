const router = require("express").Router();
const memberCtrl = require("../../controller/member/member_ctrl");

router.get("/", (req, res)=>{
    console.log("/member 연동");
    res.send("/member 연동");
});

router.get("/list", memberCtrl.list);

router.get("/login", memberCtrl.login);
router.post("/login_check", memberCtrl.loginCheck);

router.get("/register_form", memberCtrl.registerForm);
router.post("/register", memberCtrl.register);
router.get("/view/:id", memberCtrl.memberView);
router.get("/modify_form", memberCtrl.modifyForm);
router.post("/modify", memberCtrl.modify);
router.get("/delete/:id", memberCtrl.deleteMember);

module.exports = router;