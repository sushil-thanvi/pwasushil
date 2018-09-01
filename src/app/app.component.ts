import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 export class AppComponent implements OnInit {
  title = 'app';
  deferredPrompt;

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
           
  window.addEventListener('appinstalled', (event) => {
   alert('installed');
  });
  
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
}
}
