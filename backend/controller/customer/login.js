const Customer = require("../../model/customer");

class LoginController {

  // [POST] /createUser
  async register(req, res) {
    const existingUser=await Customer.findOne({email:req.body.email})

    if(existingUser){
      res.send.json({"message":"Email này đã đăng kí"})
    }

    const newUser = await Customer.create(req.body);

    res.cookie('userID', newUser.userID, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: true,
    })

    res.status(200).redirect('/main-page');
  }

  // [GET] /login
  getLoginPage(req, res) {
    res.render('login')
  }

  // [POST] /validateUser
  async userLogin(req, res) {
    try {
      const checkUser = await Customer.findOne({
        where: {
          email: req.body.email,
          hashPassword: req.body.hashPassword,
        }
      })

      if(checkUser){
        res.cookie('userID', checkUser.userID, {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          httpOnly: true,
          secure: true,
        })

        res.status(200).redirect('/main-page');
      } 

      else res.status(404).json({error: 'Thông tin người dùng không tồn tại'});
    }
    catch (err) {
      res.status(500).json('Server error')
    }
  }

  // [GET] /logout
  async logout(req,res){
    try {
      res.cookie('userID',{
          maxAge: 0,
          httpOnly: true,
      })
      res.status(200).redirect('/login')
    } 
    catch (error) {
        console.log(error);
    }
  }

}

module.exports = new LoginController()