

$('#datepicker').datepicker({
    uiLibrary: 'bootstrap',
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true,
});
var JindoFrontEnd = angular.module('JindoFrontEnd', []);
JindoFrontEnd.controller('layoutCtrl', ['$scope', '$http', '$timeout', function layoutData($scope, $http, $timeout) {
    $scope.configs = {
        address: '',
          mail: '',
          link_yt: '',
          link_fb: '',
          phone_number: '',
          mail: '',
          prices: '',
    }
    $scope.initData = () => {
        $http.get('/getInitData/')
        .then((res) => {
                $scope.configs.address = res.data.info.address;
                $scope.configs.mail = res.data.info.mail;
                $scope.configs.link_yt = res.data.info.link_yt;
                $scope.configs.link_fb = res.data.info.link_fb;
                $scope.configs.phone_number = res.data.info.phone_number;
                $scope.configs.prices = res.data.info.prices;
                $scope.configs.mail = res.data.info.mail;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}])

JindoFrontEnd.controller('signUp', ['$scope', '$http', function homeSignUp($scope, $http) {
    $scope.Registers = {
        name_parent: '',
        address: '',
        phone: '',
        name_kid: '',
        date_of_birth: '',
        sex: '',
        courses: '',
        question: '',
        submit: () => {        
            data = { name_parent: $scope.Registers.name_parent,address: $scope.Registers.address, phone: $scope.Registers.phone,
                name_kid: $scope.Registers.name_kid,date_of_birth: $("#datepicker").val(),sex: $scope.Registers.sex,
                courses: $scope.Registers.courses, question: $scope.Registers.question};                
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
                 !data.phone || !data.sex || !data.courses || !$('#datepicker').val()) {
                toastr["error"]("Vui lòng điền đủ thông tin");

            }else if(isNaN(data.phone)){
                toastr["error"]("Vui lòng nhập đúng số điện thoại");
            } 
            else  {
                $http.post('/postRegister', data)
                .then((res) => {
                    const detail = res.data;
                    if (!detail.success) {
                        toastr["error"](detail.message);
                    } else {
                        toastr["success"](detail.message);
                        setTimeout(function() {
                            document.getElementById('register_form').reset()
                        }, 1000);
                    }
                }, (res) => {
                    console.log(res.statusText);
                })
            }
        }
    };
}])

JindoFrontEnd.controller('contactCtrl', ['$scope', '$http', function contact($scope, $http) {
    $scope.Contacts = {
        name: '',
        email: '',
        address: '',
        phone: '',
        question: '',
        submit: () => {        
            data = { name: $scope.Contacts.name,address: $scope.Contacts.address, phone: $scope.Contacts.phone, email: $scope.Contacts.email,                
                question: $scope.Contacts.question,};                
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
            if (!data.name || !data.email || !data.address ||
                 !data.phone) {
                toastr["error"]("Vui lòng điền đủ thông tin");
            }else if(isNaN(data.phone)){
                toastr["error"]("Vui lòng nhập đúng số điện thoại");
            } 
            else {            
                $http.post('/postContact', data)
                .then((data) => {
                    return data;
                })
                .then((res) => {
                    const detail = res.data;
                    if (!detail.success) {
                        toastr["error"](detail.message);
                    } else {
                        toastr["success"](detail.message);                        
                        setTimeout(function() {
                            document.getElementById('contact_form').reset()
                        }, 1000);
                    }
                }, (res) => {
                    console.log(res.statusText);
                })
            }
        }
    };
}])

JindoFrontEnd.controller('newsCtrl', ['$scope', '$http', function newsData($scope, $http) {
    $scope.articles = {
        title: '',
        content: '',
        cover_image: '',   
        articles: [],
        id: '',
        slug: '',
    }
    $scope.newsData = () => {
        $http.get('/getNewsData/')
        .then((res) => {            
                let arr = [];
                for(let i=0; i<res.data.news.length; i++) {
                    arr.push({
                        id: res.data.news[i].id,
                        title: res.data.news[i].title,
                        content: res.data.news[i].content,
                        cover_image: res.data.news[i].cover_image,                                                                                    
                        slug: res.data.news[i].slug,                                                                                    
                    })
                }
                $scope.articles = arr;        
        })
        .catch((err) => {
            console.log(err);
        })
    }
}])             
JindoFrontEnd.controller('vidsCtrl', ['$scope', '$http', function vidsData($scope, $http) {
    $scope.articles = {
        path: '',
        title: '',   
        link_yt: '',
        id: '',
        slug: '',
        videos: [],
    }
    $scope.vidsData = () => {
        $http.get('/getVidsData')
        .then((res) => {     
            console.log(res)       
                let arr = [];
                for(let i=0; i<res.data.vids.length; i++) {
                    arr.push({
                        path: res.data.vids[i].path,
                        title: res.data.vids[i].title,
                        link_yt: res.data.vids[i].link_yt,
                        id: res.data.vids[i].id,                                                                                    
                        slug: res.data.vids[i].slug,                                                                                    
                    })
                }
                $scope.videos = arr;        
        })
        .catch((err) => {
            console.log(err);
        })
    }
}])             
          
JindoFrontEnd.controller('courseCtrl', ['$scope', '$http', '$timeout', function layoutData($scope, $http, $timeout) {
    $scope.courses = {
        typecourse: '',
        price: '',
        sale: '',
        priceafter: '',
        courses: [],
    }
    $scope.initCourseData = () => {
        $http.get('/getCourseData')
        .then((res) => {            
                let arr = [];
                for(let i =0; i < res.data.courses.length; i++) {
                    arr.push({
                       typecourse : res.data.courses[i].typecourse,
                       price : res.data.courses[i].price,
                       sale : res.data.courses[i].sale,
                       priceafter : res.data.courses[i].priceafter,
                    })
                }
                $scope.courses = arr;
                          
        })
        .catch((err) => {
            console.log(err);
        })
    }
}])