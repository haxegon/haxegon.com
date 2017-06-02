import haxegon.*;

class Main {	
	function update() {
	  //Multiply Col.RED by 150%, and clear the screen to that colour
	  //(making it one and a half times brighter)
		Gfx.clearscreen(Col.multiplylightness(Col.RED, 1.5));
	}
}