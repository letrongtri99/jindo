/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/
    // '/getCoach': 'CoachesController.getCoach',
    // '/': 'CoachesController.getCoach',
    '/': 'HomeController.getData',
    '/gioi-thieu': {
        view: 'pages/about',
        locals: {
            layout: 'layouts/layout'
        }
    },
    "/hinh-anh-trung-tam": "MediaController.show",
    '/lien-he': {
        view: 'pages/contact',
        locals: {
            layout: 'layouts/layout'
        }
    },
    '/postRegister': 'RegisterController.getRegister',
    '/postContact': 'ContactController.getContact',
    '/getInitData': 'LayoutController.getLayoutData',
    '/getNewsData': 'ArticlesController.getNewsData',
    '/getVidsData': 'ArticlesController.getVidsData',
    'get /leu': 'AdminController.create',
    'get /admin': 'AdminController.viewlogin',
    '/tin-tong-hop': 'ArticlesController.getArticle',
    '/ky-thuat': 'ArticlesController.getArticleSkill',
    '/tin-tuc-clb': 'ArticlesController.getArticleCLB',
    '/tin-tong-hop/:pageNumber': {
        controller: 'ArticlesController',
        action: 'getArticle',
    },
    '/ky-thuat/:pageNumber': {
        controller: 'ArticlesController',
        action: 'getArticleSkill',
    },
    '/tin-tuc-clb/:pageNumber': {
        controller: 'ArticlesController',
        action: 'getArticleCLB',
    },
    'get /bai-viet-:slug': {
        controller: 'DetailController',
        action: 'articleDetail',
        skipAssets: true
    },
    '/dang-ky': 'DangkyController.getData',
    '/TESTING': { view: 'pages/TESTING' },
    '/tao-khoa-hoc': 'CoursesController.newCourses',
    '/chinh-khoa-hoc': 'CoursesController.editCourses',
    'get /hoc-vien-dang-ki': 'RegisterController.showInfo',
    '/them-hlv': 'CoachesController.new',
    'get /chinh-hlv': 'CoachesController.showTable',
    'get /getDataTableCoach': 'CoachesController.getDataTableCoach',
    'post /signInNow': 'AdminController.signInNow',
    'post /uploadImage': 'UploadController.upload',
    'post /createCoach': 'CoachesController.create',
    'get /getDetail/:id': 'CoachesController.detail',
    'post /editCoach/:id': 'CoachesController.edit',
    'get /deleteCoach/:id': 'CoachesController.delete',
    'get /getDataTableRegister': 'RegisterController.getDataTableRegister',
    'get /getDetailStudent/:id': 'RegisterController.detail',
    'get /getDetailContact/:id': 'ContactController.detail',
    'post /editRegister/:id': 'RegisterController.edit',
    'get /deleteRegister/:id': 'RegisterController.delete',
    'get /tin-tuc-bong-da': 'ArticlesController.new',
    'get /them-bai-viet': 'ArticlesController.newArticle',
    'post /createArticle': 'ArticlesController.create',
    'get /getDataTableArticles': 'ArticlesController.getDataTableArticles',
    'get /deleteArticle/:id': 'ArticlesController.delete',
    'get /editArticles': 'ArticlesController.editview',
    'get /getDetailArticle/:id': 'ArticlesController.detail',
    'post /chinh-sua-bai-viet/:id': 'ArticlesController.edit',
    'get /logout': 'AdminController.logout',
    'get /getDataTableCourses': 'CoursesController.getDataTableCourses',
    'post /createCourses': 'CoursesController.create',
    'get /getInfoCourses/:id': 'CoursesController.info',
    'post /editCourse/:id': 'CoursesController.edit',
    'get /getCourseData': 'CoursesController.getCoursesData',
    'get /chinhAnh': 'MediaController.images',
    '/deleteCourse/:id': 'CoursesController.delete',
    'get /getTableMedia': 'MediaController.getDataTableImages',
    'get /showAlbums': 'MediaController.detailalbum',
    'post /taoAnhAlbum': 'MediaController.createPic',
    '/deleteImgAlbum/:id/:album': 'MediaController.delete',
    'get /newAlbum': 'MediaController.new',
    'post /taoAlbumMoi': 'MediaController.newAlbum',
    'post /deleteAlbum/:slug': 'MediaController.deleteAlbum',
    'post /changeNameAlbum/:SLUG': 'MediaController.changeName',
    'get /chinhVideo': 'MediaController.video',
    'get /getDataTableVideo': 'MediaController.getDataTableVideo',
    'get /getDetailVideo/:id': 'MediaController.detailVideo',
    'post /editVideo/:id': 'MediaController.editVideo',
    'post /deleteVideo/:id': 'MediaController.deleteVideo',
    'post /createVideo': 'MediaController.createVideo',
    'post /editSlide/:id': 'SlideController.editSlide',
    'post /deleteSlide/:id': 'SlideController.deleteSlide',
    'post /createSlide': 'SlideController.createSlide',


    'get /thong-tin-lien-he': 'ContactController.showInfo',
    'get /getDataTableContact': 'ContactController.getDataTableContact',
    'get /deleteContact/:id': 'ContactController.delete',

    //Slide's part
    "/getSlidesData": 'SlideController.getSlides',
    '/slide': 'SlideController.showSlides',







    // Nam's part 
    //Client-part
    "/lich-hoc": "ScheduleController.getSchedule",
    // Admin-part
    'get /lich-hoc-admin': "ScheduleController.scheduleAdmin",
    'get /getSchedule': "ScheduleController.tableSchedule",
    'get /getScheduleAdminDetail/:id': "ScheduleController.scheduleAdminDetails",
    'post /editSchedules/:id': "ScheduleController.editSchedules",
    'get /deleteSchedules/:id': "ScheduleController.deleteSchedules",
    'get /them-lich-hoc': "ScheduleController.addSchedules",
    'post /createNewSchedules': "ScheduleController.createNewSchedules",
    // Admin of Configs
    'get /thong-tin-chung': "ConfigController.getConfigsAdmin",
    'post /editConfigs': 'ConfigController.editConfigs'
        // End Nam's part



    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/


};