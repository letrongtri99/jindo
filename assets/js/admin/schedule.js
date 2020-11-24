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
var scheduleTable = angular.module('JindoFB', []);
scheduleTable.controller('scheduleTable', ['$scope', '$http', '$compile', function scheduleTable($scope, $http, $compile) {
    $scope.schedules = {
        district: '',
        stadium: '',
        location: '',
        id: '',
        time: '',
        stadium_url: ''
    }
    var tableSchedule;
    $scope.initTable = () => {
        tableSchedule = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/getSchedule",
            "searching": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "columnDefs": [{
                className: "ellipsis4",
                "targets": [4]
            }, {
                className: "ellipsis3",
                "targets": [3]
            }, {
                className: "ellipsis2",
                "targets": [2]
            }, {
                className: "ellipsis1",
                "targets": [1]
            }, {
                className: "table-col-center",
                "targets": [5]
            }, {
                className: "ellipsis0",
                "targets": [0]
            }, {
                "name": "district",
                "targets": 0,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "stadium",
                "targets": 1,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "location",
                "targets": 2,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "time",
                "targets": 3,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "name": "stadium_url",
                "targets": 4,
                render: $.fn.dataTable.render.text(),
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('title', cellData);
                }
            }, {
                "targets": 5,
                "data": null,
                "render": (data, type, row) => {
                    return `<a ng-click="test(${data[5]})" href="" class="btn btn-info-add-more btn-info">Chỉnh Sửa</a> <a href="deleteSchedules/${data[5]}" onclick="return confirm('Bạn có chắc chắn muốn xóa lịch học này?');" class="btn btn-info-add-more btn-info">Xóa</a>`
                }
            }],
            "fnDrawCallback": () => {
                $compile(angular.element('tr').contents())($scope);
            }
        })
    }
    $scope.test = (a) => {
            $http.get(`/getScheduleAdminDetail/${a}`).then((res) => {
                if (res.data.success) {
                    $scope.schedules.district = res.data.info.district;
                    $scope.schedules.stadium = res.data.info.stadium;
                    $scope.schedules.location = res.data.info.location;
                    $scope.schedules.time = res.data.info.timer;
                    $scope.schedules.stadium_url = res.data.info.stadium_url;
                    $scope.schedules.id = res.data.info.id;
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
        // Update
    $scope.update = (id) => {
        if (!$scope.schedules.district || !$scope.schedules.stadium ||
            !$scope.schedules.location || !$scope.schedules.time || !$scope.schedules.stadium_url) {
            toastr["error"]('Chưa nhập đủ thông tin cần thiết');
        } else {
            $http.post(`/editSchedules/${id}`, {
                district: $scope.schedules.district,
                stadium: $scope.schedules.stadium,
                location: $scope.schedules.location,
                time: $scope.schedules.time,
                stadium_url: $scope.schedules.stadium_url
            }).then((res1) => {
                if (res1.data.success) {
                    $('#exampleModal').modal('hide');
                    toastr["success"](res1.data.message);
                    setTimeout(function() {
                        tableSchedule.ajax.reload();
                    }, 1000);
                } else {
                    console.log(res1);
                    toastr["error"](res1.data.message);
                }
            }, (res2) => {}).catch((e) => {
                console.log(e);
                toastr["error"](e);
            })

        }
    }
}])