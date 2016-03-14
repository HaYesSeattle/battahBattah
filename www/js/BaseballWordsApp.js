
$(document).ready(function(){
  $(".collectAnswerPanel").hide();
  $(".successPanel").hide();
  //showIntroPanel = true;

  var newLevels = [
    {
      "name": "level1",
      "challenges": [
        {
          "word": ["can"],
          "wrong": ["zom"],
          "sound": "sound/UgotIt.mp3"
        },
        {
          "word": ["by"],
          "wrong": ["dv"],
          "sound": "sound/UgotIt.mp3"
        },
        {
          "word": ["this"],
          "wrong": ["zen"],
          "sound": "sound/UgotIt.mp3"
        },
        {
          "word": ["you"],
          "wrong": ["zaw"],
          "sound": "sound/UgotIt.mp3"
        },
        {
          "word": ["see"],
          "wrong": ["fry"],
          "sound": "sound/UgotIt.mp3"
        },
        {
          "word": ["for"],
          "wrong": ["aed"],
          "sound": "sound/UgotIt.mp3"
        },
        {
          "word": ["the"],
          "wrong": ["zn3"],
          "sound": "sound/UgotIt.mp3"
        },
        {
          "word": ["and"],
          "wrong": ["mbo"],
          "sound": "sound/UgotIt.mp3"
        }
      ]
    }, 
    {
      "name": "level2",
      "challenges": [
        {
          "word": ["is"],
          "wrong": ["by"],
          "sound": "sound/can.mp3"
        },
        {
          "word": ["have"],
          "wrong": ["nwd"],
          "sound": "sound/can.mp3"
        },
        {
          "word": ["with"],
          "wrong": ["rjn"],
          "sound": "sound/can.mp3"
        },
        {
          "word": ["on"],
          "wrong": ["am"],
          "sound": "sound/can.mp3"
        },
        {
          "word": ["like"],
          "wrong": ["zqy"],
          "sound": "sound/can.mp3"
        },
        {
          "word": ["do"],
          "wrong": ["ba"],
          "sound": "sound/do.mp3"
        }
      ]
    },
  ];

  var answerArr = [ ];
  var wrongAnswerArr = [ ];

  // combined possibles in new array
  var allAnswers = [ ];
  // tracks correct answer
  var attemptArr = [ ];
  // loads an answer to target
  var tappedItem = "";
  // tracks what letter is next in answer
  var nextLetterUp = 0;

  var solutionMp3 = "";

  reloadGame();
  
  console.log(" initial game load:: ");
  
  function reloadGame(){
    // current object and item
    var currentLevel = 0;
    
    var currentChallengeLength = newLevels[currentLevel].challenges.length;
    var currentChallengeNode = Math.floor(Math.random()*currentChallengeLength);
    var currentChallenge = newLevels[currentLevel].challenges[currentChallengeNode];

    var randomAnswerArr = [ currentChallenge.word ];
    answerArr = randomAnswerArr.toString();

    var randomWrongAnswerArr = [ currentChallenge.wrong ];
    wrongAnswerArr = randomWrongAnswerArr.toString();

    solutionMp3 = [ currentChallenge.sound ];
    
    console.log(" :::::: RELOAD GAME  ::::::::::::::: current challenge length: "+currentChallengeLength+" answerArr :"+answerArr);

    
    if (attemptArr.length > 0 ){
      attemptArr = [ ]; 
      $(".introPanel").show(); 
      $("ul.answerarea").empty();
      setUpIntroPanel();
      //$("ul.answerarea li").removeClass("correctLetter");
      // answerArr.push( "b","y" );
    }
    else{
      setUpIntroPanel();
    };

    function setUpIntroPanel(){
       $(".introMsg").text(answerArr)
      //console.log( "SET UP INTRO PANEL ::: allAnswers "+allAnswers+" answer array "+answerArr+" attemptArr "+attemptArr); 
       
      setTimeout(function(){
        $(".introPanel").hide();
        setUpLoad();
      }, 5000);
    };

    function setUpLoad() {
      for (var i=0; i < answerArr.length; i++) {
          var li = $('<li/>')
              //.addClass('letterItem'+[i])
              .text(answerArr[i])
              .appendTo('ul.answerarea');
        };
      loadTarget();
    };
  };


  // load one of the letters to the target
  function loadTarget(){
    // makes sure the first letter is not undefined and then changes nextLetterUp to the next letter in answer
    if (attemptArr.length > 0){
      nextLetterUp = attemptArr.length;
      //console.log(" nextup letter if attemptArr length greater than 0:: "+attemptArr);
    }else{
      nextLetterUp=0;
      //console.log(" nextup letter else attemptArr length (not) greater than 0:: "+attemptArr);
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
    
    //console.log( "LOAD TARGET ::: new letter loaded "+tappedItem+" allAnswers Array:"+allAnswers ); 
    
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
    //console.log( "pitchBall function after timer :: tappedItem "+tappedItem);
  };
  
  $( "#character" ).click(function() {
      // run batting animation
      console.log( "batter animation happens now" );

      if(jQuery.inArray(tappedItem, answerArr) !== -1){
          sucess();
      }
      else{
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
    
    $('#wrongAnswerSound').attr('src', 'sound/nope-try-again.mp3');
      document.getElementById('wrongAnswerSound').play();
      
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
      
    });
    $('#successHitSound').attr('src', 'sound/stadiumCheer.mp3');
      document.getElementById('successHitSound').play();

    $(".letters").stop().animate({opacity: '0.1'}, 200);

    //console.log( "success  tappedItem: "+tappedItem+" answer array "+answerArr);

    // check if problem is solved after certain time to make sure things have happened
    setTimeout(function(){
      if (answerArr.length == attemptArr.length){
        finale();
      }
      else{  
        //console.log("success - answer array = attempt array length -- else --- loadTarget")
        loadTarget();
      };
    }, 500);
  };

  function finale(){
    answerArr = [ ]; 
    $(".successPanel").show();
    $('.successPanel').off('click');
    $('#successSound').attr('src', 'sound/fireworks.mp3');
      document.getElementById('successSound').play();
    $('#solutionSound').attr('src', solutionMp3);
      document.getElementById('solutionSound').play();
     // 
    $( ".successPanel" ).click(function() {
      $(".successPanel").hide();
      reloadGame();
      console.log('reload game in finale :::::::::::::::'+" answer array "+answerArr+" attemptArr"+attemptArr); 
    }); 
    console.log('finale');   
  };
});