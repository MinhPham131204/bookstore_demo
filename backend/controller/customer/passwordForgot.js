const Customer = require("../../model/customer");

// app.use(methodOverride('_method'))

class Password{
  //[GET] /password/yourEmail
  async passwordForget(req,res){
    try{
      if(await Customer.findOne({
        where:{email:req.body.email}
      })){
        res.redirect('/password/changePassword') 
      }
      else{
        return res.json(404)({
          message: 'Không tìm thấy Email',
        }); 
      }
    }
    catch (err) {
      res.status(500).json("Server error");
    }
  }

  //[PUT] /password/changePassword
  async changePassword(req,res){
    try{
      const newPassword = req.body.confirmPassword
        if (newPassword == req.body.confirmPassword){
          await Customer.update(
            {
              hashPassword: newPassword,
            },
            {
              message: 'Thay đổi mật khẩu thành công',
            }  
          )
          res.redirect('/login')
        }
        else{
          return res.json(404)({
          message: 'New password incorrect',
        });
      }
    }

    catch (err) {
      res.status(500).json("Server error");
    }
  }
}
module.exports = new Password();