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
var config = {
    extraPlugins: 'uploadimage',
    codeSnippet_theme: 'monokai_sublime',
    autoUpdateElement: true,
    height: '400px',
    filebrowserImageUploadUrl: '/uploadImage?name=ckeditor',
    filebrowserUploadMethod: 'form',
    pasteFilter: 'p; a[!href]',
    toolbarGroups: [{
            name: "document",
            groups: ["mode", "document", "doctools"]
        },
        { name: "clipboard", groups: ["clipboard", "undo"] },
        {
            name: "editing",
            groups: ["find", "selection", "spellchecker", "editing"]
        },
        { name: "forms", groups: ["forms"] },
        { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
        {
            name: "paragraph",
            groups: [
                "list",
                "indent",
                "blocks",
                "align",
                "bidi",
                "paragraph"
            ]
        },
        { name: "links", groups: ["links"] },
        { name: "insert", groups: ["insert"] },
        { name: "styles", groups: ["styles"] },
        { name: "colors", groups: ["colors"] },
        { name: "tools", groups: ["tools"] },
        { name: "others", groups: ["others"] },
        { name: "about", groups: ["about"] }
    ]
};

var editarticle = angular.module('JindoFB', []);

CKEDITOR.addCss('.cke_editable { font-size: 15px; }');
if (CKEDITOR.instances['description']) {
    CKEDITOR.remove(CKEDITOR.instances['description']);
}

var editor = CKEDITOR.replace('description', config);
$(document).ready(function() {
    $('.tintuc').addClass('active').parent().parent('li').addClass('active');
});
editarticle.controller('editarticle', ['$scope', '$http', function editarticle($scope, $http) {
    $scope.article = {
        content: '',
        category: '',
        link: '',
        alert: '',
        imageFile: '',
        title: '',
        summary: ''
    }
    $scope.showInfoEdit = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        $http.get(`/getDetailArticle/${myParam}`).then((res) => {
            if (res.data.success) {
                $scope.article.title = res.data.info.title;
                editor.on("instanceReady", function(event) {
                    editor.setData(res.data.info.content);
                });
                $scope.article.link = res.data.info.cover_image;
                $scope.article.summary = res.data.info.summary;
                $scope.article.category = res.data.info.category;
            } else {
                toastr["error"](res.data.message);
            }

        }, (res) => {
            toastr["error"](res.statusText);
        }).catch((e) => {
            toastr["error"](e);
        })
    }
    $scope.uploadImage = () => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.article.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                $scope.article.link = 't';
                angular.element("input[type='file']").val(null);
                $scope.article.imageFile = '';
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.article.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                $scope.article.link = 't';
                $scope.article.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = ((data) => {
                imageSrc = data.currentTarget.result;
                $scope.$apply(() => {
                    $scope.article.alert = '';
                    $scope.article.link = imageSrc;
                    $scope.article.imageFile = imageFile;
                })
            });
        }


    }
    $scope.update = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        var content = CKEDITOR.instances['description'].getData();
        if ($scope.article.link != 't' && !$scope.article.imageFile) {
            if (!content || !$scope.article.title || !$scope.article.summary) {
                toastr["error"]('Chưa nhập đủ thông tin cần thiết');
            } else {
                $http.post(`/chinh-sua-bai-viet/${myParam}`, {
                    title: $scope.article.title,
                    content: content,
                    link: $scope.article.link,
                    summary: $scope.article.summary,
                    category: $scope.article.category
                }).then((res1) => {
                    if (res1.data.success) {
                        toastr["success"](res1.data.message);
                        setTimeout(function() {
                            window.location.assign('/tin-tuc-bong-da');
                        }, 1000);
                    } else {
                        toastr["error"](res1.data.message);
                    }
                }, (res2) => {
                    toastr["error"](res1.statusText);
                }).catch((e) => {
                    toastr["error"](e);
                })
            }
        } else {
            if (!$scope.article.summary || !content || !$scope.article.title || !$scope.article.imageFile) {
                toastr["error"]('Chưa nhập đủ thông tin cần thiết');
            } else {
                const formData = new FormData();
                formData.append("cover", $scope.article.imageFile);
                var req = {
                    method: 'POST',
                    withCredentials: true,
                    url: '/uploadImage?name=coverarticle',
                    headers: {
                        "Content-Type": undefined
                    },
                    data: formData
                }
                $http(req).then((res) => {
                    if (res.data.success) {
                        const url = res.data.url;
                        return $http.post(`/chinh-sua-bai-viet/${myParam}`, {
                            title: $scope.article.title,
                            content: content,
                            link: url,
                            summary: $scope.article.summary,
                            category: $scope.article.category
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
                            window.location.reload();
                        }, 1000);
                    } else {
                        toastr["error"](response.data.message);
                    }
                }, (respone2) => {
                    toastr["error"](respone2.statusText);
                }).catch((e) => {
                    toastr["error"](e);
                })
            }
        }
    }

}])