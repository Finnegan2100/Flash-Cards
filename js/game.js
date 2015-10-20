
(function() {

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");
		
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
		mouseW: 1,
		mouseH: 1,

		tapX: undefined,		
		tapY: undefined,
		tapW: 30,
		tapH: 30,

		EASING: 0.18,
		 
		currentPage: -1,
		currentSide: 0,
		currentState: "loading", 
		
		imageArrayFrontEnglish: [
            "placeholderTitle.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png", 
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png" 
		],
		imageArrayFrontSpanish: [
			"placeholderTitle.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png", 
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png" 
		],
		imageArrayRearEnglish: [
			"placeholderTitle.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png", 
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png" 
		],
		imageArrayRearSpanish: [
			"placeholderTitle.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png", 
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png" 
		],
			
		pages: [],
		rears: [],
		hotSpots: [],
		pageImages: [],
		
		moveLeft: false,
		moveRight: false,
		canProceed: false,
		
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
	  
		centerX: function() {
			return this.x + (this.width / 2);
		},
		centerY: function() {
			return this.y + (this.height / 2);
		},
		halfWidth: function() {
			return this.width / 2;
		},
		halfHeight: function() {
			return this.height / 2;
		},
		
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
			
			canvas.style.width = BEN.currentWidth + 'px';
			canvas.style.height = BEN.currentHeight + 'px';
			
			if (window.innerHeight > 400 && BEN.android) {
				canvas.style.width = (window.innerWidth / 1) + 'px';
				canvas.style.height = (window.innerHeight / 1)+ 'px';
			}
			if (canvas.style.width === 962 + "px" && BEN.android) {
				canvas.style.width = (window.innerWidth / 2.522) + 'px';
			}
			
			BEN.scale = BEN.currentWidth / BEN.WIDTH;
			
			window.setTimeout(function() {
					window.scrollTo(0,1);
			}, 1);
		},
		prepareListeners: function() {

			window.addEventListener("mousemove",BEN.onMouseMove,false);
			window.addEventListener("mousedown",BEN.onMouseDown,false);
			window.addEventListener("mouseup",BEN.onMouseUp,false);

			canvas.addEventListener("touchmove", BEN.onTouchMove, false);
			canvas.addEventListener("touchstart", BEN.onTouchStart, false);
			canvas.addEventListener("touchend", BEN.onTouchEnd, false);
			
			canvas.addEventListener("ontouchstart", BEN.touchStart);
			canvas.addEventListener("ontouchend", BEN.touchEnd);
			canvas.addEventListener("ontouchmove", BEN.touchMove);
			canvas.addEventListener("ontouchcancel", BEN.touchCancel);
			
			window.addEventListener('load', BEN.init, false);
			window.addEventListener('BEN', BEN.resizeScreen, false);
		},
		initializeCards: function() {
			
			BEN.defineCardSpacing();
		},
		onMouseDown: function (event) {
		
			BEN.mouseDown = true;
			BEN.mouseUp = false;
			event.preventDefault(); 
		},
		onMouseUp: function (event) {
		
			BEN.mouseDown = false;
			BEN.mouseUp = true;
			event.preventDefault(); 
		},
		onMouseMove: function (event) {
		
			BEN.mouseX = (event.pageX - canvas.offsetLeft) / BEN.scale; 
			BEN.mouseY = (event.pageY - canvas.offsetTop) / BEN.scale;
			event.preventDefault(); 
		},
		onTouchMove: function (event) { 
	
			BEN.tapX = (event.targetTouches[0].pageX - canvas.offsetLeft) / BEN.scale;
			BEN.tapY = (event.targetTouches[0].pageY - canvas.offsetTop) / BEN.scale ;
			event.preventDefault(); 
		},
		onTouchStart: function (event) {
		
			BEN.tapX = event.targetTouches[0].pageX - canvas.offsetLeft;
			BEN.tapY = event.targetTouches[0].pageY - canvas.offsetTop;
			BEN.touchDown = true;
			BEN.touchUp = false;
			event.preventDefault(); 
		},
		onTouchEnd: function(event) {
			
			BEN.touchDown = false;
			BEN.touchUp = true;
			event.preventDefault();
		},
		touchStart: function(event,passedName) {
		
			event.preventDefault();
			BEN.fingerCount = event.touches.length;
		
			if (BEN.fingerCount === 1) {
				BEN.startX = event.touches[0].pageX;
				BEN.startY = event.touches[0].pageY;
			} else {
				touchCancel(event);
			}
		},
		touchMove: function(event) {
		
			event.preventDefault();
			if (event.touches.length === 1) {
				BEN.curX = event.touches[0].pageX;
				BEN.curY = event.touches[0].pageY;
			} else {
				touchCancel(event);
			}
		},
		touchEnd: function(event) {
		
			event.preventDefault();
			if (BEN.fingerCount == 1 && BEN.curX != 0) {
				BEN.swipeLength = Math.round(Math.sqrt(Math.pow(BEN.curX - BEN.startX,2) + Math.pow(BEN.curY - BEN.startY,2)));
				if (BEN.swipeLength >= BEN.minLength && BEN.touchUp === false) {
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
		},
		touchCancel: function(event) {
	
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
		},
		caluculateAngle: function() {
		
			var X = BEN.startX-BEN.curX;
			var Y = BEN.curY-BEN.startY;
			var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); 
			var r = Math.atan2(Y,X); 
			BEN.swipeAngle = Math.round(r*180/Math.PI); 
			if (BEN.swipeAngle < 0 ) { BEN.swipeAngle =  360 - Math.abs(BEN.swipeAngle); }
		},
		determineSwipeDirection: function() {
			
			if ((BEN.swipeAngle <= 45) && (BEN.swipeAngle >= 0)) {
				BEN.swipeDirection = 'left';

			} else if ((BEN.swipeAngle <= 360) && (BEN.swipeAngle >= 315)) {
				BEN.swipeDirection = 'left';
			} else if ((BEN.swipeAngle >= 135) && (BEN.swipeAngle <= 225)) {
				BEN.swipeDirection = 'right';
			}
		},
		processingRoutine: function() {
	
			if (BEN.swipeDirection == 'left' && BEN.currentPage >= 1 && BEN.currentPage < 14 && BEN.canProceed) {
				BEN.moveLeft = true;
				BEN.moveRight = false;
			}
				
			if (BEN.swipeDirection == 'left' && BEN.currentPage === 0 && BEN.currentSide === 1) {
				BEN.moveLeft = true;
				BEN.moveRight = false;
			}
		
			if (BEN.swipeDirection == 'right' && BEN.currentPage >= 1 && BEN.currentPage <= 14) {
				BEN.moveRight = true;
				BEN.moveLeft = false;
			}
				
			if (BEN.swipeDirection == 'right' && BEN.currentPage === 0 && BEN.currentSide === 1) {
				BEN.moveRight = true;
				BEN.moveLeft = false;
			}
		},
		addCardsToArray: function (num, destArr, x , y, w, h) {
		
			for (var i = 0; i < num; i++) {
				var card = Object.create(BEN);
				card.x = x;
				card.y = y;
				card.width = w;
				card.height = h;
				destArr.push(card);
			}
		},
		createHotSpotObjects: function(targetArr,x,y,w,h) {
		
			var hotSpot = Object.create(BEN);
				hotSpot.x = x;
				hotSpot.y = y;
				hotSpot.width = w;
				hotSpot.height = h;
				targetArr.push(hotSpot);
		},
		createENPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.assetsToLoad.push(image);
			}
		},
		createESPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.assetsToLoad3.push(image);
			}
		},
		createENRearPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.assetsToLoad2.push(image);
			}
		},
		createESRearPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.assetsToLoad4.push(image);
			}
		},
		checkCurrentState: function() {

			if (!BEN.mainCalled) {
				window.setTimeout(this.checkCurrentState,24);
				context.clearRect(0,0,canvas.width,canvas.height);
			
				switch (BEN.currentState) {

					case "loading":		//DRAW THE LOADING ICON
				
					if (BEN.android || BEN.ios) {
						BEN.resizeScreen();
						BEN.increment = BEN.assetsToLoad.length / 100;	
						BEN.percentage = BEN.checkingLoads / 100;
					
						context.drawImage(loadingWhiteImage,loadingWhite.x,loadingWhite.y,loadingWhite.width,loadingWhite.height);
				
						context.drawImage(loadingColorImage,0,loadingColor.height - (loadingColor.height * BEN.percentage),
							loadingColor.width, loadingColor.height * BEN.percentage,50, 449 - (loadingColor.height * BEN.percentage),
							loadingColor.width,	loadingColor.height * BEN.percentage);
					
						if (BEN.percentage > .9) {
							BEN.currentState = "play";
						}
					}
				
					if (!BEN.android && !BEN.ios) {
						BEN.currentState = "play";
					}
					break;
				
					case "play":       //DRAW THE GREEN ARROW
					main();
					BEN.mainCalled = true;
					break;
				}
			}
		},
		defineCardSpacing: function() {
			
			for (var j = 1; j < 23; j++) {

				BEN.pages[j].x = BEN.pages[j - 1].x + 1470;
			}	
		},
		onLoad: function() { 
	
			BEN.checkingLoads++;
		}
	};


	BEN.ua = navigator.userAgent.toLowerCase();
	BEN.android = BEN.ua.indexOf('android') > -1 ? true : false;
	BEN.ios = ( BEN.ua.indexOf('iphone') > -1 || BEN.ua.indexOf('ipad') > -1  ) ? 
		true : false;
	
	BEN.createHotSpotObjects(BEN.hotSpots,0,50,640,960);
	BEN.createHotSpotObjects(BEN.hotSpots,30,738,280,200);
	BEN.createHotSpotObjects(BEN.hotSpots,328,738,280,200);
	BEN.createHotSpotObjects(BEN.hotSpots,450,10,180,140);
	BEN.createHotSpotObjects(BEN.hotSpots,0,813,150,184);
	BEN.createHotSpotObjects(BEN.hotSpots,490,813,150,184);
	
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
	
	var loadingImage = new Image();
	loadingImage.src = assets + "loadingImage.png";

	BEN.addCardsToArray(1,BEN.pages,0,0,640,960);
	BEN.addCardsToArray(22,BEN.pages,1000,0,640,960);
	BEN.addCardsToArray(1,BEN.rears,0,0,640,960);
	BEN.addCardsToArray(22,BEN.rears,1000,0,640,960);
	
	BEN.createENPageImages(BEN.imageArrayFrontEnglish);
	BEN.createESPageImages(BEN.imageArrayFrontSpanish);
	BEN.createENRearPageImages(BEN.imageArrayRearEnglish);
	BEN.createESRearPageImages(BEN.imageArrayRearSpanish);
	
	BEN.checkCurrentState();
	BEN.initializeCards();
	BEN.init();
	BEN.prepareListeners();

	function main() {

		BEN.resizeScreen();
			
		requestAnimationFrame(main,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);

		//COLLISION DETECTION FOR ENGLISH WITH TOUCH

		if (BEN.tapY > 500 && BEN.tapX <= 320 && BEN.currentPage === -1 && BEN.swipeLength === 0) {
			
			if (BEN.touchDown && BEN.pages[0].x === 0) {
				context.drawImage(englishPressedImage,englishPressed.x,englishPressed.y,englishPressed.width,englishPressed.height);
			}
			
			if (BEN.touchUp && !BEN.moveLeft && !BEN.moveRight) {
				BEN.englishChosen = true;
				BEN.englishOn = true;
				BEN.spanishOn = false;
				BEN.moveLeft = true;
			}	 
		}
	  
	 	//COLLISION DETECTION FOR SPANISH WITH TOUCH

		if (BEN.tapY > 800 && BEN.tapX > 320 && BEN.currentPage === -1 && BEN.swipeLength === 0) {
	 
			if (BEN.touchDown && BEN.pages[0].x === 0) {
				context.drawImage(spanishPressedImage,spanishPressed.x,spanishPressed.y,spanishPressed.width,spanishPressed.height);
			}
			if (BEN.touchUp && BEN.currentPage === -1 && !BEN.moveLeft && !BEN.moveRight) {
				BEN.spanishChosen = true;
				BEN.spanishOn = true;
				BEN.englishOn = false;
				BEN.moveLeft = true;
			}
		}

		//MOVING PAGES LEFT
		
		function movePagesLeft() {
			
				if (BEN.moveLeft && BEN.currentPage >= 0 && BEN.currentPage < 14 || BEN.englishChosen || BEN.spanishChosen) {
				
					if (BEN.pages[i].x < -600 && BEN.pages[i].x > -980) {
						BEN.currentSide = 0;
					}   	
					if (BEN.pages[i].x < 0 && BEN.pages[i].x >= -600) {
						BEN.mouseUp = false;
						BEN.touchUp = false;
					}	
					if (BEN.pages[BEN.currentPage + 2].x < 0) {
						BEN.moveLeft = false;
				
						if (BEN.currentPage < 14) {
							BEN.currentPage++;
							BEN.englishChosen = false;
							BEN.spanishChosen = false;
						}
					}
				
				var vx = -165;
				BEN.pages[i].x += vx * BEN.EASING;
			}
		}	

		function movePagesRight() {
			
			if (BEN.moveRight && BEN.currentPage >= 0 && BEN.currentPage <= 14 && !BEN.englishChosen && !BEN.spanishChosen) {
				  
				if (BEN.pages[BEN.currentPage + 1].x > 700 && BEN.pages[BEN.currentPage + 1].x < 900) {
					BEN.currentSide = 0;
				}
				if (BEN.pages[BEN.currentPage + 1].x > 0 && BEN.pages[BEN.currentPage + 1].x <= 700) {
					BEN.mouseUp = false;
					BEN.touchUp = false;
				}	
				if (BEN.pages[BEN.currentPage + 1].x > 1470) {
					BEN.moveRight = false;
					BEN.currentPage--;
				}
					
				var vx = 165;
				BEN.pages[i].x += vx * BEN.EASING; 
			}
		}	
		
		function keepPagesAligned() {
				
			if (!BEN.moveLeft && !BEN.moveRight && BEN.currentPage >= 0 && !BEN.folding && !BEN.unfolding) {
				 
				BEN.pages[BEN.currentPage + 1].x = 0;
				BEN.pages[BEN.currentPage + 2].x = 1470;
			} 
		}
		
		for (var i = 0; i < BEN.pages.length; i++) { 
		
				movePagesLeft();
				movePagesRight();
				keepPagesAligned();	
		}
		
		if (BEN.pages[0].x > 0) {
			BEN.pages[0].x = 0;
		}
		if (BEN.pages[15].x < 0) {
			BEN.pages[15].x = 0;
		}
		
		//DRAWING THE IMAGES ONTO THE PAGE

		for (var k = 0; k < 23; k++) {

			if (BEN.currentSide === 0) {
		
				if (!BEN.englishOn && !BEN.spanishOn) {
					context.drawImage(BEN.assetsToLoad[0],BEN.pages[0].x,BEN.pages[0].y,BEN.pages[0].width,BEN.pages[0].height);
				}
				if (BEN.englishOn) {
					context.drawImage(BEN.assetsToLoad[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
				}
				if (BEN.spanishOn) {
					context.drawImage(BEN.assetsToLoad3[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
				}
				if (BEN.folding && BEN.pages[k].width > 0) {
					BEN.pages[k].x += 35.5;
					BEN.pages[k].width -= 71.1;
				}
				if (BEN.unfolding && BEN.pages[k].width < 640) {
					BEN.pages[k].x -= 35.5;
					BEN.pages[k].width += 71.1;
				}
			}

			if (BEN.currentSide === 1) {

				if (BEN.englishOn) {
					context.drawImage(BEN.assetsToLoad2[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
				}
				if (BEN.spanishOn) {
					context.drawImage(BEN.assetsToLoad4[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
				}	
				if (BEN.folding && BEN.pages[k].width > 0 && !BEN.moveLeft && !BEN.moveRight) {
					BEN.pages[k].x += 35.5;
					BEN.pages[k].width -= 71.1;
				}
				if (BEN.unfolding && BEN.pages[k].width < 640) {
					BEN.pages[k].x -= 35.5;
					BEN.pages[k].width += 71.1;
				}
			}

			if (BEN.folding && BEN.pages[k].width < 0 && BEN.currentSide === 0 && !BEN.moveLeft && !BEN.moveRight) {
				BEN.pages[k].width = 0;
				BEN.folding = false;
				BEN.unfolding = true;
				BEN.currentSide = 1;
			}
			if (BEN.folding && BEN.pages[k].width < 0 && BEN.currentSide === 1) {
				BEN.pages[k].width = 0;
				BEN.folding = false;
				BEN.unfolding = true;
				BEN.currentSide = 0;
			}
			if (BEN.unfolding && BEN.pages[k].width > 640) {
				BEN.pages[k].width = 640;
				BEN.unfolding = false;
				BEN.folding = false;
			}
		}

		if (BEN.currentPage >= 1 && !BEN.moveLeft && !BEN.moveRight) {
			context.font =  "bold 24pt sesame";
			context.fillStyle = "#fff";
			context.fillText(BEN.currentPage + " / 14",20,40);
			
			if (!BEN.android && !BEN.ios) {
				context.drawImage(leftButtonImage,leftButton.x,leftButton.y,leftButton.width,leftButton.height);
			}
			if (BEN.currentPage < 14 && !BEN.android && !BEN.ios) {
				context.drawImage(rightButtonImage,rightButton.x,rightButton.y,rightButton.width,rightButton.height);
			}
		}	
		if (BEN.currentPage === 0 && BEN.currentSide === 1 && !BEN.android && !BEN.ios) {
			context.drawImage(leftButtonImage,leftButton.x,leftButton.y,leftButton.width,leftButton.height);
			context.drawImage(rightButtonImage,rightButton.x,rightButton.y,rightButton.width,rightButton.height);
		}
		if (BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight) {
			context.drawImage(xBtnImage,xBtn.x,xBtn.y,xBtn.width,xBtn.height);
		}
		if (BEN.currentPage === -1 && BEN.pages[0].x === 0) {
			context.drawImage(xBtnImage,xBtn.x,xBtn.y,xBtn.width,xBtn.height);
		}

		if (BEN.pages[1].x === 0) {
			BEN.pages[0].x = -1470;
		}
	  
		
		//COLLISION DETECTION FOR ENGLISH WITH TOUCH

		if (BEN.tapY > 500 && BEN.tapX <= 320 && BEN.currentPage === -1 && BEN.swipeLength === 0) {
	 
			if (BEN.touchDown && BEN.pages[0].x === 0) {
				context.drawImage(englishPressedImage,englishPressed.x,englishPressed.y,englishPressed.width,englishPressed.height);
			}
			
			if (BEN.touchUp && !BEN.moveLeft && !BEN.moveRight) {
				BEN.englishChosen = true;
				BEN.englishOn = true;
				BEN.spanishOn = false;
				BEN.moveLeft = true;
			}
		}
	  
		//COLLISION DETECTION FOR SPANISH WITH TOUCH

		if (BEN.tapY > 800 && BEN.tapX > 320 && BEN.currentPage === -1 && BEN.swipeLength === 0) {
	 
			if (BEN.touchDown && BEN.pages[0].x === 0) {
				context.drawImage(spanishPressedImage,spanishPressed.x,spanishPressed.y,spanishPressed.width,spanishPressed.height);
			}
			if (BEN.touchUp && BEN.currentPage === -1 && !BEN.moveLeft && !BEN.moveRight) {
				BEN.spanishChosen = true;
				BEN.spanishOn = true;
				BEN.englishOn = false;
				BEN.moveLeft = true;
			}
		}
	  
		//BUILDING THIS GUY RIGHT NOW
	    /*
        function checkCollisionMouse(obj1,) {
			
			for (var i = 0; i < BEN.hotSpots.length; i++) {
								
				var vx = obj1.mouseX - BEN.hotSpots[i].centerX();
				var vy = obj1.mouseY - BEN.hotSpots[i].centerY();
				
				var combinedWidths = obj1.halfWidth() + BEN.hotSpots[i].halfWidth();
				var combinesHeights = obj1.halfHeight() + BEN.hotSpots[i].halfHeight();
				
				if (Math.abs(vx) < combinedHalfWidths) {
					
					if (Math.abs(vy) < combinedHalfHeights) {
						
						if (BEN.currentPage >= 0) {
							
							if (BEN.mouseUp && !BEN.unfolding && !BEN.folding && !BEN.moveLeft && !BEN.moveRight) {
					
								if (BEN.currentSide === 0) {
									BEN.canProceed = true;
									BEN.folding = true;
									BEN.mouseUp = false;
								}
							}
						
							if (BEN.mouseUp && !BEN.unfolding && !BEN.folding && !BEN.moveLeft && !BEN.moveRight) {
							
								if (BEN.currentSide === 1) {
									BEN.canProceed = true;
									BEN.folding = true;
									BEN.mouseUp = false;
								}
							}
						}
					}
				}
			}
         */
        
		//COLLISION DETECTION FOR ENGLISH WITH MOUSE
		
		var vx4 = BEN.mouseX - BEN.hotSpots[1].centerX();				
	    var vy4 = BEN.mouseY - BEN.hotSpots[1].centerY();
	  
		var combinedHalfWidths4 = BEN.mouseW + BEN.hotSpots[1].halfWidth();
		var combinedHalfHeights4 = BEN.mouseH + BEN.hotSpots[1].halfHeight();

		if (Math.abs(vx4) < combinedHalfWidths4) {
		
			if (Math.abs(vy4) < combinedHalfHeights4) {
			
				if (BEN.mouseDown && BEN.currentPage === -1 && BEN.pages[0].x === 0) {
					context.drawImage(englishPressedImage,englishPressed.x,englishPressed.y,englishPressed.width,englishPressed.height);
				}
				if (BEN.mouseUp && BEN.currentPage === -1 && !BEN.moveLeft && !BEN.moveRight) {	
					BEN.englishChosen = true;
					BEN.englishOn = true;
					BEN.spanishOn = false;
				}
			}
		}
	  
		//COLLISION DETECTION FOR SPANISH WITH MOUSE
	  
		var vx5 = BEN.mouseX - BEN.hotSpots[2].centerX();				
		var vy5 = BEN.mouseY - BEN.hotSpots[2].centerY();
	  
		var combinedHalfWidths5 = BEN.mouseW + BEN.hotSpots[2].halfWidth();
		var combinedHalfHeights5 = BEN.mouseH + BEN.hotSpots[2].halfHeight();

		if (Math.abs(vx5) < combinedHalfWidths5) {
		
			if (Math.abs(vy5) < combinedHalfHeights5) {
				
				if (BEN.mouseDown && BEN.currentPage === -1 && BEN.pages[0].x === 0) {
		
					context.drawImage(spanishPressedImage,spanishPressed.x,spanishPressed.y,spanishPressed.width,spanishPressed.height);
				}
				if (BEN.mouseUp && BEN.currentPage === -1 && !BEN.moveLeft && !BEN.moveRight) {
					BEN.spanishChosen = true;
					BEN.spanishOn = true;
					BEN.englishOn = false;
				}
			}
		}
	  
		//COLLISION DETECTION FOR CARDS WITH MOUSE
	  
		var vx1 = BEN.mouseX - BEN.hotSpots[0].centerX();				
		var vy1 = BEN.mouseY - BEN.hotSpots[0].centerY();
	  
		var combinedHalfWidths1 = BEN.mouseW + BEN.hotSpots[0].halfWidth();
		var combinedHalfHeights1 = BEN.mouseH + BEN.hotSpots[0].halfHeight();

		if (Math.abs(vx1) < combinedHalfWidths1) {
		
			if (Math.abs(vy1) < combinedHalfHeights1) {
			
				if (BEN.currentPage >= 0) {
			   
					if (BEN.mouseUp && !BEN.unfolding && !BEN.folding && !BEN.moveLeft && !BEN.moveRight) {
					
						if (BEN.currentSide === 0) {
							BEN.canProceed = true;
							BEN.folding = true;
							BEN.mouseUp = false;
						}
					}
				
					if (BEN.mouseUp && !BEN.unfolding && !BEN.folding && !BEN.moveLeft && !BEN.moveRight) {
					
						if (BEN.currentSide === 1) {
							BEN.canProceed = true;
							BEN.folding = true;
							BEN.mouseUp = false;
						}
					}
				}		
			}
		}
	  
	    //COLLISION DETECTION FOR CARDS WITH TOUCH
		
		var vx = BEN.tapX - BEN.hotSpots[0].centerX();				
		var vy = BEN.tapY - BEN.hotSpots[0].centerY();
	  
		var combinedHalfWidths = BEN.tapW + BEN.hotSpots[0].halfWidth();
		var combinedHalfHeights = BEN.tapH + BEN.hotSpots[0].halfHeight();

		if (Math.abs(vx) < combinedHalfWidths) {
		
			if (Math.abs(vy) < combinedHalfHeights) {
		
				if (BEN.currentPage >= 0) {
				
					if (BEN.touchUp) {
						
						if (BEN.currentSide === 0 && !BEN.moveLeft && !BEN.unfolding && !BEN.folding && !BEN.moveRight) {
							BEN.canProceed = true;
							BEN.folding = true;
							BEN.touchUp = false;
						}
					} 
					if (BEN.touchUp) {
					
						if (BEN.currentSide === 1 && !BEN.moveLeft && !BEN.unfolding && !BEN.folding && !BEN.moveRight) {
							BEN.canProceed = true;
							BEN.folding = true;
							BEN.touchUp = false;
						}
					}
				}
			}
		}
	  
		//COLLISION DETECTION FOR X BUTTON WITH MOUSE

		var vx2 = BEN.mouseX - BEN.hotSpots[3].centerX();				
		var vy2 = BEN.mouseY - BEN.hotSpots[3].centerY();
	  
		var combinedHalfWidths2 = BEN.mouseW + BEN.hotSpots[3].halfWidth();
		var combinedHalfHeights2 = BEN.mouseH + BEN.hotSpots[3].halfHeight();

		if (Math.abs(vx2) < combinedHalfWidths2) {
		
			if (Math.abs(vy2) < combinedHalfHeights2) {
			
				if (BEN.mouseDown) {
					window.history.back();
				}
			}
		}
	  
		//COLLISION DETECTION FOR X BUTTON WITH TOUCH

		if (BEN.tapY < 200 && BEN.tapX > 500) {
			
			if (BEN.touchDown) {
				window.history.back();
			}
		 }
	  
		//COLLISION DETECTION FOR LEFT BUTTON WITH MOUSE
	  
		var vx2 = BEN.mouseX - BEN.hotSpots[4].centerX();				
		var vy2 = BEN.mouseY - BEN.hotSpots[4].centerY();
	  
		var combinedHalfWidths2 = BEN.mouseW + BEN.hotSpots[4].halfWidth();
		var combinedHalfHeights2 = BEN.mouseH + BEN.hotSpots[4].halfHeight();

		if (Math.abs(vx2) < combinedHalfWidths2) {
		
			if (Math.abs(vy2) < combinedHalfHeights2) {
			
				if (BEN.mouseDown && BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight && BEN.canProceed) {
					BEN.folding = false;
					BEN.unfolding = false;
					BEN.moveRight = true;
					context.drawImage(leftButtonPressedImage,leftButtonPressed.x,leftButtonPressed.y,leftButtonPressed.width,leftButtonPressed.height);
				}
			}
		}
	  
		//COLLISION DETECTION FOR LEFT BUTTON WITH TOUCH
		
		var vx3 = BEN.tapX - BEN.hotSpots[4].centerX();				
		var vy3 = BEN.tapY - BEN.hotSpots[4].centerY();
	  
		var combinedHalfWidths3 = BEN.mouseW + BEN.hotSpots[4].halfWidth();
		var combinedHalfHeights3 = BEN.mouseH + BEN.hotSpots[4].halfHeight();

		if (Math.abs(vx3) < combinedHalfWidths3) {
		
			if (Math.abs(vy3) < combinedHalfHeights3) {
			
				if (BEN.touchDown && BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight) {
					BEN.folding = false;
					BEN.unfolding = false;
					BEN.moveRight = true;
					context.drawImage(leftButtonPressedImage,leftButtonPressed.x,leftButtonPressed.y,leftButtonPressed.width,leftButtonPressed.height);
				}
			}
		}
	  
		//COLLISION DETECTION FOR RIGHT BUTTON WITH MOUSE
		
		var vx2 = BEN.mouseX - BEN.hotSpots[5].centerX();				
		var vy2 = BEN.mouseY - BEN.hotSpots[5].centerY();
	  
		var combinedHalfWidths2 = BEN.mouseW + BEN.hotSpots[5].halfWidth();
		var combinedHalfHeights2 = BEN.mouseH + BEN.hotSpots[5].halfHeight();

		if (Math.abs(vx2) < combinedHalfWidths2) {
		
			if (Math.abs(vy2) < combinedHalfHeights2) {
			
				if (BEN.mouseDown && BEN.currentPage < 14 && BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight && BEN.canProceed) {
					BEN.canProceed = true;
					BEN.folding = false;
					BEN.unfolding = false;
					BEN.moveLeft = true;
					context.drawImage(rightButtonPressedImage,rightButtonPressed.x,rightButtonPressed.y,rightButtonPressed.width,rightButtonPressed.height);
				}
			}
		}
	  
		//COLLISION DETECTION FOR RIGHT BUTTON WITH TOUCH
		
		var vx3 = BEN.tapX - BEN.hotSpots[5].centerX();				
		var vy3 = BEN.tapY - BEN.hotSpots[5].centerY();
	  
		var combinedHalfWidths3 = BEN.mouseW + BEN.hotSpots[5].halfWidth();
		var combinedHalfHeights3 = BEN.mouseH + BEN.hotSpots[5].halfHeight();

		if (Math.abs(vx3) < combinedHalfWidths3) {
		
			if (Math.abs(vy3) < combinedHalfHeights3) {
			
				if (BEN.touchDown && BEN.currentPage < 14 && BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight && BEN.canProceed) {
					BEN.folding = false;
					BEN.unfolding = false;
					BEN.moveLeft = true;
					context.drawImage(rightButtonPressedImage,rightButtonPressed.x,rightButtonPressed.y,rightButtonPressed.width,rightButtonPressed.height);
				}
			}
		}
	}

})();
