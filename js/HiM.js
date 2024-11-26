/*!
 *
 * HiM is a men lifestyle journal, issued on monthly basis, to cover all subjects of interest of the
 * modern-age rugged gentleman all over the world; from travel, business, entertainment, entrepreneurship,
 * finance, fashion, skills, gadgets and a lot more
 *
 * EDITOR IN CHIEF. Hesham Yasein. heshamgyassin@gmail.com
 *
 * All rights reserved to HiM 2023 (C)
 *
 * License:
 * This code is based on turnjs - http://turnjs.com
 * Copyright (C) 2012 Emmanuel Garcia
 * The turn.js project is released under the BSD license and it's available on GitHub.
 * This license doesn't include features of the 4th release.
 *
 * wavesurfer.js 5.0.1 (2021-05-05)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 *
 *
 * Opinions expressed are solely those of the contributors.
 * No part of this magazine may be reproduced or transmitted in any form or by any means without a written
 * permission of the publisher.
 *
 */

/* TODO:
 * / 1. Move sideMenuButton and addThumb from HiM mobile menu to magazine.js
 * / 2. Add more controls to magazine Thumb (e.g. download PDF, back to Archive, ...)
 * / 3. adjust Thumbnails on Desktop version
 * / 4. Logo click goes to Home
 * / 5. Logo in footer (Logo, Menu Items, Contact Us, in all pages)
 * / 6. adjust Archive
 * / 7. Controls need to be in a separate div in both mobile and desktop menus
 * / 8. Build a Home
 **** / 1. Latest Featured
 **** X 2. Shop advertisement
 **** / 3. Newsletter
 **** / 4. HiM Club
 **** X 5. Category Highlight
 **** / 6. Latest Magazine & Past Editions
 **** X 7. Podcasts
 **** X 8. Videos
 * / 9. something is adding 0.5*magazineWidth to CSS Left on mobile
 * X 10. toggleSidePanelMenu hides/shows Controls on mobile
 * / 11. controls div below thumbnails menu
 * / 12. magazine.html for mobile
 * / 13. Further readings in editorial article need to get data from json
 * / 14. Load shop in editorial article from js in case of json has shop, otherwise n/a
 * / 15. Categories pages (/ Style, / Header Bottom Border, / Load More, Font, Sections, ...)
 **** / 1. Category Highlight
 **** / 2. Newsletter
 **** / 3. HiM Club
 **** / 4. Latest Magazine & Past Editions
 * / 16. article href in further readings, home and category pages
 * 17. Make sure mobile menu works perfectly
 * X 18. Home scroll is not smooth when there is featuredCategory Background
 * / 19. Categories in Home has a link to category page
 * / 20. Generate latest json, page, sorted articles by date
 * / 21. prepareFeaturedContent() shall take content from 1st item of Latest json, and
 * / 22. change the backgroundImage accordingly
 * / 23. featuredContent in all pages take from JS
 * / 24. JS add wp_content_x, consider all classes
 * / 25. Share in article shareBTN()
 * X 26. Editorial Menu
 * / 27. Build HiM Club Page
 * -- 28. Build Under Construction, About Us, Contact Us, Newsletter and / Login Page
 * / 29. Magazine to take from JSON
 * -- 30. Newsletter send e-mail and register to JSON file
 **** / 1. Send e-mail by auth client :()
 **** / 2. Publish to all pages
 **** / 3. Validate input
 **** / 4. JS from Form Input
 **** / 5. POST newsletter subscriber to Github either Secrets or newsletter file
 **** -- 6. Newsletter email templates (/ welcome, -- monthly, HiMClub, Magazine Edition Introduction)
 **** / 7. Check if email is already registered, then skip
 **** -- 8. Publish WebApp
 **** -- 9. Unsubscribe from newsletter (work on parseUrl())
 **** X 10. newsletter subscribers to stripe, instead of github (5)
 		--> doesn't work if the newsletter subscriber is not a stripe customer
		--> instead, register the stripe customers who checked newsletter subscription to github json
 **** -- 11. send newsletter e-mail (8)
 * / 31. Add Pinterest, YouTube, Meetup
 * -- 32. / Subscribe, / stripe session retrieval, / check subscription status on login, and -- redirect to subscription update/profile in case of unscubscribed
 * / 33. Profile, update stripe billing info
 * / 34. if address or any element is null, there is a problem in profile -> dispatchedLoginEvent > prepareProfile
 * -- 35. onLoad, check if the customer is loggedin
 * -- 36. / activate members-only features, -- subscribeRow.show()
 * / 37. profile picture, profile styling
 * -- 38. editorial article link to editorial category
 */

// const domain = window.location.protocol +'//' + window.location.href.split('/')[2] + '/' + window.location.href.split('/')[3] + '/' + window.location.href.split('/')[4] + '/' + window.location.href.split('/')[5] + '/' + window.location.href.split('/')[6] + '/' + window.location.href.split('/')[7] + '/' + window.location.href.split('/')[8];
const domain = window.location.protocol +'//' + window.location.href.split('/')[2];
const CLIENT_ID = '324503206928-c9vc49mtttkf4gfi5qf4qnn838p4j2fk.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDvSrsyOsI9ehXM4cqDsv9AqQwIioJsCI8';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
const GITHUB_NEWSLETTER_URL = 'https://api.github.com/repos/hgyassin/himjrnl/contents/newsletter.json?ref=master';
const SCOPES = 'https://mail.google.com/'; // 'https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send'; // const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly' 'https://mail.google.com/' 'https://www.googleapis.com/auth/gmail.modify' 'https://www.googleapis.com/auth/gmail.compose' 'https://www.googleapis.com/auth/gmail.send';
const GITHUB_NEWSLETTER_TOKEN = 'Z2hwX3RMR20wM0Z5a0F2MGFmYmx1cnlVYThmcEJBNWswYTBSbjdnVA';

var tokenClient;
var gapiInitialized = false;
var gisInitialized = false;
var membersOnlyActivated = false;

function loadMainApp() {
	var documentPath = window.location.pathname,
	documentName = documentPath.substring(documentPath.lastIndexOf('/')+1);
	
	initializeMagazine();

	loadHiMClub(false);

	importLatest();

	parseUrl();
	
	// Resize Viewport
	$(window).resize(function() {
		resizeViewport();
	}).bind('orientationchange', function() {
		resizeViewport();
	});

	if (documentName == 'index.html') {
		prepareEditorialCategories();
	}

	if ((localStorage.getItem('customerLoggedIn') == false) || (localStorage.getItem('customerLoggedIn') == null)) {
		membersOnlyActivated = false;
	} else { /* Customer is Loggedin */
		membersOnlyActivated = true;
	}
}

function initializeMagazine() {
	loadMenu();

	loadNewsletterRow();

	loadFooter();
}

function loadMenu() {
	var topPanel = document.getElementById('topPanel'),
	topPanelMenu = document.getElementById('topPanelMenu'),
	documentPath = window.location.pathname,
	documentName = documentPath.substring(documentPath.lastIndexOf('/')+1),
	deviceWidth = $(window).width(),
	responsiveViewTreshold = 768;
	
	if (deviceWidth <= responsiveViewTreshold) {
		// remove the topPanel and its contents
		topPanel.innerHTML = "";
		mobileMenu(topPanel);
	} else {
		// remove the topPanel and its contents
		topPanel.innerHTML = "";
		desktopMenu(topPanel, topPanelMenu);
	}

	if (documentName == 'index.html') {
		topPanel.style.backgroundColor = "transparent";
		topPanelMenu.style.backgroundColor = "transparent";
	} else {
		topPanel.style.backgroundColor = "#111F4A";
		topPanelMenu.style.backgroundColor = "#111F4A";
	}

	addSideMenu();
}

function mobileMenu(topPanel) {
	var topPanelMenu = document.getElementById("topPanelMenu");
	topPanelMenu.style.display = "none";
	
	var spanSideMenu = $('<span id="mobileMenuSpan" class="top-thumb" style="justify-content:left;"/>', {id:"", class:""});
	var spanSideMenuContent = $(' \
	<a title="Menu" style="display:inline-flex;align-items:center;" class="top-share" onClick="toggleSideMenuPanel()"> \
	<i id="sideMenuButton" class="fa fa-bars" style="display:inline-flex;align-items:center;"/></a> \
	', {id:"", class:""});
	spanSideMenuContent.appendTo(spanSideMenu);
	spanSideMenu.appendTo(topPanel);
	
	/* style="transform: translateY(-45%)" */
	var spanLogo = $('<span class="spanLogo" style="cursor:pointer; justify-content:center;"/>', {id:"", class:""});
	var spanLogoContent = $('<h1 style="color:#F9F0E6; font:2.5em Giaza Stencil" onclick="logoGoToHome()">HiM</h1>', {id:"", class:""});
	spanLogoContent.appendTo(spanLogo);
	spanLogo.appendTo(topPanel);

	var spanNewsletter = $('<span class="shareItems" style="justify-content:right;border-block-end:0;border-block-start:0;"/>', {id:"", class:""});
	var spanNewsletterContent = $(' \
	<a title="Newsletter" style="display:inline-flex;align-items:center;" class="top-share" onClick="#"> <!-- onclick="goToNewsletter()" --> \
	<i id="newsletterBtn" style="width:1em;" class="fa fa-envelope"></i></a> \
	', {id:"", class:""});
	spanNewsletterContent.appendTo(spanNewsletter);
	spanNewsletter.appendTo(topPanel);
}

function desktopMenu(topPanel, topPanelMenu) {
	var spanDate = $('<span class="top-date"/>', {id:"", class:""});
	var spanDateContent = $('<p id="topDate" style="color:#F9F0E6; font:1em Bebas Neue Cyrillic; \
	margin-block-start: 2em; margin-block-end:2em;"></p>', {id:"", class:""});
	spanDateContent.appendTo(spanDate);
	spanDate.appendTo(topPanel);

	setInterval(function(){
		var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
		document.getElementById("topDate").innerHTML = (new Date().toLocaleTimeString("en-GB", options))
	}, 1000);
	
	/* style="transform: translateY(-45%)" */
	var spanLogo = $('<span class="spanLogo" style="cursor:pointer; justify-content:center;" onclick="logoGoToHome()"/>', {id:"", class:""});
	var spanLogoContent = $('<h1 style="color:#FFFFFF; font:2.5em Bebas Neue Cyrillic">THE</h1> \
	<h1 style="color:#F9F0E6; font:2.5em Giaza Stencil">HiM</h1>', {id:"", class:""});
	spanLogoContent.appendTo(spanLogo);
	spanLogo.appendTo(topPanel);
	
	var spanShare = $('<span id="spanShare" class="shareItems" style="justify-content:right;border-block-end:0;border-block-start:0;"/>', {id:"", class:""});
	$(' \
	<a title="Facebook" style="display:inline-flex;align-items:center;" class="top-download" onClick="shareSM(\'Facebook\')"> \
	<i id:"" class="fa fa-facebook"></i></a> \
	<a title="Instagram" style="display:inline-flex;align-items:center;" class="top-download" onClick="shareSM(\'Instagram\')"> \
	<i id:"" class="fa fa-instagram"></i></a> \
	<a title="Meetup" style="display:inline-flex;align-items:center;" class="top-download" onClick="shareSM(\'Meetup\')"> \
	<i id:"" class="fa fa-meetup"></i></a> \
	<a title="Pinterest" style="display:inline-flex;align-items:center;" class="top-download" onClick="shareSM(\'Pinterest\')"> \
	<i id:"" class="fa fa-pinterest"></i></a> \
	<a title="YouTube" style="display:inline-flex;align-items:center;" class="top-download" onClick="shareSM(\'YouTube\')"> \
	<i id:"" class="fa fa-youtube-play"></i></a> \
	', {id:"", class:""}).appendTo(spanShare);
	
	if ((localStorage.getItem('customerLoggedIn') == false) || (localStorage.getItem('customerLoggedIn') == null)) {
		$(' \
		<a id="userLogout" title="Login/SignUp" style="display:inline-flex;align-items:center;" class="top-download" href="javascript:goToLogin()"> \
			<i id="" class="fa fa-user"></i> \
		</a> \
		').appendTo(spanShare);
	} else {
		$(' \
		<a id="userLogin" title="Profile" style="display:inline-flex;align-items:center;" class="top-download" onClick="javascript:document.dispatchEvent(new CustomEvent(\'customerLoggedOut\'))"> \
			<span class="avatar avatar-sm rounded-circle"> \
				<img alt="HiM Profile Picture" src="'+JSON.parse(localStorage.getItem('customerProfile'))['metadata']['profilePicture']+'"> \
			</span> \
		</a> \
		').appendTo(spanShare);
	}

	spanShare.appendTo(topPanel);
	
	var spanTopMenu = $('<span id="spanTopMenu" class="spanTopMenu" style="justify-content:center;"/>', {id:"", class:""});
	var spanTopMenuContent = $(' \
	<a title="LATEST" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'latest\')">LATEST</a> \
	<a title="EDITOR\'S PICK" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'editorspick\')">EDITOR\’S PICK</a> \
	<a title="STYLE" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'style\')">STYLE</a> \
	<a title="BUSINESS" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'business\')">BUSINESS</a> \
	<a title="HEALTH" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'health\')">HEALTH</a> \
	<a title="GEAR" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'gear\')">GEAR</a> \
	<a title="TRAVEL" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'travel\')">TRAVEL</a> \
	<a title="ENTERTAINMENT" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'entertainment\')">ENTERTAINMENT</a> \
	<a title="SKILLS" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'skills\')">SKILLS</a> \
	<a title="PARENTING" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="openCategory(\'parenting\')">PARENTING</a> \
	<a title="PODCASTS" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="#">PODCASTS</a> \
	<a title="SHOP" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="#">SHOP</a> \
	<a title="HiM CLUB" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="gotoClub()">HiM CLUB</a> \
	<a title="MAGAZINE" style="display:inline-flex;align-items:center;" class="spanTopMenuItem" onClick="gotoMagazine()">MAGAZINE</a> \
	', {id:"", class:""});
	spanTopMenuContent.appendTo(spanTopMenu);
	spanTopMenu.appendTo(topPanelMenu);
}

function logoGoToHome() {
	window.open(domain + '/index.html',"_self");
}

function gotoClub() {
	window.open(domain + '/him-club.html',"_self");
}
function gotoMagazine() {
	window.open(domain + '/magazine/magazine.html',"_self");
}

function openCategory(category) {
	window.open(domain + '/editorial/'+category+'/'+category+'.html',"_self");
}

function addShare(shareReg) {
	var shareSpan = $('<span id="" style="flex-direction: row;"></span>');
	shareSpan.appendTo(shareReg);
	
	var topSocialFB = $('<i />', {id:"", title:"FB", style:"padding:1em", class:"shareItems fa fa-facebook"}); //onClick="shareSM('Facebook')"
	var topSocialIG = $('<i />', {id:"", title:"Instagram", style:"padding:1em", class:"shareItems fa fa-instagram"}); //onClick="shareSM('Instagram')"
	var topSocialTR = $('<i />', {id:"", title:"X", style:"padding:1em", class:"shareItems fa fa-meetup"}); //onClick="shareSM('Meetup')"
	var topSocialPT = $('<i />', {id:"", title:"Pinterest", style:"padding:1em", class:"shareItems fa fa-pinterest"}); //onClick="shareSM('Pinterest')"
	var topSocialYT = $('<i />', {id:"", title:"YouTube", style:"padding:1em", class:"shareItems fa fa-youtube-play"}); //onClick="shareSM('YouTube')"
	var topLogin = $('<a title="Login/SignUp" style="padding:1em;display:inline-flex;align-items:center;border-left: 1px solid #F9F0E6 !important;" class="shareItems top-download" href="javascript:goToLogin()"> \
	<i id="" class="fa fa-user"></i></a>', {id:"", class:""});
	var spanNewsletterContent = $(' \
	<a title="Newsletter" style="width:-webkit-fill-available;align-self:stretch;display:inline-flex;align-items:center;padding:1em;border-left: 1px solid #F9F0E6 !important;" class="shareItems top-share" onClick="#"> <!-- onclick="goToNewsletter()" --> \
	<i id="newsletterBtn" style="width:1em;" class="fa fa-envelope"></i></a> \
	', {id:"", class:""});
	
	topSocialFB.attr('onClick','shareSM("Facebook")').appendTo(shareSpan);
	topSocialIG.attr('onClick','shareSM("Instagram")').appendTo(shareSpan);
	topSocialTR.attr('onClick','shareSM("Meetup")').appendTo(shareSpan);
	topSocialPT.attr('onClick','shareSM("Pinterest")').appendTo(shareSpan);
	topSocialYT.attr('onClick','shareSM("YouTube")').appendTo(shareSpan);
	topLogin.appendTo(shareSpan);
	spanNewsletterContent.appendTo(shareSpan);
}

function addSideMenu() {
	var appendReg = document.getElementById('container'),
	sideMenuReg = $('<div id="sidemenu-panel" class="sidemenu-panel"/>'),
	spanEditReg = $('<span />', {'id': '', 'class': ''});

	var spanTopMenuContent = $(' \
	<a title="LATEST" style="" class="spanSideMenuItem" onClick="openCategory(\'latest\')">LATEST</a> \
	<a title="EDITOR\'S PICK" style="" class="spanSideMenuItem" onClick="openCategory(\'editorspick\')">EDITOR\’S PICK</a> \
	<a title="STYLE" style="" class="spanSideMenuItem" onClick="openCategory(\'style\')">STYLE</a> \
	<a title="BUSINESS" style="" class="spanSideMenuItem" onClick="openCategory(\'business\')">BUSINESS</a> \
	<a title="HEALTH" style="" class="spanSideMenuItem" onClick="openCategory(\'health\')">HEALTH</a> \
	<a title="GEAR" style="" class="spanSideMenuItem" onClick="openCategory(\'gear\')">GEAR</a> \
	<a title="TRAVEL" style="" class="spanSideMenuItem" onClick="openCategory(\'travel\')">TRAVEL</a> \
	<a title="ENTERTAINMENT" style="" class="spanSideMenuItem" onClick="openCategory(\'entertainment\')">ENTERTAINMENT</a> \
	<a title="SKILLS" style="" class="spanSideMenuItem" onClick="openCategory(\'skills\')">SKILLS</a> \
	<a title="PARENTING" style="" class="spanSideMenuItem" onClick="openCategory(\'parenting\')">PARENTING</a> \
	<a title="PODCASTS" style="" class="spanSideMenuItem" onClick="#">PODCASTS</a> \
	<a title="SHOP" style="" class="spanSideMenuItem" onClick="#">SHOP</a> \
	<a title="HiM CLUB" style="" class="spanSideMenuItem" onClick="gotoClub()">HiM CLUB</a> \
	<a title="MAGAZINE" style="" class="spanSideMenuItem" onClick="gotoMagazine()">MAGAZINE</a> \
	', {id:"", class:""});

	spanTopMenuContent.appendTo(spanEditReg);
	spanEditReg.appendTo(sideMenuReg);
	sideMenuReg.appendTo(appendReg);

	addShare(sideMenuReg);
}

function toggleSideMenuPanel() {
	if ($("#sidemenu-panel").css("display") === "none") {
		$("#sidemenu-panel").css({
			display: "inline-block",
			width: '100vw',
			height: 'auto'
		});
		$("#sideMenuButton").attr("class", 'fa fa-close');
	} else {
		$("#sidemenu-panel").css({
			display: "none"
		});
		$("#sideMenuButton").attr("class", 'fa fa-bars');
	}
}

/* Set the width and height for the viewport */
function toggleShareMenu() {
	var sharePanel = document.getElementById("share-panel");
	var shareButton = document.getElementById("shareButton");
	
	if (sharePanel.style.display === "none") {
		sharePanel.style.display = "inline-flex";
		shareButton.className = 'fa fa-close';
	} else {
		sharePanel.style.display = "none";
		shareButton.className = 'fa fa-share';
	}
}

function shareSM(platform) {
	switch (platform) {
		case 'Facebook':
			window.open('https://www.facebook.com/himjrnl');
			break;
		case 'Instagram':
			window.open('https://www.instagram.com/himjrnl');
			break;
		case 'Meetup':
			window.open('https://www.meetup.com/thehim');
			break;
		case 'YouTube':
			window.open('https://www.youtube.com/@himjrnl');
			break;
		case 'Pinterest':
			window.open('https://www.pinterest.de/himjrnl');
			break;
	}
}

function scrollToTop() {
	$('#container').scrollTop(0);
}

// Set the width and height for the viewport
function resizeViewport() {

	var deviceWidth = $(window).width(),
	responsiveViewTreshold = 768,
	topPanelMenu = document.getElementById("topPanelMenu"),
	spanTopMenu = document.getElementById("spanTopMenu"),
	newsletterBg = document.getElementsByClassName("newsletter-sc-bgImage-gXZMSp"),
	newsletterBgImg = newsletterBg[0].getElementsByTagName("img");

	if (deviceWidth <= responsiveViewTreshold) {
		topPanelMenu.style.display = "none";
		newsletterBgImg[0].style.objectFit = "fill";
	} else {
		topPanelMenu.style.display = "grid";
		newsletterBgImg[0].style.objectFit = "cover";
		spanTopMenu.remove();
	}

	loadMenu();
}

function adjustScroll() {
	var container = document.getElementById("container"),
	topPanel = document.getElementById("topPanel"),
	toppanelMenu = document.getElementById("topPanelMenu"),
	featureContent = document.getElementById("journalHome-grid-container-featureContent"),
	scrollPosition = container.scrollTop,
	scale = 1 - scrollPosition / 1000;
	
	if (container.scrollTop > 35) {
		topPanel.style.backgroundColor = '#111F4A';
		toppanelMenu.style.backgroundColor = '#111F4A';
	} else {
		topPanel.style.backgroundColor = 'transparent';
		toppanelMenu.style.backgroundColor = 'transparent';
	}

	featureContent.style.transform = `scale(${scale})`;
}

function prepareFeaturedContent(jsonARTICLE, featureContent) {
	var category = jsonARTICLE[0]['category'].replace(/\s/g, '').replace("'", '').toLowerCase();
	referenceCATEGORY = domain + '/editorial/' + category + '/' + category + '.html',
	referenceARTICLE = domain + '/' + jsonARTICLE[0]['docref'].replace(".json", ".html");
	
	$(' \
		<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
			<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
				<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="'+referenceCATEGORY+'"> \
					<span id="journalHomeFeatureCategory" itemprop="name">'+jsonARTICLE[0]['category']+'</span> \
				</a> \
			</li> \
		</cat-ul> \
		<h1 size="5" id="journalHomeFeatureTitle" class="magazineMastheadTitle" style="margin: 0; color: white;">'+jsonARTICLE[0]['title']+'</h1> \
		<h2 size="1" id="journalHomeFeatureExcerpt" class="magazineMastheadExcerpt" style="margin: 2em 0; color: white; margin-block-start: 0.3em; margin-block-end: 0.3em;">'+jsonARTICLE[0]['excerpt']+'</h2> \
		<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
			<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
				<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="'+referenceARTICLE+'"> \
					<span itemprop="name">READ MORE</span> \
				</a> \
				<svg aria-hidden="true" focusable="false" data-prefix="fat" data-icon="angle-right" class="svg-inline--fa fa-angle-right " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"> \
					<path fill="currentColor" d="M269.7 250.3c3.1 3.1 3.1 8.2 0 11.3l-176 176c-3.1 3.1-8.2 3.1-11.3 0s-3.1-8.2 0-11.3L252.7 256 82.3 85.7c-3.1-3.1-3.1-8.2 0-11.3s8.2-3.1 11.3 0l176 176z"></path> \
				</svg> \
				<meta itemprop="position" content="1"> \
			</li> \
		</cat-ul> \
	').appendTo("#"+featureContent+"-grid-container-featureContent");
	
	/** Update Photo **/
	$(' \
	<div style="opacity: 1;"> \
		<picture style="bottom:0;height:100%;left:0;position:absolute;right:0;top:0;width:100%"> \
			<img style="width: 100vw;" alt="'+jsonARTICLE[0]['featuredContent'][0]['alt']+'" src="'+jsonARTICLE[0]['featuredContent'][0]['src']+'" width="100vw"> \
		</picture> \
	</div> \
	').appendTo('#'+featureContent+'FeaturedContentBackground');
}

function sortEditorialArticles(jsonARTICLE) {
	var articleTmp;
	for (let i = 0; i < (jsonARTICLE.length - 1); i++) {
		for (let j = 0; j < (jsonARTICLE.length - i - 1); j++) {
			if (new Date(jsonARTICLE[(j+1)]['date']).getTime() >= new Date(jsonARTICLE[j]['date']).getTime()) {
				articleTmp = jsonARTICLE[(j+1)];
				jsonARTICLE[(j+1)] = jsonARTICLE[j];
				jsonARTICLE[j] = articleTmp;
			}
		}
	}
	return jsonARTICLE;
}

function prepareEditorialCategories() {
	const categories = ['editorspick', 'style', 'business', 'health', 'gear', 'travel', 'entertainment', 'skills', 'parenting'];

	/* For latest category */
	$.getJSON(domain + '/editorial/latest/latest.json', function (data) {
		$.each(data, function(key, jsonARTICLE) {
			var sortedARRAY = sortEditorialArticles(jsonARTICLE);
			loadCATEGORY(sortedARRAY, 'latest');
			prepareFeaturedContent(sortedARRAY, "journalHome");
			$("#latest-content-sc-furtherReadingTitle-viewAll").attr("href", domain + ('/editorial/latest/latest.json').replace(".json", ".html"));
		});
	});

	/* For all other categories */
	for (let category = 0; category < categories.length; category++) {
		$.getJSON(domain + '/editorial/' + categories[category] + '/' + categories[category] + '.json', function (data) {
			var ARRAY = [];
			$.each(data, function(key, jsonARTICLE) {
				for (let i = 0; i < jsonARTICLE.length; i++) {
					ARRAY.push(jsonARTICLE[i]);
				}
			});
			var sortedARRAY = sortEditorialArticles(ARRAY);
			loadCATEGORY(sortedARRAY, categories[category]);
			prepareFeaturedContent(sortedARRAY, categories[category]);
			$("#" + categories[category] + "-content-sc-furtherReadingTitle-viewAll").attr("href", domain + '/editorial/' + categories[category] + '/' + categories[category] + '.html');
		});
	}
}

function checkArticleDATE(jsonARTICLE) {
	var articleDATE = (new Date().getTime() - new Date(jsonARTICLE['date']).getTime()) / 1000;
	// showing the relative timestamp.
	if (articleDATE < 60) {
		return Math.round(articleDATE) + " seconds ago";
	} else if (articleDATE < 3600) {
		return Math.round(articleDATE / 60) + " minutes ago";
	} else if (articleDATE < 86400) {
		return Math.round(articleDATE / 3600) + " hours ago";
	} else if (articleDATE < 2620800) {
		return Math.round(articleDATE / 86400) + " days ago";
	} else if (articleDATE < 31449600) {
		return Math.round(articleDATE / 2620800) + " months ago";
	} else {
		return Math.round(articleDATE / 31449600) + " years ago";
	}
}

function appendARTICLE(jsonARTICLE, ROW) {
	jsonARTICLE = JSON.parse(jsonARTICLE);
	var reference = jsonARTICLE['docref'].substr(0, jsonARTICLE['docref'].lastIndexOf(".")) + ".html",
	articleDATE = checkArticleDATE(jsonARTICLE);

	$(' \
		<a class="content-sc-furtherReading-postGrid-postExcerpt-kuccfR" href='+reference+'> \
			<div type="rectangle" size="4" class="content-sc-furtherReading-postGrid-postExcerpt-thumbnail-NrRzK"> \
				<img alt="'+jsonARTICLE['featuredContent'][0]['alt']+'" decoding="async" sizes="(max-width: 640px) 410px, 820px" src="'+jsonARTICLE['featuredContent'][0]['src']+'" style="inset: 0px; height: 100%; object-fit: cover; position: absolute; width: 100%;"> \
			</div> \
			<div class="content-sc-furtherReading-postGrid-postExcerpt-body-gTXfgv"> \
				<div class="content-sc-furtherReading-postGrid-postExcerpt-category-dLpoZD">'+jsonARTICLE['category']+'<span class="content-sc-furtherReading-postGrid-postExcerpt-date-dGfbVg"> — '+articleDATE+'</span></div> \
				<div class="content-sc-furtherReading-postGrid-postExcerpt-title-kITLCM"> \
					<h2 size="1" class="content-sc-furtherReading-postGrid-postExcerpt-titleHeading-bhRlhf">'+jsonARTICLE['title']+'</h2> \
				</div> \
			</div> \
		</a>\
	').appendTo(ROW);
}

function importLatest() {
	$.getJSON(domain + '/editorial/latest/latest.json', function (data) {
		$.each(data, function(key, jsonARTICLE) {
			var articleCmp = jsonARTICLE[0];
			for (let articleKey = 0; articleKey < (jsonARTICLE.length - 1); articleKey++) {
				if (new Date(jsonARTICLE[(articleKey+1)]['date']).getTime() >= new Date(articleCmp['date']).getTime()) {
					articleCmp = jsonARTICLE[(articleKey+1)];
				}
			}
		});
	});
}

function loadCATEGORY(articleARRAY, category) {
	var ROW = document.getElementById(category+"-readings-row"),
	furtherReadingsROW = document.getElementById(category+"-furtherReadings-row"),
	/* categoryFeatureContent = document.getElementById(category+"featureContent"), */
	jsonARTICLE;
	
	if (articleARRAY.length < 3) {
		furtherReadingsROW.remove();
		/* categoryFeatureContent.remove(); */
	} else if (articleARRAY.length >= 3 && articleARRAY.length < 6) {
		for (let key = 0; key < 3; key++) {
			jsonARTICLE = articleARRAY[key];
			appendARTICLE(JSON.stringify(jsonARTICLE), ROW);
		}
	} else if (articleARRAY.length >= 6) {
		for (let key = 0; key < 6; key++) {
			jsonARTICLE = articleARRAY[key];
			appendARTICLE(JSON.stringify(jsonARTICLE), ROW);
		}
	}
}

function loadFooter() {
	$(' \
	<span style="display: inline-block; width: 100vw; align-items: center; margin-top: 1em;"> \
		<span class="spanLogo" style="cursor:pointer; justify-content:center;  margin-left: 1.8em;" onclick="logoGoToHome()"> \
			<h1 style="color:#FFFFFF; font:2.5em Bebas Neue Cyrillic">THE</h1> \
			<h1 style="color:#F9F0E6; font:2.5em Giaza Stencil">HiM</h1> \
		</span> \
		<i title="Scroll to Top" style="float: right; padding: 1em 1em 1em 0.25em !important; margin: 1em 1em 1em 0.25em !important; color: #F9F0E6; cursor: pointer; align-items: center; transform: translateY(5%); font-size: min(max(12px, 2vw), 18px)" class="fa fa-angle-double-up" id="scrollTopIc" onClick="scrollToTop()"></i> \
	</span> \
	<div id="footerElementMenu" class="footerElementMenuPanel"> \
		<span style="display: flex; \
		-webkit-box-pack: justify; \
		grid-column-start: col-start 1; \
		grid-column-end: span 4; \
		line-height: 1.6; \
		flex-direction: column;"> \
			<p style="margin: 0 1em 0 0; float: left; padding: 0 1em 0 1em; color: #F9F0E6; font-size: min(max(0.8em, 1vw), 1em); font-family: Cera Pro Thin; font-weight: 400; font-style: normal;">In a digital age where modern gentlemen are losing the true essence of luxury, HiM offers exclusive access to inspiring stories and unique conversations of like—minded refined men who share a passion for adventure.</p> \
			<span class="shareItems" style="margin: 0 1em 0 0; padding: 0 !important; justify-content:left; border-block-end:0; border-block-start:0;"> \
				<a title="Facebook" style="right: 0 !important; display: inline-flex; align-items: center; color: #F9F0E6; padding: 0 1em 0 1em; text-decoration: none; cursor: pointer;" onClick="shareSM(\'Facebook\')"> \
				<i id:"" class="fa fa-facebook"></i></a> \
				<a title="Instagram" style="right: 0 !important; display: inline-flex; align-items: center; color: #F9F0E6; padding: 0 1em 0 1em; text-decoration: none; cursor: pointer;" onClick="shareSM(\'Instagram\')"> \
				<i id:"" class="fa fa-instagram"></i></a> \
				<a title="X" style="right: 0 !important; display: inline-flex; align-items: center; color: #F9F0E6; padding: 0 1em 0 1em; text-decoration: none; cursor: pointer;" onClick="shareSM(\'Meetup\')"> \
				<i id:"" class="fa fa-meetup"></i></a> \
				<a title="Pinterest" style="right: 0 !important; display: inline-flex; align-items: center; color: #F9F0E6; padding: 0 1em 0 1em; text-decoration: none; cursor: pointer;" onClick="shareSM(\'Pinterest\')"> \
				<i id:"" class="fa fa-pinterest"></i></a> \
				<a title="YouTube" style="right: 0 !important; display: inline-flex; align-items: center; color: #F9F0E6; padding: 0 1em 0 1em; text-decoration: none; cursor: pointer;" onClick="shareSM(\'YouTube\')"> \
				<i id:"" class="fa fa-youtube-play"></i></a> \
			</span> \
		</span> \
		<span style="display: flex; \
		-webkit-box-pack: justify; \
		grid-column-start: col-start 7; \
		grid-column-end: span 2; \
		line-height: 1.6; \
		flex-direction: column;"> \
			<a title="LATEST" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'latest\')">LATEST</a> \
			<a title="EDITOR\’S PICK" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'editorspick\')">EDITOR\’S PICK</a> \
			<a title="STYLE" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'style\')">STYLE</a> \
			<a title="BUSINESS" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'business\')">BUSINESS</a> \
			<a title="HEALTH" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'health\')">HEALTH</a> \
		</span> \
		<span style="display: flex; \
		-webkit-box-pack: justify; \
		grid-column-start: col-start 9; \
		grid-column-end: span 2; \
		line-height: 1.6; \
		flex-direction: column;"> \
			<a title="GEAR" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'gear\')">GEAR</a> \
			<a title="TRAVEL" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'travel\')">TRAVEL</a> \
			<a title="ENTERTAINMENT" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'entertainment\')">ENTERTAINMENT</a> \
			<a title="SKILLS" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'skills\')">SKILLS</a> \
			<a title="PARENTING" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="openCategory(\'parenting\')">PARENTING</a> \
	</div> \
	<span style="display: inline-block; width: 100vw; align-items: center; margin-top: 1em; border-top: 1px solid#F9F0E6;"> \
		<p style="margin: 1em; float: left; padding: 1em; color: #F9F0E6; font-size: min(max(0.8em, 1vw), 1em); font-family: Cera Pro Thin; font-weight: 400; font-style: normal;">Copyright © 2023—2025 TheHiM. All rights reserved</p> \
		<span style="display: flex; \
		-webkit-box-pack: justify; \
		float: right; \
		padding: 1em; \
		margin: 1em;"> \
			<a title="PODCASTS" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="">PODCASTS</a> \
			<a title="SHOP" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="">SHOP</a> \
			<a title="HiM CLUB" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="gotoClub()">HiM CLUB</a> \
			<a title="MAGAZINE" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="gotoMagazine()">MAGAZINE</a> \
			<a title="ABOUT US" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="">ABOUT US</a> \
			<a title="CAREERS" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="">CAREERS</a> \
			<a title="CONTACT US" style="-webkit-box-pack: justify; \
			justify-content: left;" class="footerMenuItem" onClick="">CONTACT US</a> \
		</span> \
	</span> \
	').appendTo("#footerElement");
}

function loadHiMClub(insertButton) {
	$.getJSON(domain + '/magazine/magazine.json', function (data) {
		$.each(data, function(key, magazineIssues) {
			var magazineEditionStep = 1,
			documentPath = window.location.pathname,
			documentName = documentPath.substring(documentPath.lastIndexOf('/')+1);
			
			$("#magazineGridContainerImage").attr("src", magazineIssues[(magazineIssues.length-1)]["src"].replace("../",domain+"/")+"?rect=686,0,2724,3901&auto=format");
			$(' \
			<div id="" class="content-sc-masthead-magazineMastheadContent"> \
				<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
					<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
						<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="#"> \
							<span itemprop="name">'+magazineIssues[(magazineIssues.length-1)]["issue"]+' Issue</span> \
						</a> \
					</li> \
				</cat-ul> \
				<h1 size="5" class="magazineMastheadTitle" style="margin: 0;">'+magazineIssues[(magazineIssues.length-1)]["title"]+'</h1> \
				<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
					<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
						<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="#"> \
							<span itemprop="name">'+magazineIssues[(magazineIssues.length-1)]["edition"]+'</span> \
						</a> \
					</li> \
				</cat-ul> \
			</div> \
			').appendTo("#magazineGridContainerDescription");
			
			if (documentName == "index.html" || insertButton) {
				$(' \
				<button size="3" class="masthead-sc-readNowButton" style="width: 50%; background-color: #111F4A; color: #F9F0E6;" onclick="gotoMagazine()" type="button">Read Now</button> \
				').appendTo("#magazineGridContainerDescription");
			} else {
				/* Do Nothing */
			}
			
			for (let issue = (magazineIssues.length-1); issue > (magazineIssues.length-5); issue--) {
				$(' \
				<img alt="" decoding="async" src="'+magazineIssues[issue]["src"].replace("../", domain+"/")+'?w=987&amp;h=1296&amp;q=80" style="aspect-ratio: 0.761574 / 1; grid-column-start: '+magazineEditionStep+' !important; grid-column-end: span 2 !important; min-height: auto; max-width: 100%;"> \
				').appendTo("#sectionMagazineEditions");
				
				magazineEditionStep += 2;
			}
		});
	});
}

function loadNewsletterRow() {
	$(' \
	<div size="2" class="newsletter-sc-content-jsxoGA"> \
		<form name="newsletterSubmitForm" action="javascript:void(0);" class="newsletter-sc-form-gGmXcq"> \
			<div class="newsletter-sc-form-title-kDJFWl" style="padding: 0;"> \
				<div> \
					<h2 size="3" class="newsletter-sc-form-titleHeading-dZQaLi" style="margin-block-start: 0;">Subscribe to our newsletter</h2> \
				</div> \
			</div> \
			<div class="newsletter-sc-portableText-kezreA newsletter-sc-body-iLFnBJ"> \
				<p>To receive the most inspiring conversations of Mindsalike about luxurious fashion brands, unique accessories, expert health advice and great offers from The HiM Club every Friday.</p> \
			</div> \
			<div class="newsletter-sc-fieldWrapper-hGNanE"> \
				<div id="newsletterValidationError" style="color: red; display: none;" class="newsletter-sc-portableText-kezreA newsletter-sc-body-iLFnBJ"><svg aria-hidden="true" focusable="false" data-prefix="fasr" data-icon="triangle-exclamation" class="svg-inline--fa fa-triangle-exclamation " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M27.4 432L0 480H55.3 456.7 512l-27.4-48L283.6 80.4 256 32 228.4 80.4 27.4 432zm401.9 0H82.7L256 128.7 429.3 432zM232 296v24h48V296 208H232v88zm48 104V352H232v48h48z"></path></svg><span> Name and E-Mail Required</span></div> \
				<div id="newsletterSubmitSuccess" style="color: green; display: none;" class="newsletter-sc-portableText-kezreA newsletter-sc-body-iLFnBJ"><svg aria-hidden="true" focusable="false" data-prefix="fasr" data-icon="triangle-exclamation" class="svg-inline--fa fa-triangle-exclamation " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M27.4 432L0 480H55.3 456.7 512l-27.4-48L283.6 80.4 256 32 228.4 80.4 27.4 432zm401.9 0H82.7L256 128.7 429.3 432zM232 296v24h48V296 208H232v88zm48 104V352H232v48h48z"></path></svg><span> Successfully Registered to Newsletter</span></div> \
				<div id="newsletterAlreadyRegistered" style="color: red; display: none;" class="newsletter-sc-portableText-kezreA newsletter-sc-body-iLFnBJ"><svg aria-hidden="true" focusable="false" data-prefix="fasr" data-icon="triangle-exclamation" class="svg-inline--fa fa-triangle-exclamation " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M27.4 432L0 480H55.3 456.7 512l-27.4-48L283.6 80.4 256 32 228.4 80.4 27.4 432zm401.9 0H82.7L256 128.7 429.3 432zM232 296v24h48V296 208H232v88zm48 104V352H232v48h48z"></path></svg><span> E-Mail Already Registered</span></div> \
				<div class="newsletter-sc-fieldWrapper-nameField-TOpbS"> \
					<div class="newsletter-sc-fieldWrapper-hGNanE"> \
						<div class="newsletter-sc-fieldWrapper-nameField-selectWrapper-cLrEFD"> \
							<select name="title" class="newsletter-sc-selectField-styled_select"> \
								<option value="Mr">Mr</option> \
								<option value="Mrs">Mrs</option> \
								<option value="Miss">Miss</option> \
								<option value="Ms">Ms</option> \
							</select> \
							<span class="newsletter-sc-selectField-styled_select-bPmekQ"> \
								<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-down" class="svg-inline--fa fa-angle-down " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> \
									<path fill="currentColor" d="M212.7 331.3c6.2 6.2 16.4 6.2 22.6 0l160-160c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4 75.3 148.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l160 160z"></path> \
								</svg> \
							</span> \
						</div> \
					</div> \
					<div class="newsletter-sc-fieldWrapper-hGNanE"> \
						<input name="first_name" id="first_name" placeholder="First Name" type="text" class="newsletter-sc-fieldWrapper-textField-ejZZtx" value=""> \
					</div> \
					<div class="newsletter-sc-fieldWrapper-hGNanE"> \
						<input name="last_name" id="last_name" placeholder="Last Name" type="text" class="newsletter-sc-fieldWrapper-textField-ejZZtx" value=""> \
					</div> \
				</div> \
			</div> \
			<div class="newsletter-sc-fieldWrapper-hGNanE"> \
				<input name="email" id="email" placeholder="Email" type="EMAIL" class="newsletter-sc-fieldWrapper-textField-ejZZtx" value=""> \
			</div> \
			<button size="2" class="newsletter-sc-form-submitButton-jsUped" onclick="validateNewsletterForm()">submit</button> \
		</form> \
		<div class="newsletter-sc-bgImage-gXZMSp"> \
			<img alt="Sign up to our newsletter" decoding="async" sizes="(max-width: 768px) 1000px, 2000px" src="'+domain+'/resources/pics/newsletter.png"> \
		</div> \
	</div> \
	').appendTo("#newsletterjoqnTx");
}

function goToLogin() {
	window.open(domain + '/auth/login.html', '_self');
}

function setProfileIcon() {
	var spanShare = document.getElementById('spanShare');
	
	document.getElementById('userLogout').remove();
	
	$(' \
	<a id="userLogin" title="Profile" style="display:inline-flex;align-items:center;" class="top-download" onClick="javascript:document.dispatchEvent(new CustomEvent(\'customerLoggedOut\'))"> \
		<span class="avatar avatar-sm rounded-circle"> \
			<img alt="HiM Profile Picture" src="'+JSON.parse(localStorage.getItem('customerProfile'))['metadata']['profilePicture']+'"> \
		</span> \
	</a> \
	').appendTo(spanShare);
}

/* Customer is LoggedIn */
document.addEventListener("customerLoggedIn", (event) => {
    const customer = event.detail

    localStorage.setItem('customerLoggedIn', true);
    localStorage.setItem('customerProfile', JSON.stringify(customer));

    setProfileIcon();

    prepareProfile();

    /* HYASSIN: TO DO - Retrieve Active subscription */
    retrieveActiveSubscription(customer['id']).then((activeSubscriptions) => {
        if (activeSubscriptions.length > 0) {
            /* HYASSIN: TO DO - activate members-only features */
        } else {
            /* HYASSIN: TO DO - go to profile, and deactivate members-only features */
        }
    });
});

/* Customer Logout */
document.addEventListener("customerLoggedOut", () => {
    var spanShare = document.getElementById('spanShare');
    
    localStorage.removeItem('customerLoggedIn');
    localStorage.removeItem('customerProfile');
    
    document.getElementById('userLogin').remove();
    
    $(' \
    <a id="userLogout" title="Login/SignUp" style="display:inline-flex;align-items:center;" class="top-download" href="javascript:goToLogin()"> \
        <i id="" class="fa fa-user"></i> \
    </a> \
    ').appendTo(spanShare);
});

/**********************************************************
* 
**********************************************************/
const validateFN = (FN) => {
	return FN.match(/^[a-zA-Z]+$/);
};

const validateLN = (LN) => {
	return LN.match(/^[a-zA-Z]+$/);
};

const validateEM = (EM) => {
	return EM.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

async function validateNewsletterForm() {
	var TL = document.forms["newsletterSubmitForm"]["title"].value,
	FN = document.forms["newsletterSubmitForm"]["first_name"].value,
	LN = document.forms["newsletterSubmitForm"]["last_name"].value,
	EM = document.forms["newsletterSubmitForm"]["email"].value;
	
	if (FN != null && FN != "" && LN != null && LN != "" && EM != null && EM != "") {
		if ((validateFN(FN) || validateLN(LN)) && validateEM(EM)) {
			await submitNewsletter(TL, FN, LN, EM);
			$("#newsletterValidationError").css({display: "none"});
		} else {
			$("#newsletterValidationError").css({display: "block"});
		}
	} else {
		$("#newsletterValidationError").css({display: "block"});
	}
}

async function submitNewsletter(TL, FN, LN, EM) {
	var newsletterSubscription = '{"title": "'+TL+'","firstName": "'+FN+'", "lastName": "'+LN+'", "email": "'+EM+'"}';

	registerToNewsletter(JSON.parse(newsletterSubscription),TL,FN,LN,EM);
}

async function getNewsletter(newsletter) {
	$.ajax({
        url: GITHUB_NEWSLETTER_URL,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+window.atob(GITHUB_NEWSLETTER_TOKEN), "Accept", "application/vnd.github+json, text/plain, */*")
        }, success: function(response){
            newsletter(response);
        }
	});

	return newsletter;
}

async function sendNewsletterConfirmationMail(TL, FN, LN, EM, content) {
	const messageParts = {
		to: EM,
		subject: "Welcome To TheHiM "+TL+". "+FN+"!",
		html: content
	};
	
	try {
		const response = await fetch("/send-email", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(messageParts)
		});

		if (response.ok) {
			const message = await response.text(); // Read the response text
			if (message === 'Success') {
				setTimeout("$('#newsletterSubmitSuccess').css({display: 'block'})", 1);
				setTimeout("$('#newsletterSubmitSuccess').css({display: 'none'})", 5000);
			} else if (message === 'Failure') {
				alert('Failed to send the email.');
			}
		} else {
			alert('Unexpected error occurred.');
		}
	} catch (error) {
		alert(`Error: ${error.message}`);
	}
}

async function registerToNewsletter(newsletterSubscription,TL,FN,LN,EM) {
	await getNewsletter(async function(newsletter) {
		console.log(newsletter)
		let newsletterContent = JSON.parse(window.atob(newsletter.content));
		console.log(newsletterContent)
		let registeredAlert = false;
		for (let element = 0; element < newsletterContent['subscribers'].length; element++) {
			if (newsletterContent['subscribers'][element]['email'] != EM) {
				registeredAlert = false;
			} else {
				registeredAlert = true;
				break;
			}
		}

		if (!registeredAlert) {
			newsletterContent['subscribers'].push(newsletterSubscription);
			let encodedNewsletterSubscription = window.btoa(JSON.stringify(newsletterContent)); // encodeURIComponent
			const JSONData = '{"message":"'+EM+' Subscribed to Newsletter","committer":{"name":"HiM","email":"himjrnl@gmail.com"},"content":"'+encodedNewsletterSubscription+'","sha":"'+newsletter.sha+'"}';
			let response = await fetch(GITHUB_NEWSLETTER_URL, {
				method: "PUT",
				cache: "no-cache",
				mode: "cors",
				headers: {
					'Authorization': 'Bearer '+window.atob(GITHUB_NEWSLETTER_TOKEN),
					'Accept': 'application/vnd.github+json, */*',
					'Content-Type': 'application/json'
				},
				referrerPolicy: "no-referrer",
				redirect: "follow",
				body: JSONData
			});

			if (response.status == 200) {
				readFile(TL,FN,LN,EM);
			}

			$('#newsletterAlreadyRegistered').css({display: 'none'});
		} else {
			setTimeout("$('#newsletterAlreadyRegistered').css({display: 'block'})", 1);
			setTimeout("$('#newsletterAlreadyRegistered').css({display: 'none'})", 5000);
		}
	});
}

async function readFile(TL,FN,LN,EM) {
	await fetch(domain + "/newsletterWelcome.html")
	.then((response) => response.text()
		.then((content) => {	
			$.getJSON(domain + '/magazine/magazine.json', function (data) {
				$.each(data, function(key, magazineIssues) {
					$.getJSON(domain + '/editorial/latest/latest.json', function (data) {
						$.each(data, function(key, jsonARTICLE) {
							const logo = ' \
							<span class="spanLogo" style="cursor:pointer; justify-content:center;" onclick="window.open(domain + \'/index.html\')"> \
								<h1 style="color:#F9F0E6; font:2.5em Giaza Stencil">HiM</h1> \
							</span> \
							';
										
							const latestMagazine = ' \
							<div id="" class="content-sc-masthead-magazineMastheadContent"> \
								<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
									<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
										<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="#"> \
											<span itemprop="name">'+magazineIssues[(magazineIssues.length-1)]["issue"]+' Issue</span> \
										</a> \
									</li> \
								</cat-ul> \
								<h1 size="5" class="magazineMastheadTitle" style="margin: 0;">'+magazineIssues[(magazineIssues.length-1)]["title"]+'</h1> \
								<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
									<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
										<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="#"> \
											<span itemprop="name">'+magazineIssues[(magazineIssues.length-1)]["edition"]+'</span> \
										</a> \
									</li> \
								</cat-ul> \
								<button size="3" class="masthead-sc-readNowButton" style="width: 50%; \
								background-color: #111F4A; \
								color: #F9F0E6;" onclick="window.location.href=\''+domain+'/magazine/magazine.html\'" type="button">Read Now</button> <!-- onclick="goToLogin()" --> \
							</div> \
							';
							
							const magazineEditions = ' \
							<img alt="" decoding="async" src="'+magazineIssues[(magazineIssues.length-1)]["src"].replace("../", domain+"/")+'?w=987&amp;h=1296&amp;q=80" style="aspect-ratio: 0.761574 / 1; grid-column-start: 1 !important; grid-column-end: span 2 !important; min-height: auto; max-width: 100%;"> \
							<img alt="" decoding="async" src="'+magazineIssues[(magazineIssues.length-2)]["src"].replace("../", domain+"/")+'?w=987&amp;h=1296&amp;q=80" style="aspect-ratio: 0.761574 / 1; grid-column-start: 3 !important; grid-column-end: span 2 !important; min-height: auto; max-width: 100%;"> \
							<img alt="" decoding="async" src="'+magazineIssues[(magazineIssues.length-3)]["src"].replace("../", domain+"/")+'?w=987&amp;h=1296&amp;q=80" style="aspect-ratio: 0.761574 / 1; grid-column-start: 5 !important; grid-column-end: span 2 !important; min-height: auto; max-width: 100%;"> \
							<img alt="" decoding="async" src="'+magazineIssues[(magazineIssues.length-4)]["src"].replace("../", domain+"/")+'?w=987&amp;h=1296&amp;q=80" style="aspect-ratio: 0.761574 / 1; grid-column-start: 7 !important; grid-column-end: span 2 !important; min-height: auto; max-width: 100%;"> \
							';

							const unsubscribeLink = domain + '/index.html?q='+window.btoa('newsletterUnsubscribe')+'&e='+window.btoa(EM)+'&auth=BEabCiECrci9cE8ciYW3doBcn6BoOmEeqGcDE7';
				
							var sortedARRAY = sortEditorialArticles(jsonARTICLE);
							var articlesARRAY = [];
							
							if (sortedARRAY.length < 3) {
								
							} else if (sortedARRAY.length >= 3 && sortedARRAY.length < 6) {
								for (let key = 1; key < 4; key++) {
									var reference = sortedARRAY[key]['docref'].substr(0, sortedARRAY[key]['docref'].lastIndexOf(".")) + ".html",
									articleDATE = checkArticleDATE(sortedARRAY[key]);
									
									articlesARRAY.push(' \
										<a class="content-sc-furtherReading-postGrid-postExcerpt-kuccfR" href="'+domain+'/'+reference+'"> \
											<div type="rectangle" size="4" class="content-sc-furtherReading-postGrid-postExcerpt-thumbnail-NrRzK"> \
												<img alt="'+sortedARRAY[key]["featuredContent"][0]["alt"]+'" decoding="async" sizes="(max-width: 640px) 410px, 820px" src="'+sortedARRAY[key]["featuredContent"][0]["src"]+'" style="inset: 0px; height: 100%; object-fit: cover; position: absolute; width: 100%;"> \
											</div> \
											<div class="content-sc-furtherReading-postGrid-postExcerpt-body-gTXfgv"> \
												<div class="content-sc-furtherReading-postGrid-postExcerpt-category-dLpoZD">'+sortedARRAY[key]["category"]+'<span class="content-sc-furtherReading-postGrid-postExcerpt-date-dGfbVg"> — '+articleDATE+'</span></div> \
												<div class="content-sc-furtherReading-postGrid-postExcerpt-title-kITLCM"> \
													<h2 size="1" class="content-sc-furtherReading-postGrid-postExcerpt-titleHeading-bhRlhf">'+sortedARRAY[key]["title"]+'</h2> \
												</div> \
											</div> \
										</a> \
									');
								}
							} else if (sortedARRAY.length >= 6) {
								for (let key = 0; key < 6; key++) {
									var reference = sortedARRAY[key]['docref'].substr(0, sortedARRAY[key]['docref'].lastIndexOf(".")) + ".html",
									articleDATE = checkArticleDATE(sortedARRAY[key]);
									
									articlesARRAY.push(' \
										<a class="content-sc-furtherReading-postGrid-postExcerpt-kuccfR" href='+reference+'> \
											<div type="rectangle" size="4" class="content-sc-furtherReading-postGrid-postExcerpt-thumbnail-NrRzK"> \
												<img alt="'+sortedARRAY[key]["featuredContent"][0]["alt"]+'" decoding="async" sizes="(max-width: 640px) 410px, 820px" src="'+sortedARRAY[key]["featuredContent"][0]["src"]+'" style="inset: 0px; height: 100%; object-fit: cover; position: absolute; width: 100%;"> \
											</div> \
											<div class="content-sc-furtherReading-postGrid-postExcerpt-body-gTXfgv"> \
												<div class="content-sc-furtherReading-postGrid-postExcerpt-category-dLpoZD">'+sortedARRAY[key]["category"]+'<span class="content-sc-furtherReading-postGrid-postExcerpt-date-dGfbVg"> — '+articleDATE+'</span></div> \
												<div class="content-sc-furtherReading-postGrid-postExcerpt-title-kITLCM"> \
													<h2 size="1" class="content-sc-furtherReading-postGrid-postExcerpt-titleHeading-bhRlhf">'+sortedARRAY[key]["title"]+'</h2> \
												</div> \
											</div> \
										</a> \
									');
								}
							}

							const referenceCATEGORY = domain + '/editorial/' + jsonARTICLE[0]['category'].replace(/\s/g, '').replace("'", '').toLowerCase() + '/' + jsonARTICLE[0]['category'].replace(/\s/g, '').replace("'", '').toLowerCase() + '.html';
							const referenceARTICLE = domain + '/' + jsonARTICLE[0]['docref'].replace(".json", ".html");
							
							const featuredContent = ' \
								<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
									<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
										<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="'+referenceCATEGORY+'"> \
											<span id="journalHomeFeatureCategory" itemprop="name">'+jsonARTICLE[0]['category']+'</span> \
										</a> \
									</li> \
								</cat-ul> \
								<h1 size="5" id="journalHomeFeatureTitle" class="magazineMastheadTitle" style="margin: 0; color: white;">'+jsonARTICLE[0]['title']+'</h1> \
								<h2 size="1" id="journalHomeFeatureExcerpt" class="magazineMastheadExcerpt" style="margin: 2em 0; color: white; margin-block-start: 0.3em; margin-block-end: 0.3em;">'+jsonARTICLE[0]['excerpt']+'</h2> \
								<cat-ul itemscope="" itemtype="https://schema.org/BreadcrumbList" class="Breadcrumbs-style__Breadcrumbs-sc-c18595ac-0 magazineMasterCategory"> \
									<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem" class="magazineMasterCategoryList"> \
										<a size="3" weight="2" font-family="Tex Gyre Termes" appearance="primary" itemprop="item" class="Link-style__Link-sc-1ce34e85-0 magazineMasterCategoryItem" href="'+referenceARTICLE+'"> \
											<span itemprop="name">READ MORE</span> \
										</a> \
										<svg aria-hidden="true" focusable="false" data-prefix="fat" data-icon="angle-right" class="svg-inline--fa fa-angle-right " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"> \
											<path fill="currentColor" d="M269.7 250.3c3.1 3.1 3.1 8.2 0 11.3l-176 176c-3.1 3.1-8.2 3.1-11.3 0s-3.1-8.2 0-11.3L252.7 256 82.3 85.7c-3.1-3.1-3.1-8.2 0-11.3s8.2-3.1 11.3 0l176 176z"></path> \
										</svg> \
										<meta itemprop="position" content="1"> \
									</li> \
								</cat-ul> \
							';
							
							const featuredContentBackground = ' \
							<div style="opacity: 1;"> \
								<picture style="bottom:0;height:100%;left:0;position:absolute;right:0;top:0;width:100%"> \
									<img style="width: 100vw;" alt="'+jsonARTICLE[0]['featuredContent'][0]['alt']+'" src="'+jsonARTICLE[0]['featuredContent'][0]['src']+'" width="100vw"> \
								</picture> \
							</div> \
							';

							const newsletterContent = content
							.replace(/{{ logo }}/i, logo)
							.replace(/{{ featuredContent }}/i, featuredContent)
							.replace(/{{ featuredContentBackground }}/i, featuredContentBackground)
							.replace(/{{ latestArticles }}/i, articlesARRAY.toString().replace(/,/g,''))
							.replace(/{{ latestMagazine }}/i, latestMagazine)
							.replace(/{{ magazineEditions }}/i, magazineEditions)
							.replace(/{{ magazineGridContainerImageSrc }}/i, magazineIssues[(magazineIssues.length-1)]["src"].replace("../",domain+"/")+"?rect=686,0,2724,3901&auto=format")
							.replace(/{{ unsubscribeLink }}/i, unsubscribeLink).toString();

							const message = ' \
							<!doctype html> \
							<html lang="en"> \
								<head> \
									<title>TheHiM: Express Your Individuality</title> \
									<link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"> \
									<link rel="stylesheet" type="text/css" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> \
									<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> \
									<style type="text/css"> \
									@font-face{font-family:\'Giaza Stencil\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Giaza-Stencil.ttf\')}@font-face{font-family:\'Bebas Neue Cyrillic\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Bebas-Neue-Cyrillic.ttf\')}@font-face{font-family:\'Tex Gyre Termes Bold\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/texgyretermes-bold.otf\')}@font-face{font-family:\'Tex Gyre Termes\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/texgyretermes-regular.otf\')}@font-face{font-family:\'Cera Pro Black\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/cera-pro-black.otf\')}@font-face{font-family:\'Cera Pro Bold\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/cera-pro-bold.otf\')}@font-face{font-family:\'Cera Pro Light\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/cera-pro-light.otf\')}@font-face{font-family:\'Cera Pro Medium\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/cera-pro-medium.otf\')}@font-face{font-family:\'Cera Pro Regular\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/cera-pro-regular.otf\')}@font-face{font-family:\'Cera Pro Thin\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/cera-pro-thin.otf\')}@font-face{font-family:\'Chronicle Display Black\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Chronicle%20Display%20Black.otf\')}@font-face{font-family:\'Chronicle Display Light Italic\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Chronicle%20Display%20Light%20Italic.otf\')}@font-face{font-family:\'Chronicle Display Roman\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Chronicle%20Display%20Roman.otf\')}@font-face{font-family:\'Chronicle Display Semibold\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Chronicle%20Display%20Semibold.otf\')}@font-face{font-family:\'Chronicle Display Text\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Chronicle-Display-Text.otf\')}@font-face{font-family:\'PP Editorial New Ultralight\';src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/PP-Editorial-New-Ultralight.otf\')}@font-face{font-family:Brittany;src:url(\'https://github.com/hgyassin/himjrnl/raw/refs/heads/master/resources/fonts/Brittany.otf\')}html{overflow-y:scroll;scroll-behavior:smooth}.canvas,body{overflow:hidden;background-color:#fff;padding:0;margin:auto}:root{--primary-color:rgb(24, 24, 24);--primary-background-color:rgb(221, 221, 221);--secondary-color:rgb(75, 75, 75);--secondary-background-color:rgb(255, 255, 255);--highlight-color:#111F4A;--box-shadow-color:rgb(201, 201, 201);--disabled-button-color:rgb(175, 175, 175);--border-radius:1rem;--top-panel-height:5em;--thumbnail-width:4.75em;--footer-height:5em;--share-panel-width:17em;--thumbnail-panel-width:17em;--journalHomeFeaturedContentBackground:none;--editorspickFeaturedContentBackground:none;--styleFeaturedContentBackground:none;--businessFeaturedContentBackground:none;--healthFeaturedContentBackground:none;--gearFeaturedContentBackground:none;--travelFeaturedContentBackground:none;--categoryFeaturedContentBackground:none}.canvas{min-height:100vh}.magazine-viewport .container{overflow:scroll;position:absolute;top:0;width:100vw;height:100vh;margin:auto}.wp-sc-footer{position:relative;bottom:0;width:100vw;margin:0 auto;border-top:1px solid #f9f0e6!important;height:auto;background:#111f4a;z-index:1}.spanSideMenuItem:hover,.spanTopMenuItem:hover,.top-download:hover,.top-share:hover{background-color:#f9f0e6;color:#111f4a}.footerElementMenuPanel{display:grid;grid-template-columns:repeat(9,[col-start] 1fr);width:100%;margin:0 1em}*{box-sizing:border-box}.advertising-sc-clubOverviewGrid-jYhbHp{display:grid;grid-template-columns:repeat(1,1fr);width:90%;padding-top:2em;margin-right:auto;padding-bottom:2em}.advertising-sc-clubOverviewGrid-iRxVOF{display:flex;-webkit-box-align:center;align-items:center;padding-right:0;column-gap:1.5em;color:#f9f0e6;font-family:"Chronicle Display Roman";font-style:normal;font-size:1em;font-weight:200}.advertising-sc-clubOverviewGrid-cVwzaR{display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;text-align:center;font-size:1.5rem;width:1.5em;border-width:.125em;border-style:solid;border-top:.125em solid #f9f0e6;border-right:.125em solid #f9f0e6;border-bottom:.125em solid #f9f0e6;border-color:#f9f0e6;border-radius:50%;aspect-ratio:1/1;flex-shrink:0;font-family:"Tex Gyre Termes"}.advertising-sc-row-joqnTx,.newsletter-sc-row-joqnTx{background-color:#f9f0e6;position:relative;z-index:1;color:#fff;display:flex;-webkit-box-align:center;align-items:center;height:auto;bottom:0;width:100%;border-top:1px solid #111f4a!important}.advertising-sc-content-jsxoGA,.newsletter-sc-content-jsxoGA{max-width:100vw;margin:auto!important;display:grid;z-index:1;width:100%;position:relative}.newsletter-sc-content-jsxoGA{height:auto;background-image:url("");background-position-x:left;background-position-y:center;background-repeat:no-repeat;background-size:50% auto;grid-template-columns:repeat(12,[col-start] 1fr);grid-column-gap:2em}.advertising-sc-content-jsxoGA{height:100%;min-height:60vh;grid-template-columns:repeat(2,[col-start] 1fr)}.newsletter-sc-form-gGmXcq{display:flex;row-gap:1em;column-gap:1em;flex-direction:column;position:relative;padding:3em 0;grid-column-start:2;grid-column-end:span 4}.newsletter-sc-form-title-kDJFWl{border-bottom:1px solid #111f4a;display:flex;align-items:flex-end;-webkit-box-pack:justify;justify-content:space-between;padding-bottom:1em;row-gap:2em;column-gap:2em;width:100%}.advertising-sc-content-col-kDJFWl{display:flex;align-items:flex-start;-webkit-box-pack:justify;justify-content:center;padding:2em;width:50%;flex-direction:column}.newsletter-sc-form-titleHeading-dZQaLi{color:#111f4a;font-size:2em;font-weight:400;text-transform:none;font-family:"Tex Gyre Termes Bold"}.advertising-sc-content-col-titleHeading-dZQaLi:last-child,.newsletter-sc-form-titleHeading-dZQaLi:last-child{margin-bottom:0}.advertising-sc-content-col-titleHeading-dZQaLi{color:#111f4a;font-size:2em;font-weight:400;text-transform:none;font-family:"Chronicle Display Semibold"}.newsletter-sc-fieldWrapper-textField-ejZZtx,.newsletter-sc-selectField-styled_select{appearance:none;padding:.5em 2em .5em 1em;font-family:"Tex Gyre Termes";transition:.4s;background-color:#fff}.advertising-sc-body-iLFnBJ,.newsletter-sc-body-iLFnBJ{margin-bottom:1rem;font-size:.9rem;color:#111f4a}.newsletter-sc-fieldWrapper-hGNanE{display:block;position:relative}.newsletter-sc-fieldWrapper-nameField-TOpbS{display:grid;grid-template-columns:repeat(3,1fr);row-gap:1em;column-gap:1em;width:100%}.newsletter-sc-fieldWrapper-nameField-selectWrapper-cLrEFD{position:relative}.newsletter-sc-selectField-styled_select{border-width:1px;border-style:solid;border-top:1px solid #111f4a;border-right:1px solid #111f4a;border-bottom:1px solid #111f4a;border-color:#111f4a;-webkit-box-flex:1;flex-grow:1;font-size:1em;width:100%}.newsletter-sc-selectField-styled_select-bPmekQ{position:absolute;top:50%;transform:translateY(-50%);right:16px;pointer-events:none;width:12px;display:flex;-webkit-box-align:center;align-items:center}.newsletter-sc-selectField-styled_select-bPmekQ svg{width:100%;color:#707070}.svg-inline--fa{display:var(--fa-display,inline-block);height:1em;overflow:visible;vertical-align:-.125em}.newsletter-sc-fieldWrapper-textField-ejZZtx{border-width:1px;border-style:solid;border-top:1px solid #111f4a;border-right:1px solid #111f4a;border-bottom:1px solid #111f4a;border-color:#111f4a;font-size:1em;flex-grow:1;-webkit-box-flex:1;width:100%;color:#222;border-radius:5px}.newsletter-sc-form-submitButton-jsUped{background-color:#111f4a;border-style:none;color:#eaeaea;cursor:pointer;padding:1em 3em;width:100%;border-radius:5px;font-family:Chronicle Display Roman;text-decoration-line:none;display:inline-block;text-align:center;font-size:1em;font-weight:600;line-height:1;transition:color .2s ease-in-out,background .2s ease-in-out;text-transform:capitalize}.spanTopMenu,.spanTopMenuItem{color:#f9f0e6;text-decoration:none}#share-panel,#sidemenu-panel{display:none;position:absolute;border:1px solid #f9f0e6!important}.newsletter-sc-bgImage-gXZMSp{position:absolute;top:0;left:0;width:100%;height:100%;grid-column-start:6 col-start;grid-column-end:span 7}.advertising-sc-bgImage-gXZMSp::after,.newsletter-sc-bgImage-gXZMSp::after{content:"";position:absolute;bottom:0;left:0;width:100%;height:100%}.newsletter-sc-bgImage-gXZMSp>img{inset:0px;height:100%;object-fit:fill;position:absolute;width:100%}.advertising-sc-bgImage-gXZMSp{position:absolute;top:0;left:0;width:100%;height:100%}.top-panel,.top-panel-menu{display:grid;row-gap:1em;column-gap:1em;border-bottom:1px solid #f9f0e6!important;position:sticky;background-color:#111f4a;-webkit-transition:background-color 1s linear;-ms-transition:background-color 1s linear;overflow-x:none;box-sizing:border-box;width:100%}.advertising-sc-bgImage-gXZMSp>img{inset:0px;height:100%;object-fit:cover;position:absolute;width:100%}.top-panel{grid-template-columns:1fr 2fr 1fr;height:var(--top-panel-height);top:0;bottom:0;padding:0 .5em;align-items:center;z-index:100}#sidemenu-panel,.top-panel-menu{top:var(--top-panel-height);bottom:0}.spanTopMenu,.top-panel-menu{align-items:center;height:calc(var(--top-panel-height)/2)}.top-panel-menu{grid-template-columns:1fr;z-index:99}.spanTopMenu{position:relative;font-size:1em;display:inline-flex}.spanLogo,.spanTopMenuItem{align-items:center;position:relative;cursor:pointer;display:inline-flex}.spanTopMenuItem{padding:0 1em;height:calc(var(--top-panel-height)/2);font-style:normal;font-weight:400;font-size:.8em;font-family:Cera Pro Regular}.shareItems,.top-date,.top-download,.top-share,.top-thumb{font-size:1em;height:calc(var(--top-panel-height))}.spanLogo{overflow-x:none;box-sizing:border-box;justify-content:center;height:calc(var(--top-panel-height))}.top-date{position:relative;color:#111f4a;cursor:pointer;padding-right:1em;padding-left:1em;text-decoration:none;align-items:center;justify-content:left}.footerMenuItem,.spanSideMenuItem,.top-download,.top-share{color:#f9f0e6;cursor:pointer;padding:0 1em;text-decoration:none;position:relative}.top-thumb{position:relative;cursor:pointer;color:#f9f0e6;text-decoration:none;display:inline-flex;justify-content:left;align-items:center}.top-download{float:right;right:calc(var(--thumbnail-panel-width)/ 2 - var(--thumbnail-width))}.shareItems{position:relative;align-items:center;color:#f9f0e6;cursor:pointer;display:inline-flex;right:0;text-decoration:none;border-block-end:1px solid #F9F0E6;border-block-start:1px solid #F9F0E6}#share-panel{left:calc(100vw - var(--share-panel-width));width:var(--share-panel-width);height:5em;top:calc(var(--top-panel-height));bottom:0;background:#111f4a;padding:.5em;box-sizing:border-box;align-items:center;z-index:99}#sidemenu-panel,#sidemenu-panel>span{background:#111f4a;padding:.5em 0;box-sizing:border-box;left:0}#sidemenu-panel{width:var(--thumbnail-panel-width);overflow-y:auto;align-items:center;z-index:1}#sidemenu-panel>span{position:relative;width:100vw;display:flex;align-items:flex-start;flex-direction:column}.spanSideMenuItem{align-items:center;display:inline-flex;height:calc(var(--top-panel-height)/2);font:1em Bebas Neue Cyrillic;align-self:stretch}.footerMenuItem{align-items:center;display:inline-flex;height:calc(var(--top-panel-height)/3);font-weight:400;font-family:Cera Pro Thin;font-size:.8em;font-style:normal;align-self:stretch}.journalHome-grid-container{position:relative;height:calc(100vh - 1.5*var(--top-panel-height));width:100%;pointer-events:none}.journalHome-grid-container-dRRLWv{position:absolute;height:100%;width:100%;opacity:1}.categoryHome-grid-container-background,.journalHome-grid-container-background{height:100vh;top:calc(1.5*var(--top-panel-height));left:0;width:100%;margin-top:0;margin-right:auto;content:\'\';inset:0;position:sticky;align-items:flex-end;justify-content:center;overflow:hidden}.journalHome-grid-container-background-overlay-jdydAT{content:"";position:absolute;top:calc(-1.5*var(--top-panel-height));left:0;z-index:1;width:100%;height:calc(100vh + 1.5*var(--top-panel-height));background-image:linear-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.4) 100%)}.journalHome-grid-container-feature{height:100vh;padding:calc(1.5*var(--top-panel-height));margin:0 auto;display:grid;grid-template-columns:repeat(12,[col-start] 1fr);grid-column-start:1;grid-column-end:span 12;width:100%;opacity:1}.journalHome-grid-container-featureContent{position:relative;opacity:1;will-change:opacity,transform 0.1s ease-out;transform:none;grid-column-start:1;grid-column-end:span 5;padding:2em 0;text-align:left;z-index:1}.rounded-circle{border-radius:50%!important}.avatar{font-size:1rem;display:inline-flex;width:48px;height:48px;color:#fff;border-radius:50%;background-color:#adb5bd;align-items:center;justify-content:center}.avatar img{width:100%;border-radius:50%}.avatar-sm{font-size:.875rem;width:36px;height:36px}@media (max-width:768px){.advertising-sc-row-joqnTx,.newsletter-sc-row-joqnTx{flex-flow:column-reverse}.advertising-sc-content-col-titleHeading-dZQaLi,.newsletter-sc-form-titleHeading-dZQaLi{font-size:1.5em;font-family:"Tex Gyre Termes Bold"}.newsletter-sc-form-gGmXcq{padding:1em 0}.advertising-sc-content-jsxoGA,.newsletter-sc-content-jsxoGA{grid-template-columns:repeat(1,[col-start] 1fr)}.newsletter-sc-fieldWrapper-textField-ejZZtx,.newsletter-sc-selectField-styled_select{font-size:.8em}.advertising-sc-bgImage-gXZMSp>img,.newsletter-sc-bgImage-gXZMSp>img{object-fit:fill;position:relative}.advertising-sc-bgImage-gXZMSp,.newsletter-sc-bgImage-gXZMSp{position:relative}.advertising-sc-bgImage-gXZMSp::after,.newsletter-sc-bgImage-gXZMSp::after{position:absolute}}.content-posts-table{width:100%;border-spacing:20px}.content-posts-table img{width:100%;height:auto;object-fit:cover}.post-title{font-size:1.2em;font-weight:500}.post-meta{color:gray;font-size:.9em} \ \
									</style> \
								</head> \
								<body> \
									<div id="canvas" class="canvas"> \
										<table width="100%"> \
											<tr class="top-panel"> \
												<td class="spanLogo" onclick="window.open(\'/index.html\')"><h1>TheHiM</h1></td> \
											</tr> \
										</table> \
										<div id="latest-furtherReadings-row" class="content-section"> \
											<div class="content-title"> \
												<h1>The Latest</h1> \
												<ul> \
													<li><a id="latest-content-sc-furtherReadingTitle-viewAll" class="viewAll">View All</a></li> \
												</ul> \
											</div> \
											<table class="content-posts-table"> \
												<tr> \
													<td> \
														<a class="content-sc-furtherReading-postGrid-postExcerpt-kuccfR" href=""> \
															<div type="rectangle" size="4" class="content-sc-furtherReading-postGrid-postExcerpt-thumbnail-NrRzK"> \
																<img decoding="async" sizes="(max-width: 640px) 410px, 820px" src="https://cdn.sanity.io/images/vxy259ii/production/0bbed7aba571e559191a9be72fac4a4f70359831-2560x1707.jpg" style="inset: 0px; height: 100%; object-fit: cover; position: absolute; width: 100%;"> \
															</div> \
															<div class="content-sc-furtherReading-postGrid-postExcerpt-body-gTXfgv"> \
																<div class="content-sc-furtherReading-postGrid-postExcerpt-category-dLpoZD">Skills<span class="content-sc-furtherReading-postGrid-postExcerpt-date-dGfbVg"> — 2 years ago</span></div> \
																<div class="content-sc-furtherReading-postGrid-postExcerpt-title-kITLCM"> \
																	<h2 size="1" class="content-sc-furtherReading-postGrid-postExcerpt-titleHeading-bhRlhf">A Gentleman\'s Guide On How To Navigate Hookups</h2> \
																</div> \
															</div> \
														</a> \
													</td> \
													<td> \
														<a class="content-sc-furtherReading-postGrid-postExcerpt-kuccfR" href=""> \
															<div type="rectangle" size="4" class="content-sc-furtherReading-postGrid-postExcerpt-thumbnail-NrRzK"> \
																<img decoding="async" sizes="(max-width: 640px) 410px, 820px" src="https://cdn.sanity.io/images/vxy259ii/production/0bbed7aba571e559191a9be72fac4a4f70359831-2560x1707.jpg" style="inset: 0px; height: 100%; object-fit: cover; position: absolute; width: 100%;"> \
															</div> \
															<div class="content-sc-furtherReading-postGrid-postExcerpt-body-gTXfgv"> \
																<div class="content-sc-furtherReading-postGrid-postExcerpt-category-dLpoZD">Skills<span class="content-sc-furtherReading-postGrid-postExcerpt-date-dGfbVg"> — 2 years ago</span></div> \
																<div class="content-sc-furtherReading-postGrid-postExcerpt-title-kITLCM"> \
																	<h2 size="1" class="content-sc-furtherReading-postGrid-postExcerpt-titleHeading-bhRlhf">A Gentleman\'s Guide On How To Navigate Hookups</h2> \
																</div> \
															</div> \
														</a> \
													</td> \
													<td> \
														<a class="content-sc-furtherReading-postGrid-postExcerpt-kuccfR" href=""> \
															<div type="rectangle" size="4" class="content-sc-furtherReading-postGrid-postExcerpt-thumbnail-NrRzK"> \
																<img decoding="async" sizes="(max-width: 640px) 410px, 820px" src="https://cdn.sanity.io/images/vxy259ii/production/0bbed7aba571e559191a9be72fac4a4f70359831-2560x1707.jpg" style="inset: 0px; height: 100%; object-fit: cover; position: absolute; width: 100%;"> \
															</div> \
															<div class="content-sc-furtherReading-postGrid-postExcerpt-body-gTXfgv"> \
																<div class="content-sc-furtherReading-postGrid-postExcerpt-category-dLpoZD">Skills<span class="content-sc-furtherReading-postGrid-postExcerpt-date-dGfbVg"> — 2 years ago</span></div> \
																<div class="content-sc-furtherReading-postGrid-postExcerpt-title-kITLCM"> \
																	<h2 size="1" class="content-sc-furtherReading-postGrid-postExcerpt-titleHeading-bhRlhf">A Gentleman\'s Guide On How To Navigate Hookups</h2> \
																</div> \
															</div> \
														</a> \
													</td> \
												</tr> \
											</table> \
										</div> \
									</div> \
									<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> \
									<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script> \
								</body> \
							</html> \
							';
							/* const newWindow = window.open('', '_blank');
            				newWindow.document.write(newsletterContent);
            				newWindow.document.close(); */
							
							sendNewsletterConfirmationMail(TL,FN,LN,EM,message);
						});
					});
				});
			});
		})
	);
}

async function newsletterUnsubscribe(unsubscribeEmail) {
	alert("Unsubscribed " + unsubscribeEmail);
	/* await getNewsletter(async function(newsletter) {
		let newsletterContent = JSON.parse(window.atob(newsletter.content));
		let unsubscribeAlert = false;
		for (let element = 0; element < newsletterContent['subscribers'].length; element++) {
			if (newsletterContent['subscribers'][element]['email'] === unsubscribeEmail) {
				newsletterContent['subscribers'].splice(element, 1);
				unsubscribeAlert = true;
				break;
			} else {
				unsubscribeAlert = false;
			}
		}

		if (unsubscribeAlert) {
			let encodedNewsletterSubscription = window.btoa(JSON.stringify(newsletterContent)); // encodeURIComponent
			const JSONData = '{"message":"'+unsubscribeEmail+' Unsubscribed from Newsletter","committer":{"name":"HiM","email":"himjrnl@gmail.com"},"content":"'+encodedNewsletterSubscription+'","sha":"'+newsletter.sha+'"}';
			
			let response = await fetch(GITHUB_NEWSLETTER_URL, {
				method: "PUT", // *GET, POST, PUT, DELETE, etc.
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				mode: "cors", // no-cors, *cors, same-origin
				headers: {
					'Authorization': 'Bearer '+window.atob(GITHUB_NEWSLETTER_TOKEN),
					'Accept': 'application/vnd.github+json, *\/*',
					'Content-Type': 'application/json'
				},
				referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				redirect: "follow", // manual, *follow, error
				body: JSONData
			});

			if (response.status == 200) {
				// Show Unsubscribed Successfully
			}
		} else {
			// Show Error at Unsubscription
		}
	}); */
}

function parseUrl() {
	var parsedUrl = new URL(decodeURIComponent(window.location)), // ?q=bmV3c2xldHRlclVuc3Vic2NyaWJl&e=aGVzaGFtZ3lhc3NpbkBnbWFpbC5jb20=&auth=BEabCiECrci9cE8ciYW3doBcn6BoOmEeqGcDE7
	q = window.atob(parsedUrl.searchParams.get("q")),
	e = window.atob(parsedUrl.searchParams.get("e")),
	auth = parsedUrl.searchParams.get("auth");
	if (q && e && auth) {
		if (auth == "BEabCiECrci9cE8ciYW3doBcn6BoOmEeqGcDE7") {
			window[q](e);
		} else {
			alert("auth not matching");
		}
	} else {

	}
}