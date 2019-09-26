/**
 * Internal dependencies
 */
import * as icons from '../../icons';
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;

export default registerBlockType( 'novablocks/menu-food-section',
	{
		title: __( 'Food Menu Section', '__plugin_txtd' ),
		description: __( 'A subgrouping of the Menu.', '__plugin_txtd' ),
		category: 'nova-blocks',
		icon: icons.foodmenu,
		parent: ['novablocks/menu-food'],
		attributes: {
			sectionTitle: {
				type: 'string',
				default: 'Drinks'
			}
		},
		edit,
		save
	}
)