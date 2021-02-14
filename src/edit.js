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
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
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

	return (
		<div { ...useBlockProps() }>
			<SelectControl
				label={ __( 'Select a rating:' ) }
				value={ attributes.stars }
				onChange={ ( stars ) => { setAttributes( { stars } ) } }
				options={ [
					{ value: '1', label: '*' },
					{ value: '2', label: '**' },
					{ value: '3', label: '***' },
					{ value: '4', label: '****' },
					{ value: '5', label: '*****' },
				] }
			/>
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
