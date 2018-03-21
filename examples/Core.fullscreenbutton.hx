import haxegon.*;

class Main {
	public function init(){
    Core.fullscreenbutton(0, 0, Gfx.screenwidth, Gfx.screenheight);
	}
	
	public function update() {
		Gfx.drawbox(5, 5, Gfx.screenwidth - 5, Gfx.screenheight - 5, Col.WHITE);
		
		Text.size = 3;
		Text.display(Text.CENTER, Text.CENTER, "Click anywhere to toggle fullscreen");
	}
}