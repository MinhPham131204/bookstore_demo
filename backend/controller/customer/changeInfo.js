const express = require('express');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const Customer = require("../../model/customer"); // Adjust path to your User model
const sequelize = require("../../database/configDB");
const methodOverride = require('method-override');

const app = express();
app.use(express.json());

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



// Endpoint for retrieving and updating personal information
app.put('/change-personal-info', async (req, res) => {

  try {
    // 1. Requesting the current personal information
    const customer = await Customer.findOne({
      where: { userID: req.body.userID }
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // 2. If information retrieval is successful, return current data
    res.status(200).json({
      message: 'Personal information retrieved successfully',
      currentInfo: {
        username: customer.username,
        email: customer.email,
        phoneNum: customer.phoneNum,
        userAddress: customer.userAddress,
      }
    });

    // 3. Allowing the user to change the information (updating)
    // Update the customer's information
    await Customer.update(req.body, { where: { userID: req.body.userID } });

    // 4. Returning success message after update
    res.status(200).json({
      message: 'Personal information updated successfully',
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

