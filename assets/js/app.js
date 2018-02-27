 $(document).ready(function() {

var contStart=$("#container-start");
var contQuest=$("#container-quest");
var contResult=$("#container-result");

contResult.hide();


// 	var queryURL = 'https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple';

//     $.ajax({
//                 url: queryURL,
//                 method: "GET"
//             }).then(function(response) {
//                 console.log(response);
        
    
// });
        

//start the game
$("#btn-start").on('click', function(){
contStart.hide();
var value=4;
var interval =setInterval(function() {
    value--;
    $('#timer-first').text(value);
    if (value === 0){ 
    	clearInterval(interval);
       Request();
    }
}, 1000);

 });

  
//ajax request
function Request(){
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET','https://opentdb.com/api.php?amount=8&difficulty=medium&type=multiple');
ourRequest.onload = function(){
 
 var ourData = JSON.parse(ourRequest.responseText);
 

console.log(ourData.results);
RenderHtML(ourData.results);
};

ourRequest.send();
  
}

//Fill html
function RenderHtML(data){
	var htmlString = '';
     
    for( var i=0;i<data.length;i++)
    {
    	htmlString += "<h3>" + data[i].question + "</h3>";
    	htmlString += "<input type='radio' name='contact'>" + data[i].correct_answer + "</input>";
    	for(var j=0; j<data[i].incorrect_answers.length;j++)
    	{
    		htmlString += "<input type='radio' name='contact'>" + data[i].incorrect_answers[j] + "</input>";
    	}
    	// data[i].incorrect_answers.each(function(val){
    	// 	htmlString += "<input type='radio'>" + val + "</input>";
    	// });

    }
    htmlString +="<hr>";

    htmlString +="<button type='submit' id='btn-submit'>Submit</button>";

    contQuest.append(htmlString);
  
}





 });