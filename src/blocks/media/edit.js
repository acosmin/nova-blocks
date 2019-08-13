import withSettings from "../../components/with-settings";

const {
	Component,
	Fragment
} = wp.element;

const {
	withSelect
} = wp.data;

import BlockControls from './block-controls';
import InspectorControls from './inspector-controls';
import MediaPreview from './preview';

const MediaEdit = function( props ) {

	function updateImages( media ) {
		props.setAttributes({
			images: media.map( ( image ) => JSON.stringify({ id: image.id, url: image.url, alt: image.alt }) )
		});
	}

	return (
		<Fragment>
			<MediaPreview { ...{ ...props, updateImages } } />
			<BlockControls { ...{ ...props, updateImages } } />
			<InspectorControls { ...props } />
		</Fragment>
	)
}

export default withSettings( MediaEdit );


