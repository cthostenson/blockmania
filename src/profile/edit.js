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
import {useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls} from '@wordpress/block-editor';
import {ColorPalette, ColorPicker, PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import {CTColorPanel} from "../common/CTColorPanel";

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
	}

	return (
		<div { ...useBlockProps({style: divStyles}) }>
			<InspectorControls>
				<PanelBody title="Color" InitialOpen={true}>
					<PanelRow>
						<ColorPalette
							label={__('Background Color')}
							value={attributes.backgroundColor}
							onChange={(color) => {setAttributes({backgroundColor: color})}}
							colors={[
								{name: 'Slate Grey', color: '#202626'},
								{name: 'Brick Red', color: '#BC4024'},
								{name: 'Light Grey', color: '#818270'},
								{name: 'Lime', color: '#7EB42B'},
								{name: 'Light Grey', color: '#D7E5B2'},
							]}/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Layout" InitialOpen={false}>
					<PanelRow>
						<SelectControl
							label={__('Show Image')}
							value={attributes.showImage}
							onChange={(showImage) => { setAttributes( {showImage} ) } }
							options={[
								{value: 'img-large', label: 'Show Large Image'},
								{value: 'img-small', label: 'Show Small Image'},
								{value: 'img-none', label: 'Show No Image'},
							]}/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

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

			<RichText
				tagName="h2" // The tag here is the element output and editable in the admin
				value={ attributes.program } // Any existing content, either from the database or an attribute default
				allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
				onChange={ ( program ) => setAttributes( { program } ) } // Store updated content as a block attribute
				placeholder="Program Title"// Display this text before any content has been added by the user
			/>

			<RichText
				tagName="div" // The tag here is the element output and editable in the admin
				value={ attributes.description } // Any existing content, either from the database or an attribute default
				allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
				onChange={ ( description ) => setAttributes( { description } ) } // Store updated content as a block attribute
				placeholder="Program Description"// Display this text before any content has been added by the user
			/>

		</div>
	);
}
