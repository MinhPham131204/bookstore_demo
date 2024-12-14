const Seller = require("../../model/seller");

class LoginController {

  // [POST] /createUser
  async register(req, res) {
    const existingUser=await Seller.findOne({email:req.body.email})

    if(existingUser){
      res.send.json({"message":"Email này đã đăng kí"})
    }

    const newUser = await Seller.create(req.body);

    res.cookie('userID', newUser.userID, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: true,
    })

    res.status(200).redirect('/seller/dashboard');
  }

  // [GET] /login
  getLoginPage(req, res) {
    res.render('login')
  }

  // [POST] /validateUser
  async userLogin(req, res) {
    try {
      const checkUser = await Seller.findOne({
        where: {
          username: req.body.email,
          hashPassword: req.body.hashPassword,
        }
      })

      if(checkUser){
        res.cookie('ID', checkUser.ID, {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          httpOnly: true,
          secure: true,
        })

        res.status(200).redirect('/seller/dashboard');
      } 

      else res.status(404).json({error: 'Tài khoản nhà bán không tồn tại'});
    }
    catch (err) {
      res.status(500).send('Server error')
    }
  }

}

module.exports = new LoginController()