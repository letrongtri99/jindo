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
$(document).ready(function() {
    $('.lichhoc').addClass('active').parent().parent('li').addClass('active');
});
var newschedules = angular.module('JindoFB', []);
newschedules.controller('newschedules', ['$scope', '$http', function newschedules($scope, $http) {
    $scope.schedules = {
        district: '',
        stadium: '',
        location: '',
        time: '',
        stadium_url: ''
    }
    $scope.upload = () => {
        if (!$scope.schedules.district || !$scope.schedules.stadium || !$scope.schedules.location || !$scope.schedules.time || !$scope.schedules.stadium_url) {
            toastr["error"]('Chưa nhập đủ thông tin cần thiết');
        } else {
            $http.post(`/createNewSchedules`, {
                district: $scope.schedules.district,
                stadium: $scope.schedules.stadium,
                location: $scope.schedules.location,
                time: $scope.schedules.time,
                stadium_url: $scope.schedules.stadium_url
            }).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        window.location.assign('/lich-hoc-admin');
                    }, 1000);
                } else {
                    toastr["error"](res1.data.message);
                }
            }, (res2) => {
                console.log(res2)
                toastr["error"](res2.statusText);
            }).catch((e) => {
                console.log(e);
                toastr["error"](e);
            })
        }

    }

}])