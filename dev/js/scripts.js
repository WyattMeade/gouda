var source = $("#icon-template").html();
var template = Handlebars.compile(source);

$("section").append(template(iconData));