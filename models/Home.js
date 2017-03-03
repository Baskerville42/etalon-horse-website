let keystone = require('keystone');
let Types = keystone.Field.Types;

/**
 * Home Model
 * ==========
 */
let Home = new keystone.List('Home', {
	singular: 'Home Page',
	track: true,
	sortable: true,
	nocreate: true,
	nodelete: true
});

Home.add(
	{heading: 'General'},
	{
		title: { // The display title for the Home.
			type: Types.Text,
			required: true,
			index: true,
		},
		title_alias: {
			type: Types.Text,
			note: 'Additional title. Uses for breadcrumbs, menu items, as Home title',
			from: 'title',
			label: 'Home title',
			default: null
		},
		note: {
			type: Types.Textarea,
			height: 5
		},
	},

	{heading: 'Content'},
	{
		fulltext: {
			type: Types.Html,
			wysiwyg: true
		}
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
			note: 'Define a description of your web Home',
			default: ''
		},
		metadata: {
			type: Types.Textarea,
			height: 5,
			label: 'Data',
			note: 'Define the data of a Home',
			hidden: true
		}
	}
);

Home.relationship({path: 'category', ref: 'Category', refPath: 'Homes'});

/**
 * Registration
 */
Home.defaultColumns = 'title';
Home.register();
