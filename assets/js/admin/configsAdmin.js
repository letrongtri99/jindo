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
    // angular.module('numfmt-error-module', [])

// .run(function($rootScope) {
//   $rootScope.typeOf = function(value) {
//     return typeof value;
//   };
// })

// .directive('stringToNumber', function() {
//   return {
//     require: 'ngModel',
//     link: function(scope, element, attrs, ngModel) {
//       ngModel.$parsers.push(function(value) {
//         return '' + value;
//       });
//       ngModel.$formatters.push(function(value) {
//         return parseFloat(value);
//       });
//     }
//   };
// });
$(document).ready(function() {
    var url = window.location;
    var element = $('ul.navbar-nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).parent().addClass('active');
    if (element.is('li')) {
        element.addClass('active').parent().parent('li').addClass('active')
    }
});
var configsInfo = angular.module('JindoFB', []);
configsInfo.run(function($rootScope) {
    $rootScope.typeOf = function(value) {
        return typeof value;
    };
}).directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value);
            });
        }
    };
}).controller('configsInfo', ['$scope', '$http', '$window', function configsInfo($scope, $http, $window) {
    $scope.configs = {
            address: $('#address').attr("data"),
            mail: $('#email').attr("data"),
            link_yt: $('#link_yt').attr("data"),
            link_fb: $('#link_fb').attr("data"),
            phone_number: $('#phone_number').attr("data"),
            students_number: $('#students_number').attr("data"),
            places_number: $('#places_number').attr("data"),
            coaches_number: $('#coaches_number').attr("data")
        }
        // Update
        $scope.openModal = () => {
        $('#exampleModal').modal('show');
    }
    $scope.update = () => {
        if (!$scope.configs.address || !$scope.configs.mail ||
            !$scope.configs.link_yt || !$scope.configs.link_fb || !$scope.configs.phone_number ||
            !$scope.configs.students_number || !$scope.configs.places_number || $scope.configs.phone_number == null || 
            $scope.configs.places_number == null || $scope.configs.students_number == null ||  $scope.configs.places_number == null) {
            toastr["error"]('Chưa nhập đủ thông tin cần thiết');
        }else {
            $http.post(`/editConfigs`, {
                address: $scope.configs.address,
                mail: $scope.configs.mail,
                link_yt: $scope.configs.link_yt,
                link_fb: $scope.configs.link_fb,
                phone_number: $scope.configs.phone_number,
                students_number: $scope.configs.students_number,
                places_number: $scope.configs.places_number,
                coaches_number: $scope.configs.coaches_number,
            }).then((res1) => {
                if (res1.data.success) {
                    $('#exampleModal').modal('hide');
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        $window.location.reload().reload();
                    }, 1000);
                } else {
                    console.log(res1);
                    toastr["error"](res1.data.message);
                }
            }, (res2) => {}).catch((e) => {
                console.log(e);
                toastr["error"](e);
            })

        }
    }
    $scope.closeModal = () =>{
        setTimeout(function() {
            $scope.configs.address =  $('#address').attr("data"),
            $scope.configs.mail =  $('#email').attr("data"),
            $scope.configs.link_yt =  $('#link_yt').attr("data"),
            $scope.configs.link_fb =  $('#link_fb').attr("data"),
            $scope.configs.phone_number =  $('#phone_number').attr("data"),
            $scope.configs.students_number =  $('#students_number').attr("data"),
            $scope.configs.places_number =  $('#places_number').attr("data"),
            $scope.configs.coaches_number =  $('#coaches_number').attr("data")
        },500)
    }
}])