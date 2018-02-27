Are you interested in making a haxegon plugin of your own? Great! Here are a few guidelines that might be useful:
 
  - Haxegon plugins should *ideally* be completely contained in a single .hx file.
  
  - Haxegon plugins should *ideally* work for all current haxegon targets (right now that's Native, HTML5 and Flash).
  
  - Haxegon plugins should *ideally* not require any external dependancies. If you're wrapping another library, consider embedding it, if possible.
  
  - Part of Haxegon's core design is to avoid creating unnecessary objects. Assets are handled with internal dictionaries, for example. Consider whether or not it makes sense for your plugin to take care of it's own objects.
  
  - Try not to expose any variables that the end user doesn't need to see. If you mark a class or variable as "private" in Haxe, you can still access it with your own class if you use Haxe's access metadata feature. For example, to access private functions from Gfx, add "@:access(haxegon.Gfx)" before the class you want to have access from.

These are all just guidelines, so feel free to break them where it makes sense.

Some technical details:

  - All Haxegon plugins should have an "enable" function which sets everything up. This function should be optional - all functions in my plugins start with the line "if (!enabled) enable();".
  
  - If you include "@:access(haxegon.Core)" before your plugin class, you will have access to some useful Core functions!
  
  - To tell Haxegon that your plugin is ready, you can call Core.registerplugin() like this: "Core.registerplugin("yourpluginname", "0.1.0");"
  
  - On that note, Haxegon and its plugins uses Semantic Versioning. You can read up about the concept here: <a href="https://semver.org/">https://semver.org/</a>
  
  - You can check for a particular version of haxegon with the Core.checkrequirement() function: "Core.checkrequirement("yourpluginname", "haxegon", "0.12.0");"
  
  - You can also use this to check for the presence of other plugins that you might depend on: "Core.checkrequirement("yourpluginname", "layers", "0.1.0");"
  
  - You can tell Haxegon to run a function at the start of every frame with the function "Core.extend_startframe(prepareplugin);". This will call the function "prepareplugin()" in your class. 
  
  - Similarly, there is also "Core.extend_endframe()" and "Core.extend_afterupdatebeforerender()".
  
  - If it doubt, check out the source code for <a href="https://github.com/haxegon/plugin_layers/blob/master/plugins/Layer.hx">the Layers filter for reference</a>.
  
  - If you've got any questions about any of this, feel free to ask! <a href="http://twitter.com/terrycavanagh/">I'm happy to help!</a>



