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
var tableCourses = angular.module('JindoFB', []);
tableCourses.controller('khoahoc', ['$scope', '$http', '$compile', function khoahoc($scope, $http, $compile) {
    $scope.courses = {
        id: '',
        typecourse: '',
        price: '',
        sale: '',
        priceafter: ''
    }
    var tableCourses;
    $scope.showTableCourses = () => {
        tableCourses = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getDataTableCourses",
            "searching": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "columnDefs": [{
                className: "ellipsis0",
                "targets": [0, 1, 2, 3]
            }, {
                "name": "typecourse",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "price",
                "targets": 1,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "sale",
                "targets": 2,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "priceafter",
                "targets": 3,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 4,
                "data": null,
                "render": (data, type, row) => {
                    return `<a ng-click="edit(${data[4]})" href="" class="btn btn-info">Chỉnh Sửa</a> <a href="/deleteCourse/${data[4]}" onclick="return confirm('Bạn có chắc chắn muốn xóa khóa học này?');" class="btn btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }

        });

    }
    $scope.addnew = () => {
        $scope.courses.typecourse = '';
        $scope.courses.price = '';
        $scope.courses.sale = '';
        $scope.courses.priceafter = '';
        $('#addModal').modal('show');
    }
    $scope.edit = (id) => {
        $http.get(`/getInfoCourses/${id}`).then((res) => {
            if (res.data.success) {
                $scope.courses.typecourse = res.data.info.typecourse;
                $scope.courses.price = res.data.info.price;
                $scope.courses.sale = res.data.info.sale;
                $scope.courses.priceafter = res.data.info.priceafter;
                $scope.courses.id = res.data.info.id;
            } else {
                toastr["error"](res.data.message);
            }

        }, (res) => {
            toastr["error"](res.statusText);
        }).catch((e) => {
            toastr["error"](e);
        })

        setTimeout(function() {
            $('#editModal').modal('show');
        }, 1500);
    }
    $scope.new = () => {
        if (!$scope.courses.typecourse || !$scope.courses.price || !$scope.courses.sale || !$scope.courses.priceafter) {
            toastr["error"]('Chưa nhập đủ thông tin về khóa học');
        } else {
            $http.post('/createCourses', {
                    typecourse: $scope.courses.typecourse,
                    price: $scope.courses.price,
                    sale: $scope.courses.sale,
                    priceafter: $scope.courses.priceafter,
                }).then((res) => {
                    if (res.data.success) {
                        toastr["success"](res.data.message);
                        $('#addModal').modal('hide');
                        setTimeout(function() {
                            tableCourses.ajax.reload();
                        }, 1000);
                    } else {
                        toastr["error"](res.data.message);
                    }
                }, (res) => {
                    toastr["error"](res.statusText);
                })
                .catch((e) => {
                    toastr["error"](e);
                })
        }
    }
    $scope.update = (_id) => {
        if (!$scope.courses.typecourse || !$scope.courses.price || !$scope.courses.sale || !$scope.courses.priceafter) {
            toastr["error"]('Chưa nhập đủ thông tin về khóa học');
        } else {
            $http.post(`/editCourse/${_id}`, {
                typecourse: $scope.courses.typecourse,
                price: $scope.courses.price,
                sale: $scope.courses.sale,
                priceafter: $scope.courses.priceafter
            }).then((res1) => {
                if (res1.data.success) {
                    $('#editModal').modal('hide');
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableCourses.ajax.reload();
                    }, 1000);
                } else {
                    toastr["error"](res1.data.message);
                }
            }, (res2) => {
                toastr["error"](res2.statusText);
            }).catch((e) => {
                console.log(e);
                toastr["error"](e);
            })
        }
    }

}])