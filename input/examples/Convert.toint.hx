import haxegon.*;

class Main{
  function update(){
    trace("5" + 2.5); //results in 52.5
    trace(Convert.toint("5") + Convert.toint(2.5)); //results in 7
  }
}