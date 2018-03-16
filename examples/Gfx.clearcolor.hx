import haxegon.*;

class Main {
	function new() {
		//Don't clear the screen each frame
	  Gfx.clearcolor = Col.TRANSPARENT;
	}
	
	function update() {
		//Draw a filled hexagon at the mouse cursor
		Gfx.fillhexagon(Mouse.x, Mouse.y, 50, Core.time, Gfx.hsl(Core.time * 30, 0.5, 0.5)); 
	}
}