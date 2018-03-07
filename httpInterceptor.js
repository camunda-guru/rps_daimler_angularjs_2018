function testInterceptor() {
    return {
        request: function(config) {
            console.log('request started...');
            //Validating the requests and assign the csrf token to each requests
            //var token = $cookieStore.get("auth");
            //config.headers['x-csrf-token'] = token;
            return config;
        },

        requestError: function(config) {
            return config;
        },

        response: function(res) {
            return res;
        },

        responseError: function(res) {
            if(response.status==404)
            {
                $location.path="/ImageData";
            }
            return res;
        }
    }
}
helpApp.factory('testInterceptor', testInterceptor)
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('testInterceptor');
    })
    .run(function($http) {
        $http.get('https://restcountries.eu/rest/v2/all')
            .then(function(res) {
                console.log(res.data)
            })
    })