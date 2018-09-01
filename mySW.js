 self.addEventListener('install',function(event){
     console.log('services worker installing', event);
 });

 self.addEventListener('activate',function(event){
    console.log('services worker activating', event);
});

self.addEventListener('fetch',function(event){
    console.log('services worker fething something', event);
});