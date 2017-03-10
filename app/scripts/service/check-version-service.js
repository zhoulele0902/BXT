/**
 * Created by zhoulele on 2017/3/6.
 */
angular.module('lbxModule',[])
  .factory('checkVersionService',[
    'lbxHttp',
    'lbxPopup',
    'baseConfig',
    '$http',
    '$ionicPopup',
    function (lbxHttp,
              lbxPopup,
              baseConfig,
              $http,
              $ionicPopup) {
      var url = baseConfig.businessPath + '/common_info/app_upgrade_info';
        checkversionParamas = {
          'params' : {
            'p_platform':ionic.platform.isAndroid() ? 'Android': 'iPhone',
            'p_user_name':window.localStorage.userid,
            'p_app_id':baseConfig.appUpId,
          }
        };

        var serveVersionParams = {
          minVersion:'',
          bigVersion:'',
          minUpdateUrl:'',
          bigUpdateUrl:'',
          updateContent:''
        };

        var dealVersionUtil = function (localVersion,serveVersion) {
          if (parseInt(localVersion[0]) < parseInt(serveVersion[0])){
            return true;
          }else if(parseInt(localVersion[0] == parseInt(serveVersion[0]))){
            if (parseInt(localVersion[1]) < parseInt(serveVersion[1])){
              return true;
            }else if(parseInt(localVersion[1]) == parseInt(serveVersion[1])){
              if (parseInt(localVersion[2]) < parseInt(serveVersion[2])){
                return true;
              }else {
                return false;
              }
            }

          }
          return false;
        }

        var checkAppStoreVersion = function (newName) {
         var destUrl = "";
          var promise = $http.get(destUrl).success(function (response) {
            if (baseConfig.debug){
              console.log("checkAppStoreVersion success");
              console.log(" response " + angular.toJson(response));
              console.log("checkAppStoreVersion End!");
            };
            var result = response.results;
            var appstoreVersion = '';
            if (result[0]){
              appstoreVersion = result[0].version;
              var serveVersion = appstoreVersion.split('.');
              var localVersion = baseConfig.version.currentVersion.split('.');

              if (dealVersionUtil(localVersion, serveVersion)){
                function selectAction(buttonIndex) {
                  if (buttonIndex == 1){//确认按钮
                    window.open('url地址');
                  }else {//取消按钮
                    return;
                  }
                };
                lbxPopup.confirm('','AppStore有新版本更新',selectAction);
              }else {
                if (appstoreVersion === baseConfig.version.currentView){
                  var promise = lbxHttp.post('url',checkversionParamas).success(function (response) {
                    var minVersion = '';
                    var minUpdateUrl = '';
                    var subDownloadDesc = '';
                    if (parseInt(minVersion) > baseConfig.version.currentSubVersion){
                      function selectAction_min(buttonIndex) { //update from pgy
                        if (buttonIndex == 1){//确认按钮
                          //前往更新
                        }else {//取消按钮
                          return;
                        }
                      };
                      lbxPopup.confirm('subDownloadDesc','小版本更新',selectAction_min);
                    }else {
                      if (newName === 'MY_INFO'){
                        lbxPopup.showShortCenterToast('当前为最新版');
                      }
                    }
                  });
                }else {
                  if (newName === 'MY_INFO'){
                    hmsPopup.showShortCenterToast("当前为最新版本");
                  }
                }
              }
            }
          }).error(function (response, status) {
            if (baseConfig.debug) {
              console.log("checkAppStoreVersion error");
              console.log("checkAppStoreVersion response " + response);
              console.log("checkAppStoreVersion status " + status);
              console.log("checkAppStoreVersion End!");
            }
          });
        };

        /*
         * 检查app版本的更新
         * 分大版本和小版本的update
         */
        return {
          checkAppVersion: function (newName) {
           if (baseConfig.appStoreFlag){
             checkAppStoreVersion(newName);
           }else {
             var promise = lbxHttp.post(url, checkversionParamas).success(function (response) {
               try {
                 serveVersionParams.bigVersion = 'response中获取的数据';
                 serveVersionParams.bigUpdateUrl = 'response中获取的数据';
                 serveVersionParams.minVersion = 'response中获取的数据';
                 serveVersionParams.minUpdateUrl = 'response中获取的数据';
               } catch (e){};

               try {
                 serveVersionParams.updateContent = response.returnData.upgradeInfo.replace(/\\n/g, '\r\n');
               } catch (e) {
                 serveVersionParams.updateContent = '';
               }

               try {
                 serveVersionParams.subDownloadDesc = response.returnData.subDownloadDesc.replace(/\\n/g, '\r\n');
               } catch (e) {
                 serveVersionParams.subDownloadDesc = '';
               }

               var serveVersion = serveVersionParams.bigVersion.split('.');
               var localVersion = baseConfig.version.currentVersion.split('.');

               function dealVersion() {
                 if (parseInt(localVersion[0]) < parseInt(serveVersion[0])) {
                   return true;
                 } else if (parseInt(localVersion[0]) == parseInt(serveVersion[0])) {
                   if (parseInt(localVersion[1]) < parseInt(serveVersion[1])) {
                     return true;
                   } else if (parseInt(localVersion[1]) == parseInt(serveVersion[1])) {
                     if (parseInt(localVersion[2]) < parseInt(serveVersion[2])) {
                       return true;
                     } else {
                       return false;
                     }
                   }
                 }
                 return false;
               }

               if (dealVersion()) {
                 if (ionic.Platform.isWebView()) {
                   function selectAction(buttonIndex) { // update from pgy
                     if (buttonIndex == 1) { //确认按钮
                       window.open(serveVersionParams.bigUpdateUrl, '_system', 'location=yes');
                     } else { //取消按钮
                       return;
                     }
                   };
                   if (!baseConfig.appStoreFlag) {
                     lbxPopup.confirm(serveVersionParams.updateContent, "大版本更新", selectAction);
                   } else {
                     //go appleStore--
                     lbxPopup.showPopup('AppStore有新版APP！快去更新吧！');
                   }
                 } else {
                   alert(serveVersionParams.updateContent);
                 }
               } else {
                 if (serveVersionParams.bigVersion === baseConfig.version.currentVersion && serveVersionParams.minVersion > baseConfig.version.currentSubVersion) {
                   if (ionic.Platform.isWebView()) {
                     function selectAction_min(buttonIndex) { // update from pgy
                       if (buttonIndex == 1) { //确认按钮
                         //前往下载app
                       } else { //取消按钮
                         return;
                       }
                     };
                     lbxPopup.confirm(serveVersionParams.subDownloadDesc, "小版本更新", selectAction_min);
                   } else {
                     alert(serveVersionParams.subDownloadDesc);
                   }
                 } else {
                   if (newName === 'MY_INFO')
                     lbxPopup.showShortCenterToast("当前为最新版本");
                 }
               }

             });
           };
          }
        };

  }]);
