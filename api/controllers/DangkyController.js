/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getData: (req, res) => {
        let coaches_data;
        let articles_data;
        let configs_data;
        
        Coaches.find({isDeleted: 0})
            .then((coaches) => {
                coaches_data = coaches;
                return Articles.find( { where: { isDeleted: 0, category: 'Tin tức thể thao' },
                skip: 0,
                limit: 6,
                sort: 'createdAt DESC' });
            })
            .then((articles) => {
                articles_data = articles;
                return Configs.find({});
            })
            .then((configs) => {
                configs_data = configs[0];
                return res.view('pages/dangky', { layout: 'layouts/layout', articles: articles_data, coaches: coaches_data, configs: configs_data});                
            })
            
            .catch((err) => {
                console.log(err);
                return res.view('500');
            })
    },
    

};