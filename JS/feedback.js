/*feedback*/
const feedbackText=document.getElementById('feedback-text');
const feedbackBox=document.getElementById('feedback');

//hiding the feedback box after 5 seconds
const hideFeedback=()=>{
    setTimeout(function(){
        feedbackBox.classList.add('not-visable');
    }
    ,5000);
}

//getting a massage and showing it in the feedback box
const sendFeedback=(message)=>{
    feedbackText.textContent=message;
    feedbackBox.classList.remove('not-visable'); //making it visable
    hideFeedback(); //hiding it
}

