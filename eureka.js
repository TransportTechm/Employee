const Eureka = require('pcf-eureka-client').Eureka;

const client = new Eureka({
  instance: {
    app: 'employeeservice',
    hostName: 'employeeservice-techm-test.cfapps.io',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://employeeservice-techm-test.cfapps.io',
    port: {
      '$': 8080,
      '@enabled': 'true',
    },
    vipAddress: 'employeeservice',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    serviceUrl: [  'https://eureka-6533d206-690d-46be-86ab-b03f55207dd0.cfapps.io/eureka/apps/' ],
  },
  
  oauth2: {

      clientCredentials: {

          client_id: 'p-service-registry-324a9917-edf9-4a3b-b961-dc4d7b24b75c',

          client_secret: 'cMl5gpzwesY0',

         access_token_uri: 'https://p-spring-cloud-services.uaa.run.pivotal.io/oauth/token'

      }

  }

});

client.start();