import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 export class AppComponent implements OnInit {
  title = 'app';
  deferredPrompt;
  myDynamicManifest;
  
  
 
 // readonly VAPID_PUBLIC_KEY = "BExhzsLHvuTuR9Omqd566SxFW5YzcdWdto-SrhKPq8dI3MCL2nIA0GlOuAxo3QXBpMkB2ymOQLJPtx0dehS4w_Q";


  constructor(){
    this.myDynamicManifest  = {
      // "name": "App first",
       //"short_name": "app1",
       "orientation": "any",
       "display": "standalone",
       "description": "Something dynamic",
       "start_url": location.origin + "/index.html",
       "background_color": "#000000",
       "theme_color": "#0f4a73",
       "icons": []
     }
  }


ngOnInit(){
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    console.log('before installed');
    e.preventDefault();
    // Stash the event so it can be triggered later on the button event.
    this.deferredPrompt = e;
    return false;
  });
   
  //button click event to show the promt
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('display-mode is standalone');
    alert('standalone');
  }  
  
  window.addEventListener('appinstalled', (event) => {
   alert('installed');
  });
  
  fetch('https://httpbin.org/ip').then(function(res){
    console.log(res);
    return res.json();
  }).then(function(data){
    console.log(data);
  }).catch(function(err){
    console.log(err);
  });

  this.openManifest1();
  
}

  openBanner(){
    if(this.deferredPrompt){
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          alert('User accepted the prompt');
        } else {
          alert('User dismissed the prompt');
        }
        this.deferredPrompt = null;
      });
  }

  
};





openManifest1(){
  this.myDynamicManifest['name'] = "First App";
  this.myDynamicManifest['short_name'] = "App One";
  this.myDynamicManifest.icons = [];
  this.myDynamicManifest.icons.push({
    "src": location.origin + "/assets/first-256x256.png",
    "sizes": "256x256",
    "type": "image/png"
  });
  let stringManifest = JSON.stringify(this.myDynamicManifest);
  let blob = new Blob([stringManifest], {type: 'application/json'});
  let manifestURL = URL.createObjectURL(blob);
  document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/mySW.js').then(function(){
          console.log('service worker is registered from main.ts ');
    })
  }
};



openManifest2(){
  this.myDynamicManifest['name'] = "Second App";
  this.myDynamicManifest['short_name'] = "App Second";
  this.myDynamicManifest.icons = [];
  this.myDynamicManifest.icons.push({
    "src": location.origin + "/assets/app-icon-256x256.png",
    "sizes": "256x256",
    "type": "image/png"
  });
  let stringManifest = JSON.stringify(this.myDynamicManifest);
  let blob = new Blob([stringManifest], {type: 'application/json'});
  let manifestURL = URL.createObjectURL(blob);
  document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);
}


//fetch method provided by default js browser
 

}

