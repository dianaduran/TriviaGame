 $(document).ready(function() {


//container html
var contStart=$("#container-start");
var contQuest=$("#container-quest");
var contResult=$("#container-result");
var divBtn=$("#div-btnQuest");
var btnAgain=$("#btn-again");

var correctAns="";
var correct=0;
var incorrect=0;
var noAns=0;

contResult.hide();
divBtn.hide();
btnAgain.hide();



//start the game
$("#btn-start").on('click', function(){
contStart.hide();
var value=4;
var interval=setInterval(function(){
	value--;
    $("#timer-first").addClass("timerFirt");
    $('#timer-first').text(value);
    if (value === 0)
    { 
     $('#timer-first').text("");
	   clearInterval(interval);
     $('body').removeClass("bodyClass");
     $('body').addClass("startGame");
     $("#timer-first").removeClass("timerFirt");
     $("#timer-first").addClass("timerSecond");
     $('#timer-first').text('0 : 30');
	   Request(); 
	   value=31;
	   var int2=setInterval(function(){
	   	
        value--;
        $('#timer-first').text('0 : '+value);
  	    divBtn.show();
        if(value == 0)
        {
        	divBtn.hide();
       	 	clearInterval(int2);
       	 	RenderContAns();
        }
       }, 1000);
    }

 }, 1000);
});

//function get the result
function RenderContAns(){
	var coA="<p> Correct Answer: "+correct+"</p>";
    var incA="<p> Incorrect Answer: "+incorrect+"</p>";
    var noA="<p> Unanswered: "+noAns+"</p>";
    contResult.append(coA,incA,noA);
    contResult.show();
    btnAgain.show();
    $('#timer-first').text("");
}

//button reset game
btnAgain.on('click', function(){
  	correctAns="";
  	correct=0;
  	incorrect=0;
  	noAns=0;
  	contResult.hide();
    divBtn.hide();
    contStart.show();
    contQuest.empty();
    contResult.empty();
    $("#timer-first").removeClass("timerSecond");
    $('#timer-first').text("");
    $('body').removeClass("startGame");
    $('body').addClass("bodyClass");
    btnAgain.hide();

})
  
//ajax request
function Request(){

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET','https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple');
ourRequest.onload = function(){
 
 var ourData = JSON.parse(ourRequest.responseText);
 
 //console.log(ourData.results);
 RenderHtML(ourData.results);
  };
 	ourRequest.send();
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
      console.log(correctAns);
    	$.each(arrResp, function (index,valor){
          
    	   	htmlString += '<input type="radio" name="contact" value="'+ valor +'">' + valor + '</input>';
    		});
    }

    htmlString +="<hr>";
	contQuest.append(htmlString);
   
}

//button test if the answers are ok
$("#btn-submit").on("click", function(){
	
	 if(!$("input[name='contact']").is(":checked"))
		  {
		  	noAns++;
		    console.log(noAns);
		  }
	else if ($("input[value ='"+ correctAns +"']").is(":checked")) 
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