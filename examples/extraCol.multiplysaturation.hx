import haxegon.*;

class Main {	
	function update() {
	  //Multiply Col.GREEN by 50%, and clear the screen to that colour
	  //(making it half as saturated)
		Gfx.clearscreen(Col.multiplysaturation(Col.GREEN, 0.5));
	}
}