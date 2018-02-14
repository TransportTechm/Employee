const Eureka = require('pcf-eureka-client').Eureka;

const client = new Eureka({
  instance: {
    app: 'empstechm',
    hostName: 'employeeservicetechm.cfapps.io',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://employeeservicetechm.cfapps.io',
    port: {
      '$': 8080,
      '@enabled': 'true',
    },
    vipAddress: 'empstechm',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    serviceUrl: [  'https://eureka-59b65872-3262-41f4-b933-c749754ad4b7.cfapps.io/eureka/apps/' ],
  },
  
  oauth2: {

      clientCredentials: {

          client_id: 'p-service-registry-c4239cfd-788f-485a-8343-b09f6ff7c183',

          client_secret: 'REYdIED2JPDn',

         access_token_uri: 'https://p-spring-cloud-services.uaa.run.pivotal.io/oauth/token'

      }

  }

});

client.start();