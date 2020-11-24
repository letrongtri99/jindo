toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var slide = angular.module('JindoFB', []);
var arrSlide = [];
$(document).ready(function() {
    var url = window.location;
    var element = $('ul.navbar-nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).parent().addClass('active');
    if (element.is('li')) {
        element.addClass('active').parent().parent('li').addClass('active')
    }
});
slide.controller('slidesCtrl', ['$scope', '$http', '$timeout', function layoutData($scope, $http, $timeout) {
    $scope.slides = {
        id: '',
        title: '',
        description: '',
        short_description: '',
        image: '',
        position: '',
        url: '',
        alert: '',
        imageFile: '',
        button: '',
        button_url: '',
        slides: [],
        myVar: false
    }
    $scope.initSlidesData = () => {
        $http.get('/getSlidesData')
            .then((res) => {


                for (let i = 0; i < res.data.slides.length; i++) {
                    arrSlide.push({
                        title: res.data.slides[i].title,
                        description: res.data.slides[i].description,
                        short_description: res.data.slides[i].short_description,
                        image: res.data.slides[i].image,
                        url: res.data.slides[i].url,
                        position: res.data.slides[i].position,
                        button: res.data.slides[i].button,
                        button_url: res.data.slides[i].button_url,
                        id: res.data.slides[i].id,
                    })
                }
                $scope.slides = arrSlide;


            })
            .catch((err) => {
                console.log(err);
            })
    }
    let slideId;
    $scope.passId = (_id) => {
        slideId = _id;
    }
    $scope.uploadImage = (event, id) => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.slides.forEach((element) => {
                    if (element.id == slideId) {
                        element.url = 't';
                        element.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                        element.imageFile = '';
                        angular.element("input[type='file']").val(null);
                    }
                })
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.slides.forEach((element) => {
                    if (element.id == slideId) {
                        element.url = 't';
                        element.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                        element.imageFile = '';
                        angular.element("input[type='file']").val(null);
                    }
                })
            })
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = ((data) => {
                imageSrc = data.currentTarget.result;
                $scope.$apply(() => {
                    $scope.slides.forEach((element) => {
                        if (element.id == slideId) {
                            element.alert = '';
                            element.url = imageSrc;
                            element.imageFile = imageFile;
                        }
                    })

                })
            });
        }



    }
    $scope.update = (ID) => {
        $scope.slides.forEach((element) => {
            if (element.id == ID) {
                if (element.url != 't' && !element.imageFile) {
                    if (!element.title || !element.description || !element.short_description || !element.image || !element.position || !element.button || !element.button_url) {
                        toastr["error"]('Chưa nhập đủ thông tin cần thiết');
                    } else {
                        $http.post(`/editSlide/${ID}`, {
                            title: element.title,
                            description: element.description,
                            short_description: element.short_description,
                            image: element.image,
                            position: element.position,
                            url: element.url,
                            button: element.button,
                            button_url: element.button_url,
                        }).then((res1) => {
                            if (res1.data.success) {
                                toastr["success"](res1.data.message);
                            } else {
                                toastr["error"](res1.data.message);
                            }
                        }, (res2) => {
                            toastr["error"](res2.statusText);
                        }).catch((e) => {
                            toastr["error"](e);
                        })
                    }
                } else {
                    if (!element.title || !element.description || !element.short_description || !element.image || !element.imageFile || !element.position || !element.button || !element.button_url) {
                        toastr["error"]('Chưa nhập đủ thông tin cần thiết');
                    } else {
                        const formData = new FormData();
                        formData.append("slide", element.imageFile);
                        var req = {
                            method: 'POST',
                            withCredentials: true,
                            url: '/uploadImage?name=slide',
                            headers: {
                                "Content-Type": undefined
                            },
                            data: formData
                        }
                        $http(req).then((res) => {
                            if (res.data.success) {
                                const url = res.data.url;
                                return $http.post(`/editSlide/${ID}`, {
                                    title: element.title,
                                    description: element.description,
                                    short_description: element.short_description,
                                    image: element.image,
                                    position: element.position,
                                    url: url,
                                    button_url: element.button_url,
                                    button: element.button,
                                })
                            } else {
                                toastr["error"](res.data.message);
                            }
                        }, (res) => {
                            toastr["error"](res.statusText);
                        }).then((response) => {
                            if (response.data.success) {
                                toastr["success"](response.data.message);
                            } else {
                                toastr["error"](response.data.message);
                            }
                        }, (respone2) => {
                            toastr["error"](respone2.statusText);
                        }).catch((e) => {
                            console.log(e);
                        })
                    }
                }
            }
        })
    }
    $scope.delete = (_id) => {
        var choice = confirm('Bạn có muốn xóa slide này? ');
        if (choice) {
            $http.post(`/deleteSlide/${_id}`).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    toastr["error"](res1.data.message);
                }
            }, (res2) => {
                toastr["error"](res2.statusText);
            }).catch((e) => {
                toastr["error"](e);
            })
        }
    }
    var m = 0;
    $scope.moreslide = () => {
        m++;
        if (m == 1) {
            $scope.slides.myVar = true;
        }
        setTimeout(function() {
            $('html,body').animate({
                    scrollTop: $("#newslide").offset().top
                },
                'slow');
        }, 500);
    }
    $scope.uploadImageNew = () => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.slides.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                $scope.slides.url = 't';
                $scope.slides.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.slides.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                $scope.slides.url = 't';
                $scope.slides.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = ((data) => {
                imageSrc = data.currentTarget.result;
                $scope.$apply(() => {
                    $scope.slides.alert = '';
                    $scope.slides.url = imageSrc;
                    $scope.slides.imageFile = imageFile;
                })
            });
        }


    }
    $scope.more = () => {
        if (!$scope.slides.title || !$scope.slides.description || !$scope.slides.short_description || !$scope.slides.image || !$scope.slides.imageFile || !$scope.slides.position || !$scope.slides.button || !$scope.slides.button_url) {
            toastr["error"]('Chưa nhập đủ thông tin cần thiết');
        } else {
            const formData = new FormData();
            formData.append("slide", $scope.slides.imageFile);
            var req = {
                method: 'POST',
                withCredentials: true,
                url: '/uploadImage?name=slide',
                headers: {
                    "Content-Type": undefined
                },
                data: formData
            }
            $http(req).then((res) => {
                if (res.data.success) {
                    const url = res.data.url;
                    return $http.post('/createSlide', {
                        title: $scope.slides.title,
                        description: $scope.slides.description,
                        short_description: $scope.slides.short_description,
                        image: $scope.slides.image,
                        position: $scope.slides.position,
                        url: url,
                        button_url: $scope.slides.button_url,
                        button: $scope.slides.button,
                    })
                } else {
                    toastr["error"](res.data.message);
                }
            }, (res) => {
                toastr["error"](res.statusText);
            }).then((response) => {
                if (response.data.success) {
                    toastr["success"](response.data.message);
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    toastr["error"](response.data.message);
                }
            }, (respone2) => {
                toastr["error"](respone2.statusText);
            }).catch((e) => {
                console.log(e);
            })
        }
    }
}])