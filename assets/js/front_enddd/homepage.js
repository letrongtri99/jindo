var home = angular.module('Home', []);
home.controller('signUp', ['$scope', '$http', function homeSignUp($scope, $http) {
    $scope.Registers = {
        name_parent: '',
        address: '',
        phone: '',
        name_kid: '',
        date_of_birth: '',
        sex: '',
        courses: '',
        submit: () => {        
            data = { name_parent: $scope.Registers.name_parent,address: $scope.Registers.address, phone: $scope.Registers.phone,
                name_kid: $scope.Registers.name_kid,date_of_birth: $scope.Registers.date_of_birth,sex: $scope.Registers.sex,
                courses: $scope.Registers.courses,};                
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
            if (!data.name_parent || !data.name_kid || !data.address ||
                 !data.phone || !data.sex || !data.courses || !data.date_of_birth) {
                toastr["error"]("Vui lòng điền đủ thông tin");
            } else {
                $http.post('/postRegister', data)
                .then((res) => {
                    const detail = res.data;
                    if (!detail.success) {
                        toastr["error"](detail.message);
                    } else {
                        toastr["success"](detail.message);
                        setTimeout(function() {
                            window.location.assign('/');
                        }, 1000);
                    }
                }, (res) => {
                    console.log(res.statusText);
                })
            }
        }
    };
}])