/**
 * Created by xuek on 2016/8/24.
 */
describe('Controllers', function () {
  var scope;

  // load the controller's module
  beforeEach(module('app.controllers'));
  //beforeEach(module('ui.router'));
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('mainCtrl', {$scope: scope, $state:null, $stateParams:null});
  }));

  // tests start here
  it('test controller', function () {
    expect(scope.UserType).toEqual(1);
  });
});
