/**
 * Created by HenryGau on 8/4/2014.
 */

angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr){
    return {
        notify: function(msg) {
            console.log(msg);
            mvToastr.success(msg);
        }
    }
});