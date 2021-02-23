// uses these imports
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls} from "@wordpress/block-editor";
import {ColorPalette, PanelBody, SelectControl, RangeControl} from "@wordpress/components";
import { addFilter } from '@wordpress/hooks';
import {select} from "@wordpress/data";

const borderInspectorControls = createHigherOrderComponent(( BlockEdit ) => {
	return (props) => {
		let divStyles = {
			borderStyle: props.attributes.borderStyle || 'none',
			borderWidth: props.attributes.borderWidth + 'px',
			borderColor: props.attributes.borderColor,
			borderRadius: props.attributes.borderRadius + 'px',
		}
		let settings = select('core/editor').getEditorSettings();
		return (
		<Fragment>
			<div className="wp-block" style={divStyles}>
				<BlockEdit {...props} />
			</div>
			<InspectorControls>
				<PanelBody title="Border Controls">
					<SelectControl
						label="Border Style"
						value={props.attributes.borderStyle}
						options={[
							{label: 'None', value: 'none'},
							{label: 'Solid', value: 'solid'},
							{label: 'Dashed', value: 'dashed'},
							{label: 'Dotted', value: 'dotted'},
						]}
						onChange={ (value) => {
							props.setAttributes({
							borderStyle: value
							})
						}}
						style={{width: '100%'}}
					/>
					<RangeControl
						label="Border Width"
						value={ props.attributes.borderWidth }
						onChange={ (value) => {
							props.setAttributes({
								borderWidth: value
							})
						}}
						min={ 0.5 }
						max={ 5 }
						step={ 0.5 }
					/>
					<RangeControl
						label="Border Radius"
						value={ props.attributes.borderRadius }
						onChange={ (value) => {
							props.setAttributes({
								borderRadius: value
							})
						}}
						min={ 0 }
						max={ 10 }
						step={ 1 }
					/>
					<ColorPalette
						label="Border Color"
						value={props.attributes.borderColor}
						onChange={ (value) => {
							props.setAttributes({
								borderColor: value
							})
						}}
						colors={
							settings.colors
						}
						/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
		)
	};
}, 'blockInspectorControls');

addFilter('editor.BlockEdit', 'ct-blockmania/border-control/inspector-controls', borderInspectorControls);
