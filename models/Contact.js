var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Contact Model
 * ==========
 */
var Contact = new keystone.List('Contact', {
	singular: 'Contacts',
	map: {
		name: 'title'
	},
	track: true,
	sortable: true,
	// drilldown: 'config'
});

Contact.add(
	{heading: 'General'},
	{
		title: { // The display title for the Contact.
			type: Types.Text,
			required: true,
			index: true,
		},
		note: {
			type: Types.Textarea,
			height: 5
		},
	},

	{heading: 'Content'},
	{
		type: {
			type: Types.Select,
			options: 'email, phone'
		},
		email: {
			type: Types.Email,
			dependsOn: {type: 'email'}
		},
		phone: {
			type: Types.Number,
			dependsOn: {type: 'phone'}
		},
		additional: {
			type: Types.Number,
			dependsOn: {type: 'phone'},
			collapse: true
		},
	},

	{heading: 'Publish settings'},
	{
		published: { // The published state of the Contact.
			type: Types.Select,
			options: ['Published', 'Unpublished', 'Archived', 'Trashed'],
			default: 'Unpublished'
		},
		publishedAt: {
			type: Date,
			dependsOn: {published: 'Published'}
		},
	},

	{
		createdAt: {
			type: Date,
			default: Date.now,
			hidden: true
		}
	}
);

// Contact.relationship({path: 'config', ref: 'Config', refPath: 'Contacts'});

/**
 * Registration
 */
Contact.defaultColumns = 'title, published';
Contact.register();
