import { addFilter } from '@wordpress/hooks';

const addBorderProps = ( saveElementProps, blockType, attributes ) => {
	// only add if they picked a border style
	if(attributes.borderStyle) {
		saveElementProps.style = saveElementProps.style || {};
		saveElementProps.style.borderStyle = attributes.borderStyle;
		saveElementProps.style.borderColor = attributes.borderColor;
		saveElementProps.style.borderWidth = attributes.borderWidth;
		saveElementProps.style.borderRadius = attributes.borderRadius;
	}

	return saveElementProps;

}

addFilter('blocks.getSaveContent.extraProps', 'ct-blockmania/border-control/extra-pros', addBorderProps);
