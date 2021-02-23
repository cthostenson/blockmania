// uses these imports
import { addFilter } from '@wordpress/hooks';

const addBorderAttributes = (settings, name) => {
	// settings is the object used to declare the block
	// name is the name of the block (if you wanted to apply this only to certain blocks)

	// append the settings
	settings.attributes.borderStyle = {
		type: 'string',
		default: '',
	}
	settings.attributes.borderColor = {
		type: 'string',
		default: '#000',
	}
	settings.attributes.borderWidth = {
		type: 'number',
		default: 2,
	}
	settings.attributes.borderRadius = {
		type: 'number',
		default: 0,
	}

	// (modify any additional settings)
	return settings;

}

addFilter('blocks.registerBlockType', 'ct-blockmania/border-control/settings', addBorderAttributes);
