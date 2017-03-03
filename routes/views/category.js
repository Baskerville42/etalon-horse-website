const keystone = require('keystone');
const Menu = keystone.list('Menu');
const Page = keystone.list('Page');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	let locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.selectedCategory = req.params.path;
	locals.section = req.params.page || 'home';

	Page.model.findOne().populate('category').where('path', req.params.page).exec(function (err, page) {
		if (!page) {
			res.status(404).render('errors/404');
			return;
		}
		
		locals.meta = {
			keywords: page.metakey,
			description: page.metadesc
		};
		
		locals.pageTitle = page.title;
		
		view.render('single', {
			page
		});
	});
};
