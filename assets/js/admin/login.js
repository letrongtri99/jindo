var adminlogin = angular.module('boss', []);
adminlogin.controller('loginadmin', ['$scope', '$http', '$timeout', function loginadmin($scope, $http, $timeout) {
    $timeout(function() {
        $scope.User = {
            username: '',
            password: '',
            show: 'Đăng Nhập',
            send: (keyEvent) => {
                if (keyEvent.which === 13) {
                    data = { username: $scope.User.username, password: $scope.User.password };
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "100",
                        "timeOut": "2000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (!data.username || !data.password) {
                        toastr["error"]("Không Đủ Thông Tin Cá Nhân");
                    } else {
                        $http.post('/signInNow', data).then((res) => {
                            const detail = res.data;
                            if (!detail.success) {
                                toastr["error"](detail.message);
                            } else {
                                toastr["success"](detail.message);
                                setTimeout(function() {
                                    window.location.assign('/hoc-vien-dang-ki');
                                }, 800);
                            }
                        }, (res) => {
                            console.log(res.statusText);
                        }).catch((e) => {
                            console.log(e);
                        })
                    }
                }
            },
            sendMouse:()=>{
                data = { username: $scope.User.username, password: $scope.User.password };
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "100",
                        "timeOut": "2000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (!data.username || !data.password) {
                        toastr["error"]("Không Đủ Thông Tin Cá Nhân");
                    } else {
                        $http.post('/signInNow', data).then((res) => {
                            const detail = res.data;
                            if (!detail.success) {
                                toastr["error"](detail.message);
                            } else {
                                toastr["success"](detail.message);
                                setTimeout(function() {
                                    window.location.assign('/hoc-vien-dang-ki');
                                }, 800);
                            }
                        }, (res) => {
                            console.log(res.statusText);
                        }).catch((e) => {
                            console.log(e);
                        })
                    }
            }
        };
    }, 50);

}])