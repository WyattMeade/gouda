var source = $("#icon-template").html();
var template = Handlebars.compile(source);

$("ul").append(template(iconData));