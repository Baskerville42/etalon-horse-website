var keystone = require('keystone');
var fs = require('fs');
var Types = keystone.Field.Types;

var templateFiles = function () {
	var files = fs.readdirSync('./templates/views/pages');
	files = files.map(function (fileName) {
		return fileName.split('.hbs')[0];
	});
	
	return files;
};

/**
 * Menu Model
 * ==========
 */
var Menu = new keystone.List('Menu', {
	label: 'Navigation',
	singular: 'Links',
	autokey: {
		path: 'path',
		from: 'alias',
		unique: true
	},
	map: {
		name: 'title'
	},
	track: true,
	sortable: true,
	drilldown: 'singlePage categoryPage'
});

Menu.add(
	{heading: 'General'},
	{
		title: { // The display title for the menu item.
			type: Types.Text,
			required: true,
			index: true,
		},
		alias: { // The SEF alias for the menu item.
			type: Types.Key,
			required: true,
			initial: true,
			note: 'The SEF alias for the menu item.'
		},
		note: {
			type: Types.Textarea,
			height: 5
		},
		cssClass: {
			type: Types.Text,
			label: 'CSS Class of the page',
			default: null
		}
	},
	
	{heading: 'Content'},
	{
		type: { // The type of link: Single, Category, Hardcoded.
			type: Types.Select,
			options: ['Home', 'Single', 'Category', 'Hardcoded', 'External'],
			default: 'Hardcoded',
			note: 'The type of link'
		},
		singlePage: {
			type: Types.Relationship,
			ref: 'Page',
			dependsOn: {type: 'Single'},
			filters: {type: 'Single', published: 'Published'},
			label: 'Page'
		},
		categoryPage: {
			type: Types.Relationship,
			ref: 'Category',
			dependsOn: {type: 'Category'},
			filters: {type: 'Single', published: 'Published'},
			label: 'Category'
		},
		externalLink: {
			type: Types.Text,
			dependsOn: {type: 'External'},
			label: 'External URL'
		},
		browserNav: { // The click behaviour for the link.
			type: Types.Select,
			options: ['_blank', '_self', '_parent', '_top'],
			default: '_self',
			label: 'Target',
			note: 'The click behaviour for the link'
		},
	},

	{heading: 'Template settings'},
	{
		useCustomTemplate: { type: Boolean, default: false },
		template: { type: Types.Select, options: templateFiles(), dependsOn: { useCustomTemplate: true } }
	},
	
	{heading: 'Publish settings'},
	{
		published: { // The published state of the menu link.
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
	});

/**
 * Registration
 */
Menu.defaultColumns = 'title, path, published, type';
Menu.register();
