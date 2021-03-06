/**
* Create main page view and attach any necessary event listeners
*/

var MainPage = (function(){
	
	function MainPage(dataManager, entitiesPage) {
		this.dataManager = dataManager;
		this.entitiesPage = entitiesPage;
		this.setupSelector();
	}
	
	
	MainPage.prototype.mainPageNav = function(activeItem) {
		var view = activeItem.dataset.title;
		// Settings page has special handling, all other entities go through the EntitiesPage
		if (view === 'Settings') {
			tau.changePage('setup');
			var creds = HAServices.getCredentials();
			var url = creds.url;
			
			$('#setup-url').val(url);
		} else {
			this.entitiesPage.create(EntityMetadata[view]);
			tau.changePage('entities');
		}
	}
	
	MainPage.prototype.setupSelector = function() {
		var main = document.getElementById('main');
		var selector = document.getElementById('main-nav');		
		
		// Set up the selector component initially and also before page show
		this.selectorComponent = tau.widget.Selector(selector);

		main.addEventListener("pagebeforeshow", function() {
			this.selectorComponent = tau.widget.Selector(selector);
		}.bind(this));
		
		main.addEventListener("pagebeforehide", function() {
			this.selectorComponent && this.selectorComponent.destroy();
		}.bind(this));
		
		selector.addEventListener("click", function(e) {
			var activeItem = e.currentTarget.querySelector('.ui-item-active');
			this.mainPageNav(activeItem);
		}.bind(this), false);
		
		$('.ui-selector .ui-item').click(function(e){
			var activeItem = e.currentTarget;
			this.mainPageNav(activeItem);
			
			// Prevent the selectors main event listener from firing in the event of a direct item click
			e.preventDefault();
			event.stopPropagation();
		}.bind(this));
	}
	
	return MainPage;
})();