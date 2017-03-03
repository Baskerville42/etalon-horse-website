var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	},
	
	{heading: 'Content'},
	{
		type: { // The type of link: Single, Category, Hardcoded.
			type: Types.Select,
			options: ['Home', 'Single', 'Category', 'Hardcoded'],
			default: 'Hardcoded',
			note: 'The type of link'
		},
		singlePage: {
			type: Types.Relationship,
			ref: 'Page',
			dependsOn: {type: 'Single'},
			filters: {type: 'Single'},
			label: 'Page'
		},
		categoryPage: {
			type: Types.Relationship,
			ref: 'Category',
			dependsOn: {type: 'Category'},
			label: 'Category'
		},
		browserNav: { // The click behaviour for the link.
			type: Types.Select,
			options: ['_blank', '_self', '_parent', '_top'],
			default: '_self',
			label: 'Target',
			note: 'The click behaviour for the link'
		},
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
