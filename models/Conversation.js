const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Conversation Model
 * ==========
 */
const Conversation = new keystone.List('Conversation', {
	singular: 'Conversations',
	// autokey: {
	// 	path: 'path',
	// 	from: 'alias',
	// 	unique: true
	// },
	map: {
		name: 'name'
	},
	track: true,
	sortable: true,
	noedit: true,
	nodelete: true,
	nocreate: true
});

Conversation.add(
	{heading: 'General'},
	{
		name: {
			type: Types.Text,
			required: true,
			index: true,
		},
		phone: {
			type: Types.Number
		},
		email: {
			type: Types.Email,
			default: null,
			required: true,
		},
		message: {
			type: Types.Textarea,
			height: 5
		}
	},

	{heading: 'Mandrill Data'},
	{
		log: {
			type: Types.Code, 
			height: 8, 
			language: 'json'
		}
	},

	{heading: 'Other data'},
	{
		unsubscribed: {
			type: Types.Boolean,
			default: false
		}
	},

	{
		createdAt: {
			type: Date,
			default: Date.now,
			hidden: true
		}
	}
);

/**
 * Registration
 */
Conversation.defaultColumns = 'name, email, phone';
Conversation.register();
