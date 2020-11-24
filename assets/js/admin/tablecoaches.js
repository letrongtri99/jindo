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
    var url = window.location;
    var element = $('ul.navbar-nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).parent().addClass('active');
    if (element.is('li')) {
        element.addClass('active').parent().parent('li').addClass('active')
    }
});
var tableCoaches = angular.module('JindoFB', []);
tableCoaches.controller('tablecoaches', ['$scope', '$http', '$compile', function tablecoaches($scope, $http, $compile) {
    $scope.coaches = {
        namehlv: '',
        thanhtich: '',
        link: 't',
        alert: '',
        imageFile: '',
        id: ''
    }
    var tableCoach;
    $scope.initTable = () => {
        tableCoach = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getDataTableCoach",
            "searching": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "columnDefs": [{
                className: "ellipsis",
                "targets": [1]
            }, {
                className: "ellipsis0",
                "targets": [0]
            }, {
                "name": "name",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "description",
                "targets": 1,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 2,
                "data": null,
                "render": (data, type, row) => {
                    return `<a ng-click="test(${data[2]})" href="" class="btn btn-info">Chỉnh Sửa</a> <a href="deleteCoach/${data[2]}" onclick="return confirm('Bạn có chắc chắn muốn xóa HLV này?');" class="btn btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }

        });

    }
    $scope.test = (a) => {
        angular.element("input[type='file']").val(null);
        $scope.coaches.imageFile = '';
        $http.get(`/getDetail/${a}`).then((res) => {
            if (res.data.success) {
                $scope.coaches.namehlv = res.data.info.name;
                $scope.coaches.thanhtich = res.data.info.description;
                $scope.coaches.link = res.data.info.avatar;
                $scope.coaches.id = res.data.info.id;
            } else {
                toastr["error"](res.data.message);
            }

        }, (res) => {
            toastr["error"](res.statusText);
        }).catch((e) => {
            toastr["error"](e);
        })

        setTimeout(function() {
            $('#exampleModal').modal('show');
        }, 1500);
    }
    $scope.uploadImage = () => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.coaches.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                $scope.coaches.link = 't';
                $scope.coaches.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.coaches.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                $scope.coaches.link = 't';
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

    $scope.update = (id) => {
        if ($scope.coaches.link != 't' && !$scope.coaches.imageFile) {
            if (!$scope.coaches.namehlv || !$scope.coaches.thanhtich) {
                toastr["error"]('Chưa nhập đủ thông tin cần thiết');
            } else {
                $http.post(`/editCoach/${id}`, {
                    name: $scope.coaches.namehlv,
                    description: $scope.coaches.thanhtich,
                    avatar: $scope.coaches.link
                }).then((res1) => {
                    if (res1.data.success) {
                        $('#exampleModal').modal('hide');
                        toastr["success"](res1.data.message);
                        setTimeout(function() {
                            tableCoach.ajax.reload();
                        }, 1000);
                    } else {
                        console.log(res1);
                        toastr["error"](res1.data.message);
                    }
                }, (res2) => {
                    console.log(res2)
                }).catch((e) => {
                    console.log(e);
                    toastr["error"](e);
                })
            }
        } else {
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
                        return $http.post(`/editCoach/${id}`, {
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
                        $('#exampleModal').modal('hide');
                        toastr["success"](response.data.message);
                        setTimeout(function() {
                            tableCoach.ajax.reload();
                        }, 1000);
                    } else {
                        toastr["error"](response.data.message);
                    }
                }, (respone2) => {
                    toastr["error"](respone2.statusText);
                }).catch((e) => {

                })
            }
        }
    }

}])