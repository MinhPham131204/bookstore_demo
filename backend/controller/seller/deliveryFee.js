const sequelize = require("../../database/configDB");

const DeliveryFee = require("../../model/deliveryFee");

class DeliveryController {

    async InnerCityFee() {
        return await DeliveryFee.findAll({
            where: {
                innerCityFlag: 1
            }
        })
    }

    async OuterCityFee() {
        return await DeliveryFee.findAll({
            where: {
                innerCityFlag: 0
            }
        })
    }

}

module.exports = new DeliveryController()