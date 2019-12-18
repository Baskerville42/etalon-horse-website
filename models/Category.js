var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */
var Category = new keystone.List('Category', {
	singular: 'Category',
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
	drilldown: 'pages'
});

Category.add(
	{heading: 'General'},
	{
		title: { // The display title for the category.
			type: Types.Text,
			required: true,
			index: true,
		},
		alias: { // The SEF alias for the category.
			type: Types.Key,
			required: true,
			initial: true,
			note: 'The SEF alias for the category.'
		},
		note: {
			type: Types.Textarea,
			height: 5
		},
	},

	{heading: 'Content'},
	{
		description: {
			type: Types.Html, 
			wysiwyg: true
		},
		pages: { 
			type: Types.Relationship, 
			ref: 'Page', 
			many: true, 
			filters: { type: 'Category', published: 'Published' } 
		},
	},

	{heading: 'SEO Settings'},
	{
		metakey: {
			type: Types.Textarea,
			height: 5,
			label: 'Keywords',
			note: 'Define keywords for search engines',
			default: ''
		},
		metadesc: {
			type: Types.Textarea,
			height: 5,
			label: 'Description',
			note: 'Define a description of the category',
			default: ''
		},
		metadata: {
			type: Types.Textarea,
			height: 5,
			label: 'Data',
			note: 'Define the data of a category',
			hidden: true
		}
	},

	{heading: 'Publish settings'},
	{
		published: { // The published state of the category.
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

Category.relationship({ path: 'pages', ref: 'Page', refPath: 'category' });

/**
 * Registration
 */
Category.defaultColumns = 'title, path, published';
Category.register();
