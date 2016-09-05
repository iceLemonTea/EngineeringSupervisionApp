angular.module('app.services', [])
  .provider('datePickerService', function () {
    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];
    //方便的年月日设置方式，正和我意，可以随便改了。
    var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"] //中文：;["S", "M", "T", "W", "T", "F", "S"];
    var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    //中文： ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = function (v) {
      if (v = 0) {
        return disabledDates;
      } else if (v == 1) {
        return weekDaysList;
      } else if (v == 2) {
        return monthList;
      }
    };
    this.$get = function () {
      return f;
    };
  })

  .factory('BlankFactory', [function () {

  }])

  .service('BlankService', [function () {

  }])

  .factory('LocalStorageService', function ($rootScope, $http) {
    var service = {
      getUserInfo: function () {//获取用户数据
        var userInfo = localStorage.getItem("userInfo");
        if (userInfo == null || userInfo == undefined) {
          userInfo = 0;
        }
        return JSON.parse(userInfo);
      },
      setUserInfo: function (userInfo) {//保存用户信息数据
        localStorage.clear();
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      },
      deleteInfoById: function () {//删除用户信息列表
        localStorage.removeItem("userInfo");//删除
      }
    }
    return service;
  });
