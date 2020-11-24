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
var tableImages = angular.module('JindoFB', []);
$(document).ready(function() {
    $('#media').addClass('active').parent().parent('li').addClass('active');
});
tableImages.controller('hinhanh', ['$scope', '$http', '$compile', function tableImages($scope, $http, $compile) {
    $scope.images = {
        id: ''
    }
    var tableImages;
    $scope.showTableImages = () => {
        tableImages = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getTableMedia",
            "ordering": false,
            "language": {
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ album",
                "lengthMenu": "Hiện _MENU_ album mỗi trang",
                "sSearch": "Tìm Kiếm",
                "infoFiltered": "(lọc từ _MAX_ album)",
                "paginate": {
                    "previous": "Quay Lại",
                    "next": "Tiếp Theo"
                }

            },
            "columnDefs": [{
                className: "el0",
                "targets": [0]
            }, {
                "name": "album",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 1,
                "data": null,
                "orderable": false,
                "render": (data, type, row) => {
                    return `<a href="/showAlbums?ten=${data[1]}" class="btn btn-info">Chỉnh Sửa</a> <a href="" ng-click="deleteA('${data[1]}')" class="btn btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }

        });

    }
    $scope.deleteA = (s) => {
        var choice = confirm('Bạn có muốn xóa album này? ');
        if (choice) {
            $http.post(`/deleteAlbum/${s}`).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableImages.ajax.reload();
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