/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
	describe('RSS Feeds', function() {
		
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

        //two functions to be runned under a for loop itinerating through allFeeds
		function checkURL(feed) {
			it ('has a URL', function() {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		}

		function hasName(feed) {
			it ('has a name', function() {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		}

		for (const feed of allFeeds){
			checkURL(feed);
			hasName(feed);
		}
	});


	describe('The menu', function() {
		const body = $('body');
		const menuIcon = $('.menu-icon-link');

		it('is hidden', function() {
            //check if the body has that class
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		it('changes visibility if clicked', function() {
            //using click() from jQuery
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(false);
            
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(true);

		});


        
	});

	describe('Initial Entries', function() {
        

		beforeEach(function(done){
			loadFeed(0, function(){
		    done();
			});

		});

		it('there is at least one entry',function() {
            //check if there are elements in the DOM with a class .entry, if there are it passes the test
            var entries = $('.entry').length;
			expect(entries).not.toBe(0);

		});


        
	});

    describe('New Feed Selection', function() {

		beforeEach(function(done){
            // first feed
			loadFeed(0, function(){
                title1 = $(".entry h2").html(); 
            // second feed
                loadFeed(1, function() {
                    done(); 
                });
            });
		});

		it('content does change',function(done) {
            // to compare feeds
            expect($(".entry h2").html()).not.toBe(title1);   
            done();
		});


        
    });
    
}());
