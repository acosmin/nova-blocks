<?php
/**
 * Handle the Hero block server logic.
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'novablocks_hero_block_init' ) ) {

	function novablocks_hero_block_init() {
		register_block_type( 'novablocks/hero', array(
			'attributes' => novablocks_get_hero_attributes(),
			'render_callback' => 'novablocks_render_hero_block',
		) );
	}
}
add_action( 'init', 'novablocks_hero_block_init' );

if ( ! function_exists( 'novablocks_render_hero_block' ) ) {

	function novablocks_render_hero_block( $attributes, $content ) {

	    $attributes_config = novablocks_get_hero_attributes();
	    $attributes = novablocks_get_attributes_with_defaults( $attributes, $attributes_config );

	    $novablocks_settings = novablocks_get_block_editor_settings();

		$classes = array_merge(
			array( 'novablocks-hero', 'alignfull' ),
			novablocks_get_block_extra_classes( $attributes )
		);

		if ( ! empty( $attributes['className'] ) ) {
			$classes[] = $attributes['className'];
		}

		if ( empty( $attributes['media'] || ! is_array( $attributes['media'] ) ) ) {
			$media = [];
		} else {
			$media = $attributes['media'];
		}

		// Make sure the media defaults are in place.
		$media = wp_parse_args( $media, [ 'type' => '', 'url' => '', 'sizes' => [] ] );

		$heroStyle = 'color: ' . $attributes['contentColor'];
		$contentStyle = '';
		$foregroundStyle = '';
		$mediaStyle = novablocks_get_focal_point_style( $attributes['focalPoint'] );

		if ( ! defined( 'NOVABLOCKS_USE_POST_META_ATTRIBUTES' ) || NOVABLOCKS_USE_POST_META_ATTRIBUTES ) {

			if ( ! empty( $attributes['contentWidth'] ) && $attributes['contentWidth'] === 'custom' ) {
				$contentStyle .= 'max-width: ' . floatval( $attributes['contentWidthCustom'] ) . '%';
			}

			if ( ! empty( $attributes['applyMinimumHeightBlock'] ) ) {
				$minHeight = get_post_meta( get_the_ID(), 'novablocks_hero_minimum_height', true );
				$foregroundStyle .= 'min-height: calc(' . floatval( $minHeight ) . '* var(--novablocks-1vh, 1vh)); ';
			}

			if ( ! empty( $attributes['overlayFilterStyle'] ) && $attributes['overlayFilterStyle'] !== 'none' ) {
				$mediaStyle .= 'opacity: ' . ( 1 - floatval( $attributes['overlayFilterStrength'] ) / 100 ) . '; ';
			}
		} else {
			$minHeight = $attributes['minHeightFallback'];
			$foregroundStyle .= 'min-height: calc(' . floatval( $minHeight ) . '* var(--novablocks-1vh, 1vh)); ';

			if ( ! empty( $attributes['overlayFilterStyle'] ) && $attributes['overlayFilterStyle'] !== 'none' ) {
				$mediaStyle .= 'opacity: ' . ( 1 - floatval( $attributes['overlayFilterStrength'] ) / 100 ) . '; ';
			}
		}

		$scrollIndicator = ! empty( $attributes['scrollIndicatorBlock'] );

		if ( defined( 'NOVABLOCKS_USE_POST_META_ATTRIBUTES' ) && ! NOVABLOCKS_USE_POST_META_ATTRIBUTES ) {
			$scrollIndicator = ( isset( $attributes['blockIndex'] ) && $attributes['blockIndex'] === 0 && floatval( $attributes['minHeightFallback'] ) === 100 );
		}

		ob_start();

		do_action( 'novablocks_hero:before' ); ?>

        <div class="<?php echo esc_attr( join( ' ', $classes ) ); ?>" style="<?php echo esc_attr( $heroStyle ); ?>">

			<?php do_action( 'novablocks_hero:after_opening_tag', $attributes ); ?>

            <div class="novablocks-hero__mask">
                <div class="novablocks-hero__parallax" data-rellax-amount="<?php echo novablocks_get_parallax_amount( $attributes ); ?>">
					<?php if ( $media['type'] === 'image' && ! empty( $media['sizes']['full']['url'] ) ) { ?>
                        <img class="novablocks-hero__media"
                             src="<?php echo esc_url( $media['sizes']['full']['url'] ); ?>"
                             style="<?php echo esc_attr( $mediaStyle ); ?>"/>
					<?php }

					if ( $media['type'] === 'video' && ! empty( $media['url'] ) ) { ?>
                        <video muted autoplay loop class="novablocks-hero__media"
                               src="<?php echo esc_url( $media['url'] ); ?>"
                               style="<?php echo esc_attr( $mediaStyle ); ?>"/>
					<?php } ?>
                </div>
            </div>
            <div class="novablocks-hero__foreground novablocks-foreground novablocks-u-content-padding" style="<?php echo esc_attr( $foregroundStyle ); ?>">
                <div class="novablocks-u-content-align">
                    <div class="novablocks-hero__inner-container novablocks-u-content-width" style="<?php echo esc_attr( $contentStyle ); ?>">
						<?php echo $content ?>
                    </div>
					<?php if ( $scrollIndicator ) { ?>
                        <div class="novablocks-hero__indicator">
	                        <?php echo $novablocks_settings['hero']['scrollIndicatorMarkup']; ?>
                        </div>
					<?php } ?>
                </div>
            </div>

			<?php do_action( 'novablocks_hero:before_closing_tag', $attributes ) ?>

        </div>

		<?php do_action( 'novablocks_hero:after' );

		return ob_get_clean();
	}
}
