/**
 * Created by zhoulele on 2017/3/10.
 */
angular.module('loginModule')
  .controller('highchartController',function ($scope, $http) {

    $scope.chart = {
      options:{
        chart:{
          type:'line'
        },
        legent:{
          enabled:false
        },
      },

      title:{
        text:null,
      },

      yAxis:{
        title:null,
      },

      xAxis:{
        type:'datetime'
      },
      series:[],
    };

    $http.get('https://api.bitcoinaverage.com/history/USD/per_hour_monthly_sliding_window.csv').success(function (prices) {

      var prices = prices.split(/\n/);

      var series = {
        data:[],
      };

      angular.forEach(prices, function(price, index){

        price = price.split(',');
        var date = new Date(price[0].replace(' ','T')).getTime();
        var value = parseFloat(price[3]);

        if (date && value > 0){
          series.data.push([date, value]);
        }
        console.log('时间:'+ date);
      });


      $scope.chart.series.push(series);

    });

  })
