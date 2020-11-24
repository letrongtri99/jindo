const fs = require('fs');
const sharp = require('sharp');
var random_name = require('node-random-name');
module.exports = {
    upload: (req, res) => {
        if (req.query.name == 'avatar') {
            req.file('avatar').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/coachesavatar')
            }, function(err, uploadedFiles) {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: 'Upload failed'
                    })
                } else {
                    var random = random_name({ last: true });
                    const urlParts = uploadedFiles[0].fd.split(sails.config.local.symbol);
                    const picName = urlParts[urlParts.length - 1];
                    sharp(`assets/images/coachesavatar/${picName}`).resize(null, 300).toFile(`assets/images/coachesavatar/${random}_medium.jpg`, function(err) {
                        if (err) {
                            console.error('sharp>>>', err)
                        } else {
                            fs.renameSync(`assets/images/coachesavatar/${picName}`, `assets/images/coachesavatar/${random}_origin.jpg`);
                        }
                    })
                    const url = `/images/coachesavatar/${random}_medium.jpg`;
                    return res.json({
                        success: true,
                        url: url
                    })

                }
            })
        } else if (req.query.name == 'coverarticle') {
            req.file('cover').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/coverarticle')
            }, function(err, uploadedFiles) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Upload failed'
                    })
                } else {
                    var random = random_name({ last: true });
                    const urlParts = uploadedFiles[0].fd.split(sails.config.local.symbol);
                    const picName = urlParts[urlParts.length - 1];
                    sharp(`assets/images/coverarticle/${picName}`).resize(null, 225).toFile(`assets/images/coverarticle/${random}_medium.jpg`, function(err) {
                        if (err) {
                            console.error('sharp>>>', err)
                        } else {
                            fs.renameSync(`assets/images/coverarticle/${picName}`, `assets/images/coverarticle/${random}_origin.jpg`);
                        }
                    })
                    const url = `/images/coverarticle/${random}_medium.jpg`;
                    return res.json({
                        success: true,
                        url: url
                    })


                }
            })
        } else if (req.query.name == 'ckeditor') {
            const CKEditorFuncNum = req.query.CKEditorFuncNum;
            req.file('upload').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/contentarticles')
            }, function(err, uploadedFiles) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Upload failed'
                    })
                } else {
                    var random = random_name({ last: true });
                    const urlParts = uploadedFiles[0].fd.split(sails.config.local.symbol);
                    const picName = urlParts[urlParts.length - 1];
                    fs.renameSync(`assets/images/contentarticles/${picName}`, `assets/images/contentarticles/${random}_origin.jpg`);
                    const url = `/images/contentarticles/${random}_origin.jpg`
                    res.write("<script>window.parent.CKEDITOR.tools.callFunction(" + CKEditorFuncNum + ", \"" + url + "\");</script>");
                }
            })
        } else if (req.query.name == 'picturealbum') {
            req.file('picture').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/jindo_central_moment')
            }, function(err, uploadedFiles) {
                var url = [];
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Upload failed'
                    })
                } else {
                    for (var i = 0; i < uploadedFiles.length; i++) {
                        var random = random_name({ last: true });
                        const urlParts = uploadedFiles[i].fd.split(sails.config.local.symbol);
                        const picName = urlParts[urlParts.length - 1];
                        var filename = uploadedFiles[i].filename;
                        sharp(`assets/images/jindo_central_moment/${picName}`).resize(null, 190).toFile(`assets/images/jindo_central_moment/${random}_small.jpg`, function(err) {
                            if (err) {
                                console.log(err);
                            }
                        })
                        sharp(`assets/images/jindo_central_moment/${picName}`).resize(null, 380).toFile(`assets/images/jindo_central_moment/${random}_medium.jpg`, function(err) {
                            if (err) {
                                console.log(err);
                            }
                        })
                        sharp(`assets/images/jindo_central_moment/${picName}`).resize(null, 625).toFile(`assets/images/jindo_central_moment/${random}_large.jpg`, function(err) {
                            if (err) {
                                console.error('sharp>>>', err);
                            } else {
                                fs.renameSync(`assets/images/jindo_central_moment/${picName}`, `assets/images/jindo_central_moment/${random}_origin.jpg`);
                            }
                        })
                        url.push({
                            small: `/images/jindo_central_moment/${random}_small.jpg`,
                            medium: `/images/jindo_central_moment/${random}_medium.jpg`,
                            large: `/images/jindo_central_moment/${random}_large.jpg`
                        });
                    }
                    return res.json({
                        success: true,
                        url: url
                    })
                }

            })
        } else if (req.query.name == 'video') {
            req.file('clip').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/anhclip')
            }, function(err, uploadedFiles) {
                var url;
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: 'Upload failed'
                    })
                } else {
                    var random = random_name({ last: true });
                    const urlParts = uploadedFiles[0].fd.split(sails.config.local.symbol);
                    const picName = urlParts[urlParts.length - 1];
                    sharp(`assets/images/anhclip/${picName}`).resize(null, 190).toFile(`assets/images/anhclip/${random}_medium.jpg`, function(err) {
                        if (err) {
                            console.error('sharp>>>', err);
                        } else {
                            fs.renameSync(`assets/images/anhclip/${picName}`, `assets/images/anhclip/${random}_origin.jpg`);
                        }
                    })
                    const url = `/images/anhclip/${random}_medium.jpg`;

                    return res.json({
                        success: true,
                        url: url
                    })
                }

            })
        } else if (req.query.name == 'slide') {
            req.file('slide').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/slides')
            }, function(err, uploadedFiles) {
                var url;
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: 'Upload failed'
                    })
                } else {
                    var random = random_name({ last: true });
                    const urlParts = uploadedFiles[0].fd.split(sails.config.local.symbol);
                    const picName = urlParts[urlParts.length - 1];
                    sharp(`assets/images/slides/${picName}`).resize(null, 500).toFile(`assets/images/slides/${random}_medium.jpg`, function(err) {
                        if (err) {
                            console.error('sharp>>>', err)
                        } else {
                            fs.renameSync(`assets/images/slides/${picName}`, `assets/images/slides/${random}_origin.jpg`);
                        }
                    })
                    const url = `/images/slides/${random}_origin.jpg`;
                    return res.json({
                        success: true,
                        url: url
                    })
                }

            })
        }
    }
}