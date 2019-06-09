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
var day = true;
nightmode.addEventListener('click', function(event) {
  var posties = document.getElementsByClassName('post'), i, len;
  var backgc = document.getElementsByTagName('body');

  for (i = 0, len = posties.length; i < len; i++) {   //changes the post border color and background color - works rn
    if(day === true){
      posties[i].style.border = '2px solid #04213E' //nightmode border color
      posties[i].style.backgroundColor = '#05284A'  //nightmode bg color
    } else {
      posties[i].style.border = '2px solid #789BBD' //day border
      posties[i].style.backgroundColor = '#C2C9DD'   //night bg
    }
  };
  for (i = 0, len = backgc.length; i < len; i++) {  //changes the main background color - works rn
    if(day === true){
      backgc[i].style.backgroundColor = '#453E35'   //night main bg
      backgc[i].style.color = 'white';
    } else {
      backgc[i].style.backgroundColor = '#FDEEDD'   //day main bg
      backgc[i].style.color = 'black';
    }
  };
  if(day === true){
    document.getElementById('sidebar').style.backgroundColor = '#432602'   //night sidebar
  } else {
    document.getElementById('sidebar').style.backgroundColor = '#F9BF77'}   //day side
  if(day === true){
    document.getElementById('sidebar-hide-button').style.backgroundColor = '#432602'  //night button
  } else {
    document.getElementById('sidebar-hide-button').style.backgroundColor = '#F9BF77'   //day button
  }

  if(day === true){day = false;}else{day = true;};
});

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
  }
}

// Toggle Replies
function toggleReplies(event) {
  if(event.target.parentNode.parentNode.parentNode.childNodes[5].classList.contains("hide")) {
    event.target.parentNode.parentNode.parentNode.childNodes[5].classList.remove("hide");
    event.target.innerText = "Hide Replies";
  } else {
    event.target.parentNode.parentNode.parentNode.childNodes[5].classList.add("hide");
    event.target.innerText = "View Replies";
  }
}

// Show Create Reply
function showCreateReply(event) {
  if(event.target.parentNode.parentNode.parentNode.childNodes[3].classList.contains("hide")) {
    event.target.parentNode.parentNode.parentNode.childNodes[3].classList.remove("hide");
  }
}

// Hide Create Reply
function hideCreateReply(event) {
  if(!event.target.parentNode.classList.contains("hide")) {
    event.target.parentNode.classList.add("hide");
    event.target.parentNode.childNodes[1].childNodes[1].value = "";
  }
}

// Send reply data to the server
function postReply(event) {
  if (event.target.parentNode.childNodes[1].childNodes[1].value) {
    var request = new XMLHttpRequest();
    var pageTitle = document.getElementById('page-title').innerText;
    var postId = event.target.parentNode.parentNode.childNodes[1].getAttribute('postId');

    var requestURL = '/' + pageTitle + '/' + postId + '/addReply';
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
        previousTarget.parentNode.childNodes[1].childNodes[1].value = "";
        // Update UI to show that the reply was successfully stored.
      }
    });

    request.send(requestBody);
  }
}

// New Post
/*var addPost = document.getElementById('new-post-button');

addPost.addEventListener('click', handleNewPost);

function handleNewPost() {
  console.log('New post button was clicked');
  var srcElement = document.getElementByClassName(hide);
  for(var i = 0; i < srcElement.length; i++) {
    srcElement[i].style.dispaly = 'block';
  }
}

var button = document.getElementsByClassName('close-button');

button[0].addEventListener('click', handlePostCloseButton);

function handlePostCloseButton(event) {
        console.log('close button was clicked');
        srcele = document.getElementsByClassName(hide);
        for(i = 0; i <srcele.length; i++){
                srcele[i].style.display = 'none';
        }
        document.getElementById(input for photo ID).value = "";
        document.getElementById('post-text').value = "";
}



button = document.getElementsByClassName('cancel-button');

button[0].addEventListener('click', handlePostCancelButton);

function handlePostCancelButton(event) {
        console.log('cancel button was clicked');
        srcele = document.getElementsByClassName(hide);
        for(i = 0; i <srcele.length; i++){
                srcele[i].style.display = 'none';
        }
        document.getElementById(input for photo ID).value = "";
        document.getElementById('post-text').value = "";
}*/
