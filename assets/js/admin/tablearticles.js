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
var tableArticles = angular.module('JindoFB', []);
tableArticles.controller('baiviet', ['$scope', '$http', '$compile', function tableArticles($scope, $http, $compile) {
    $scope.articles = {
        id: ''
    }
    var tableArticles;
    $scope.showTableArticle = () => {
        tableArticles = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getDataTableArticles",
            "order": [
                [2, "desc"]
            ],
            "language": {
                "info": "Xem từ _START_ đến _END_ trong _TOTAL_ bài viết",
                "lengthMenu": "Hiện _MENU_ bài viết mỗi trang",
                "sSearch": "Tìm Kiếm",
                "infoFiltered": "(lọc từ _MAX_ bài viết)",
                "paginate": {
                    "previous": "Quay Lại",
                    "next": "Tiếp Theo"
                }

            },
            "columnDefs": [{
                className: "ellipsis2",
                "targets": [0]
            }, {
                "name": "title",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "category",
                "targets": 1,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "postTime",
                "targets": 2,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 3,
                "data": null,
                "orderable": false,
                "render": (data, type, row) => {
                    return `<a href="/editArticles?id=${data[3]}" class="btn btn-info">Chỉnh Sửa</a> <a href="" ng-click="delete(${data[3]})" class="btn btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }

        });

    }
    $scope.delete = (_id) => {
        var choice = confirm('Bạn có muốn xóa bài viết này? ');
        if (choice) {
            $http.get(`/deleteArticle/${_id}`).then((res1) => {
                if (res1.data.success) {
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableArticles.ajax.reload();
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