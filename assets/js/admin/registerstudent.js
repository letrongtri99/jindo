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
tableCoaches.controller('hocvien', ['$scope', '$http', '$compile', function hocvien($scope, $http, $compile) {
    $scope.register = {
        tenbome: '',
        tencon: '',
        phone: '',
        address: '',
        dob: '',
        sex: 'Nữ',
        courses: '',
        question: '',
        id: ''
    }
    var tableRegister;
    $scope.showStudent = () => {
        tableRegister = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getDataTableRegister",
            "order": [
                [4, "desc"]
            ],
            "language": {
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ học viên",
                "lengthMenu": "Hiện _MENU_ học viên mỗi trang",
                "sSearch": "Tìm Kiếm",
                "infoFiltered": "(lọc từ _MAX_ học viên)",
                "paginate": {
                    "previous": "Quay Lại",
                    "next": "Tiếp Theo"
                }

            },
            "columnDefs": [{
                className: "ellipsis0",
                "targets": [0, 1, 2]
            }, {
                "name": "name_parent",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "name_kid",
                "targets": 1,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "orderable": false,
                "name": "phone",
                "targets": 2,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "orderable": false,
                "name": "courses",
                "targets": 3,
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "registerTime",
                "targets": 4,
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 5,
                "orderable": false,
                "data": null,
                "render": (data, type, row) => {
                    return `<a href="" ng-click="showModal(${data[5]})" class="btn btn-info">Chỉnh Sửa</a> <a href="" ng-click="delete(${data[5]})" class="btn btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }

        });
        $.fn.DataTable.ext.pager.numbers_length = 5;
        $('#datepicker').datepicker({
            uiLibrary: 'bootstrap4',
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true,
        });
    }
    $scope.showModal = (Id) => {
        $http.get(`/getDetailStudent/${Id}`).then((res) => {
            if (res.data.success) {
                $scope.register.tenbome = res.data.info.name_parent;
                $scope.register.tencon = res.data.info.name_kid;
                $scope.register.phone = res.data.info.phone;
                $scope.register.address = res.data.info.address;
                $("#datepicker").val(res.data.ngay);
                $scope.register.sex = res.data.info.sex;
                $scope.register.courses = res.data.info.courses;
                $scope.register.question = res.data.info.question;
                $scope.register.id = res.data.info.id;
                setTimeout(function() {
                    $('#exampleModal').modal('show');
                }, 1500);
            } else {
                toastr["error"](res.data.message);
            }

        }, (res) => {
            toastr["error"](res.statusText);
        }).catch((e) => {
            toastr["error"](e);
        })
    }
    $scope.update = (i) => {
        if (!$scope.register.tenbome || !$scope.register.tencon || !$scope.register.phone || !$scope.register.address) {
            toastr["error"]('Chưa nhập đủ thông tin cần thiết');
        } else {
            $http.post(`/editRegister/${i}`, {
                name_parent: ($scope.register.tenbome),
                name_kid: ($scope.register.tencon),
                phone: ($scope.register.phone),
                address: ($scope.register.address),
                date_of_birth: $("#datepicker").val(),
                sex: ($scope.register.sex),
                courses: ($scope.register.courses),
                question: ($scope.register.question)
            }).then((res1) => {
                if (res1.data.success) {
                    $('#exampleModal').modal('hide');
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableRegister.ajax.reload();
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
    $scope.delete = (_id) => {
        var choice = confirm('Bạn có muốn xóa học viên này? ');
        if (choice) {
            $http.get(`/deleteRegister/${_id}`).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableRegister.ajax.reload();
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

}])