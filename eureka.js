const Eureka = require('pcf-eureka-client').Eureka;
console.log("Eureka Client");
// example configuration 
const client = new Eureka({
  // application instance information 
  instance: {
    app: 'EmployeeServiceTechm',
    hostName: 'https://employeeservicetechm.cfapps.io',
    //ipAddr: 'https://employeeservicetechm.cfapps.io',
    port: 443,
    vipAddress: 'https://employeeservicetechm.cfapps.io',
    dataCenterInfo: {
      name: 'PCF',
    },
  },
  eureka: {
    serviceUrl: [
      'https://eureka-e301f532-19bc-42e0-bf0f-99f12992a63d.cfapps.io/'
    ]
  },
  oauth2: {
      clientCredentials: {
          client_id: 'p-service-registry-ab034ced-f137-4574-a102-66dc7ed5fd92',
          client_secret: '56LyRFlvmyam',
          access_token_uri: 'https://p-spring-cloud-services.uaa.run.pivotal.io/oauth/token'
      }
  }
});
client.start();
//const appInfo = client.getInstancesByAppId('ServiceRegistryTechM');
//console.log("Pardhu"+appInfo);