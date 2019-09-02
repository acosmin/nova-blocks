const { __ } = wp.i18n;

const {
	Button,
	TextControl,
	PanelBody,
} = wp.components;

const {
	Component,
} = wp.element;

class ApiKeyPanelBody extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			apiKey,
			savedApiKey,
			onChangeApiKey,
			onSaveApiKey,
		} = this.props;

		if ( savedApiKey === '' ) {
			return null;
		}

		return (
			<PanelBody title={ __( 'Google Maps API Key' ) }>
				<TextControl
					placeholder={ __( 'Paste API key here' ) }
					value={ apiKey }
					onChange={ onChangeApiKey }
				/>
				<Button isDefault onClick={ () => { onSaveApiKey( apiKey ) } }>
					{ __( 'Update API Key' ) }
				</Button>
			</PanelBody>
		)
	}
}

export default ApiKeyPanelBody;
