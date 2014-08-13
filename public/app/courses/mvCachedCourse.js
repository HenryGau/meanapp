/**
 * Created by HenryGau on 8/14/2014.
 */

angular.module('app').factory('mvCachedCourse', function (mvCourse) {
        var courseList;

        return {
            query: function () {
                if (!courseList) {
                    courseList = mvCourse.query();
                }
                return courseList;
            }
        }
    }
)