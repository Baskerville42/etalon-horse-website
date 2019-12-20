let keystone = require('keystone');
let Types = keystone.Field.Types;

/**
 * Config Model
 * ==========
 */
let Config = new keystone.List('Config', {
	singular: 'Config Page',
	nocreate: true,
	nodelete: true,
	track: true,
});

Config.add(
	{heading: 'Social links'},
	{
		vk: { type: Types.Url },
		fb: { type: Types.Url },
		in: { type: Types.Url },
	}
);

/**
 * Registration
 */
Config.register();
