
(function() {
		
	var BEN = {
		
		canvas: document.getElementById("canvas"),
		context: this.canvas.getContext("2d"),
		
		totalPages: 8,
	
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
            "coverButtons.jpg", "instructions.jpg", "card_front.jpg",
            "card_front.jpg", "card_front.jpg", "card_front.jpg",
            "card_front.jpg", "card_front.jpg", "card_front.jpg",
            "card_front.jpg", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png" 
		],
		imageArrayFrontSpanish: [
			"coverButtons.jpg", "instructions.jpg", "card_front.jpg",
            "card_front.jpg", "card_front.jpg", "card_front.jpg",
            "card_front.jpg", "card_front.jpg", "card_front.jpg",
            "card_front.jpg", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png", "placeholderFront.png",
            "placeholderFront.png", "placeholderFront.png" 
		],
		imageArrayRearEnglish: [
			"coverButtons.jpg", "instructions.jpg", "speak.jpg",
            "drive.jpg", "eat.jpg", "swim.jpg",
            "sing.jpg", "sleep.jpg", "dance.jpg", 
            "fallInLove.jpg", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png" 
		],
		imageArrayRearSpanish: [
			"coverButtons.jpg", "instructions.jpg","speak.jpg",
            "drive.jpg", "eat.jpg", "swim.jpg",
            "sing.jpg", "sleep.jpg", "dance.jpg", 
            "fallInLove.jpg", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png", "placeholderRear.png",
            "placeholderRear.png", "placeholderRear.png" 
		],
		imageArrayUI: [
			"PNC_mathcards_Xbtn.png","left.png", "right.png", "loading-color.png", 
			"loading-white.png"
		],
		
		pagesFrontEN: [],
		pagesRearEN: [],
		pagesFrontES: [],
		pagesRearES: [],
		
		pages: [],
		rears: [],
		hotSpots: [],
		UI: [],
		UIImages: [],
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
		
		setUpApplication: function() {
			
			BEN.createPageImages();
			BEN.createUIImages(BEN.imageArrayUI);
			BEN.checkCurrentState();
			BEN.initializeHotSpots();
			BEN.initializeUI();
			BEN.initializeCards();
			BEN.init();
			BEN.prepareListeners();
		},
		createPageImages: function() {
			BEN.createENPageImages(BEN.imageArrayFrontEnglish);
			BEN.createESPageImages(BEN.imageArrayFrontSpanish);
			BEN.createENRearPageImages(BEN.imageArrayRearEnglish);
			BEN.createESRearPageImages(BEN.imageArrayRearSpanish);
		},
		init: function() {
		
			BEN.RATIO = BEN.WIDTH / BEN.HEIGHT;
			BEN.currentWidth = BEN.WIDTH;
			BEN.currentHeight = BEN.HEIGHT;
			canvas.width = BEN.WIDTH;
			canvas.height = BEN.HEIGHT;
		},
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
		initializeHotSpots: function() {

			BEN.createHotSpotObjects(BEN.hotSpots,0,50,640,960);
			BEN.createHotSpotObjects(BEN.hotSpots,30,738,280,200);
			BEN.createHotSpotObjects(BEN.hotSpots,328,738,280,200);
			BEN.createHotSpotObjects(BEN.hotSpots,450,10,180,140);
			BEN.createHotSpotObjects(BEN.hotSpots,0,813,150,184);
			BEN.createHotSpotObjects(BEN.hotSpots,490,813,150,184);
		},
		initializeUI: function() {

			BEN.createUIObjects(BEN.UI,"loading",30,30,640,960);
			BEN.createUIObjects(BEN.UI,"xBtn",580,10,50,50);
			BEN.createUIObjects(BEN.UI,"englishPressed",0,820,321,125);
			BEN.createUIObjects(BEN.UI,"spanishPressed",320,820,321,125);
			BEN.createUIObjects(BEN.UI,"leftButton",0,803,70,70);
			BEN.createUIObjects(BEN.UI,"rightButton",565,803,70,70);
			BEN.createUIObjects(BEN.UI,"loadingColor",300,200,530,200);
			BEN.createUIObjects(BEN.UI,"loadingWhite",50,250,530,200);
		},		
		initializeCards: function() {
			
			BEN.addCardsToArray(1,BEN.pages,0,0,640,960);
			BEN.addCardsToArray(22,BEN.pages,1000,0,640,960);
			BEN.addCardsToArray(1,BEN.rears,0,0,640,960);
			BEN.addCardsToArray(22,BEN.rears,1000,0,640,960);
			
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
	
			if (BEN.swipeDirection == 'left' && BEN.currentPage >= 1 && BEN.currentPage < BEN.totalPages && BEN.canProceed) {
				BEN.moveLeft = true;
				BEN.moveRight = false;
			}
				
			if (BEN.swipeDirection == 'left' && BEN.currentPage === 0 && BEN.currentSide === 1) {
				BEN.moveLeft = true;
				BEN.moveRight = false;
			}
		
			if (BEN.swipeDirection == 'right' && BEN.currentPage >= 1 && BEN.currentPage <= BEN.totalPages) {
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
		createUIObjects: function(targetArr,name,x,y,w,h) {
		
			var name = Object.create(BEN);
				name.x = x;
				name.y = y;
				name.width = w;
				name.height = h;
				targetArr.push(name);
		},
		createUIImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.UIImages.push(image);
			}
		},
		createENPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.pagesFrontEN.push(image);
			}
		},
		createESPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.pagesFrontES.push(image);
			}
		},
		createENRearPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.pagesRearEN.push(image);
			}
		},
		createESRearPageImages: function(arr) {
			
			for (var i = 0; i < arr.length; i++) {
				var image = new Image();
				image.addEventListener("load", BEN.onLoad, false);
				image.src = assets + arr[i];
				BEN.pagesRearES.push(image);
			}
		},
		checkCurrentState: function() {

			if (!BEN.mainCalled) {
				window.setTimeout(this.checkCurrentState,24);
				BEN.context.clearRect(0,0,canvas.width,canvas.height);
			
				switch (BEN.currentState) {

					case "loading":		//DRAW THE LOADING ICON
				
					if (BEN.android || BEN.ios) {
						BEN.resizeScreen();
						BEN.increment = BEN.pagesFrontEN.length / 100;	
						BEN.percentage = BEN.checkingLoads / 100;
					
						BEN.context.drawImage(BEN.UIImage[3],BEN.UI[7].x,BEN.UI[7].y,BEN.UI[7].width,BEN.UI[7].height);
				
BEN.context.drawImage(BEN.UIImage[4],0,BEN.UI[6].height - (BEN.UI[6].height * BEN.percentage),
BEN.UI[6].width, BEN.UI[6].height * BEN.percentage,50, 449 - (BEN.UI[6].height * BEN.percentage),
BEN.UI[6].width, BEN.UI[6].height * BEN.percentage);
					
						if (BEN.percentage > .9) {
							BEN.currentState = "play";
						}
					}
				
					if (!BEN.android && !BEN.ios) {
						BEN.currentState = "play";
					}
					break;
				
					case "play":       //DRAW THE GREEN ARROW
					BEN.main();
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
		},
		main: function() {

			BEN.resizeScreen();
				
			requestAnimationFrame(BEN.main,canvas);
			BEN.context.clearRect(0,0,canvas.width,canvas.height);
			
			function movePagesLeft() {
				
				var pageVX = -165;
				
				if (BEN.moveLeft && BEN.currentPage >= 0 && BEN.currentPage < BEN.totalPages || BEN.englishChosen || BEN.spanishChosen) {
					
					if (BEN.pages[i].x < -600 && BEN.pages[i].x > -980) {
						BEN.currentSide = 0;
					}   	
					if (BEN.pages[i].x < 0 && BEN.pages[i].x >= -600) {
						BEN.mouseUp = false;
						BEN.touchUp = false;
					}	
					if (BEN.pages[BEN.currentPage + 2].x < 0) {
						BEN.moveLeft = false;
					
						if (BEN.currentPage < BEN.totalPages) {
							BEN.currentPage++;
							BEN.englishChosen = false;
							BEN.spanishChosen = false;
						}
					}
					
					BEN.pages[i].x += pageVX * BEN.EASING;
				}
			}	

			function movePagesRight() {
				
				if (BEN.moveRight && BEN.currentPage >= 0 && BEN.currentPage <= BEN.totalPages && !BEN.englishChosen && !BEN.spanishChosen) {
					  
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
			
				if (BEN.pages[1].x === 0) {
					BEN.pages[0].x = -1470;
					
				}
				
				if (BEN.pages[1].x > 1470) {
					BEN.pages[0].x = 0;
				}
			}
				
			function enforcePageBoundaries() {
				
				console.log(BEN.pages[1].x);
				
				if (BEN.pages[0].x > 0) {
					BEN.pages[0].x = 0;
				}
				
				if (BEN.pages[15].x < 0) {
					BEN.pages[15].x = 0;
				}
				
				
			}
			
			function renderCards() { 

				for (var k = 0; k < 23; k++) {

					if (BEN.currentSide === 0) {
				
						if (!BEN.englishOn && !BEN.spanishOn) {
							BEN.context.drawImage(BEN.pagesFrontEN[0],BEN.pages[0].x,BEN.pages[0].y,BEN.pages[0].width,BEN.pages[0].height);
						}
						if (BEN.englishOn) {
							BEN.context.drawImage(BEN.pagesFrontEN[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
						}
						if (BEN.spanishOn) {
							BEN.context.drawImage(BEN.pagesFrontES[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
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
							BEN.context.drawImage(BEN.pagesRearEN[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
						}
						if (BEN.spanishOn) {
							BEN.context.drawImage(BEN.pagesRearES[k],BEN.pages[k].x,BEN.pages[k].y,BEN.pages[k].width,BEN.pages[k].height);
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
			}

			function renderUI() {
			
				if (BEN.currentPage >= 1 && !BEN.moveLeft && !BEN.moveRight) {
					BEN.context.font =  "bold 24pt sesame";
					BEN.context.fillStyle = "#fff";
					BEN.context.fillText(BEN.currentPage + " / " + BEN.totalPages,20,40);
					
					if (!BEN.android && !BEN.ios) {
						BEN.context.drawImage(BEN.UIImages[1],BEN.UI[4].x,BEN.UI[4].y,BEN.UI[4].width,BEN.UI[4].height);
					}
					if (BEN.currentPage < BEN.totalPages && !BEN.android && !BEN.ios) {
						BEN.context.drawImage(BEN.UIImages[2],BEN.UI[5].x,BEN.UI[5].y,BEN.UI[5].width,BEN.UI[5].height);
					}
					if (BEN.currentPage === 0 && BEN.currentSide === 1 && !BEN.android && !BEN.ios) {
						BEN.context.drawImage(BEN.UIImages[1],BEN.UI[4].x,BEN.UI[4].y,BEN.UI[4].width,BEN.UI[4].height);
						BEN.context.drawImage(BEN.UIImages[2],BEN.UI[5].x,BEN.UI[5].y,BEN.UI[5].width,BEN.UI[5].height);
					}
					if (BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight) {
						BEN.context.drawImage(BEN.UIImages[0],BEN.UI[1].x,BEN.UI[1].y,BEN.UI[1].width,BEN.UI[1].height);
					}
					if (BEN.currentPage === -1 && BEN.pages[0].x === 0) {
						BEN.context.drawImage(BEN.UIImages[0],BEN.UI[1].x,BEN.UI[1].y,BEN.UI[1].width,BEN.UI[1].height);
					}
				}
			}
			
			for (var i = 0; i < BEN.pages.length; i++) { 
			
					movePagesLeft();
					movePagesRight();
					keepPagesAligned();			
			}	
			
			enforcePageBoundaries();	
			renderCards();	
			renderUI();
			
			//COLLISION DETECTION FOR ENGLISH WITH TOUCH

			if (BEN.tapY > 500 && BEN.tapX <= 320 && BEN.currentPage === -1 && BEN.swipeLength === 0) {
		 
				if (BEN.touchDown && BEN.pages[0].x === 0) {
					BEN.context.drawImage(englishPressedImage,BEN.UI[2].x,BEN.UI[2].y,BEN.UI[2].width,BEN.UI[2].height);
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
					BEN.context.drawImage(spanishPressedImage,BEN.UI[3].x,BEN.UI[3].y,BEN.UI[3].width,BEN.UI[3].height);
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
				
					if (BEN.mouseDown && BEN.currentPage < BEN.totalPages && BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight && BEN.canProceed) {
						BEN.canProceed = true;
						BEN.folding = false;
						BEN.unfolding = false;
						BEN.moveLeft = true;
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
				
					if (BEN.touchDown && BEN.currentPage < BEN.totalPages && BEN.currentPage >= 0 && !BEN.moveLeft && !BEN.moveRight && BEN.canProceed) {
						BEN.folding = false;
						BEN.unfolding = false;
						BEN.moveLeft = true;
					}
				}
			}
		}
	};


	BEN.ua = navigator.userAgent.toLowerCase();
	BEN.android = BEN.ua.indexOf('android') > -1 ? true : false;
	BEN.ios = ( BEN.ua.indexOf('iphone') > -1 || BEN.ua.indexOf('ipad') > -1  ) ? true : false;

	BEN.setUpApplication();

})();
