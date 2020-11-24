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
var detailsalbum = angular.module('JindoFB', []);
$(document).ready(function() {
    $('#media').addClass('active').parent().parent('li').addClass('active');
});
detailsalbum.controller('infoalbum', ['$scope', '$http', function detailsalbum($scope, $http) {
    $scope.album = {
        alert: '',
        name: ''
    }
    var imagefilelist = [];
    $scope.uploadImage = () => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        imagefilelist.push(imageFile);
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.album.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                angular.element("input[type='file']").val(null);
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.album.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                angular.element("input[type='file']").val(null);
            })
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = ((data) => {
                imageSrc = data.currentTarget.result;
                $scope.$apply(() => {
                    $scope.album.alert = '';
                })
                $($.parseHTML("<div>")).css('background-image', 'url(' + imageSrc + ')').appendTo("div.preview-images");
            });
        }


    }
    $scope.uploadAlbum = () => {
        if (imagefilelist.length == 0) {
            toastr["error"]('Vui lòng nhập ảnh bất kỳ vào!');
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('ten');
            const formData = new FormData();
            for (var i = 0; i < imagefilelist.length; i++) {
                formData.append("picture", imagefilelist[i]);
            }
            var req = {
                method: 'POST',
                withCredentials: true,
                url: '/uploadImage?name=picturealbum',
                headers: {
                    "Content-Type": undefined
                },
                data: formData
            }
            $http(req).then((res) => {
                if (res.data.success) {
                    postImages(res.data.url);
                } else {
                    toastr["error"](res.data.message);
                }
            }, (res) => {
                toastr["error"](res.statusText);
            }).catch((e) => {
                toastr["error"](e);
            })
            postImages = (u) => {
                function requestNext() {
                    if (u.length) {
                        var rawData = u.shift();
                        console.log(rawData);
                        // var data = rawData.split('\t');
                        // console.log(data);
                        $http.post('/taoAnhAlbum', {
                            path: rawData.small,
                            large: rawData.large,
                            small: rawData.small,
                            medium: rawData.medium,
                            slug: myParam
                        }).then((res1) => {
                            if (res1.data.success && u.length == 0) {
                                toastr["success"](res1.data.message);
                                setTimeout(function() {
                                    window.location.reload();
                                }, 1000);
                            }
                        }, (res2) => {
                            toastr["error"](res1.statusText);
                        }).catch((e) => {
                            toastr["error"](e);
                        })
                        setTimeout(function() { requestNext() }, 1000);
                        //     });
                    }
                }
                requestNext();
            }
        }
    }
    $scope.deleteImg = (_id) => {
        var choice = confirm('Bạn có muốn xóa ảnh này? ');
        if (choice) {
            const urlParams = new URLSearchParams(window.location.search);
            const Param = urlParams.get('ten');
            $http.get(`/deleteImgAlbum/${_id}/${Param}`).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    console.log(res1.data.count);
                    if (res1.data.count == 0) {
                        setTimeout(function() {
                            window.location.assign('/chinhAnh');
                        }, 1000);
                    } else {
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    }
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
    $scope.createAlbum = () => {
        if (imagefilelist.length == 0) {
            toastr["error"]('Vui lòng nhập ảnh bất kỳ vào!');
        } else {
            const formData = new FormData();
            for (var i = 0; i < imagefilelist.length; i++) {
                formData.append("picture", imagefilelist[i]);
            }
            var req = {
                method: 'POST',
                withCredentials: true,
                url: '/uploadImage?name=picturealbum',
                headers: {
                    "Content-Type": undefined
                },
                data: formData
            }
            $http(req).then((res) => {
                if (res.data.success) {
                    postImages(res.data.url);
                } else {
                    toastr["error"](res.data.message);
                }
            }, (res) => {
                toastr["error"](res.statusText);
            }).catch((e) => {
                toastr["error"](e);
            })
            postImages = (u) => {
                function requestNext() {
                    if (u.length) {
                        var rawData = u.shift();
                        $http.post('/taoAlbumMoi', {
                            path: rawData.small,
                            large: rawData.large,
                            small: rawData.small,
                            medium: rawData.medium,
                            album: $scope.album.name
                        }).then((res1) => {
                            if (res1.data.success && u.length == 0) {
                                toastr["success"](res1.data.message);
                                setTimeout(function() {
                                    window.location.assign('/chinhAnh');
                                }, 1000);
                            }
                        }, (res2) => {
                            toastr["error"](res1.statusText);
                        }).catch((e) => {
                            toastr["error"](e);
                        })
                        setTimeout(function() { requestNext() }, 1000);
                        //     });
                    }
                }
                requestNext();
            }
        }
    }
    $scope.changeName = () => {
        console.log($('#namealbum').val());
        const urlParams = new URLSearchParams(window.location.search);
        const Param = urlParams.get('ten');
        $http.post(`/changeNameAlbum/${Param}`, {
            album: $('#namealbum').val()
        }).then((res1) => {
            if (res1.data.success) {
                toastr["success"](res1.data.message);
                console.log(res1.data);
                setTimeout(function() {
                    window.location.assign(`/showAlbums?ten=${res1.data.slug}`);
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

}])