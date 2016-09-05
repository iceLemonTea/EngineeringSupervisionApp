angular.module('app.controllers', [])

  .controller('mainCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', 'LocalStorageService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $ionicHistory, LocalStorageService) {
      //$scope.UserType = 1;
      // Open the login modal
      $scope.login = function () {
        $state.go('login', {}, {});
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      };
      //TODO:检测本地是否已经登录，如果登录，则使用登录信息获取相应的用户信息和小区列表
      $scope.userInfo = LocalStorageService.getUserInfo();//0:工人：1：工长，根据用户类型设置后续的平台流程
      //TODO:《接口》根据用户ID，获取用户名下的小区列表
      //小区信息数组
      $scope.items = [{
        id: 1,
        name: "英俊年华国际社区",
        adds: "航天大道与神舟六路交汇处向南500米",
        img: "img/commImg.jpg",
        siteNum: 1,
        tag: [{tag: "普通住宅"}, {tag: "商铺"}, {tag: "办公室"}, {tag: "别墅"}]
      },
        {
          id: 2,
          name: "英俊年华国际社区",
          adds: "航天大道与神舟六路交汇处向南500米",
          img: "img/commImg.jpg",
          siteNum: 1,
          tag: [{tag: "普通住宅"}, {tag: "商铺"}, {tag: "办公室"}, {tag: "别墅"}]
        }];
      //创建小区按钮点击函数
      $scope.createCommunity = function () {
        $state.go('createCommunity', {userInfo: $scope.userInfo}, {});
      }

      //小区列表条目点击函数
      $scope.communityItemClickBtn = function (commId) {
        //传递参数包括，小区id（commId）,用户类型（$scope.userInfo.userType）
        $state.go('buildingSiteList', {id: commId, userInfo: $scope.userInfo}, {});
      };
      //案例按钮点击函数
      $scope.toCasesBtn = function () {
        $state.go('cases');
      };
      //个人账户按钮点击函数
      $scope.toAccountBtn = function () {
        $state.go('account');
      };

      //if ($scope.userInfo == 0) {//本地没有用户登录数据
      $scope.login();
      //}

    }])

  .controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', 'LocalStorageService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $ionicHistory, LocalStorageService) {

      $scope.user = {
        userName: null,
        passwd: null,
        licsenceCode: null
      };

      $scope.loginBtn = function () {
        if ($scope.user.passwd == null) {
          //工人类型用户登录

        } else {
          //工长类型用户登录

        }
        //TODO:《接口》登陆接口获取相应参数
        //将用户数据本地持久化
        $scope.userInfo = {name: $scope.user.userName, userType: $scope.user.passwd};
        LocalStorageService.setUserInfo($scope.userInfo);
        //跳转到主页面
        $state.go('main', {}, {});
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }

    }])

  .controller('casesCtrl', ['$scope', '$stateParams', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {
      $scope.items = [{
        id: 1,
        name: "英俊年华国际社区",
        adds: "航天大道与神舟六路交汇处向南500米",
        img: "img/commImg.jpg",
        siteNum: 1,
        tag: [{tag: "普通住宅"}, {tag: "商铺"}, {tag: "办公室"}, {tag: "别墅"}]
      },
        {
          id: 1,
          name: "英俊年华国际社区",
          adds: "航天大道与神舟六路交汇处向南500米",
          img: "img/commImg.jpg",
          siteNum: 1,
          tag: [{tag: "普通住宅"}, {tag: "商铺"}, {tag: "办公室"}, {tag: "别墅"}]
        }];
      $scope.communityItemClickBtn = function (commId) {
        $state.go('caseBuildingSite', {id: commId}, {});
      };
    }])

  .controller('accountCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }])

  .controller('createCommunityCtrl', ['$scope', '$stateParams', '$ionicHistory', 'datePickerService', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicHistory, datePickerService, $state) {
      //获取用户信息
      $scope.userInfo = $stateParams.userInfo;
      //小区功能描述复选列表
      $scope.commTypeList = [
        {text: "普通住宅", checked: true},
        {text: "商铺", checked: false},
        {text: "办公室", checked: false},
        {text: "别墅", checked: false}
      ];
      //初始化交房日期
      $scope.scheduleDate = new Date();
      //===============时间组件的一些配置 start=============
      //初始化日期变量
      var disabledDates = datePickerService(0);
      var weekDaysList = datePickerService(1);
      var monthList = datePickerService(2);// 日期选择后的回调函数
      var datePickerCallbacke = function (val) {
        if (typeof (val) === 'undefined') {
        } else {
          $scope.scheduleDate = val;//更新日期。
        }
      };
      $scope.datepickerObjectEnd = {
        titleLabel: '选择交房日期',  //可选
        todayLabel: '今天',  //可选
        closeLabel: '关闭',  //可选
        setLabel: '确定',  //可选
        setButtonType: 'button-assertive',  //可选
        todayButtonType: 'button-assertive',  //可选
        closeButtonType: 'button-assertive',  //可选
        inputDate: new Date(),  //可选，输入值
        mondayFirst: true,  //可选,星期一开头
        disabledDates: disabledDates, //可选
        weekDaysList: weekDaysList, //可选
        monthList: monthList, //可选
        templateType: 'popup', //可选i.e.的模式 modal or popup(兼容模式？)
        showTodayButton: 'true', //可选
        modalHeaderColor: 'bar-positive', //可选
        modalFooterColor: 'bar-positive', //可选
        from: new Date(2008, 8, 2), //可选
        to: new Date(2030, 8, 25),  //可选
        callback: function (val) {  //Mandatory
          datePickerCallbacke(val);
        },
        dateFormat: 'yyyy-MM-dd', //可选
        closeOnSelect: true, //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
      };
      //===============时间组件的一些配置 end=============

      //===============城市选择组件的一些配置 start=============
      /*
       var vm = $scope.vm = {};
       vm.cb = function () {
       console.log(vm.CityPickData1.areaData)
       //console.log(vm.CityPickData2.areaData)
       //console.log(vm.CityPickData3.areaData)
       //console.log(vm.CityPickData4.areaData)
       }
       //例1
       vm.CityPickData1 = {
       areaData: [],
       backdrop: true,
       backdropClickToClose: true,
       defaultAreaData: ['陕西', '西安', '雁塔区'],
       buttonClicked: function () {
       vm.cb()
       },
       tag: '-',
       //iconClass: 'ion-location',
       title: '所属区域'
       };

       //例2
       vm.CityPickData2 = {
       areaData: ['请选择城市'],
       title: '没有初始城市',
       hardwareBackButtonClose: false
       }
       //例3
       vm.CityPickData3 = {
       areaData: [],
       defaultAreaData: ['江苏', '无锡', '江阴市'],
       title: '初始城市江苏无锡江阴市'
       }
       //例4
       vm.CityPickData4 = {
       areaData: [],
       title: '外部更改值',
       watchChange: true
       }
       vm.change = function () {
       console.log('change')
       vm.CityPickData4.areaData = ['上海', '徐汇区']
       }
       vm.sync = function () {
       console.log('sync')
       vm.CityPickData4.areaData = vm.CityPickData2.areaData
       }

       //===============城市选择组件的一些配置 end=============
       */

      $scope.submitBtn = function () {
        //TODO:《接口》将创建的小区提交到服务器

        //返回到上一级菜单
        $state.go('main', {}, {});
      };

      $ionicHistory.nextViewOptions({
        disableBack: true
      });
    }])

  .controller('buildingSiteListCtrl', ['$scope', '$stateParams', '$state','LocalStorageService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, LocalStorageService) {
      //楼盘工地所属小区的id-,以及用户信息从上一级页面获取
      $scope.commId = $stateParams.id;
      //$scope.userInfo = $stateParams.userInfo;
      $scope.userInfo = LocalStorageService.getUserInfo();
      //TODO:《接口》通过小区id，获取楼盘工地信息列表items
      $scope.items = [{
        id: 1,
        name: "英俊1期",
        avatarImg: "img/avatarImg.jpg",
        adds: "2单元0305号",
        img: "img/commImg.jpg",
        tag: [{tag: "简装"}, {tag: "实木"}, {tag: "现代简约"}],
        owner: "王小帅 先生",
        workingProcess: "瓦工进场"
      },
        {
          id: 2,
          name: "英俊1期",
          avatarImg: "img/avatarImg.jpg",
          adds: "2单元0305号",
          img: "img/commImg.jpg",
          tag: [{tag: "简装"}, {tag: "实木"}, {tag: "现代简约"}],
          owner: "王小美 女士",
          workingProcess: "瓦工进场"
        }];
      $scope.createBuildingSiteBtn = function () {
        $state.go('createBuildingSite', {id: $scope.commId, userInfo: $scope.userInfo}, {});
      };

      $scope.buildSiteItemClickBtn = function (siteInfo) {
        if ($scope.userInfo.userType == '0') {//如果是工人，则直接上传页面
          $state.go('workDone', {siteInfo: siteInfo, user: $scope.userInfo}, {});
        } else {//如果是工长，则进入工序选择页面
          $state.go('workItemList', {siteInfo: siteInfo, user: $scope.userInfo}, {});
        }
      };
    }])

  .controller('createBuildingSiteCtrl', ['$scope', '$stateParams', 'datePickerService', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, datePickerService, $ionicHistory) {
      //上一页面传递的参数
      $scope.commId = $stateParams.id;
      $scope.userInfo = $stateParams.userInfo;
      //工地装修风格的列表
      $scope.siteTypeList = [
        {text: "现代简约", value: "现代简约"},
        {text: "地中海", value: "地中海"},
        {text: "中式", value: "中式"},
        {text: "欧式", value: "欧式"}
      ];
      $scope.siteBudgetList = [
        {text: "简装", value: "简装"},
        {text: "中等", value: "中等"},
        {text: "豪装", value: "豪装"},
      ];
      //默认选择装修风格的参数,同时双向绑定了单选框，随着单选框内数据变化而变化
      $scope.data = {
        siteType: '现代简约',
        siteBudget: '简装'
      };
      //单选框内容变化处理函数（暂未使用）
      $scope.siteBudgetChange = function (item) {
        console.log("Selected siteBudget, text:", item.text, "value:", item.value);
      };
      //初始化交房日期
      $scope.scheduleDate = new Date();
      //初始化日期变量
      var disabledDates = datePickerService(0);
      var weekDaysList = datePickerService(1);
      var monthList = datePickerService(2);
      $scope.datepickerObjectEnd = {
        titleLabel: '选择楼盘装修日期',  //可选
        todayLabel: '今天',  //可选
        closeLabel: '关闭',  //可选
        setLabel: '确定',  //可选
        setButtonType: 'button-assertive',  //可选
        todayButtonType: 'button-assertive',  //可选
        closeButtonType: 'button-assertive',  //可选
        inputDate: new Date(),  //可选，输入值
        mondayFirst: true,  //可选,星期一开头
        disabledDates: disabledDates, //可选
        weekDaysList: weekDaysList, //可选
        monthList: monthList, //可选
        templateType: 'popup', //可选i.e.的模式 modal or popup(兼容模式？)
        showTodayButton: 'true', //可选
        modalHeaderColor: 'bar-positive', //可选
        modalFooterColor: 'bar-positive', //可选
        from: new Date(2008, 8, 2), //可选
        to: new Date(2030, 8, 25),  //可选
        callback: function (val) {  //Mandatory
          datePickerCallbacke(val);
        },
        dateFormat: 'yyyy-MM-dd', //可选
        closeOnSelect: true, //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
      };
      // 日期选择后的回调函数
      var datePickerCallbacke = function (val) {
        if (typeof (val) === 'undefined') {
        } else {
          console.log('Selected date is : ', val);
          $scope.scheduleDate = val;//更新日期。
        }
      };
      $scope.submitBtn = function () {
        //TODO:《接口》将创建的楼盘信息提交到服务器

        //返回到上一级菜单
        $ionicHistory.goBack(-1);
      };
    }])

  .controller('workItemListCtrl', ['$scope', '$stateParams', '$state', '$ionicActionSheet', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $ionicActionSheet, $timeout) {
      //TODO:《配置参数》系统配置参数，用于控制工长分配工作流程
      //hasWorker = true：则选中某一项目，进入工人选择页面，选中工人后，工人将在自己的app中上传工程进度图，同时工长也可以上传进度图，并完成审核
      //hasWorker = false：工长选中某一待装修的项目后，直接进入工程进度图上传页面，由自己上传进度图，且该流程不需要审核。
      $scope.hasWorker = false;
      //上一页面传递的参数
      $scope.siteInfo = $stateParams.siteInfo;
      $scope.userInfo = $stateParams.userInfo;
      //TODO:《接口》根据工地id，获取工地当前的进度说明

      //根据楼盘施工进度isFinished，从而对施工项目进行排版，已完成的项目右侧显示“已完成”
      $scope.items = [{id: 1, name: "1. 水电", img: "img/workItem/yx01.gif", tag: [{tag: "上传施工图"}], isFinished: true},
        {id: 2, name: "2. 木工-吊顶", img: "img/workItem/yx03.gif", tag: [{tag: "进度审核"}], isFinished: true},
        {id: 3, name: "3. 瓦工", img: "img/workItem/yx02.gif", tag: [{tag: "上传施工图"}], isFinished: true},
        {id: 4, name: "4. 木工-柜子", img: "img/workItem/yx03.gif", tag: [{tag: "暂未开工"}], isFinished: false},
        {id: 5, name: "5. 油工", img: "img/workItem/yx04.gif", tag: [{tag: "暂未开工"}], isFinished: false}];
      //列表条目点击按钮
      $scope.workItemClickBtn = function (item) {
        if (item.isFinished == false) {//暂未施工的，将进入工人页面，挑选工人
          if ($scope.hasWorker == false) {
            $state.go('workDone', {siteInfo: $scope.siteInfo, user: $scope.userInfo}, {})
          } else {
            $state.go('workerList', {id: item.id, siteInfo: $scope.siteInfo, user: $scope.userInfo}, {});
          }
        } else {//施工完成，则弹出上拉菜单，选择上传图片还是审核
          if ($scope.hasWorker == false) {
            $scope.showReUploadImageActionSheet();
          } else {
            $scope.showActionSheet();
          }

        }
      };
      $scope.showActionSheet = function () {
        //让工长选择上传图片，还是审核
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: '<b>上传图片</b>'},
            {text: '<b>审核</b>'}
          ],
          //destructiveText: 'Delete',
          titleText: '选择操作',
          cancelText: 'Cancel',
          cancel: function () {
            // add cancel code..
          },
          buttonClicked: function (index) {
            if (index == 0) {//上传图片
              $state.go('workDone', {siteInfo: $scope.siteInfo, user: $scope.userInfo}, {})
            } else if (index == 1) {//审核项目
              $state.go('workChecked', {siteInfo: $scope.siteInfo, user: $scope.userInfo}, {})
            }
            return true;
          }
        });
        $timeout(function () {
          hideSheet();
        }, 2000);
      };
      //工长更新工程进度图
      $scope.showReUploadImageActionSheet = function () {
        //让工长选择上传图片，还是审核
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: '<b>更新工程进度图片</b>'}
          ],
          //destructiveText: 'Delete',
          titleText: '选择操作',
          cancelText: 'Cancel',
          cancel: function () {
            // add cancel code..
          },
          buttonClicked: function (index) {
            if (index == 0) {//上传图片
              $state.go('workDone', {siteInfo: $scope.siteInfo, user: $scope.userInfo}, {})
            }
            return true;
          }
        });
        $timeout(function () {
          hideSheet();
        }, 2000);
      };
    }])

  .controller('workerListCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $ionicHistory) {
      //上一页面传递的参数
      $scope.processId = $stateParams.id;
      $scope.siteInfo = $stateParams.siteInfo;
      $scope.userInfo = $stateParams.userInfo;

      //TODO:《接口》通过当前选中的工程项目（如木工，瓦工）processId，获取相应的工人资料
      $scope.items = [{
        id: 1,
        name: "王工",
        adds: "江苏徐州",
        img: "img/avatarImg.jpg",
        tag: [{tag: "高级木工"}, {tag: "100%完工"}, {tag: "完成订单30次"}],
        workAge: 10
      },
        {
          id: 1,
          name: "王工",
          adds: "江苏徐州",
          img: "img/avatarImg.jpg",
          tag: [{tag: "中级木工"}, {tag: "100%完工"}, {tag: "完成订单30次"}],
          workAge: 10
        }];

      $scope.submitBtn = function () {
        //TODO:《接口》提交工作信息，包括工人，项目，工地以及小区
        //如果选中了工人，则跳转到主菜单页面
        $state.go('main', {}, {});
        //未选中工人，则提示工长选择工人后提交
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      };

      $scope.createWorkerBtn = function () {
        $state.go('createWorker', {siteInfo: $scope.siteInfo, user: $scope.userInfo}, {});
      };

      $scope.workerItemClickBtn = function (item) {
        console.log("Selected workerItemClickBtn, text:", item.id, "value:", item.name);
        //获取选中的工人信息
      };
    }])

  .controller('createWorkerCtrl', ['$scope', '$stateParams', '$ionicHistory', '$ionicActionSheet', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicHistory, $ionicActionSheet, $timeout) {
      //上一页面传递的参数
      $scope.siteInfo = $stateParams.siteInfo;
      $scope.userInfo = $stateParams.userInfo;

      //将创建的工人信息提交到服务器
      $scope.submitBtn = function () {
        //TODO:《接口》将创建的工人信息提交到服务器
        //返回到上一级菜单
        $ionicHistory.goBack(-1);
      };
      //工人的部分默认选项，双向绑定，获取选定的值
      $scope.workerInfo = {
        level: null,
        time: null
      };

      $scope.selectedWorkerLevel = function () {
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: '<b>初级</b>'},
            {text: '<b>中级</b>'},
            {text: '<b>高级</b>'}
          ],
          //destructiveText: 'Delete',
          titleText: '选择操作',
          cancelText: 'Cancel',
          cancel: function () {
            // add cancel code..
          },
          buttonClicked: function (index) {
            if (index == 0) {
              $scope.workerInfo.level = "初级";
            } else if (index == 1) {
              $scope.workerInfo.level = "中级";
            } else if (index == 2) {
              $scope.workerInfo.level = "高级";
            }
            return true;
          }
        });
        $timeout(function () {
          hideSheet();
        }, 2000);
      };

      $scope.selectedWorkerTime = function () {
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: '<b>5年以下</b>'},
            {text: '<b>5-10年</b>'},
            {text: '<b>10年以上</b>'}
          ],
          //destructiveText: 'Delete',
          titleText: '选择操作',
          cancelText: 'Cancel',
          cancel: function () {
            // add cancel code..
          },
          buttonClicked: function (index) {
            if (index == 0) {
              $scope.workerInfo.time = "5年以下";
            } else if (index == 1) {
              $scope.workerInfo.time = "5-10年";
            } else if (index == 2) {
              $scope.workerInfo.time = "10年以上";
            }
            return true;
          }
        });
        $timeout(function () {
          hideSheet();
        }, 2000);
      };
    }])

  .controller('workDoneCtrl', ['$scope', '$stateParams', '$ionicModal', '$timeout', '$cordovaImagePicker', '$cordovaCamera', '$ionicActionSheet',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicModal, $timeout, $cordovaImagePicker, $cordovaCamera, $ionicActionSheet) {

      //楼盘工地所属小区的id-,以及用户信息从上一级页面获取
      $scope.userInfo = $stateParams.userInfo;
      $scope.siteInfo = $stateParams.siteInfo;
      //初始化页面图片列表变量
      $scope.images_list = [];
      $scope.imageNum = 0;
      $scope.imgSrc = "";
      $scope.isImageEmpty = true;
      $scope.addImage = function () {
        var x = document.getElementById("addImage");
        x.style.color = "Red";
        //让工长选择上传图片，还是审核
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: '<b>拍照上传</b>'},
            {text: '<b>从相册中选取</b>'}
          ],
          //destructiveText: 'Delete',
          titleText: '选择操作',
          cancelText: 'Cancel',
          cancel: function () {
            x.style.color = "#09f";
            // add cancel code..
          },
          buttonClicked: function (index) {
            if (index == 0) {//拍照上传
              $scope.takePhoto();
            } else if (index == 1) {//从相册中选取
              $scope.pickImage();
            }
            x.style.color = "#09f";
            return true;
          }
        });
        $timeout(function () {
          hideSheet();
        }, 2000);

      }
      //test for image list
      $scope.addImageToList = function (imgSrc) {
        if (imgSrc != null && imgSrc != undefined) {
          var src = imgSrc;//"data:image/jpeg;base64," +
          var image = {id: $scope.imageNum, src: src};
          $scope.images_list.push(image);
          $scope.imageNum++;
          if ($scope.imageNum == 4) {
            $scope.isImageEmpty = false;
          }
        }
      };
      $scope.uploadImage = function () {
        //TODO:《接口》批量上传图片
      }
      //image picker
      $scope.pickImage = function () {
        var options = {
          maximumImagesCount: 1,
          width: 800,
          height: 800,
          quality: 100
        };
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            //console.log(results);
            //$scope.imgSrc = results[0];
            //$scope.images_list.push("data:image/jpeg;base64,"+results[0]);
            $scope.addImageToList(results[0]);
          }, function (error) {
            // error getting photos
          });
      };

      $scope.takePhoto = function () {
        var options = {
          //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
          quality: 100,                                            //相片质量0-100
          destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
          sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
          allowEdit: false,                                        //在选择之前允许修改截图
          encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
          targetWidth: 800,                                        //照片宽度
          targetHeight: 800,                                       //照片高度
          mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
          cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true                                   //保存进手机相册
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          //$scope.imgSrc = imageData;
          //$scope.images_list.push("data:image/jpeg;base64,"+imageData);
          $scope.addImageToList(imageData);
        }, function (err) {
          // error
        });

      };
    }])

  .controller('workCheckedCtrl', ['$scope', '$stateParams', '$ionicScrollDelegate',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicScrollDelegate) {
      //楼盘工地所属小区的id-,以及用户信息从上一级页面获取
      $scope.userInfo = $stateParams.userInfo;
      $scope.siteInfo = $stateParams.siteInfo;

      //TODO:《接口》从服务器上下载工人提交的相关信息以及图片列表
      $scope.workerInfo = {name: "王工", submitTime: "2016年10月11日 10点20分", avatar: "img/avatarImg.jpg"};
      $scope.imgList = [{id: 1, src: 'img/checked/sd1.jpg'},
        {id: 2, src: 'img/checked/sd2.jpg'},
        {id: 3, src: 'img/checked/sd3.jpg'},
        {id: 4, src: 'img/checked/sd4.jpg'}];
      $scope.deleteImg = function (img) {
        //从列表中删除图片
        $scope.imgList.splice($scope.imgList.indexOf(img), 1);
        //TODO:《接口》从服务器上删除图片

        //重新绘制滚动页面的尺寸
        $ionicScrollDelegate.$getByHandle("checkedHandle").resize();
      };
      $scope.checked = function (v) {
        if (v == 0) {
          //TODO:《接口》通过审核
        } else {
          //TODO:《接口》未通过审核
        }
      }
    }])

  .controller('caseBuildingSiteCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $ionicHistory) {
      $scope.commId = $stateParams.id;
      //通过小区id，获取楼盘工地信息列表items
      $scope.items = [{
        id: 1,
        name: "英俊1期",
        avatarImg: "img/avatarImg.jpg",
        adds: "2单元0305号",
        img: "img/commImg.jpg",
        tag: [{tag: "简装"}, {tag: "实木"}, {tag: "现代简约"}],
        owner: "王小帅 先生",
        workingProcess: "完工"
      },
        {
          id: 2,
          name: "英俊1期",
          avatarImg: "img/avatarImg.jpg",
          adds: "2单元0305号",
          img: "img/commImg.jpg",
          tag: [{tag: "简装"}, {tag: "实木"}, {tag: "现代简约"}],
          owner: "王小美 女士",
          workingProcess: "完工"
        }];

      $scope.buildSiteItemClickBtn = function (siteId, siteProcess) {
        $state.go('caseDetail', {id: siteId}, {});
      };
      $scope.goBackToMainBtn = function () {
        $state.go('main', {}, {});
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }
    }])

  .controller('caseDetailCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $ionicHistory) {
      $scope.items = [{
        id: 1,
        name: "英俊1期",
        avatarImg: "img/avatarImg.jpg",
        adds: "2单元0305号",
        img: "img/commImg.jpg",
        tag: [{tag: "简装"}, {tag: "实木"}, {tag: "现代简约"}],
        owner: "王小帅 先生",
        workingProcess: "完工",
        time: "2016-08-09",
        period: "45天",
        type: "半包",
        price: "18.5万"
      }];
      $scope.imgs = [{url: "img/avatarImg.jpg"}, {url: "img/avatarImg.jpg"}, {url: "img/avatarImg.jpg"}];
      $scope.processList = [{name: "水电施工"},
        {name: "木工-吊顶"},
        {name: "瓦工施工"},
        {name: "木工-柜子"},
        {name: "油工刷漆"}];
      $scope.sideProcessClickBtn = function (pro) {
        switch (pro.name) {
          case "水电施工":
            $scope.imgs = [{url: "img/avatarImg.jpg"}];
            break;
          case "木工-吊顶":
            $scope.imgs = [{url: "img/avatarImg.jpg"}, {url: "img/avatarImg.jpg"}, {url: "img/avatarImg.jpg"}];
            break;
          case "瓦工施工":
            $scope.imgs = [{url: "img/avatarImg.jpg"}];
            break;
          case "木工-柜子":
            $scope.imgs = [{url: "img/avatarImg.jpg"}, {url: "img/avatarImg.jpg"}, {url: "img/avatarImg.jpg"}];
            break;
          case "油工刷漆":
            $scope.imgs = [{url: "img/avatarImg.jpg"}];
            break;
          default:
            break;
        }
      }
      $scope.goBackToMainBtn = function () {
        $state.go('main', {}, {});
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }

    }])

  .controller('imagePreviewCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $ionicHistory) {

      $scope.goBackToMainBtn = function () {
        $state.go('main', {}, {});
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }
    }]);
