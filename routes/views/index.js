var keystone = require('keystone');

var Menu = keystone.list('Menu');
var Category = keystone.list('Category');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = req.params.path || 'home';

	Menu.model
		.findOne()
		.populate('singlePage categoryPage categoryPage.pages')
		.where('path', locals.section)
		.exec(function (err, data) {
			if (!data) {
				res.status(404).render('errors/404');
				return;
			}

			if (!!data.type && data.type === 'Single') {
				Menu.model
					.populate(data, {
						path: 'singlePage',
						model: 'Page'
					}, function (err, page) {

						locals.meta = {
							keywords: page.singlePage.metakey,
							description: page.singlePage.metadesc
						};

						locals.pageTitle = page.singlePage.title;

						view.render(data.useCustomTemplate ? 'pages/' + data.template : 'single', {
							page,
							type: 'single'
						});
					});

				return;
			}

			if (!!data.type && data.type === 'Category') {
				Menu.model
					.populate(data, {
						path: 'categoryPage.pages',
						model: 'Page'
					}, function (err, category) {
						res.locals.meta = {
							keywords: category.categoryPage.metakey,
							description: category.categoryPage.metadesc
						};

						locals.pageTitle = category.categoryPage.title;

						view.render(data.useCustomTemplate ? 'pages/' + data.template : 'category', {
							category
						});
					});

				return;
			}

			if (!!data.type && data.type === 'Hardcoded') {
				view.render('contacts');
			}
		});
};
