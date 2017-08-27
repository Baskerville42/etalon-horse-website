var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */
var Page = new keystone.List('Page', {
	singular: 'Pages',
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
	drilldown: 'category'
});

Page.add(
	{heading: 'General'},
	{
		title: { // The display title for the page.
			type: Types.Text,
			required: true,
			index: true,
		},
		alias: { // The SEF alias for the page.
			type: Types.Key,
			required: true,
			initial: true,
			note: 'The SEF alias for the page.'
		},
		title_alias: {
			type: Types.Text,
			note: 'Additional title. Uses for breadcrumbs, menu items, as page title',
			from: 'title',
			label: 'Page title',
			default: null
		},
		note: {
			type: Types.Textarea,
			height: 5
		},
	},

	{heading: 'Content'},
	{
		pageImage: { type: Types.CloudinaryImage, folder: 'etalon-horse-website', autoCleanup: true, select : true, width: 222 },
		introtext: {
			type: Types.Html,
			wysiwyg: true
		},
		fulltext: {
			type: Types.Html,
			wysiwyg: true
		},
		type: {
			type: Types.Select,
			options: 'Single, Category'
		},
		category: {
			type: Types.Relationship,
			ref: 'Category',
			dependsOn: {type: 'Category'}
		},
		slider: { type: Types.CloudinaryImages, folder: 'etalon-horse-website' }
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
			note: 'Define a description of your web page',
			default: ''
		},
		metadata: {
			type: Types.Textarea,
			height: 5,
			label: 'Data',
			note: 'Define the data of a page',
			hidden: true
		}
	},

	{heading: 'Publish settings'},
	{
		published: { // The published state of the page.
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

Page.relationship({path: 'category', ref: 'Category', refPath: 'pages'});

/**
 * Registration
 */
Page.defaultColumns = 'title, path, published';
Page.register();
