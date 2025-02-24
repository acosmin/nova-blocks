/**
 * Internal dependencies
 */
import withSettings from '../with-settings';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Fragment,
} = wp.element;

const {
	Button,
	ButtonGroup,
	RangeControl,
} = wp.components;

const WidthControls = function( props ) {
	const {
		attributes: {
			contentWidth,
			contentWidthCustom,
		},
		setAttributes,
		settings: {
			contentWidthOptions,
		},
	} = props;

	return (
		<Fragment>
			<label>{ __( 'Content Width', '__plugin_txtd' ) }</label>
			<ButtonGroup label="Content Width">
				{ contentWidthOptions.map( ( option ) =>
					<Button
						key={ option.value }
						isDefault={ option.value !== contentWidth }
						isPrimary={ option.value === contentWidth }
						onClick={ () => {
							setAttributes( { contentWidth: option.value } );
						} }>
						{ option.label }
					</Button>
				) }
			</ButtonGroup>
			{ 'custom' === contentWidth && <RangeControl
				value={ contentWidthCustom }
				onChange={ ( newContentWidth ) => setAttributes( { contentWidthCustom: newContentWidth } ) }
				min={ 20 }
				max={ 90 }
				step={ 10 }
			/> }
		</Fragment>
	);
};

export default withSettings( WidthControls );
