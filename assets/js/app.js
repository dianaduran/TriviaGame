 $(document).ready(function() {


//container html
var contStart=$("#container-start");
var contQuest=$("#container-quest");
var contResult=$("#container-result");
var divBtn=$("#div-btnQuest");

var correctAns="";
var correct=0,
    incorrect=0,
    noAns=0;

contResult.hide();
divBtn.hide();


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
ourRequest.open('GET','https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple');
ourRequest.onload = function(){
 
 var ourData = JSON.parse(ourRequest.responseText);
 
 console.log(ourData.results);
 RenderHtML(ourData.results);
  };
 	ourRequest.send();
	if(divBtn.css('display') == 'none'){
	divBtn.show();
     }
}

//Fill html
function RenderHtML(data){
	var htmlString = '';
	var arrResp=[];
	
     
    for( var i=0;i<data.length;i++)
    {
    	arrResp=[];
    	htmlString += "<h3>" + data[i].question + "</h3>";
    	arrResp.push(data[i].correct_answer);
    	correctAns=data[i].correct_answer;

    	for(var j=0; j<data[i].incorrect_answers.length;j++)
    	{
    		arrResp.push(data[i].incorrect_answers[j]);
    		
    	}

    	arrResp.sort();
		$.each(arrResp, function (index, value){
    	   	//debugger;	
    		htmlString += "<input type='radio' name='contact' value="+value+">" + value + "</input>";
    		//contStart.hide();
    	});
    }

    htmlString +="<hr>";
	contQuest.append(htmlString);
    console.log(correctAns);
}


$("#btn-submit").on("click", function(){
	
	 if(!$('input[name="contact"]').is(':checked'))
		  {
		  	noAns++;
		    console.log(noAns);
		  }
    

	else if ($("input[value ="+ correctAns +"]").is(":checked")) 
	  {
	          correct++;
	          console.log(correct);
	    }
	else 
	   {	
	   	incorrect++;
	    console.log(incorrect);
	    }
	 
    	contQuest.empty();
		Request();

});





 });