const express = require('express');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const Customer = require("../../model/customer"); // Adjust path to your User model
const sequelize = require("../../database/configDB");
const methodOverride = require('method-override');

const app = express();

app.use(methodOverride('_method'))


class Info{
    //[GET] /Info/:id
  async showInfo(req,res){
    const customer = await Customer.findOne({where:{userID: req.body.userID}})
    if(customer){
      res.json({
        CurInfo:{
          username: customer.username,
          email: customer.email,
          phoneNum: customer.phoneNum,
          userAddress: customer.userAddress,
          province: customer.province,
        }
      });  
    }
    else {
      return res.json(404)({
        message: 'Customer not found',
      }); 
    }


  }

    //[PUT] /Info/:id/edit
  async changeInfo(req,res){
    const customer = await Customer.findOne({where:{userID: req.body.userID}})
    if (customer){
      res.json(await Customer.update(
        {
          username: req.body.username,
          email: req.body.email,
          phoneNum: req.body.phoneNum,
          userAddress: req.body.userAddress,
          province: req.body.province,
        },
        {
          where:{userID: customer.userID}
        }
        )
      )
    }
    else {
      return res.json(404)({
        message: 'Customer not found',
      }); 
    }
  }

  // [PUT] /Info/:id/changePassword
  async changePassword(req,res){
    const customer = await Customer.findOne({where:{userID: req.body.userID}})
    if(customer){
      if (await Customer.findOne({where:{hashPassword: req.body.hashPassword}})){
        const newPassword = req.body.hashPassword
        if (newPassword == req.body.hashPassword){
          res.json(await Customer.update(
            {
              hashPassword: newPassword,
            },
            {
              message: 'Password change succeeded',
            }  
          )
          )
        }
        else{
          return res.json(404)({
            message: 'New password incorrect',
          });
        }
      }
      else {
        return res.json(404)({
          message: 'Password incorrect',
        });
      }
    }
    else {
      return res.json(404)({
        message: 'Customer not found',
      }); 
    }
  }


}

module.exports = new changeInfoController();
    

