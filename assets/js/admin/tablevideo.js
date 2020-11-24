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
var tableCoaches = angular.module('JindoFB', []);
$(document).ready(function() {
    $('#media').addClass('active').parent().parent('li').addClass('active');
});
tableCoaches.controller('tablecoaches', ['$scope', '$http', '$compile', function tablecoaches($scope, $http, $compile) {
    $scope.video = {
        path: '',
        title: '',
        link: '',
        id: '',
        alert: '',
        imageFile: ''
    }
    var tableCoach;
    $scope.initTable = () => {
        tableCoach = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getDataTableVideo",
            "language": {
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ video",
                "lengthMenu": "Hiện _MENU_ video mỗi trang",
                "sSearch": "Tìm Kiếm",
                "infoFiltered": "(lọc từ _MAX_ video)",
                "paginate": {
                    "previous": "Quay Lại",
                    "next": "Tiếp Theo"
                }

            },
            "columnDefs": [{
                className: "ellipsis",
                "targets": [1]
            }, {
                className: "ellipsis0",
                "targets": [0]
            }, {
                "name": "title",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "link_yt",
                "orderable": false,
                "targets": 1,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 2,
                "data": null,
                "render": (data, type, row) => {
                    return `<a ng-click="test(${data[2]})" href="" class="btn btn-info">Chỉnh Sửa</a> <a href="" ng-click="deleteA('${data[2]}')" class="btn btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }

        });

    }
    $scope.test = (a) => {
        angular.element("input[type='file']").val(null);
        $scope.video.imageFile = '';
        $http.get(`/getDetailVideo/${a}`).then((res) => {
            if (res.data.success) {
                $scope.video.path = res.data.info.link_yt;
                $scope.video.title = res.data.info.title;
                $scope.video.link = res.data.info.path;
                $scope.video.id = res.data.info.id;
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
        }, 1000);
    }
    $scope.uploadImage = () => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.video.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                $scope.video.link = 't';
                angular.element("input[type='file']").val(null);
                $scope.video.imageFile = '';
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.video.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                $scope.video.link = 't';
                $scope.video.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = ((data) => {
                imageSrc = data.currentTarget.result;
                $scope.$apply(() => {
                    $scope.video.alert = '';
                    $scope.video.link = imageSrc;
                    $scope.video.imageFile = imageFile;
                })
            });
        }


    }
    $scope.update = (id) => {
        if ($scope.video.link != 't' && !$scope.video.imageFile) {
            if (!$scope.video.title || !$scope.video.path) {
                toastr["error"]('Chưa nhập đủ thông tin cần thiết');
            } else {
                $http.post(`/editVideo/${id}`, {
                    title: $scope.video.title,
                    link_yt: $scope.video.path,
                    path: $scope.video.link
                }).then((res1) => {
                    if (res1.data.success) {
                        $('#exampleModal').modal('hide');
                        toastr["success"](res1.data.message);
                        setTimeout(function() {
                            tableCoach.ajax.reload();
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
        } else {
            if (!$scope.video.title || !$scope.video.path || !$scope.video.imageFile) {
                toastr["error"]('Chưa nhập đủ thông tin cần thiết');
            } else {
                const formData = new FormData();
                formData.append("clip", $scope.video.imageFile);
                var req = {
                    method: 'POST',
                    withCredentials: true,
                    url: '/uploadImage?name=video',
                    headers: {
                        "Content-Type": undefined
                    },
                    data: formData
                }
                $http(req).then((res) => {
                    if (res.data.success) {
                        const url = res.data.url;
                        return $http.post(`/editVideo/${id}`, {
                            title: $scope.video.title,
                            link_yt: $scope.video.path,
                            path: url
                        })
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
                    console.log(e);
                })
            }
        }
    }
    $scope.deleteA = (s) => {
        var choice = confirm('Bạn có muốn xóa video này? ');
        if (choice) {
            $http.post(`/deleteVideo/${s}`).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableCoach.ajax.reload();
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
    $scope.showNew = () => {
        angular.element("input[type='file']").val(null);
        $scope.video.title = '';
        $scope.video.path = '';
        $scope.video.link = '';
        $('#new').modal('show');
    }
    $scope.create = () => {
        if (!$scope.video.title || !$scope.video.path || !$scope.video.imageFile) {
            toastr["error"]('Chưa nhập đủ thông tin về video');
        } else {
            const formData = new FormData();
            formData.append("clip", $scope.video.imageFile);
            var req = {
                method: 'POST',
                withCredentials: true,
                url: '/uploadImage?name=video',
                headers: {
                    "Content-Type": undefined
                },
                data: formData
            }
            $http(req).then((res) => {
                if (res.data.success) {
                    const url = res.data.url;
                    return $http.post('/createVideo', {
                        title: $scope.video.title,
                        link_yt: $scope.video.path,
                        path: url
                    })
                } else {
                    toastr["error"](res.data.message);
                }
            }, (res) => {
                toastr["error"](res.statusText);
            }).then((response) => {
                console.log(response);
                if (response.data.success) {
                    $('#new').modal('hide');
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
                console.log(e);
            })
        }
    }

}])