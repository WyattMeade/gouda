###
# Gouda
# Authors:
# 	Kenneth Jackson (whoiskenjackson)
# 	Wyatt Meade (WyattMeade)
###

Gouda = ->

	this.opt =
		scope: $("section")
		model: iconData
		templates: Handlebars.templates

	renderGuide = (icon) ->

		model =
			icon: ""+icon+""

		this.$el.find(".guide").html this.opt.templates["guide"](model)


	renderTemplates = ->
		
		#Render Main Template
		this.$el.find("article").append this.opt.templates["main"]

		#Render Icons List
		this.$el.find(".icons-list").append this.opt.templates["iconsList"](this.opt.model)




	bindEvents = ->

		$(document).on "click", "[data-icon]", (e) ->

			e.preventDefault()

			icon = $(this).data "icon"
			renderGuide(icon)




	init = ->

		this.$el = opt.scope
		renderTemplates()
		bindEvents()




	init()


Gouda()