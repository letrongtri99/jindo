/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
    '*': 'flash',
    AdminController: {
        viewlogin: ['isSignedIn', 'flash'],
        signInNow: ['isSignedIn', 'flash'],
        create: ['isAdmin', 'flash']
    },
    ArticlesController: {
        new: ['isAdmin', 'flash'],
        newArticle: ['isAdmin', 'flash'],
        create: ['isAdmin', 'flash'],
        getDataTableArticles: ['isAdmin', 'flash'],
        delete: ['isAdmin', 'flash'],
        editview: ['isAdmin', 'flash'],
        detail: ['isAdmin', 'flash'],
        edit: ['isAdmin', 'flash']
    },
    CoachesController: {
        showTable: ['isAdmin', 'flash'],
        new: ['isAdmin', 'flash'],
        create: ['isAdmin', 'flash'],
        getDataTableCoach: ['isAdmin', 'flash'],
        detail: ['isAdmin', 'flash'],
        edit: ['isAdmin', 'flash'],
        delete: ['isAdmin', 'flash']
    },
    RegisterController: {
        showInfo: ['isAdmin', 'flash'],
        getDataTableRegister: ['isAdmin', 'flash'],
        detail: ['isAdmin', 'flash'],
        edit: ['isAdmin', 'flash'],
        delete: ['isAdmin', 'flash']
    },
    ContactController: {
        getDataTableContact: ['isAdmin', 'flash'],
        detail: ['isAdmin', 'flash'],
        showInfo: ['isAdmin', 'flash'],
        delete: ['isAdmin', 'flash']
    },
    ConfigController: {
        getConfigsAdmin: ['isAdmin', 'flash'],
        editConfigs: ['isAdmin', 'flash']
    },
    CoursesController: {
        editCourses: ['isAdmin', 'flash'],
        getDataTableCourses: ['isAdmin', 'flash'],
        create: ['isAdmin', 'flash'],
        info: ['isAdmin', 'flash'],
        edit: ['isAdmin', 'flash'],
        delete: ['isAdmin', 'flash']
    },
    MediaController: {
        images: ['isAdmin', 'flash'],
        getDataTableImages: ['isAdmin', 'flash'],
        detailalbum: ['isAdmin', 'flash'],
        createPic: ['isAdmin', 'flash'],
        delete: ['isAdmin', 'flash'],
        new: ['isAdmin', 'flash'],
        newAlbum: ['isAdmin', 'flash'],
        deleteAlbum: ['isAdmin', 'flash'],
        changeName: ['isAdmin', 'flash'],
        video: ['isAdmin', 'flash'],
        getDataTableVideo: ['isAdmin', 'flash'],
        detailVideo: ['isAdmin', 'flash'],
        editVideo: ['isAdmin', 'flash'],
        deleteVideo: ['isAdmin', 'flash'],
        createVideo: ['isAdmin', 'flash']
    },
    UploadController: {
        upload: ['isAdmin', 'flash']
    },
    SlideController: {
        createSlide: ['isAdmin', 'flash'],
        deleteSlide: ['isAdmin', 'flash'],
        editSlide: ['isAdmin', 'flash'],
        showSlides: ['isAdmin', 'flash']
    },
    ScheduleController: {
        tableSchedule: ['isAdmin', 'flash'],
        scheduleAdminDetails: ['isAdmin', 'flash'],
        scheduleAdmin: ['isAdmin', 'flash'],
        editSchedules: ['isAdmin', 'flash'],
        deleteSchedules: ['isAdmin', 'flash'],
        addSchedules: ['isAdmin', 'flash'],
        createNewSchedules: ['isAdmin', 'flash']
    }


    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions, unless overridden.       *
     * (`true` allows public access)                                            *
     *                                                                          *
     ***************************************************************************/

    // '*': true,

};