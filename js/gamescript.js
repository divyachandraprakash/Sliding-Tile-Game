	easy=false;
	medium=true;
	difficult=false;
	size=4;
		document.getElementById("gameMedium").style.display="block";
		document.getElementById("gameDifficult").style.display="none";
		document.getElementById("gameEasy").style.display="none";
			setSquareSize();	
	win=false;
	easyNewGame=[1,6,2,8,3,'\xa0',4,5,7];
	mediumNewGame=[1,6,5,2,8,7,4,'\xa0',15,12,3,11,13,10,14,9];
	difficultNewGame=[11,'\xa0',18,7,4,3,13,2,14,12,21,1,5,19,10,6,17,23,15,8,16,22,9,24,20];
	hours=0;
	minutes=0;
	seconds=0;
	moves=0;
	var modal = document.getElementById('myModal');
			// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	span.onclick = function() {
    	modal.style.display = "none";
	}

	//When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

	function calc(args) {
		var id=args.className.split("");
		var r=parseInt(id[0]);
		var c=parseInt(id[1]);
		// calculate possible positions
		var pos=[];
		if((c-1)>=0 && (c-1)<size) {
			var pos1=r+""+(c-1);
		}
		else {
			var pos1=null;
		}
		
		if((c+1)>=0 && (c+1)<size) {
			var pos2=r+""+(c+1);
		}
		else {
			var pos2=null;
		}
		
		if((r-1)>=0 && (r-1)<size) {
			var pos3=(r-1)+""+c;
		}
		else {
			var pos3=null;
		}
		
		if((r+1)>=0 && (r+1)<size) {
			var pos4=(r+1)+""+c;
		}
		else {
			var pos4=null;
		}
		
		pos.push(pos1,pos2,pos3,pos4);

		for(var i=0;i<4;i++) {		
			if(pos[i]!=null) {
				pos[i]=pos[i].split("").map(Number);
				var n=i+1;
				var str="pos"+n;
				var elements=document.getElementsByClassName(eval(str));
				var element={};
				for(var k=0;k<elements.length;k++) {
						if(easy) {
							if(elements[k].parentElement.id=="gameEasy"){
								element=elements[k];
								break;
							}	
						}

						if(medium) {
							if(elements[k].parentElement.id=="gameMedium"){
								element=elements[k];
								break;
							}	
						}

						if(difficult) {
							if(elements[k].parentElement.id=="gameDifficult"){
								element=elements[k];
								break;
							}	
						}														
				}
				

				if(element.innerText=='\xa0') {
					moves++;
					document.getElementById("moves").innerHTML=moves;
					element.childNodes[0].innerText=args.innerText;
					args.childNodes[0].innerText='\xa0';
					args.classList.remove("background");
					args.classList.add("white");
					element.classList.remove("white");
					element.classList.add("background");
					if(r==(size-1) && c==(size-1)) {
						win=true;
						var game = "";
						var num=[];
						if(easy) {
							 game=document.getElementById("gameEasy");
							 num=[1,2,3,4,5,6,7,8];
						}

						if(medium) {
							num=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
							game=document.getElementById("gameMedium");
						}

						if(difficult) {
							num=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
							game=document.getElementById("gameDifficult");
						}

						
						var children=game.children;
						for(var j=0;j<(children.length-1);j++) {
							var child=children[j];
							if(child.innerText!=num[j]){
								win=false;
								break;
							}
						}

					}
					if(win) {
						modal.style.display = "block";
						win=false;
						newGame();
					}
					
				}
			}
		}

	}

	function difficulty(args,choice) {
		hours=0;minutes=0;seconds=0;		
		var childrenButtons=args.parentElement.children;
		for(var i=0;i<childrenButtons.length;i++) {
			childrenButtons[i].className="";
		}
		args.className="selected";
		if(choice=="easy") {
			easy=true;
			medium=false;
			difficult=false;
			document.getElementById("gameMedium").style.display="none";
			document.getElementById("gameDifficult").style.display="none";
			document.getElementById("gameEasy").style.display="block";
			size=3;
		}

		else if(choice=="medium") {
			easy=false;
			medium=true;
			difficult=false;				
			document.getElementById("gameMedium").style.display="block";
			document.getElementById("gameDifficult").style.display="none";
			document.getElementById("gameEasy").style.display="none";
			size=4;
		}

		else {
			easy=false;
			medium=false;
			difficult=true;
			document.getElementById("gameMedium").style.display="none";
			document.getElementById("gameDifficult").style.display="block";
			document.getElementById("gameEasy").style.display="none";
			size=5;
		}

		newGame();
	}

	function newGame() {
		moves=0;
		document.getElementById("moves").innerHTML=moves;
		setSquareSize();
		hours=0;minutes=0;seconds=0;
		if(hours<10) {
			document.getElementById("hours").innerHTML = "0"+(hours)+":";
		}
	    else {
	    	document.getElementById("hours").innerHTML = (hours)+":";
	    }

	    if(minutes<10) {
			document.getElementById("minutes").innerHTML = "0"+(minutes)+":";
		}
		else {
			document.getElementById("minutes").innerHTML = (minutes)+":";
		}

		if(seconds<10) {
			document.getElementById("seconds").innerHTML = "0"+(seconds)+"";
		}
		else {
			document.getElementById("seconds").innerHTML = (seconds)+"";
		}


		var elements={};
		var arr=[];
		if(easy) {
			elements=document.getElementById("gameEasy").children;
			arr=easyNewGame;
		}
		if(medium) {
			elements=document.getElementById("gameMedium").children;
			arr=mediumNewGame;
		}
		if(difficult) {
			elements=document.getElementById("gameDifficult").children;
			arr=difficultNewGame;
		}
		for(var i=0;i<elements.length;i++) {
			elements[i].childNodes[0].innerText=arr[i];
			if(arr[i]=='\xa0'){
				elements[i].classList.remove("background");
				elements[i].classList.add("white");
			}
			else {
				elements[i].classList.remove("white");
				elements[i].classList.add("background");
			}
			
		}
	}

	setInterval(myTimeout3, 1000);
    setInterval(myTimeout2, 60000);
    setInterval(myTimeout1, 3600000);

    function myTimeout1() {
		hours++;
		minutes=0;
		seconds=0;
		if(hours<10) {
			document.getElementById("hours").innerHTML = "0"+(hours)+":";
		}
	    else {
	    	document.getElementById("hours").innerHTML = (hours)+":";
	    }
	}

	function myTimeout2() {
		minutes++;
		seconds=0;
		if(minutes<10) {
			document.getElementById("minutes").innerHTML = "0"+(minutes)+":";
		}
		else {
			document.getElementById("minutes").innerHTML = (minutes)+":";
		}
	    
	}

	function myTimeout3() {
		seconds++;
		if(seconds<10) {
			document.getElementById("seconds").innerHTML = "0"+(seconds)+"";
		}
		else {
			document.getElementById("seconds").innerHTML = (seconds)+"";
		}
	    
	}

	window.addEventListener("resize", setSquareSize);

	function setSquareSize() {
		var width=window.innerWidth;
		var height=window.innerHeight-205;
		var str="";
		if(easy) {
			str="gameEasy";
		}
		else if(medium) {
			str="gameMedium";
		}
		else if(difficult) {
			str="gameDifficult";
		}
		if(width<height) {
			document.getElementById(str).style.width=width+"px";
			document.getElementById(str).style.height=width+"px";
		}
		else {
			document.getElementById(str).style.width=height+"px";
			document.getElementById(str).style.height=height+"px";
		}		
	}

	if (!('ontouchstart' in document.documentElement)
    && !navigator.maxTouchPoints
    && !navigator.msMaxTouchPoints) {
    	document.body.className += ' notouch';
	}
	else {
		if(window.screen.width<450) {
			document.body.className += ' touch';
		}
		
	}