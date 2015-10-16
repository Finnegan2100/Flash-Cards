
(function() {

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");

	initializeGame();
	
	function initializeGame() {
		
		window.addEventListener("mousemove",onMouseMove,false);
		window.addEventListener("mousedown",onMouseDown,false);
		window.addEventListener("mouseup",onMouseUp,false);

		canvas.addEventListener("touchmove", onTouchMove, false);
		canvas.addEventListener("touchstart", onTouchStart, false);
		canvas.addEventListener("touchend", onTouchEnd, false);
	}

	function onMouseDown(event) {
		
		BEN.mouseDown = true;
		BEN.mouseUp = false;
		event.preventDefault(); 
	}

	function onMouseUp(event) {
		
		BEN.mouseDown = false;
		BEN.mouseUp = true;
		event.preventDefault(); 
	}

	function onMouseMove(event) {
		
		BEN.mouseX = (event.pageX - canvas.offsetLeft) / BEN.scale; 
		BEN.mouseY = (event.pageY - canvas.offsetTop) / BEN.scale;
		event.preventDefault(); 
	}

	function onTouchMove(event)	{ 
	
		BEN.tapX = (event.targetTouches[0].pageX - canvas.offsetLeft) / BEN.scale;
		BEN.tapY = (event.targetTouches[0].pageY - canvas.offsetTop) / BEN.scale ;
		event.preventDefault(); 
	}

	function onTouchStart(event) {
		
		BEN.tapX = event.targetTouches[0].pageX - canvas.offsetLeft;
		BEN.tapY = event.targetTouches[0].pageY - canvas.offsetTop;
		BEN.touchDown = true;
		BEN.touchUp = false;
		event.preventDefault(); 
	}

	function onTouchEnd(event) { 
	
		BEN.touchDown = false;
		BEN.touchUp = true;
		event.preventDefault();
	}

	var BEN = {

		assetsToLoad: [],
		assetsToLoad2: [],
		assetsToLoad3: [],
		assetsToLoad4: [],
		assetsLoaded: 0,
		assetsLoaded2: 0,
		assetsLoaded3: 0,
		assetsLoaded4: 0,
		
		mouseY: 0,		
		mouseY: 0,

		tapX: undefined,		
		tapY: undefined,

		EASING: 0.18,
		 
		currentPage: -1,
		currentSide: 0,
		currentState: "loading",    
		
		pages: [],
		rears: [],
		
		moveLeft: false,
		moveRight: false,
		
		canProceed: false,

		//BOOLEANS FOR LANGUAGE CHOICE
		
		englishChosen: false,
		spanishChosen: false,
		
		englishOn: false,
		spanishOn: false,

		folding: false,
		unfolding: false,
		
		percentage: 0.01,
		increment: .039,

		mainCalled: false,
		checkingLoads: 0,
		


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
		if(canvas.style.width === 962 + "px" && BEN.android === true)
		{
		canvas.style.width = (window.innerWidth / 2.522) + 'px';
		}
		
		BEN.scale = BEN.currentWidth / BEN.WIDTH;
		
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }
};


//DETERMNING WHICH TYPE OF DEVICE THE PLAYER IS USING

BEN.ua = navigator.userAgent.toLowerCase();
BEN.android = BEN.ua.indexOf('android') > -1 ? true : false;
BEN.ios = ( BEN.ua.indexOf('iphone') > -1 || BEN.ua.indexOf('ipad') > -1  ) ? 
    true : false;

window.addEventListener('load', BEN.init, false);
window.addEventListener('BEN', BEN.resizeScreen, false);



var hotSpot1 = Object.create(BEN);  //PLAY BUTTON HOTSPOT
hotSpot1.x = 0;
hotSpot1.y = 50;
hotSpot1.width = 640;
hotSpot1.height = 960;

var hotSpot2 = Object.create(BEN);  //ENGLISH BUTTON HOTSPOT
hotSpot2.x = 30;
hotSpot2.y = 738;
hotSpot2.width = 280;
hotSpot2.height = 200;

var hotSpot3 = Object.create(BEN);  //SPANISH BUTTON HOTSPOT
hotSpot3.x = 328;
hotSpot3.y = 738;
hotSpot3.width = 280;
hotSpot3.height = 200;

var hotSpot4 = Object.create(BEN);  //X BUTTON HOTSPOT
hotSpot4.x = 450;
hotSpot4.y = 10;
hotSpot4.width = 180;
hotSpot4.height = 140;

var hotSpot5 = Object.create(BEN);  //PLAY BUTTON HOTSPOT
hotSpot5.x = 0;
hotSpot5.y = 813;
hotSpot5.width = 150;
hotSpot5.height = 184;

var hotSpot6 = Object.create(BEN);  //X BUTTON HOTSPOT
hotSpot6.x = 490;
hotSpot6.y = 813;
hotSpot6.width = 150;
hotSpot6.height = 184;


//LOADING THR IMAGES AND CALLING LOAD EVENT

var loading = Object.create(BEN);
loading.x = 30;
loading.y = 30;
loading.width = 640;
loading.height = 960;

var xBtn = Object.create(BEN);
xBtn.x = 580;
xBtn.y = 10;
xBtn.width = 50;
xBtn.height = 50;

var xBtnImage = new Image();
xBtnImage.src = assets + "PNC_mathcards_Xbtn.png";

var englishPressed = Object.create(BEN);
englishPressed.x = 0;
englishPressed.y = 820;
englishPressed.width = 321;
englishPressed.height = 125;

var englishPressedImage = new Image();
englishPressedImage.src = assets + "MOTG_englishbtn_pressed.png";

var spanishPressed = Object.create(BEN);
spanishPressed.x = 320;
spanishPressed.y = 820;
spanishPressed.width = 321;
spanishPressed.height = 125;

var spanishPressedImage = new Image();
spanishPressedImage.src = assets + "MOTG_spanishbtn_pressed.png";

var spanishPressed1 = Object.create(BEN);
spanishPressed1.x = 320;
spanishPressed1.y = 820;
spanishPressed1.width = 321;
spanishPressed1.height = 125;

var spanishPressed1Image = new Image();
spanishPressed1Image.src = assets + "MOTG_spanishbtn_pressed1.png";

var leftButton = Object.create(BEN);
leftButton.x = 0;
leftButton.y = 853;
leftButton.width = 70;
leftButton.height = 70;

var leftButtonImage = new Image();
leftButtonImage.src = assets + "MOTG_arrowleft_default.png";

var rightButton = Object.create(BEN);
rightButton.x = 565;
rightButton.y = 853;
rightButton.width = 70;
rightButton.height = 70;

var rightButtonImage = new Image();
rightButtonImage.src = assets + "MOTG_arrowright_default.png";


var leftButtonPressed = Object.create(BEN);
leftButtonPressed.x = 0;
leftButtonPressed.y = 853;
leftButtonPressed.width = 70;
leftButtonPressed.height = 70;

var leftButtonPressedImage = new Image();
leftButtonPressedImage.src = assets + "MOTG_arrowleft_pressed.png";

var rightButtonPressed = Object.create(BEN);
rightButtonPressed.x = 565;
rightButtonPressed.y = 853;
rightButtonPressed.width = 70;
rightButtonPressed.height = 70;

var rightButtonPressedImage = new Image();
rightButtonPressedImage.src = assets + "MOTG_arrowright_pressed.png";

var loadingColor = Object.create(BEN);
loadingColor.x = 300;
loadingColor.y = 200;
loadingColor.width = 530;
loadingColor.height = 200;

var loadingColorImage = new Image();
loadingColorImage.src = assets + "loading-color.png";

var loadingWhite = Object.create(BEN);
loadingWhite.x = 50;
loadingWhite.y = 250;
loadingWhite.width = 530;
loadingWhite.height = 200;

var loadingWhiteImage = new Image();
loadingWhiteImage.src = assets + "loading-white.png";


var page1 = Object.create(BEN);
page1.x = 0;
page1.y = 0;
page1.width = 640;
page1.height = 960;
BEN.pages.push(page1);

var openingPageImage = new Image();
openingPageImage.src = assets + "PNC_mathcards_TITLE_front.png";



var page2 = Object.create(page1);
page2.x = 1000;
page2.y = 0;
page2.width = 640;
page2.height = 960;
BEN.pages.push(page2);

var page3 = Object.create(page2);
BEN.pages.push(page3);

var page4 = Object.create(page2);
BEN.pages.push(page4);

var page5 = Object.create(page2);
BEN.pages.push(page5);

var page6 = Object.create(page2);
BEN.pages.push(page6);

var page7 = Object.create(page2);
BEN.pages.push(page7);

var page8 = Object.create(page2);
BEN.pages.push(page8);

var page9 = Object.create(page2);
BEN.pages.push(page9);

var page10 = Object.create(page2);
BEN.pages.push(page10);

var page11 = Object.create(page2);
BEN.pages.push(page11);

var page12 = Object.create(page2);
BEN.pages.push(page12);

var page13 = Object.create(page2);
BEN.pages.push(page13);

var page14 = Object.create(page2);
BEN.pages.push(page14);

var page15 = Object.create(page2);
BEN.pages.push(page15);

var page16 = Object.create(page2);
BEN.pages.push(page16);

var page17 = Object.create(page2);
BEN.pages.push(page17);

var page18 = Object.create(page2);
BEN.pages.push(page18);

var page19 = Object.create(page2);
BEN.pages.push(page19);

var page20 = Object.create(page2);
BEN.pages.push(page20);

var page21 = Object.create(page2);
BEN.pages.push(page21);

var page22 = Object.create(page2);
BEN.pages.push(page22);

var page23 = Object.create(page2);
BEN.pages.push(page23);


//THE RETRO SIDES OF EACH CARD

var rear1 = Object.create(BEN);
rear1.x = 0;
rear1.y = 5;
rear1.width = 320;
rear1.height = 480;
BEN.rears.push(rear1);

var rear2 = Object.create(page1);
rear2.x = 1000;
rear2.y = 5;
rear2.width = 320;
rear2.height = 480;
BEN.rears.push(rear2);

var rear3 = Object.create(rear2);
BEN.rears.push(rear3);

var rear4 = Object.create(rear2);
BEN.rears.push(rear4);

var rear5 = Object.create(rear2);
BEN.rears.push(rear5);

var rear6 = Object.create(rear2);
BEN.rears.push(rear6);

var rear7 = Object.create(rear2);
BEN.rears.push(rear7);

var rear8 = Object.create(rear2);
BEN.rears.push(rear8);

var rear9 = Object.create(rear2);
BEN.rears.push(rear9);

var rear10 = Object.create(rear2);
BEN.rears.push(rear10);

var rear11 = Object.create(rear2);
BEN.rears.push(rear11);

var rear12 = Object.create(rear2);
BEN.rears.push(rear12);

var rear13 = Object.create(rear2);
BEN.rears.push(rear13);

var rear14 = Object.create(rear2);
BEN.rears.push(rear14);

var rear15 = Object.create(rear2);
BEN.rears.push(rear15);

var rear16 = Object.create(rear2);
BEN.rears.push(rear16);

var rear17 = Object.create(rear2);
BEN.rears.push(rear17);

var rear18 = Object.create(rear2);
BEN.rears.push(rear18);

var rear19 = Object.create(rear2);
BEN.rears.push(rear19);

var rear20 = Object.create(rear2);
BEN.rears.push(rear20);

var rear21 = Object.create(rear2);
BEN.rears.push(rear21);

var rear22 = Object.create(rear2);
BEN.rears.push(rear22);

var rear23 = Object.create(rear2);
BEN.rears.push(rear23);

var loadingImage = new Image();
loadingImage.src = assets + "loadingImage.png";

//
//ENGLISH CARDS (FRONT)
//

var page1Image = new Image();
page1Image.addEventListener("load", onLoad, false);
page1Image.src = assets + "PNC_mathcards_TITLE_front.png";
BEN.assetsToLoad.push(page1Image);

var page2Image = new Image();
page2Image.addEventListener("load", onLoad, false);
page2Image.src = assets + "PNC_mathcards_instrux_front.png";
BEN.assetsToLoad.push(page2Image);

var page3Image = new Image();
page3Image.addEventListener("load", onLoad, false);
page3Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page3Image);

var page4Image = new Image();
page4Image.addEventListener("load", onLoad, false);
page4Image.src = assets + "PNC_mathcards_2_front.png";
BEN.assetsToLoad.push(page4Image);

var page5Image = new Image();
page5Image.addEventListener("load", onLoad, false);
page5Image.src = assets + "PNC_mathcards_3_front.png";
BEN.assetsToLoad.push(page5Image);

var page6Image = new Image();
page6Image.addEventListener("load", onLoad, false);
page6Image.src = assets + "PNC_mathcards_4_front.png";
BEN.assetsToLoad.push(page6Image);

var page7Image = new Image();
page7Image.addEventListener("load", onLoad, false);
page7Image.src = assets + "PNC_mathcards_5_front.png";
BEN.assetsToLoad.push(page7Image);

var page8Image = new Image();
page8Image.addEventListener("load", onLoad, false);
page8Image.src = assets + "PNC_mathcards_6_front.png";
BEN.assetsToLoad.push(page8Image);

var page9Image = new Image();
page9Image.addEventListener("load", onLoad, false);
page9Image.src = assets + "PNC_mathcards_7_front.png";
BEN.assetsToLoad.push(page9Image);

var page10Image = new Image();
page10Image.addEventListener("load", onLoad, false);
page10Image.src = assets + "PNC_mathcards_8_front.png";
BEN.assetsToLoad.push(page10Image);

var page11Image = new Image();
page11Image.addEventListener("load", onLoad, false);
page11Image.src = assets + "PNC_mathcards_9_front.png";
BEN.assetsToLoad.push(page11Image);

var page12Image = new Image();
page12Image.addEventListener("load", onLoad, false);
page12Image.src = assets + "PNC_mathcards_10_front.png";
BEN.assetsToLoad.push(page12Image);

var page13Image = new Image();
page13Image.addEventListener("load", onLoad, false);
page13Image.src = assets + "PNC_mathcards_11_front.png";
BEN.assetsToLoad.push(page13Image);

var page14Image = new Image();
page14Image.addEventListener("load", onLoad, false);
page14Image.src = assets + "PNC_mathcards_12_front.png";
BEN.assetsToLoad.push(page14Image);

var page15Image = new Image();
page15Image.addEventListener("load", onLoad, false);
page15Image.src = assets + "PNC_mathcards_13_front.png";
BEN.assetsToLoad.push(page15Image);

var page16Image = new Image();
page16Image.addEventListener("load", onLoad, false);
page16Image.src = assets + "PNC_mathcards_14_front.png";
BEN.assetsToLoad.push(page16Image);

var page17Image = new Image();
page17Image.addEventListener("load", onLoad, false);
page17Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page17Image);

var page18Image = new Image();
page18Image.addEventListener("load", onLoad, false);
page18Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page18Image);

var page19Image = new Image();
page19Image.addEventListener("load", onLoad, false);
page19Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page19Image);

var page20Image = new Image();
page20Image.addEventListener("load", onLoad, false);
page20Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page20Image);

var page21Image = new Image();
page21Image.addEventListener("load", onLoad, false);
page21Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page21Image);

var page22Image = new Image();
page22Image.addEventListener("load", onLoad, false);
page22Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page22Image);

var page23Image = new Image();
page23Image.addEventListener("load", onLoad, false);
page23Image.src = assets + "PNC_mathcards_1_front.png";
BEN.assetsToLoad.push(page23Image);

//
//SPANISH CARDS (FRONT)
//

var page1ImageES = new Image();
page1ImageES.addEventListener("load", onLoad, false);
page1ImageES.src = assets + "PNC_mathcards_esp_title.png";
BEN.assetsToLoad3.push(page1ImageES);

var page2ImageES = new Image();
page2ImageES.addEventListener("load", onLoad, false);
page2ImageES.src = assets + "PNC_mathcards_esp_instrux_front.png";
BEN.assetsToLoad3.push(page2ImageES);

var page3ImageES = new Image();
page3ImageES.addEventListener("load", onLoad, false);
page3ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page3ImageES);

var page4ImageES = new Image();
page4ImageES.addEventListener("load", onLoad, false);
page4ImageES.src = assets + "PNC_mathcards_esp_2_front.png";
BEN.assetsToLoad3.push(page4ImageES);

var page5ImageES = new Image();
page5ImageES.addEventListener("load", onLoad, false);
page5ImageES.src = assets + "PNC_mathcards_esp_3_front.png";
BEN.assetsToLoad3.push(page5ImageES);

var page6ImageES = new Image();
page6ImageES.addEventListener("load", onLoad, false);
page6ImageES.src = assets + "PNC_mathcards_esp_4_front.png";
BEN.assetsToLoad3.push(page6ImageES);

var page7ImageES = new Image();
page7ImageES.addEventListener("load", onLoad, false);
page7ImageES.src = assets + "PNC_mathcards_esp_5_front.png";
BEN.assetsToLoad3.push(page7ImageES);

var page8ImageES = new Image();
page8ImageES.addEventListener("load", onLoad, false);
page8ImageES.src = assets + "PNC_mathcards_esp_6_front.png";
BEN.assetsToLoad3.push(page8ImageES);

var page9ImageES = new Image();
page9ImageES.addEventListener("load", onLoad, false);
page9ImageES.src = assets + "PNC_mathcards_esp_7_front.png";
BEN.assetsToLoad3.push(page9ImageES);

var page10ImageES = new Image();
page10ImageES.addEventListener("load", onLoad, false);
page10ImageES.src = assets + "PNC_mathcards_esp_8_front.png";
BEN.assetsToLoad3.push(page10ImageES);

var page11ImageES = new Image();
page11ImageES.addEventListener("load", onLoad, false);
page11ImageES.src = assets + "PNC_mathcards_esp_9_front.png";
BEN.assetsToLoad3.push(page11ImageES);

var page12ImageES = new Image();
page12ImageES.addEventListener("load", onLoad, false);
page12ImageES.src = assets + "PNC_mathcards_esp_10_front.png";
BEN.assetsToLoad3.push(page12ImageES);

var page13ImageES = new Image();
page13ImageES.addEventListener("load", onLoad, false);
page13ImageES.src = assets + "PNC_mathcards_esp_11_front.png";
BEN.assetsToLoad3.push(page13ImageES);

var page14ImageES = new Image();
page14ImageES.addEventListener("load", onLoad, false);
page14ImageES.src = assets + "PNC_mathcards_esp_12_front.png";
BEN.assetsToLoad3.push(page14ImageES);

var page15ImageES = new Image();
page15ImageES.addEventListener("load", onLoad, false);
page15ImageES.src = assets + "PNC_mathcards_esp_13_front.png";
BEN.assetsToLoad3.push(page15ImageES);

var page16ImageES = new Image();
page16ImageES.addEventListener("load", onLoad, false);
page16ImageES.src = assets + "PNC_mathcards_esp_14_front.png";
BEN.assetsToLoad3.push(page16ImageES);

var page17ImageES = new Image();
page17ImageES.addEventListener("load", onLoad, false);
page17ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page17ImageES);

var page18ImageES = new Image();
page18ImageES.addEventListener("load", onLoad, false);
page18ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page18ImageES);

var page19ImageES = new Image();
page19ImageES.addEventListener("load", onLoad, false);
page19ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page19ImageES);

var page20ImageES = new Image();
page20ImageES.addEventListener("load", onLoad, false);
page20ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page20ImageES);

var page21ImageES = new Image();
page21ImageES.addEventListener("load", onLoad, false);
page21ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page21ImageES);

var page22ImageES = new Image();
page22ImageES.addEventListener("load", onLoad, false);
page22ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page22ImageES);

var page23ImageES = new Image();
page23ImageES.addEventListener("load", onLoad, false);
page23ImageES.src = assets + "PNC_mathcards_esp_1_front.png";
BEN.assetsToLoad3.push(page23ImageES);


//
//RETRO OF CARDS (ENGLISH)
//

var rear1Image = new Image();
rear1Image.addEventListener("load", onLoad, false);
rear1Image.src = assets + "PNC_mathcards_instrux_front.png";
BEN.assetsToLoad2.push(rear1Image);

var rear2Image = new Image();
rear2Image.addEventListener("load", onLoad, false);
rear2Image.src =  assets +"PNC_mathcards_INSTRUX_back.png";
BEN.assetsToLoad2.push(rear2Image);

var rear3Image = new Image();
rear3Image.addEventListener("load", onLoad, false);
rear3Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear3Image);

var rear4Image = new Image();
rear4Image.addEventListener("load", onLoad, false);
rear4Image.src = assets + "PNC_mathcards_2_back.png";
BEN.assetsToLoad2.push(rear4Image);

var rear5Image = new Image();
rear5Image.addEventListener("load", onLoad, false);
rear5Image.src = assets + "PNC_mathcards_3_back.png";
BEN.assetsToLoad2.push(rear5Image);

var rear6Image = new Image();
rear6Image.addEventListener("load", onLoad, false);
rear6Image.src = assets + "PNC_mathcards_4_back.png";
BEN.assetsToLoad2.push(rear6Image);

var rear7Image = new Image();
rear7Image.addEventListener("load", onLoad, false);
rear7Image.src = assets + "PNC_mathcards_5_back.png";
BEN.assetsToLoad2.push(rear7Image);

var rear8Image = new Image();
rear8Image.addEventListener("load", onLoad, false);
rear8Image.src = assets + "PNC_mathcards_6_back.png";
BEN.assetsToLoad2.push(rear8Image);

var rear9Image = new Image();
rear9Image.addEventListener("load", onLoad, false);
rear9Image.src = assets + "PNC_mathcards_7_back.png";
BEN.assetsToLoad2.push(rear9Image);

var rear10Image = new Image();
rear10Image.addEventListener("load", onLoad, false);
rear10Image.src = assets + "PNC_mathcards_8_back.png";
BEN.assetsToLoad2.push(rear10Image);

var rear11Image = new Image();
rear11Image.addEventListener("load", onLoad, false);
rear11Image.src = assets + "PNC_mathcards_9_back.png";
BEN.assetsToLoad2.push(rear11Image);

var rear12Image = new Image();
rear12Image.addEventListener("load", onLoad, false);
rear12Image.src = assets + "PNC_mathcards_10_back.png";
BEN.assetsToLoad2.push(rear12Image);

var rear13Image = new Image();
rear13Image.addEventListener("load", onLoad, false);
rear13Image.src = assets + "PNC_mathcards_11_back.png";
BEN.assetsToLoad2.push(rear13Image);

var rear14Image = new Image();
rear14Image.addEventListener("load", onLoad, false);
rear14Image.src = assets + "PNC_mathcards_12_back.png";
BEN.assetsToLoad2.push(rear14Image);

var rear15Image = new Image();
rear15Image.addEventListener("load", onLoad, false);
rear15Image.src = assets + "PNC_mathcards_13_back.png";
BEN.assetsToLoad2.push(rear15Image);

var rear16Image = new Image();
rear16Image.addEventListener("load", onLoad, false);
rear16Image.src = assets + "PNC_mathcards_14_back.png";
BEN.assetsToLoad2.push(rear16Image);

var rear17Image = new Image();
rear17Image.addEventListener("load", onLoad, false);
rear17Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear17Image);

var rear18Image = new Image();
rear18Image.addEventListener("load", onLoad, false);
rear18Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear18Image);

var rear19Image = new Image();
rear19Image.addEventListener("load", onLoad, false);
rear19Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear19Image);

var rear20Image = new Image();
rear20Image.addEventListener("load", onLoad, false);
rear20Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear20Image);

var rear21Image = new Image();
rear21Image.addEventListener("load", onLoad, false);
rear21Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear21Image);

var rear22Image = new Image();
rear22Image.addEventListener("load", onLoad, false);
rear22Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear22Image);

var rear23Image = new Image();
rear23Image.addEventListener("load", onLoad, false);
rear23Image.src = assets + "PNC_mathcards_1_back.png";
BEN.assetsToLoad2.push(rear23Image);

//
//RETRO OF CARDS (SPANISH)
//

var rear1Image = new Image();
rear1Image.addEventListener("load", onLoad, false);
rear1Image.src = assets + "PNC_mathcards_esp_instrux_front.png";
BEN.assetsToLoad4.push(rear1Image);

var rear2Image = new Image();
rear2Image.addEventListener("load", onLoad, false);
rear2Image.src = assets + "PNC_mathcards_esp_instrux_back.png";
BEN.assetsToLoad4.push(rear2Image);

var rear3Image = new Image();
rear3Image.addEventListener("load", onLoad, false);
rear3Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear3Image);

var rear4Image = new Image();
rear4Image.addEventListener("load", onLoad, false);
rear4Image.src = assets + "PNC_mathcards_esp_2_back.png";
BEN.assetsToLoad4.push(rear4Image);

var rear5Image = new Image();
rear5Image.addEventListener("load", onLoad, false);
rear5Image.src = assets + "PNC_mathcards_esp_3_back.png";
BEN.assetsToLoad4.push(rear5Image);

var rear6Image = new Image();
rear6Image.addEventListener("load", onLoad, false);
rear6Image.src = assets + "PNC_mathcards_esp_4_back.png";
BEN.assetsToLoad4.push(rear6Image);

var rear7Image = new Image();
rear7Image.addEventListener("load", onLoad, false);
rear7Image.src = assets + "PNC_mathcards_esp_5_back.png";
BEN.assetsToLoad4.push(rear7Image);

var rear8Image = new Image();
rear8Image.addEventListener("load", onLoad, false);
rear8Image.src = assets + "PNC_mathcards_esp_6_back.png";
BEN.assetsToLoad4.push(rear8Image);

var rear9Image = new Image();
rear9Image.addEventListener("load", onLoad, false);
rear9Image.src = assets + "PNC_mathcards_esp_7_back.png";
BEN.assetsToLoad4.push(rear9Image);

var rear10Image = new Image();
rear10Image.addEventListener("load", onLoad, false);
rear10Image.src = assets + "PNC_mathcards_esp_8_back.png";
BEN.assetsToLoad4.push(rear10Image);

var rear11Image = new Image();
rear11Image.addEventListener("load", onLoad, false);
rear11Image.src = assets + "PNC_mathcards_esp_9_back.png";
BEN.assetsToLoad4.push(rear11Image);

var rear12Image = new Image();
rear12Image.addEventListener("load", onLoad, false);
rear12Image.src = assets + "PNC_mathcards_esp_10_back.png";
BEN.assetsToLoad4.push(rear12Image);

var rear13Image = new Image();
rear13Image.addEventListener("load", onLoad, false);
rear13Image.src = assets + "PNC_mathcards_esp_11_back.png";
BEN.assetsToLoad4.push(rear13Image);

var rear14Image = new Image();
rear14Image.addEventListener("load", onLoad, false);
rear14Image.src = assets + "PNC_mathcards_esp_12_back.png";
BEN.assetsToLoad4.push(rear14Image);

var rear15Image = new Image();
rear15Image.addEventListener("load", onLoad, false);
rear15Image.src = assets + "PNC_mathcards_esp_13_back.png";
BEN.assetsToLoad4.push(rear15Image);

var rear16Image = new Image();
rear16Image.addEventListener("load", onLoad, false);
rear16Image.src = assets + "PNC_mathcards_esp_14_back.png";
BEN.assetsToLoad4.push(rear16Image);

var rear17Image = new Image();
rear17Image.addEventListener("load", onLoad, false);
rear17Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear17Image);

var rear18Image = new Image();
rear18Image.addEventListener("load", onLoad, false);
rear18Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear18Image);

var rear19Image = new Image();
rear19Image.addEventListener("load", onLoad, false);
rear19Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear19Image);

var rear20Image = new Image();
rear20Image.addEventListener("load", onLoad, false);
rear20Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear20Image);

var rear21Image = new Image();
rear21Image.addEventListener("load", onLoad, false);
rear21Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear21Image);

var rear22Image = new Image();
rear22Image.addEventListener("load", onLoad, false);
rear22Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear22Image);

var rear23Image = new Image();
rear23Image.addEventListener("load", onLoad, false);
rear23Image.src = assets + "PNC_mathcards_esp_1_back.png";
BEN.assetsToLoad4.push(rear23Image);


//LOAD HANDLER

function onLoad()
{ 
 BEN.checkingLoads++;
}



	function touchStart(event,passedName) {
		event.preventDefault();
		BEN.fingerCount = event.touches.length;
		
		if ( BEN.fingerCount === 1) {
			BEN.startX = event.touches[0].pageX;
			BEN.startY = event.touches[0].pageY;
		} else {
			touchCancel(event);
		}
	}

	function touchMove(event) {
		event.preventDefault();
		if ( event.touches.length === 1 ) {
			BEN.curX = event.touches[0].pageX;
			BEN.curY = event.touches[0].pageY;
		} else {
			touchCancel(event);
		}
	}
	
	function touchEnd(event) {
		event.preventDefault();
		if ( BEN.fingerCount == 1 && BEN.curX != 0 ) {
			BEN.swipeLength = Math.round(Math.sqrt(Math.pow(BEN.curX - BEN.startX,2) + Math.pow(BEN.curY - BEN.startY,2)));
			if ( BEN.swipeLength >= BEN.minLength && BEN.touchUp === false) {
				caluculateAngle();
				determineSwipeDirection();
				processingRoutine();
				touchCancel(event); 
			} else {
				touchCancel(event);
			}	
		} else {
			touchCancel(event);
		}
	}

	function touchCancel(event) {
	
		BEN.fingerCount = 0;
		BEN.startX = 0;
		BEN.startY = 0;
		BEN.curX = 0;
		BEN.curY = 0;
		BEN.deltaX = 0;
		BEN.deltaY = 0;
		BEN.horzDiff = 0;
		BEN.vertDiff = 0;
		BEN.swipeLength = 0;
		BEN.swipeAngle = null;
		BEN.swipeDirection = null;
	}
	
	function caluculateAngle() {
		var X = BEN.startX-BEN.curX;
		var Y = BEN.curY-BEN.startY;
		var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); 
		var r = Math.atan2(Y,X); 
		BEN.swipeAngle = Math.round(r*180/Math.PI); 
		if ( BEN.swipeAngle < 0 ) { BEN.swipeAngle =  360 - Math.abs(BEN.swipeAngle); }
	}
	
	function determineSwipeDirection() {
		if ( (BEN.swipeAngle <= 45) && (BEN.swipeAngle >= 0) ) {
			BEN.swipeDirection = 'left';

		} else if ( (BEN.swipeAngle <= 360) && (BEN.swipeAngle >= 315) ) {
			BEN.swipeDirection = 'left';
		} else if ( (BEN.swipeAngle >= 135) && (BEN.swipeAngle <= 225) ) {
			BEN.swipeDirection = 'right';
		}
	}
	function processingRoutine() {
	
	     if (BEN.swipeDirection == 'left' && BEN.currentPage >= 1 && BEN.currentPage < 14 && BEN.canProceed === true) {
		    
			BEN.moveLeft = true;
			BEN.moveRight = false;
		   }
			
			if(BEN.swipeDirection == 'left' && BEN.currentPage === 0 && BEN.currentSide === 1)
			{
			BEN.moveLeft = true;
			BEN.moveRight = false;
			}
					 
		
		
           if (BEN.swipeDirection == 'right' && BEN.currentPage >= 1 && BEN.currentPage <= 14) {

			BEN.moveRight = true;
			BEN.moveLeft = false;
            }
			
			
			if(BEN.swipeDirection == 'right' && BEN.currentPage === 0 && BEN.currentSide === 1)
			{
			BEN.moveRight = true;
			BEN.moveLeft = false;
			}
			
		
	}
	

checkCurrentState();

//SET EACH PAGE AT 980 PIXELS TO THE RIGHT OF THE ONE BEFORE IT

for(var j = 1; j < 23; j++)
{

BEN.pages[j].x = BEN.pages[j - 1].x + 1470;
}	

function main()  //MAIN LOOP
{

BEN.init();
BEN.resizeScreen();


requestAnimationFrame(main,canvas);
//window.setTimeout(main,20);  //MAIN LOOP CALLS ITSELF RECURSIVELY
context.clearRect(0,0,canvas.width,canvas.height); //CANVAS IS CLEARED EACH ITERATION



    
			//COLLISION DETECTION FOR ENGLISH WITH TOUCH

	    if(BEN.tapY > 500 && BEN.tapX <= 320 && BEN.currentPage === -1 && BEN.swipeLength === 0)
		{
 
	    if(BEN.touchDown === true && BEN.pages[0].x === 0)
		{
		context.drawImage(englishPressedImage,englishPressed.x,englishPressed.y,englishPressed.width,englishPressed.height);
		}
	    
		if(BEN.touchUp === true && BEN.moveLeft === false && BEN.moveRight === false)
		{
		BEN.englishChosen = true;
		BEN.englishOn = true;
		BEN.spanishOn = false;
		BEN.moveLeft = true;
		}
  
        }
  
 
 //COLLISION DETECTION FOR SPANISH WITH TOUCH

         if(BEN.tapY > 800 && BEN.tapX > 320 && BEN.currentPage === -1 && BEN.swipeLength === 0)
		{
 
	    if(BEN.touchDown === true  && BEN.pages[0].x === 0)
		{
		context.drawImage(spanishPressedImage,spanishPressed.x,spanishPressed.y,spanishPressed.width,spanishPressed.height);
		}
		if(BEN.touchUp === true && BEN.currentPage === -1 && BEN.moveLeft === false && BEN.moveRight === false)
		{
		BEN.spanishChosen = true;
		BEN.spanishOn = true;
		BEN.englishOn = false;
		BEN.moveLeft = true;
		}
        }


//MOVING PAGES LEFT

for(var i = 0; i < BEN.pages.length; i++)
{ 
	
	if(BEN.moveLeft === true && BEN.currentPage >= 0 && BEN.currentPage < 14 || BEN.englishChosen === true ||BEN.spanishChosen === true)
	{
	    
	    if(BEN.pages[i].x < -600 && BEN.pages[i].x > -980)
	    {
	    BEN.currentSide = 0;
	    }   
	    
		if(BEN.pages[i].x < 0 && BEN.pages[i].x >= -600)
	    {
	    BEN.mouseUp = false;
	    BEN.touchUp = false;
       	}
		
		if(BEN.pages[BEN.currentPage + 2].x < 0)
		{
			BEN.moveLeft = false;
		
			if(BEN.currentPage < 14)
			{
			BEN.currentPage++;
			BEN.englishChosen = false;
			BEN.spanishChosen = false;
			}
		}
		
		var vx = -165;
		BEN.pages[i].x += vx * BEN.EASING;
	}


	
//MOVING PAGES RIGHT
 
	if(BEN.moveRight === true && BEN.currentPage >= 0 && BEN.currentPage <= 14 && BEN.englishChosen === false && BEN.spanishChosen === false)
	{
	  
		if(BEN.pages[BEN.currentPage + 1].x > 700 && BEN.pages[BEN.currentPage + 1].x < 900)
	    {
	    BEN.currentSide = 0;
       	}
			if(BEN.pages[BEN.currentPage + 1].x > 0 && BEN.pages[BEN.currentPage + 1].x <= 700)
			{
			BEN.mouseUp = false;
			BEN.touchUp = false;
			}
			
			if(BEN.pages[BEN.currentPage + 1].x > 1470)
			{
			BEN.moveRight = false;
			BEN.currentPage--;
			}
		
		var vx = 165;
		BEN.pages[i].x += vx * BEN.EASING; 
	}
	
	if(BEN.moveLeft === false && BEN.moveRight === false && BEN.currentPage >= 0 && BEN.folding === false && BEN.unfolding === false)
		{
		 BEN.pages[BEN.currentPage + 1].x = 0;
		 BEN.pages[BEN.currentPage + 2].x = 1470;
		} 
	}
	
	if(page1.x > 0)
	{
	page1.x = 0;
	}
	if(page16.x < 0)
	{
	page16.x = 0;
	}
	
	
	
//DRAWING THE IMAGES ONTO THE PAGE


for(var k = 0; k < 23; k++)
{


if(BEN.currentSide === 0)
{
    if(BEN.englishOn === false && BEN.spanishOn === false)
	{
    context.drawImage(page1Image,page1.x,page1.y,page1.width,page1.height);
	}
	if(BEN.englishOn === true)
	{
	context.drawImage(BEN.assetsToLoad[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
	}
	if(BEN.spanishOn === true)
	{
	context.drawImage(BEN.assetsToLoad3[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
	}
	
if(BEN.folding === true && BEN.pages[k].width > 0)
{
BEN.pages[k].x += 35.5;
BEN.pages[k].width -= 71.1;
}

if(BEN.unfolding === true && BEN.pages[k].width < 640)
{
BEN.pages[k].x -= 35.5;
BEN.pages[k].width += 71.1;
}
}


if(BEN.currentSide === 1)
{

	if(BEN.englishOn === true)
	{
	context.drawImage(BEN.assetsToLoad2[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
	}
	if(BEN.spanishOn === true)
	{
	context.drawImage(BEN.assetsToLoad4[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
	}
	
	
if(BEN.folding === true && BEN.pages[k].width > 0 && BEN.moveLeft === false && BEN.moveRight === false)
{
BEN.pages[k].x += 35.5;
BEN.pages[k].width -= 71.1;
}

if(BEN.unfolding === true && BEN.pages[k].width < 640)
{
BEN.pages[k].x -= 35.5;
BEN.pages[k].width += 71.1;
}

}

if(BEN.folding === true && BEN.pages[k].width < 0 && BEN.currentSide === 0 && BEN.moveLeft === false && BEN.moveRight === false)
{
BEN.pages[k].width = 0;
BEN.folding = false;
BEN.unfolding = true;
BEN.currentSide = 1;
}

if(BEN.folding === true && BEN.pages[k].width < 0 && BEN.currentSide === 1)
{
BEN.pages[k].width = 0;
BEN.folding = false;
BEN.unfolding = true;
BEN.currentSide = 0;
}

if(BEN.unfolding === true && BEN.pages[k].width > 640)
{
BEN.pages[k].width = 640;
BEN.unfolding = false;
BEN.folding = false;
}

}




if(BEN.currentPage >= 1 && BEN.moveLeft === false && BEN.moveRight === false)
{
context.font =  "bold 24pt sesame";
context.fillStyle = "#fff";
context.fillText(BEN.currentPage + " / 14",20,40);
//context.drawImage(xBtnImage,xBtn.x,xBtn.y,xBtn.width,xBtn.height);

	if(BEN.android === false && BEN.ios === false)
	{
	context.drawImage(leftButtonImage,leftButton.x,leftButton.y,leftButton.width,leftButton.height);
	}
   	
	if(BEN.currentPage < 14 && BEN.android === false && BEN.ios === false)
	{
	context.drawImage(rightButtonImage,rightButton.x,rightButton.y,rightButton.width,rightButton.height);
	}
}
		
		if(BEN.currentPage === 0 && BEN.currentSide === 1 && BEN.android === false && BEN.ios === false)
		{
		context.drawImage(leftButtonImage,leftButton.x,leftButton.y,leftButton.width,leftButton.height);
		context.drawImage(rightButtonImage,rightButton.x,rightButton.y,rightButton.width,rightButton.height);
		}
   
   if(BEN.currentPage >= 0 && BEN.moveLeft === false && BEN.moveRight === false)
   {
   context.drawImage(xBtnImage,xBtn.x,xBtn.y,xBtn.width,xBtn.height);
   }
   if(BEN.currentPage === -1 && BEN.pages[0].x === 0)
   {
   context.drawImage(xBtnImage,xBtn.x,xBtn.y,xBtn.width,xBtn.height);
   }
	


//context.font =  "bold 26pt sesame";
//context.fillText(canvas.style.width,100,100)
//context.fillText(canvas.style.height,100,200);


//context.fillRect(hotSpot5.x,hotSpot5.y,hotSpot5.width,hotSpot5.height);
//context.fillRect(hotSpot6.x,hotSpot6.y,hotSpot6.width,hotSpot6.height);


if(page2.x === 0)
{
page1.x = -1470;
}


//______________________________________COLLISION DETECTION___________________________________________________________________________________________
//____________________________________________________________________________________________________________________________________________________
  
  
    
			//COLLISION DETECTION FOR ENGLISH WITH TOUCH

	    if(BEN.tapY > 500 && BEN.tapX <= 320 && BEN.currentPage === -1 && BEN.swipeLength === 0)
		{
 
	    if(BEN.touchDown === true && BEN.pages[0].x === 0)
		{
		context.drawImage(englishPressedImage,englishPressed.x,englishPressed.y,englishPressed.width,englishPressed.height);
		}
	    
		if(BEN.touchUp === true && BEN.moveLeft === false && BEN.moveRight === false)
		{
		BEN.englishChosen = true;
		BEN.englishOn = true;
		BEN.spanishOn = false;
		BEN.moveLeft = true;
		}
  
        }
  
 
 //COLLISION DETECTION FOR SPANISH WITH TOUCH

         if(BEN.tapY > 800 && BEN.tapX > 320 && BEN.currentPage === -1 && BEN.swipeLength === 0)
		{
 
	    if(BEN.touchDown === true  && BEN.pages[0].x === 0)
		{
		context.drawImage(spanishPressedImage,spanishPressed.x,spanishPressed.y,spanishPressed.width,spanishPressed.height);
		}
		if(BEN.touchUp === true && BEN.currentPage === -1 && BEN.moveLeft === false && BEN.moveRight === false)
		{
		BEN.spanishChosen = true;
		BEN.spanishOn = true;
		BEN.englishOn = false;
		BEN.moveLeft = true;
		}
        }
  

    var vx4 = BEN.mouseX - hotSpot2.centerX();				//COLLISION DETECTION FOR ENGLISH WITH MOUSE
  var vy4 = BEN.mouseY - hotSpot2.centerY();
  
  var combinedHalfWidths4 = 1 + hotSpot2.halfWidth();
  var combinedHalfHeights4 = 1 + hotSpot2.halfHeight();

  if(Math.abs(vx4) < combinedHalfWidths4)
  {
    if(Math.abs(vy4) < combinedHalfHeights4)
    {
		if(BEN.mouseDown === true && BEN.currentPage === -1 && BEN.pages[0].x === 0)
		{
		context.drawImage(englishPressedImage,englishPressed.x,englishPressed.y,englishPressed.width,englishPressed.height);
		}
		
		if(BEN.mouseUp === true && BEN.currentPage === -1 && BEN.moveLeft === false && BEN.moveRight === false)
		{
		
		BEN.englishChosen = true;
		BEN.englishOn = true;
		BEN.spanishOn = false;
		
		}
    }
  }
  
 
  var vx5 = BEN.mouseX - hotSpot3.centerX();				//COLLISION DETECTION FOR SPANISH WITH MOUSE
  var vy5 = BEN.mouseY - hotSpot3.centerY();
  
  var combinedHalfWidths5 = 1 + hotSpot3.halfWidth();
  var combinedHalfHeights5 = 1 + hotSpot3.halfHeight();

  if(Math.abs(vx5) < combinedHalfWidths5)
  {
    if(Math.abs(vy5) < combinedHalfHeights5)
    {
	    if(BEN.mouseDown === true && BEN.currentPage === -1 && BEN.pages[0].x === 0)
		{
	
		context.drawImage(spanishPressedImage,spanishPressed.x,spanishPressed.y,spanishPressed.width,spanishPressed.height);

		}
		if(BEN.mouseUp === true && BEN.currentPage === -1 && BEN.moveLeft === false && BEN.moveRight === false)
		{
		BEN.spanishChosen = true;
		BEN.spanishOn = true;
		BEN.englishOn = false;
		}
    }
  }
  

  
  
  var vx1 = BEN.mouseX - hotSpot1.centerX();				//COLLISION DETECTION FOR CARDS WITH MOUSE
  var vy1 = BEN.mouseY - hotSpot1.centerY();
  
  var combinedHalfWidths1 = 1 + hotSpot1.halfWidth();
  var combinedHalfHeights1 = 1 + hotSpot1.halfHeight();

  if(Math.abs(vx1) < combinedHalfWidths1)
  {
    if(Math.abs(vy1) < combinedHalfHeights1)
    {
		if(BEN.currentPage >= 0)
		{
		   
			if(BEN.mouseUp === true && BEN.unfolding === false && BEN.folding === false && BEN.moveLeft === false && BEN.moveRight === false)
			{
				if(BEN.currentSide === 0)
				{
				BEN.canProceed = true;
				BEN.folding = true;
				BEN.mouseUp = false;
				}
			}
			
			if(BEN.mouseUp === true && BEN.unfolding === false && BEN.folding === false && BEN.moveLeft === false && BEN.moveRight === false)
			{
				if(BEN.currentSide === 1)
				{
				BEN.canProceed = true;
				BEN.folding = true;
				BEN.mouseUp = false;
				}
			}
		}
		
    }
 }
 
   
  var vx = BEN.tapX - hotSpot1.centerX();				//COLLISION DETECTION FOR CARDS WITH TOUCH
  var vy = BEN.tapY - hotSpot1.centerY();
  
  var combinedHalfWidths = 30 + hotSpot1.halfWidth();
  var combinedHalfHeights = 30 + hotSpot1.halfHeight();

  if(Math.abs(vx) < combinedHalfWidths)
  {
    if(Math.abs(vy) < combinedHalfHeights)
    {
	
	    if(BEN.currentPage >= 0)
		{
		    
			if(BEN.touchUp === true)
			{
				if(BEN.currentSide === 0 && BEN.moveLeft === false && BEN.unfolding === false && BEN.folding === false && BEN.moveRight === false)
				{
				BEN.canProceed = true;
				BEN.folding = true;
				BEN.touchUp = false;
				}
			}
		 
			if(BEN.touchUp === true)
			{
				if(BEN.currentSide === 1 && BEN.moveLeft === false && BEN.unfolding === false && BEN.folding === false && BEN.moveRight === false)
				{
				BEN.canProceed = true;
				BEN.folding = true;
				BEN.touchUp = false;
				}
			}
		 
		}
     }
  }
  
  
  
  var vx2 = BEN.mouseX - hotSpot4.centerX();				//COLLISION DETECTION FOR X BUTTON WITH MOUSE
  var vy2 = BEN.mouseY - hotSpot4.centerY();
  
  var combinedHalfWidths2 = 1 + hotSpot4.halfWidth();
  var combinedHalfHeights2 = 1 + hotSpot4.halfHeight();

  if(Math.abs(vx2) < combinedHalfWidths2)
  {
    if(Math.abs(vy2) < combinedHalfHeights2)
    {
		if(BEN.mouseDown === true)
		{
		window.history.back();
		}
    }
  }
  
 
 //COLLISION DETECTION FOR X BUTTON WITH TOUCH

      if(BEN.tapY < 200 && BEN.tapX > 500)
	  {
		if(BEN.touchDown === true)
		{
		window.history.back();
		}
     }
  
  
  var vx2 = BEN.mouseX - hotSpot5.centerX();				//COLLISION DETECTION FOR LEFT BUTTON WITH MOUSE
  var vy2 = BEN.mouseY - hotSpot5.centerY();
  
  var combinedHalfWidths2 = 1 + hotSpot5.halfWidth();
  var combinedHalfHeights2 = 1 + hotSpot5.halfHeight();

  if(Math.abs(vx2) < combinedHalfWidths2)
  {
    if(Math.abs(vy2) < combinedHalfHeights2)
    {
		if(BEN.mouseDown === true && BEN.currentPage >= 0 && BEN.moveLeft === false && BEN.moveRight === false && BEN.canProceed === true)
		{
		BEN.folding = false;
		BEN.unfolding = false;
		BEN.moveRight = true;
		context.drawImage(leftButtonPressedImage,leftButtonPressed.x,leftButtonPressed.y,leftButtonPressed.width,leftButtonPressed.height);
		}

    }
  }
  
  var vx3 = BEN.tapX - hotSpot5.centerX();				//COLLISION DETECTION FOR LEFT BUTTON WITH TOUCH
  var vy3 = BEN.tapY - hotSpot5.centerY();
  
  var combinedHalfWidths3 = 1 + hotSpot5.halfWidth();
  var combinedHalfHeights3 = 1 + hotSpot5.halfHeight();

  if(Math.abs(vx3) < combinedHalfWidths3)
  {
    if(Math.abs(vy3) < combinedHalfHeights3)
    {
		if(BEN.touchDown === true && BEN.currentPage >= 0 && BEN.moveLeft === false && BEN.moveRight === false)
		{
		BEN.folding = false;
		BEN.unfolding = false;
		BEN.moveRight = true;
		context.drawImage(leftButtonPressedImage,leftButtonPressed.x,leftButtonPressed.y,leftButtonPressed.width,leftButtonPressed.height);
		}
    }
  }
  
  
   var vx2 = BEN.mouseX - hotSpot6.centerX();				//COLLISION DETECTION FOR RIGHT BUTTON WITH MOUSE
  var vy2 = BEN.mouseY - hotSpot6.centerY();
  
  var combinedHalfWidths2 = 1 + hotSpot6.halfWidth();
  var combinedHalfHeights2 = 1 + hotSpot6.halfHeight();

  if(Math.abs(vx2) < combinedHalfWidths2)
  {
    if(Math.abs(vy2) < combinedHalfHeights2)
    {
		if(BEN.mouseDown === true && BEN.currentPage < 14 && BEN.currentPage >= 0 && BEN.moveLeft === false && BEN.moveRight === false && BEN.canProceed === true)
		{
		BEN.canProceed = true;
		BEN.folding = false;
		BEN.unfolding = false;
		BEN.moveLeft = true;
		context.drawImage(rightButtonPressedImage,rightButtonPressed.x,rightButtonPressed.y,rightButtonPressed.width,rightButtonPressed.height);
		}
    }
  }
  
  var vx3 = BEN.tapX - hotSpot6.centerX();				//COLLISION DETECTION FOR RIGHT BUTTON WITH TOUCH
  var vy3 = BEN.tapY - hotSpot6.centerY();
  
  var combinedHalfWidths3 = 1 + hotSpot6.halfWidth();
  var combinedHalfHeights3 = 1 + hotSpot6.halfHeight();

  if(Math.abs(vx3) < combinedHalfWidths3)
  {
    if(Math.abs(vy3) < combinedHalfHeights3)
    {
		if(BEN.touchDown === true && BEN.currentPage < 14 && BEN.currentPage >= 0 && BEN.moveLeft === false && BEN.moveRight === false && BEN.canProceed === true)
		{
		BEN.folding = false;
		BEN.unfolding = false;
		BEN.moveLeft = true;
		context.drawImage(rightButtonPressedImage,rightButtonPressed.x,rightButtonPressed.y,rightButtonPressed.width,rightButtonPressed.height);
		}
    }
  }
  
  
  
}

function checkCurrentState() 
{

    if(BEN.mainCalled === false)
	{
	window.setTimeout(checkCurrentState,24);
	context.clearRect(0,0,canvas.width,canvas.height);
	
	switch(BEN.currentState)
	{

	
	case "loading":		//DRAW THE LOADING ICON
	
	if(BEN.android === true || BEN.ios === true)
	{
	BEN.resizeScreen();
    BEN.increment = BEN.assetsToLoad.length / 100;	
	BEN.percentage = BEN.checkingLoads / 100;
		
    context.drawImage(loadingWhiteImage,loadingWhite.x,loadingWhite.y,loadingWhite.width,loadingWhite.height);

	
	if (navigator.appName.indexOf("Microsoft")!=-1)
	{
	console.log("it's IE!");
	}
	console.log(navigator.appName);
	console.log(navigator.appName);
	
	context.drawImage(loadingColorImage,
	0,
	loadingColor.height - (loadingColor.height * BEN.percentage),
	loadingColor.width,
	loadingColor.height * BEN.percentage,
	50,
	449 - (loadingColor.height * BEN.percentage),
	loadingColor.width,
	loadingColor.height * BEN.percentage);
	
    
	if(BEN.percentage > .9)
	{
	 BEN.currentState = "play";
	}
	}
	
	if(BEN.android === false && BEN.ios === false)
	{
	 BEN.currentState = "play";
	}
    break;
	
	case "play":       //DRAW THE GREEN ARROW
	main();
	BEN.mainCalled = true;
	break;
	}
	
	}
	

}
})();