const _ = require('underscore');
// const async = require('async');

const keystone = require('keystone');
const Config = keystone.list('Config');
const Menu = keystone.list('Menu');

/**
 Initialises the standard view locals
 */
exports.initLocals = function (req, res, next) {
	let locals = res.locals;

	locals.user = req.user;

	locals.currentYear = new Date().getFullYear();

	Config.model
		.findOne()
		.exec((err, config) => locals.siteConfig = config);
	
	Menu.model
		.find()
		.where('published', 'Published')
		.populate('singlePage categoryPage categoryPage.pages')
		.sort('sortOrder')
		.exec(function (err, links) {
			
			Menu.model.populate(links, {
				path: 'categoryPage.pages',
				model: 'Page'
			}, function (err, links) {
				locals.navigationLinks = links;
				next();
			});

		});

};


/**
 Fetches and clears the flashMessages before a view is rendered
 */
exports.flashMessages = function (req, res, next) {
	const flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.any(flashMessages, function (msgs) {
		return msgs.length;
	}) ? flashMessages : false;
	next();
};


/**
 Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

exports.bodyCSSClass = function (req, res, next) {
	let locals = res.locals;
	
	Menu.model
		.findOne()
		.where('path', req.params.path || 'home')
		.exec(function (err, page) {
			locals.bodyClass = page.cssClass;
			next();
		});
};
