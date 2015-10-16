// GLOBAL BEN OBJECT FOR HOLDING ALL THE VARIABLES

var BEN = {


    //ASSET VARIABLES

	assetsToLoad: [],
	assetsToLoad2: [],
	assetsToLoad3: [],
	assetsToLoad4: [],
	assetsLoaded: 0,
	assetsLoaded2: 0,
	assetsLoaded3: 0,
	assetsLoaded4: 0,
	
	//MOUSE AND TOUCH DETECTION VARIABLES
	
	mouseY: 0,		
    mouseY: 0,

    tapX: undefined,		
    tapY: undefined,
	
    //EASING CONSTANT

    EASING: 0.18,
	
	//MOUSE AND TOUCH DOWN AND UP VARIABLES

    mouseDown: false, 
    touchDown: false,  

    mouseUp: false,
    touchUp: false,

	//VARIABLES FOR DETERMINING CURRENT PAGE, CURRENT SIDE AND CURRENT HOT SPOT VALUE
	 
    currentPage: -1,

    currentSide: 0,
	
	currentHotSpotValue: "loading",    

    //ARRAYS FOR HOLDING FONT AND RETRO CARDS 	
	
    pages: [],
    rears: [],
	
	//BOOLEANS FOR ENABLING SWIPING TO LEFT OR RIGHT

    moveLeft: false,
    moveRight: false,

	//BOOLEANS FOR LANGUAGE CHOICE
	
    englishChosen: false,
    spanishChosen: false,
	
	englishOn: false,
	spanishOn: false,

    folding: false,
    unfolding: false,

    //RESIZE VARIABLES
	
    WIDTH: 640, 
    HEIGHT:  960, 
    RATIO:  0,
	scale: 1,
	offset: {top: 0, left: 0},
    currentWidth:  0,
    currentHeight:  0,
    canvas: null,
	
	//SWIPING VARIABLES
	
	fingerCount: 0,
	startX: 0,
	startY: 0,
	curX: 0,
	curY: 0,
	deltaX: 0,
	deltaY: 0,
	horzDiff: 0,
	vertDiff: 0,
	minLength: 20, 
	swipeLength: 0,
	swipeAngle: null,
	swipeDirection: null,
	
	//SPRITE VARIABLES
	
	sourceX: 0,
    sourceY: 0,
    sourceWidth: 64,
    sourceHeight: 64,
    width: 64,
    height: 64,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
	  
  //GETTERS FOR DETERMINING COLLISION DETECTION LATER
  
  centerX: function()
  {
    return this.x + (this.width / 2);
  },
  centerY: function()
  {
    return this.y + (this.height / 2);
  },
  halfWidth: function()
  {
    return this.width / 2;
  },
  halfHeight: function()
  {
    return this.height / 2;
  },
	
  //INITIALIZING THE SCREEN

  init: function() {
	
    BEN.RATIO = BEN.WIDTH / BEN.HEIGHT;
    BEN.currentWidth = BEN.WIDTH;
    BEN.currentHeight = BEN.HEIGHT;
    canvas.width = BEN.WIDTH;
    canvas.height = BEN.HEIGHT;
	},

    //METHOD FOR DYNAMICALLY RESIZING THE SCREEN

    resizeScreen: function() {

        BEN.currentHeight = window.innerHeight;
	    BEN.currentWidth = BEN.currentHeight * BEN.RATIO;
		
        if (BEN.android || BEN.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }
		
	   // if(window.innerHeight === 615)
		//{
		//canvas.style.width = 350 + 'px';
		//context.fillText(canvas.style.width,100,100)
		//context.fillText(canvas.style.height,100,200);
		//}
		
		/*
		if(window.innerWidth > window.innerHeight)
		{
        canvas.style.width = (BEN.currentWidth / 1.5352) + 'px';
        canvas.style.height = BEN.currentHeight + 'px';
		canvas.style.marginTop = 0 + "px";
		}
		else if (window.innerHeight > window.innerWidth)
		{
		canvas.style.width = (window.innerWidth / 2.0) + 'px';
        canvas.style.height = (window.innerHeight / 1.1)+ 'px';
		//canvas.style.margin-top = (400 + "px");
		//canvas.style.width = 0 + "px";
		//canvas.style.marginLeft = -40 + "px";
		}
		*/
        canvas.style.width = BEN.currentWidth + 'px';
        canvas.style.height = BEN.currentHeight + 'px';
		
		if(window.innerHeight > 400 && BEN.android === true)
		{
		canvas.style.width = (window.innerWidth / 1) + 'px';
        canvas.style.height = (window.innerHeight / 1)+ 'px';
		//canvas.style.marginBottom = 50 + "px";
		}
		
		BEN.scale = BEN.currentWidth / BEN.WIDTH;
		
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }
};