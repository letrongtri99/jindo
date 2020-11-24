/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getLayoutData: (req, res) => {
    Configs.findOne({ id: 1 })
      .then(data => {
        res.json({
          info: data
        });
      })
      .catch(err => {
        console.log(err);
        return res.view("500");
      });
  }
};
