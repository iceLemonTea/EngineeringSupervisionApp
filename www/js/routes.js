angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider ,$ionicConfigProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    //
    //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    //$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    //
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      })

      .state('login', {
        url: '/LoginFor',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('cases', {
        url: '/Cases',
        templateUrl: 'templates/cases.html',
        controller: 'casesCtrl'
      })

      .state('account', {
        url: '/Account',
        templateUrl: 'templates/account.html',
        controller: 'accountCtrl'
      })
      .state('createCommunity', {
        url: '/CreateCommunity',
        params: {"userInfo": null},
        templateUrl: 'templates/createCommunity.html',
        controller: 'createCommunityCtrl'
      })

      .state('buildingSiteList', {
        url: '/ BuildingSiteList',
        params: {"id": null, "userInfo": null},
        templateUrl: 'templates/buildingSiteList.html',
        controller: 'buildingSiteListCtrl'
      })

      .state('createBuildingSite', {
        url: '/CreateBuildingSite',
        params: {"id": null, "userInfo": null},
        templateUrl: 'templates/createBuildingSite.html',
        controller: 'createBuildingSiteCtrl'
      })

      .state('workItemList', {
        url: '/WorkItemList',
        params: {"siteInfo": null, "userInfo": null},
        templateUrl: 'templates/workItemList.html',
        controller: 'workItemListCtrl'
      })

      .state('workerList', {
        url: '/WorkerList',
        params: {"id": null, "siteInfo": null, "userInfo": null},
        templateUrl: 'templates/workerList.html',
        controller: 'workerListCtrl'
      })

      .state('createWorker', {
        url: '/CreateWorker',
        params: {"siteInfo": null, "userInfo": null},
        templateUrl: 'templates/createWorker.html',
        controller: 'createWorkerCtrl'
      })

      .state('workDone', {
        url: '/WorkDone',
        params: {"siteInfo": null, "userInfo": null},
        templateUrl: 'templates/workDone.html',
        controller: 'workDoneCtrl'
      })

      .state('workChecked', {
        url: '/WorkChecked',
        params: {"siteInfo": null, "userInfo": null},
        templateUrl: 'templates/workChecked.html',
        controller: 'workCheckedCtrl'
      })

      .state('caseBuildingSite', {
        url: '/CaseBuildingSite',
        params: {"id": null},
        templateUrl: 'templates/caseBuildingSite.html',
        controller: 'caseBuildingSiteCtrl'
      })

      .state('caseDetail', {
        url: '/CaseDetail',
        params: {"id": null},
        templateUrl: 'templates/caseDetail.html',
        controller: 'caseDetailCtrl'
      })

      .state('imagePreview', {
        url: '/ImagePreview',
        params: {"id": null},
        templateUrl: 'templates/imagePreview.html',
        controller: 'imagePreviewCtrl'
      })

    $urlRouterProvider.otherwise('/main');
  });
