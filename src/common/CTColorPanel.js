import {__} from "@wordpress/i18n";
import {PanelColorSettings} from "@wordpress/block-editor";
import {select} from "@wordpress/data";

export class CTColorPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialOpen: false,
		};

	}

	render() {
		let {attributes, setAttributes} = this.props;
		//let {attributes, setAttributes, initialOpen} = this.props;
		let settings = select('core/editor').getEditorSettings();
		return (
			<PanelColorSettings
			title={__('Color Settings')}
			initialOpen={this.props.initialOpen}
			//initialOpen={initialOpen}
			colorSettings={[
				{
					label: __('Background Color'),
					value: attributes.backgroundColor2,
					onChange: (color) => {setAttributes({backgroundColor2: color})},
				},
				{
					label: __('Text Color'),
					value: attributes.textColor2,
					onChange: (color) => {setAttributes({textColor2: color})},
					colors: [
						...settings.colors,
						{name: 'White', slug: 'white', color: '#000000'}
					],
				},
			]}
			/>
		);
	}
}
