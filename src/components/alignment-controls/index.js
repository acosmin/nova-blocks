/**
 * Internal dependencies
 */
import * as icons from '../../icons';

import BlockHorizontalAlignmentToolbar from '../block-horizontal-alignment-toolbar';
import BlockVerticalAlignmentToolbar from '../block-vertical-alignment-toolbar';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	Dropdown,
	IconButton,
	PanelRow,
	Toolbar,
} = wp.components;

const AlignmentToolbar = function( props ) {
	return (
		<Toolbar className="pixelgrade-hero-block-toolbar">
			<Dropdown
				position="bottom"
				className="pixelgrade-hero-block-toolbar-dropdown"
				contentClassName="components-nova--popover"
				renderToggle={ ( { isOpen, onToggle } ) => (
					<IconButton
						onClick={ onToggle }
						icon={ icons.alignment }
						aria-expanded={ isOpen }
						label={ __( 'Content Alignment', '__plugin_txtd' ) }
						labelPosition="bottom"
					/>
				) }
				focusOnMount={ false }
				renderContent={ () => <AlignmentControls { ...props } /> }
			/>
		</Toolbar>
	);
};

const AlignmentControls = function( props ) {
	const {
		attributes: {
			applyMinimumHeightBlock,
			horizontalAlignment,
			verticalAlignment,
		},
		setAttributes,
	} = props;

	return (
		<Fragment>
			<PanelRow>
				<span>{ __( 'Horizontal', '__plugin_txtd' ) }</span>
				<BlockHorizontalAlignmentToolbar
					value={ horizontalAlignment }
					onChange={ ( nextHorizontalAlignment ) => {
						wp.data.select( 'core/block-editor' ).getSelectedBlock().innerBlocks.map( ( block ) => {
							wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, { align: nextHorizontalAlignment } );
							return true;
						} );
						setAttributes( { horizontalAlignment: nextHorizontalAlignment } );
					} }
				/>
			</PanelRow>
			{ applyMinimumHeightBlock && <PanelRow>
				<span>{ __( 'Vertical', '__plugin_txtd' ) }</span>
				<BlockVerticalAlignmentToolbar
					value={ verticalAlignment }
					onChange={ ( nextVerticalAlignment ) => setAttributes( { verticalAlignment: nextVerticalAlignment } ) }
				/>
			</PanelRow> }
		</Fragment>
	);
};

export {
	AlignmentControls,
	AlignmentToolbar,
};
