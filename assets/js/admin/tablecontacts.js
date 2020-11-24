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
tableCoaches.controller('contact', ['$scope', '$http', '$compile', function hocvien($scope, $http, $compile) {
    $scope.contacts = {
        name: '',
        phone: '',
        email: '',
        address: '',
        question: '',
        id: '',
    }
    var tableContact;
    $scope.showContact = () => {
        tableContact = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getDataTableContact",
            "order": [
                [4, "desc"]
            ],
            "language": {
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ liên hệ",
                "lengthMenu": "Hiện _MENU_ liên hệ mỗi trang",
                "sSearch": "Tìm Kiếm",
                "infoFiltered": "(lọc từ _MAX_ liên hệ)",
                "paginate": {
                    "previous": "Quay Lại",
                    "next": "Tiếp Theo"
                }

            },
            "columnDefs": [{
                className: "ellipsis0",
                "targets": [0, 1, 2, 3]
            }, {
                "name": "name",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "email",
                "targets": 1,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "phone",
                "targets": 2,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "address",
                "orderable": false,
                render: $.fn.dataTable.render.text(),
                "targets": 3,
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "contactTime",
                "targets": 4,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 5,
                "orderable": false,
                "data": null,
                "render": (data, type, row) => {
                    return `<a href="" ng-click="showModal(${data[5]})" class="btn btn-info">Chỉnh Sửa</a> <a href="" ng-click="delete(${data[5]})"  class="btn btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }

        });
        $.fn.DataTable.ext.pager.numbers_length = 5;
    }
    $scope.showModal = (Id) => {
        $http.get(`/getDetailContact/${Id}`).then((res) => {
            if (res.data.success) {
                $scope.contacts.name = res.data.info.name;
                $scope.contacts.email = res.data.info.email;
                $scope.contacts.phone = res.data.info.phone;
                $scope.contacts.address = res.data.info.address;
                $scope.contacts.question = res.data.info.question;
                $scope.contacts.id = res.data.info.id;
                setTimeout(function() {
                    $('#exampleModal').modal('show');
                }, 1000);
            } else {
                toastr["error"](res.data.message);
            }

        }, (res) => {
            toastr["error"](res.statusText);
        }).catch((e) => {
            toastr["error"](e);
        })
    }
    $scope.delete = (_id) => {
        var choice = confirm('Bạn có muốn xóa liên hệ này? ');
        if (choice) {
            $http.get(`/deletecontact/${_id}`).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableContact.ajax.reload();
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