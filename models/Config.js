let keystone = require('keystone');
let Types = keystone.Field.Types;

/**
 * Config Model
 * ==========
 */
let Config = new keystone.List('Config', {
	singular: 'Config Page',
	track: true,
	// nocreate: true,
	// nodelete: true
});

Config.add(
	{heading: 'Social links'},
	{
		vk: { type: Types.Url },
		fb: { type: Types.Url },
	}
);

/**
 * Registration
 */
Config.register();
