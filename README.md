#Gouda

SCSS Framework that will allow you to quickly extend icon fonts into your project. Uses Genericons and Glyphicons.

####Table of Contents

1. Summary
2. Font Packages
3. Gouda SCSS Framework

##Summary

##Font Packages

####Genericons

Genericons are vector icons embedded in a webfont designed to be clean and simple keeping with a generic aesthetic.

http://genericons.com/

####Glyphicons

Includes 200 glyphs in font format from the Glyphicon Halflings set.

http://getbootstrap.com/components/#glyphicons

##Gouda SCSS Framework

###Installation

1. Take the files from the `src` directory and drop them into your SCSS folder structure.

2. Make sure all of the paths for the imports match your folder structure.

3. Import "gouda.scss".

4. Make sure the paths for the fonts are up to date.

###Usage

The benefit of Gouda is that it allows you to extend the font icons and use them however you'd like. You should be able to use this on any tag with (or without) an identifier such as a class, ID, data attribute, and so on.

####Icon On a Tag

Example of extending icon on an `i` tag.

#####HTML

```

i {
	
	@extend %icon;
	@extend %icon-cloud-upload;

}

```

####Icon Using a Class