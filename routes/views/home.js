const keystone = require('keystone');

const Home = keystone.list('Home');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = req.params.path || 'home';

	Home.model
		.findOne()
		.populate('services coaches')
		.exec( (err, page) => view.render('index', {page}) );
	
};
