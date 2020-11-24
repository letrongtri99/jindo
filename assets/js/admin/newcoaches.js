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
var newcoaches = angular.module('JindoFB', []);
$(document).ready(function() {
    $('.hlv').addClass('active').parent().parent('li').addClass('active');
});
newcoaches.controller('newcoaches', ['$scope', '$http', function newcoaches($scope, $http) {
    $scope.coaches = {
        namehlv: '',
        thanhtich: '',
        link: '',
        alert: '',
        imageFile: ''
    }
    $scope.uploadImage = () => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        console.log(imageFile);
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.coaches.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                $scope.coaches.link = ' ';
                $scope.coaches.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.coaches.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                $scope.coaches.link = ' ';
                $scope.coaches.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = ((data) => {
                imageSrc = data.currentTarget.result;
                $scope.$apply(() => {
                    $scope.coaches.alert = '';
                    $scope.coaches.link = imageSrc;
                    $scope.coaches.imageFile = imageFile;
                })
            });
        }


    }
    $scope.upload = () => {
        if (!$scope.coaches.namehlv || !$scope.coaches.thanhtich || !$scope.coaches.imageFile) {
            toastr["error"]('Chưa nhập đủ thông tin cần thiết');
        } else {
            const formData = new FormData();
            formData.append("avatar", $scope.coaches.imageFile);
            var req = {
                method: 'POST',
                withCredentials: true,
                url: '/uploadImage?name=avatar',
                headers: {
                    "Content-Type": undefined
                },
                data: formData
            }
            $http(req).then((res) => {
                if (res.data.success) {
                    const url = res.data.url;
                    return $http.post('/createCoach', {
                        name: $scope.coaches.namehlv,
                        description: $scope.coaches.thanhtich,
                        avatar: url
                    });
                } else {
                    toastr["error"](res.data.message);
                }
            }, (res) => {
                toastr["error"](res.statusText);
            }).then((response) => {
                if (response.data.success) {
                    toastr["success"](response.data.message);
                    setTimeout(function() {
                        window.location.assign('/chinh-hlv');
                    }, 1500);
                } else {
                    toastr["error"](response.data.message);
                }
            }, (respone2) => {
                toastr["error"](respone2.statusText);
            }).catch((e) => {

            })
        }

    }

}])