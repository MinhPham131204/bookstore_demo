const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require("../../database/configDB");
const Customer = require("../../model/customer");
const methodOverride = require('method-override');

const app = express();
app.use(methodOverride('_method'))

class password{
  //[GET] /password/:id
  async passwordForget(req,res){
  
    if(await Customer.findOne({
      where:{email:req.body.email}
    })){
      res.redirect('/password/changePassword')
    }
    else{
      return res.json(404)({
        message: 'Customer not found',
      }); 
    }
  }
  //[PUT] /password/changePassword
  async changePassword(req,res){
    const newPassword = req.body.hashPassword
    if (newPassword == req.body.hashPassword){
      res.json(await Customer.update(
        {
          hashPassword: newPassword,
        },
        {
          message: 'Password change succeeded',
        }  
        ))
      }
      else{
        return res.json(404)({
        message: 'New password incorrect',
      });
    }
  }
}
module.exports = new Password();