var ready = false;
var babyfound = false; 
var babyfound_previous_processed_state = false;

function setup() 
{
  canvas = createCanvas(screen.width/2,screen.height/2);
  canvas.center();
  capture = createCapture(VIDEO);
  capture.hide();
  objectDetector = ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded() 
{
  console.log("Cocossd is loaded");
}

function draw() 
{
  image(capture,0,0,screen.width/2,screen.height/2);

  if (ready) 
  {
    objectDetector.detect(capture,gotResult);
  }
}

function start() 
{
  ready = true;
}

function gotResult(error, results) 
{
  if (error) 
  {
    console.log(error);
  }
  else
  {
    babyfound = false;
    for (i = 0; i < results.length; i++) 
    {
      if (results[i].label == "person") 
      {
        babyfound = true;
        break;
      }
    }
    if (!babyfound) 
    {
      console.log("0");
      if (babyfound != babyfound_previous_processed_state)
      {
        if (!window.speechSynthesis.speaking)
        {
          saytext("Oh no your baby is lost.");
          babyfound_previous_processed_state = babyfound;
        }
      }
    }
    else
    {
      console.log("1");
      if (babyfound != babyfound_previous_processed_state)
      {
        if (!window.speechSynthesis.speaking)
        {
          saytext("Found");
          babyfound_previous_processed_state = babyfound;
        }
      }
    }
  }
}

function saytext(text) 
{
  const sound = new SpeechSynthesisUtterance(text);
  sound.rate = 1;
  sound.volume = 1;
  speechSynthesis.speak(sound);
}
