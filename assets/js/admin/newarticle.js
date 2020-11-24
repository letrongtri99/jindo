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
var newarticle = angular.module('JindoFB', []);

CKEDITOR.addCss('.cke_editable { font-size: 15px; }');
CKEDITOR.disableAutoInline = false;
CKEDITOR.replace('description', config);
$(document).ready(function() {
    $('.tintuc').addClass('active').parent().parent('li').addClass('active');
});
newarticle.controller('newarticle', ['$scope', '$http', function newarticle($scope, $http) {
    $scope.article = {
        content: '',
        category: 'Tin tức thể thao',
        link: '',
        alert: '',
        imageFile: '',
        title: '',
        summary: ''
    }
    $scope.uploadImage = () => {
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        imageFile = event.target.files[0];
        if (!imageRegex.test(imageFile.name)) {
            $scope.$apply(() => {
                $scope.article.alert = 'Không phải hình ảnh,vui lòng chọn lại';
                $scope.article.link = ' ';
                $scope.article.imageFile = '';
                angular.element("input[type='file']").val(null);
            })
        } else if (imageFile.size > 5000000) {
            $scope.$apply(() => {
                $scope.article.alert = 'Hình ảnh vượt quá kích thước cho phép,vui lòng chọn lại';
                $scope.article.link = ' ';
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
    $scope.upload = () => {
        var content = CKEDITOR.instances['description'].getData();
        if (!content || !$scope.article.title || !$scope.article.imageFile || !$scope.article.summary) {
            toastr["error"]('Chưa nhập đủ thông tin bài viết');
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
                    return $http.post('/createArticle', {
                        title: $scope.article.title,
                        summary: $scope.article.summary,
                        cover: url,
                        category: $scope.article.category,
                        content: content
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
                        window.location.assign('/tin-tuc-bong-da');
                    }, 1500);
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

}])