/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps,
		RichText,
		MediaUpload,
		MediaUploadCheck,
		InspectorControls,
		PanelColorSettings
} from '@wordpress/block-editor';
import { SelectControl, PanelBody, PanelRow, ColorPicker, ColorPalette } from '@wordpress/components';
import {select} from '@wordpress/data';


import {CTColorPanel} from '../common/CTColorPanel';
import {CTStars} from '../common/CTStars';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit({attributes, setAttributes}) {
	//let attributes = props.attributes;
	//let {attributes, setAttributes} = props;

	let divStyles = {
		backgroundColor: attributes.backgroundColor,
		color: attributes.textColor,
		backgroundColor2: attributes.backgroundColor2,
		color2: attributes.textColor2,
	}

	let settings = select('core/editor').getEditorSettings();

	return (
		<div { ...useBlockProps({style: divStyles} ) }>
			<InspectorControls>
				<PanelBody title="Basic" InitialOpen={true}>
					<PanelRow>
						<ColorPalette
						label={__('Background Color')}
						value={attributes.backgroundColor}
						onChange={(color) => {setAttributes({backgroundColor: color})}}
						colors={[
							{name: 'Red', color: '#FF0000'},
							{name: 'Green', color: '#00FF00'},
							{name: 'Blue', color: '#0000FF'},
						]}/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={attributes.textColor}
							onChangeComplete={(color) => {setAttributes({textColor: color.hex})}}
							disableAlpha
						/>
					</PanelRow>
					<PanelRow>
						<CTColorPanel attributes={attributes} setAttributes={setAttributes}/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<CTStars attributes={attributes} setAttributes={setAttributes}/>
			<RichText
				tagName="div" // The tag here is the element output and editable in the admin
				value={ attributes.quote } // Any existing content, either from the database or an attribute default
				allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
				onChange={ ( quote ) => setAttributes( { quote } ) } // Store updated content as a block attribute
				placeholder="Lorem Ipsum"// Display this text before any content has been added by the user
			/>

			<div className="quote-profile">
				<div className="photo">
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={['image']}
							onSelect={ ( img ) => setAttributes( { imgUrl: img.sizes.thumbnail.url } ) }
							render={ ({open}) => <img src={attributes.imgUrl} onClick={open}/>}
						/>
					</MediaUploadCheck>
				</div>
			</div>

		</div>
	);
}
