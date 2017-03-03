const keystone = require('keystone');

const Conversation = keystone.list('Conversation');

exports = module.exports = function (req, res) {

	let body = req.body;
	let emailData = {
		subject: 'Новое обращение с сайта',
		to: 'alexander@tartmin.name',
		fromName: body.name,
		fromEmail: body.email,
		body
	};

	new keystone.Email('contact-form').send(emailData, function(email, status, id, reject_reason) {
		
		let data = {
			name: body.name,
			phone: body.phone,
			email: body.email,
			message: body.message,
			log: JSON.stringify(status)
		};
		
		const newConversation = new Conversation.model(data);

		newConversation.save(function () {
			req.flash('info', {detail: 'Мы получили ваше сообщение. Cпасибо!'});
			res.redirect('/contacts');
		});
	});

};

