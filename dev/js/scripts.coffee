###
# Gouda
# Authors:
# 	Kenneth Jackson (whoiskenjackson)
# 	Wyatt Meade (WyattMeade)
###

Gouda = ->

	#Create some options
	this.opt =
		scope: $("section")
		model: iconData
		templates: Handlebars.templates




	renderGuide = (icon) ->

		#Create Object for the icon
		model =
			icon: ""+icon+""

		#Render the Guide Template
		this.$el.find(".guide").html this.opt.templates["guide"](model)

		#Find the current top position for the Icons Container
		iconsTop = $(".icons").offset().top

		#Scroll to the top of the Icons Container
		$("html, body").animate { scrollTop: iconsTop }, "slow"




	renderTemplates = ->
		
		#Render Main Template
		this.$el.find("article").append this.opt.templates["main"]

		#Render Icons List
		this.$el.find(".icons-container").append this.opt.templates["iconsList"](this.opt.model)




	bindEvents = ->

		#Click event for an icon in the Icon List
		$(document).on "click", "[data-icon]", (e) ->

			e.preventDefault()

			#Find the Icon Name
			icon = $(this).data "icon"
			
			#Render the Guide
			renderGuide(icon)




	init = ->

		#Set this.$el
		this.$el = opt.scope

		#Render Templates
		renderTemplates()

		#Bind Events
		bindEvents()




	init()




Gouda()