/**
 * Created by zhoulele on 2017/3/6.
 */
//使用闭包 避免全局污染
(function () {
  angular.module('utilsModule')
    .factory('lbxHttp',['$log','$http','lbxPopup','$state','baseConfig','$rootScope',lbxHttp])

    .service('lbxPopup',['$ionicLoading','$cordovaToast','$ionicPopup','baseConfig',lbxPopup]);

  function lbxHttp ($log,$http,lbxPopup,$state,baseConfig,$rootScope) {
    var serviceName = 'lbxHttp';
    var isSuccessfullName = 'isSuccessfull';
    var postName = serviceName + '.post';
    var getName = serviceName + '.get';

    //如果登陆令牌失效,跳转回登陆界面
    var goBackLogin = function (state) {
      lbxPopup.hideloding();
      state.go('login');
    }

    //返回request对象
    return {
      isSuccessfull:function (status) {
        $log.debug(isSucessfullName + "Start!\n" + isSuccessfullName + "status" + status);
        return (status == "S" || status == "SW");
      },

      post:function (url, param, config) {
        $log.debug(postName + "Start!\n" + postName + "url" + url + "\n") + postName + "param" + angular.toJson(param);
        //加上时间戳防止缓存post请求(一般不会缓存post请求,不过在IOS10中存在)
        //返回post对象
        return $http.post(url,param,config).success(function (response) {
          $log.debug(postName + 'success\n' + postName + 'response' + angular.toJson(response) + "\n" + postName + "End!");
        }).error(function (response, status) {
          $log.debug(postName + " error\n" + postName + " response " + response + "\n" + postName + " response " + response + "\n" + postName + " status " + status + "\n" + postName + " End!");
          lbxPopup.hideloding();
          //错误码的相应处理
          if (status == '401') {
            window.localStorage.token = '';
            goBackLogin($state);
            hmsPopup.showShortCenterToast('另一个设备在登陆你的账号,请重新登陆!');
          } else if (status == '404') {
            hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
          } else {
            hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
          }
        })
      },
      get: function (url, headers) {
        $log.debug(getName + "Start!\n" + getName + "url" +url);
        //加上时间戳
        $http.get(url, headers).success(function (response) {
          $log.debug(getName + " success\n" + getName + " response " + angular.toJson(response) + "\n" + getName + " End!");
        }).error(function (response, status) {
          $log.debug(getName + " error\n" + getName + " response " + response + "\n" + getName + " status " + status + "\n" + getName + " End!");
        });
      },
    };
  };

  function lbxPopup($ionicLoading, $cordovaToast, $ionicPopup, baseConfig) {
    this.showLoading = function (content) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
        '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>'
      });
    };
    this.showLoadingWithoutBackdrop = function (content) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
        '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>',
        noBackdrop: true
      });
    };
    this.hideLoading = function () {
      $ionicLoading.hide();
    };
    this.showShortCenterToast = function (content) {//长时间底部提示toast
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 1500
        });
      } else {
        $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    this.showVeryShortCenterToast = function (content) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 1000
        });
      } else {
        $cordovaToast.showShortBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    this.showLongCenterToast = function (content) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 3000
        });
      } else {
        $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    //弹出确认弹出框
    this.showPopup = function (template, title) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicPopup.show({
          title: "提示",
          template: template,
          buttons: [{
            text: '确定',
            type: 'button button-cux-popup-confirm'
          }]
        });
      } else {
        var alertDismissed = function () {
        };
        navigator.notification.alert(
          template, // message
          alertDismissed, // callback
          "提示", // title
          '确定' // buttonName
        );
      }
    };
    //弹出是否确认的窗口
    this.prompt = function (myscope, title, popup, pluginPopup) {
      if (!baseConfig.nativeScreenFlag) {
        var myPopup = $ionicPopup.show({
          template: '<input type="type" ng-model="myScope.data.city">',
          title: title,
          subTitle: title,
          scope: myscope,
          buttons: [
            {text: '取消'},
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!myscope.myScope.data.city) {
                  e.preventDefault();
                } else {
                  return myscope.myScope.data.city;
                }
              }
            },
          ]
        });
        myPopup.then(popup);
      } else {

        navigator.notification.prompt(
          title,  // message
          pluginPopup,          // callback to invoke
          '填写信息',           // title
          ['确定', '退出'],    // buttonLabels
          ''                 // defaultText
        );
      }
    };

    this.confirm = function (message, title, onConfirm) {
      if (!baseConfig.nativeScreenFlag) {
        var confirmPopup = $ionicPopup.confirm({
          title: (angular.isDefined(title) ? title : "提示"),
          template: message,
          cancelText: '取消',
          cancelType: 'button-cux-popup-cancel',
          okText: '确定',
          okType: 'button-cux-popup-confirm'
        });
        confirmPopup.then(function (res) {
          if (baseConfig.debug) {
            console.log('this.confirm.res ' + angular.toJson(res))
          }
          var index = 0;
          if (res) {
            index = 1;
          }
          onConfirm(index);
        });
      } else {
        navigator.notification.confirm(
          message, // message
          function (index) {
            onConfirm(index - 1);
          }, // callback to invoke with index of button pressed
          title, // title
          ['取消', '确定'] // buttonLabels
        );
      }
    };
  }
})
