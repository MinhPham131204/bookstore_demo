const Customer = require("../../model/customer"); // Adjust path to your User model

// app.use(methodOverride("_method"));

class Info {
  //[GET] /info
  async showInfo(req, res) {
    try {
      const info = await Customer.findOne({
        where: { userID: req.cookies.userID }, // sửa lại theo userID được lưu trong csdl
      });

      res.status(200).json(info);
    } 
    catch (err) {
      res.status(500).json("Server error");
    }
  }

  //[PUT] /info/edit
  async changeInfo(req, res) {
    try {
      await Customer.update(req.body, {
        where: {
          userID: req.cookies.userID,
        },
      });
    } 
    catch (err) {
      res.status(500).json("Server error");
    }
  }

  //[GET] /info/change-password-form
  async passwordUI(req, res) {
    try {
      res.render('') // render changing password form
    } 
    catch (err) {
      res.status(500).json("Server error");
    }
  }

  // [PUT] /info/confirm-change-password
  async changePassword(req, res) {
    try{
      const user = await Customer.findAll({
        attributes: ["hashPassword"],
        where: { hashPassword: req.body.hashPassword },
      });
      if (user.length) {
        const newPassword = req.body.newPassword;

        const confirmPassword = req.body.confirmPassword;
        if (newPassword == confirmPassword) {
          await Customer.update(
            {
              hashPassword: newPassword,
            },
            {
              where: {
                userID: req.cookies.userID,
              },
            }
          );

          res.status(200).json({message: "Thay đổi mật khẩu thành công"})
        } 
        else {
          return res.json(404)({
            message: "Nhập lại mật khẩu không đúng",
          });
        }
      } 
      else {
        return res.json(404)({
          message: "Mật khẩu người dùng không chính xác",
        });
      }
    }
    catch(err) {
      res.status(500).json("Server error");
    }
  }
}

module.exports = new Info();
