
function getLocationProvider() {
    return new IpApiLocationProvider()
}

class IpApiLocationProvider {
    getIpAddress($http) {
        return $http.get('https://extreme-ip-lookup.com/json/')
        .then(function(resp){
            return resp.data.query
        })
    }
    
    getLocationData($http){
        var ipAddressPromise = self.getIpAddress($http)
        return ipAddressPromise.then(function(ipAddress){
            return $http.get(`http://ip-api.com/json/${ipAddress}`)
        }).then(function(resp){
            var data = resp.data
            return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region)
        })
    }
    
}