

/////////////// SINGLE LETTER TO DISPLAY.
/////////////// LETTER CASE IMPORTANT, SEE FONTS UNDER PRELOAD.
let currentLetter = "H"

/////////////// CONTROL SIZE OF PIXELS
let pixelX = 0.25;
let pixelY = 10;

let sizeX;
let sizeY;
let randRot;
let scaledWidth;
let scaledHeight;
let scaledFactor;

let speed = 2;
let space = 8;

/////////////// DEFINED FROM 0 to 1.
/////////////// 0 IS TOP OF THE CANVAS.
/////////////// 1 IS BOTTOM OF CANVAS.
let runHeight = 0.7;
let start = 0.85;


/////////////// VARIABLES FOR PROCESSING AND ENABLING DRAWING
let lineCount = 0;
let lineCountMax = 0;
let indexCount = 0;
let indexCountMax = 0;
let drawStart = 0;
let count = 0;
let layerArray = []; //Array holds data per layer and is wiped after each layer





function preload() {
  
  /////////////// SWITCH BETWEEN FONTS. SOME ARE LOWERCASE.
  
  // alphabet = loadJSON('fancy2.json'); // lowercase
  // alphabet = loadJSON('fancy.json'); // lowercase
  alphabet = loadJSON('HI.json'); // 'H' for HI
  // alphabet = loadJSON('comic.json'); // lowercase
  // alphabet = loadJSON('alphabet.json'); // UPPERCASE
  // alphabet = loadJSON('thumbs.json'); //'a' for THUMB
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSB, 255)
  noStroke();
  
  randH = random(0, 255)
  randRot = random(-50, 50)
  sizeX = random(70, 100);
  sizeY = random(20,40);
  
  scaledWidth = space * sizeX;
  scaledHeight = height * runHeight;
  lineCountMax = alphabet[currentLetter].length;
  scaledFactor = scaledHeight / lineCountMax * 0.5;

//   background(255);	
//   background(randH * 0.4, 150, 220, 40);

}

function draw() {
  
  // Deduces max number of times to run processing per line
  indexCountMax = alphabet[currentLetter][count].length * 2
  
  // Writes values into array as a parsed array of values per line
  for (let i = 0; i < alphabet[currentLetter][count].length; i++) {
    append(layerArray, alphabet[currentLetter][count][i][0] * sizeX)
    append(layerArray, alphabet[currentLetter][count][i][1] * sizeX)
  }
  
  translate(width * 0.5, start * height - count * speed * scaledFactor);
  scale(1, 0.2);
  rotate(-170 + count * 0.01 * randRot);
  
  
  for (let w = 0; w < sizeX; w++) {
    
    if( w < layerArray[indexCount]) {
      
    } else if (indexCount < indexCountMax) {
      indexCount++
      drawStart++
    }
    
    for (let h = 0; h < sizeY; h++){
      
      if (layerArray[indexCount] == 0) {
        
        // DO NOTHING
        
      } else if (drawStart % 2 == 1) {

        let n1 = noise(w * frameCount * 0.0001, 0.1)
        let n2 = noise(0.1, h * frameCount * 0.0001)
        n1 = map(n1, 0, 1, -25, 25)
        n2 = map(n2, 0, 1, -25, 25);

        fill(randH + h * 0.4, 150, 220, 140);

        push();
        translate((space * sizeX / 2) - (space * w), (space * sizeY / 2) - (space * h))
        rotate(-45 * n1)
        rect(n1, n2, pixelX , pixelY);
        pop();
      
      }
    } 
  }
  
  // RESET VARIABLES FOR NEXT LAYER
  count++
  layerArray = [];
  indexCount = 0;
  drawStart = 0;
  
  if (count * speed  > runHeight * height) {
    noLoop();
  } 
}

function keyPressed() {
    if (keyCode == '83') {
        saveCanvas('img', 'jpg');
    }
}
  
