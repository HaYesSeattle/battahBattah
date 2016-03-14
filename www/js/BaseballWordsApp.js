
$(document).ready(function(){
  $(".collectAnswerPanel").hide();
  $(".successPanel").hide();
  //showIntroPanel = true;

  var newLevels = [
    {
      "name": "level1",
      "challenges": [
        {
          "word": "c, a, n",
          "wrong": "d,i,v",
          "slug": "can",
          "sound": "sound/uppercase-vowels.mp3",
          "passes": 0
        },
        {
          "word": "b,y",
          "wrong": "d,v",
          "slug": "by",
          "sound": "sound/uppercase-vowels.mp3",
          "passes": 0
        },
        {
          "word": "a, n, d",
          "wrong": "d,i,v",
          "slug": "and",
          "sound": "sound/uppercase-vowels.mp3",
          
          "passes": 0
        },
        {
          "word": "t,h,e",
          "wrong": "d,i,v",
          "slug": "the",
          "sound": "sound/uppercase-vowels.mp3",
          "passes": 0
        }
      ]
    }, 
    {
      "name": "level2",
      "challenges": [
        {
          "word": "t, h, i, s",
          "wrong": "d,a,v",
          "slug": "this",
          "sound": "sound/uppercase-vowels.mp3",
          "passes": 0
        },
        {
          "word": "b, a, l, l",
          "wrong": "d,i,v",
          "slug": "can",
          "sound": "sound/uppercase-vowels.mp3",
          "passes": 0
        }
      ]
    },
  ];

  var answerArr = [ "g", "r","a","c", "e" ];
  var wrongAnswerArr = [ "t", "i", "z" ];

  // combined possibles in new array
  var allAnswers = [ ];
  // tracks correct answer
  var attemptArr = [ ];
  // loads an answer to target
  var tappedItem ;
  // tracks what letter is next in answer
  var nextLetterUp = 0;
  
  // this changes original arrays as well :::: 
  //var allAnswers = $.merge( answerArr, wrongAnswerArr );
  
  //this works but cant push one element of array at a time
  // allAnswers.push.apply(allAnswers, answerArr);
  // allAnswers.push.apply(allAnswers, wrongAnswerArr);

  // array = c, and "d,o,g"
  // allAnswers.push(wrongAnswerArr);
  // allAnswers.push(answerArr[0]);

  $(".introMsg").text(answerArr.join(""))
  console.log( "document loaded ::: allAnswers "+allAnswers); 
    
  setTimeout(function(){
    $(".introPanel").hide();
    loadTarget();
  }, 5000);

  $.each(answerArr, function(i)
  {
      var li = $('<li/>')
          //.addClass('letterItem'+[i])
          .text(answerArr[i])
          .appendTo('ul.answerarea');
  });
  
  // load one of the letters to the target
  function loadTarget(){
    // makes sure the first letter is not undefined and then changes nextLetterUp to the next letter in answer
    if (attemptArr.length !== 0){
      nextLetterUp = attemptArr.length;
      console.log(" nextup letter:: "+answerArr[nextLetterUp]);
    }else{
      nextLetterUp=0;
      console.log(" nextup letter:: "+answerArr[nextLetterUp]);
    };
    // array that combines wrong answers with next correct answer (thrice) - to increase odds of it showing up
    allAnswers = wrongAnswerArr.concat(answerArr[nextLetterUp], answerArr[nextLetterUp], answerArr[nextLetterUp] );
    // choose item to display randomly from array
    tappedItem = allAnswers[Math.floor(Math.random() * allAnswers.length)];
    
    // set starting points for pitch
    $(".letterBoundary").stop().show();
    $(".letterBoundary").stop().css({ 'left': '40%','top':'30%', "background-size":"20%", 'opacity': '1' });
    $('.letters').css({'opacity': '0'});
    $('.letters').text(tappedItem);
    
    console.log( "LOAD TARGET ::: new letter loaded "+tappedItem+" allAnswers Array:"+allAnswers ); 
    
    pitchBall();
  };
 
  function pitchBall(){
    setTimeout(function(){
      $(".letterBoundary").animate({ 'left': '50%','top':'50%', "background-size":"100%" }, 2500, function(){
        // after the animation hide ball....
         $(".letterBoundary").animate({ 'opacity': '0.1','top':'110%' }, 500, function(){
            // after the animation....
            loadTarget();
          });
      });
      $(".letters").animate({opacity: '1'}, 100);
    }, 3000);
    console.log( "pitchBall function after timer :: tappedItem "+tappedItem);
  };
  
  $( "#character" ).click(function() {
      // run batting animation
      console.log( "batter animation happens now" );

      if(jQuery.inArray(tappedItem, answerArr) !== -1){
          //console.log( "tappedItem "+tappedItem+" in array "+answerArr);      
          console.log("answer array length "+answerArr.length+"/attmept arr "+attemptArr.length)
          sucess();
      }
      else{
           //console.log( " not in array "+tappedItem+" :: "+answerArr);
           fail();
      };
    });
  //console.log( "pitchBall function loaded :: tappedItem: "+tappedItem+" callAnswers "+allAnswers );

  function fail(){
    //console.log('fail - new array:'); 
    $(".letterBoundary").stop().animate({top: '10%', left: "-20%","background-size":"20%"}, 500, function(){
      // show fail screen with current letter
       $(".collectAnswerPanel").show();
       $("#collectedAnswer").text(tappedItem);
    });
    $(".letters").stop().animate({opacity: '0.1'}, .05);
     
    /// on click of fail screen hide it and load another
    $( ".collectAnswerPanel" ).click(function() {
      $(".collectAnswerPanel").hide();
      $(".letterBoundary").hide();
      loadTarget();
    }); 
  };

  function sucess(){
    attemptArr.push(tappedItem);
    var j = attemptArr.length;
  
    $(".letterBoundary").stop().animate({top: '0', "background-size":"20%"}, 200, function(){
      $("ul.answerarea li").eq([j-1]).addClass("correctLetter");
      $(".letterBoundary").hide();
      
      //return false;
    });
    $(".letters").stop().animate({opacity: '0.1'}, 200);

    console.log( "success  tappedItem: "+tappedItem+" answer array "+answerArr);

    // check if problem is solved after certain time to make sure things have happened
    setTimeout(function(){
      if (answerArr.length == attemptArr.length){
        finale();
      }
      else{  
        //console.log("else loadTarget")
        loadTarget();
      };
    }, 500);
  };

  // function stopAnimation() {
  //     $(".letterBoundary").stop();
  //     $(".letters").stop();
  //   };

  // function removeLetter() {
  //   // remove letter from possible answers array
  //   allAnswers.splice($.inArray(tappedItem, allAnswers),1);
  //   //console.log('remove letter - new array:'+allAnswers);
  // };

  function finale(){
    $(".successPanel").show();
    // console.log('finale');   
  };
});