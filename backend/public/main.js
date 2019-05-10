'use strict';


function Demo() {
    $(function() {
        this.$signInButton = $("#auth");

        this.$signInButton.on('click', this.signIn.bind(this));
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }.bind(this));
}

Demo.prototype.signIn = function() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};


Demo.prototype.authenticatedRequest = function(method, url, body) {
    if (!firebase.auth().currentUser) {
      throw new Error('Not authenticated. Make sure you\'re signed in!');
    }
  
    // Get the Firebase auth token to authenticate the request
    return firebase.auth().currentUser.getToken().then(function(token) {
      var request = {
        method: method,
        url: url,
        dataType: 'json',
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
      };
  
      if (method === 'POST') {
        request.contentType = 'application/json';
        request.data = JSON.stringify(body);
      }
  
      console.log('Making authenticated request:', method, url);
      return $.ajax(request).catch(function() {
        throw new Error('Request error: ' + method + ' ' + url);
      });
    });
  };

window.demo = new Demo();