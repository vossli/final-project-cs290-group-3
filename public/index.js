// Sidenav toggle
var isNavHidden = true; // Inital position
var sideBarWidth = "20%";
var sidebarButton = document.getElementById("sidebar-hide-button");
sidebarButton.addEventListener('click', toggleNav);
toggleNav();

function toggleNav() {
  if(isNavHidden) {
    document.getElementById("sidebar").style.width = sideBarWidth;
    document.getElementById("main").style.marginLeft = sideBarWidth;
    document.getElementById("main").style.width = "78%";    // container width minus sidebar width
    document.getElementById("sidebar-hide-button").style.left = sideBarWidth;
    document.getElementById("hide-button-content").innerText = "<";
    isNavHidden = false;
  } else {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.width = "98%";    // default container width
    document.getElementById("sidebar-hide-button").style.left = "0";
    document.getElementById("hide-button-content").innerText = ">";
    isNavHidden = true;
  }
}

//nightmode
var nightmode = document.getElementsByClassName('settings-button')[0];
var day = localStorage['day'] || 'true';
setNightMode();
nightmode.addEventListener('click', function(event) {
  if(day === 'true'){
    day = 'false';
    localStorage['day']='false';
  }else{
    day = 'true';
    localStorage['day']='true';
  };
  setNightMode();
});

function setNightMode() {
  var posties = document.getElementsByClassName('post'), i, len;
  var backgc = document.getElementsByTagName('body');
  var replies = document.getElementsByClassName('reply-container');
  var createrep = document.getElementsByClassName('create-reply');
  var inputs = document.querySelectorAll('input[type=text]');
  var buttons = document.getElementsByTagName('button');

  for (i = 0, len = buttons.length; i < len; i++) {   //changes the button color
    if(day === 'true'){
      buttons[i].style.backgroundColor = '#13110f'  //nightmode button
      buttons[i].style.color = '#9f9791';
    } else {
      buttons[i].style.backgroundColor = ''   //day button
      buttons[i].style.color = '';
    }
  };
  for (i = 0, len = inputs.length; i < len; i++) {   //changes the input field color
    if(day === 'true'){
      inputs[i].style.backgroundColor = '#13110f'  //nightmode input
    } else {
      inputs[i].style.backgroundColor = ''   //day reply
    }
  };
  for (i = 0, len = posties.length; i < len; i++) {   //changes the post border color and background color
    if(day === 'true'){
      posties[i].style.border = '2px solid #453d34' //nightmode border color
      posties[i].style.backgroundColor = '#13110f'  //nightmode bg color
    } else {
      posties[i].style.border = '' //day border
      posties[i].style.backgroundColor = ''   //day bg
    }
  };
  for (i = 0, len = backgc.length; i < len; i++) {  //changes the main background color
    if(day === 'true'){
      backgc[i].style.backgroundColor = '#323147'   //night main bg
      backgc[i].style.color = '#9f9791';            //night text
    } else {
      backgc[i].style.backgroundColor = ''   //day main bg
      backgc[i].style.color = '';              //day text
    }
  };
  for (i = 0, len = replies.length; i < len; i++) {   //changes the reply color
    if(day === 'true'){
      replies[i].style.backgroundColor = '#13110f'  //nightmode reply
    } else {
      replies[i].style.backgroundColor = ''   //day reply
    }
  };
  for (i = 0, len = createrep.length; i < len; i++) {   //changes the create reply.
    if(day === 'true'){
      createrep[i].style.backgroundColor = '#13110f'  //nightmode create reply
    } else {
      createrep[i].style.backgroundColor = ''   //day
    }
  };
  if(day === 'true'){
    document.getElementById('sidebar').style.backgroundColor = '#13110f'   //night sidebar
  } else {
    document.getElementById('sidebar').style.backgroundColor = ''}   //day side
  if(day === 'true'){
    document.getElementById('sidebar-hide-button').style.backgroundColor = '#13110f'  //night button
  } else {
    document.getElementById('sidebar-hide-button').style.backgroundColor = ''   //day button
  }
}

// Add event listener to all posts and pass clicked element to postEventListener function
var postElements = document.getElementsByClassName("post-and-replies");
for(var i = 0; i < postElements.length; i++) {
  postElements[i].addEventListener('click', postEventListener);
}

function postEventListener(event) {
  if(event.target.classList.contains("view-button")){
    toggleReplies(event);
  } else if(event.target.classList.contains("reply-button")) {
    showCreateReply(event);
  } else if(event.target.classList.contains("cancel-reply-button")) {
    hideCreateReply(event);
  } else if(event.target.classList.contains("create-reply-button")) {
    postReply(event);
  } else if(event.target.classList.contains("like-button")) {
    incPostLikes(event);
  } else if(event.target.classList.contains("thread-button")) {
    threadView(event);
  } else if(event.target.classList.contains("report-button")){
    report(event);
  }
}

// Toggle Replies
function toggleReplies(event) {
  if(event.target.parentNode.parentNode.parentNode.childNodes[5].classList.contains("hide2")) {
    event.target.parentNode.parentNode.parentNode.childNodes[5].classList.remove("hide2");
    event.target.innerText = "Hide Replies";
  } else {
    event.target.parentNode.parentNode.parentNode.childNodes[5].classList.add("hide2");
    event.target.innerText = "View Replies";
  }
}

// Show Create Reply
function showCreateReply(event) {
  if(event.target.parentNode.parentNode.parentNode.childNodes[3].classList.contains("hide2")) {
    event.target.parentNode.parentNode.parentNode.childNodes[3].classList.remove("hide2");
  }
}

// Hide Create Reply
function hideCreateReply(event) {
  if(!event.target.parentNode.classList.contains("hide2")) {
    event.target.parentNode.classList.add("hide2");
    event.target.parentNode.childNodes[1].childNodes[1].value = "";
  }
}

// Send request to increment like on a post
function incPostLikes(event) {
  var request = new XMLHttpRequest();
  var postId = event.target.parentNode.parentNode.getAttribute('postId');
  var requestURL = '/' + postId + '/addLike';
  request.open('POST', requestURL);
  var previousTarget = event.target;
  request.addEventListener('load', function (event) {
    if (event.target.status !== 200) {
      var message = event.target.response;
      alert("Error incrementing likes in database: " + message);
    } else {
      previousTarget.childNodes[0].innerText = event.target.response;
    }
  });

  request.send();
}

// sends to the thread View
function threadView(event) {
  var postId = event.target.parentNode.parentNode.getAttribute('postId');
  var requestURL = '/thread/' + postId;
  console.log( "Thread view requestURL:", requestURL );
  window.location.href = requestURL;
}

// Enable replies and create reply by default on thread view
var splitURL = window.location.href.split("/");
var endOfURL = splitURL[splitURL.length-2];
if(endOfURL === 'thread') {
  var replyContainer = document.getElementsByClassName('reply-container')[0];
  replyContainer.classList.remove("hide2");
  replyContainer.parentNode.childNodes[1].childNodes[9].childNodes[5].innerText = "Hide Replies";
  var createReply = document.getElementsByClassName('create-reply')[0];
  createReply.classList.remove("hide2");
}

// Send reply data to the server
function postReply(event) {
  if (event.target.parentNode.childNodes[1].childNodes[1].value) {
    var request = new XMLHttpRequest();
    var postId = event.target.parentNode.parentNode.childNodes[1].getAttribute('postId');

    var requestURL = '/' + postId + '/addReply';
    request.open('POST', requestURL);
    var replyObj = {
      "text": event.target.parentNode.childNodes[1].childNodes[1].value
    };
    var requestBody = JSON.stringify(replyObj);
    request.setRequestHeader (
      'Content-Type', 'application/json'
    );
    var previousTarget = event.target;
    request.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        var message = event.target.response;
        alert("Error storing reply in database: " + message);
      } else {
        // Update UI to show that the reply was successfully stored.
        previousTarget.parentNode.childNodes[1].childNodes[1].value = "";
      }
    });

    request.send(requestBody);
  }
}


//report button
function report(event) {
  event.target.parentNode.parentNode.style.display = "none";
  alert("This post has been sent to moderators.");
}


var newPostButton = document.getElementsByClassName('new-post-button');
newPostButton[0].addEventListener('click', handleNewPostButton);

function handleNewPostButton(event) {
  console.log('New Twit was clicked');
  var srcElement = document.getElementsByClassName('hide');
  for(var i = 0; i < srcElement.length; i++) {
    srcElement[i].style.display = 'block';
  }
}

var closeButton = document.getElementsByClassName('close-button');
closeButton[0].addEventListener('click', handleCloseButton);

function handleCloseButton(event) {
  console.log('close button was clicked');
  srcElement = document.getElementsByClassName('hide');
  for(i = 0; i < srcElement.length; i++) {
    srcElement[i].style.display = 'none';
  }
  document.getElementById('post-text').value = "";
  document.getElementById('picture-text').value = "";
  document.getElementById('topic-text').value = "";
}

var cancelButton = document.getElementsByClassName('cancel-button');
cancelButton[0].addEventListener('click', handleCancelButton);

function handleCancelButton(event){
  console.log('cancel button was clicked');
  srcElement = document.getElementsByClassName('hide');
  for(i = 0; i < srcElement.length; i++){
    srcElement[i].style.display = 'none';
  }
  document.getElementById('post-text').value = "";
  document.getElementById('picture-text').value = "";
  document.getElementById('topic-text').value = "";
}

var acceptButton = document.getElementsByClassName('accept-button');
acceptButton[0].addEventListener('click', handleAcceptButton)

function handleAcceptButton(event) {
  console.log('accept was clicked');


  document.getElementById('post-text').value = "";
  document.getElementById('picture-text').value = "";
  document.getElementById('topic-text').value = "";
}

//search bar
var search = document.getElementById('search-button');
search.addEventListener('click', function(event){
  var searchbar = document.getElementById('search-input').value;
  var input = document.getElementsByClassName('post-and-replies');
  console.log(searchbar);
  for(var i = 0; i < postElements.length; i++){
    console.log(input[i].innerText);
    if(!input[i].innerText.includes(searchbar))
      input[i].style.display = "none";
    else {
      input[i].style.display = "";
    }
  }
})
