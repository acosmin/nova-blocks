import classnames from 'classnames';

const { __ } = wp.i18n;

const {
	compose,
	createHigherOrderComponent
} = wp.compose;

const {
	Fragment,
	Component,
} = wp.element;

const {
	PanelBody,
	SelectControl,
} = wp.components;

const {
	InspectorControls,
} = wp.blockEditor;

const {
	withSelect,
} = wp.data;

const {
	addFilter
} = wp.hooks;

const enableFontSizeControlOnBlocks = [
	'core/heading',
	'novablocks/headline'
];

const fontSizeOptions = [
	{ value: 'smaller', label: __( 'Smaller', '__plugin_txtd' ) },
	{ value: 'normal', label: __( 'Normal', '__plugin_txtd' ) },
	{ value: 'larger', label: __( 'Larger', '__plugin_txtd' ) },
];

const defaultFontSize = 'normal';

function replaceActiveFontSize( className, fontSize, nextFontSize ) {

	if ( className ) {
		const regex = new RegExp( 'has-[a-z]+-font-size', 'gi' );
		className = className.replace( regex, '' ).trim();
	}

	const nextClassName = 'has-' + nextFontSize + '-font-size';

	return className ? className + ' ' + nextClassName : nextClassName;
}

function withFontSizePicker( WrappedComponent ) {
	return ( props ) => {

		const {
			attributes: {
				className,
				fontSize,
				level,
			},
			setAttributes,
		} = props;

		const selectValue = fontSizeOptions.find( x => x.value === fontSize ) ? fontSize : defaultFontSize;

		return [
			<WrappedComponent { ...props } />,
			<InspectorControls>
				{ level && level < 4 &&
					<PanelBody title={ __( 'Text Settings', '__plugin_txtd' ) } className="blocks-custom-font-size">
						<SelectControl
							label={ __( 'Font Size', '__plugin_txtd' ) }
							value={ selectValue }
							options={ fontSizeOptions }
							onChange={ nextFontSize => {
								setAttributes( {
									fontSize: nextFontSize,
									className: replaceActiveFontSize( className, fontSize, nextFontSize )
								} );
							} }
						/>
					</PanelBody>
				}
			</InspectorControls>
		]
	}
}

const withFontSizeControl = createHigherOrderComponent(OriginalComponent => {

	const BetterComponent = withFontSizePicker(OriginalComponent);

	return ( props ) => {

		if ( ! enableFontSizeControlOnBlocks.includes( props.name ) ) {
			return <OriginalComponent { ...props } />
		}

		return <BetterComponent { ...props } />;
	};
});
addFilter( 'editor.BlockEdit', 'novablocks/with-inspector-controls', withFontSizeControl );

function addFontSizeAttribute( block ) {

	if ( ! enableFontSizeControlOnBlocks.includes( block.name ) ) {
		return block;
	}

	if ( typeof block.attributes !== 'undefined' ){

		block.attributes = Object.assign( block.attributes, {
			fontSize: {
				type: 'string',
				default: defaultFontSize,
			}
		});

	}

	return block;
}
addFilter( 'blocks.registerBlockType', 'novablocks/add-font-size-attribute', addFontSizeAttribute );
