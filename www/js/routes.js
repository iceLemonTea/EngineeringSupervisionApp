angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

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
        templateUrl: 'templates/createCommunity.html',
        controller: 'createCommunityCtrl'
      })

      .state('buildingSiteList', {
        url: '/ BuildingSiteList',
        params: {"id": null},
        templateUrl: 'templates/buildingSiteList.html',
        controller: 'buildingSiteListCtrl'
      })

      .state('createBuildingSite', {
        url: '/CreateBuildingSite',
        params: {"id": null},
        templateUrl: 'templates/createBuildingSite.html',
        controller: 'createBuildingSiteCtrl'
      })

      .state('workItemList', {
        url: '/WorkItemList',
        params: {"id": null},
        templateUrl: 'templates/workItemList.html',
        controller: 'workItemListCtrl'
      })

      .state('workerList', {
        url: '/WorkerList',
        params: {"id": null, "siteId": null},
        templateUrl: 'templates/workerList.html',
        controller: 'workerListCtrl'
      })

      .state('createWorker', {
        url: '/CreateWorker',
        templateUrl: 'templates/createWorker.html',
        controller: 'createWorkerCtrl'
      })

      .state('workDone', {
        url: '/WorkDone',
        params: {"id": null, "siteProcess": null},
        templateUrl: 'templates/workDone.html',
        controller: 'workDoneCtrl'
      })

      .state('workChecked', {
        url: '/WorkChecked',
        params: {"id": null, "siteProcess": null},
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
