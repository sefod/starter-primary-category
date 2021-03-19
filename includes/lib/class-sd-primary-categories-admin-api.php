<?php
/**
 * Primary Categories admin class
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SD_Primary_Categories_Admin_API {

	/**
	 * Constructor function
	 */
	public function __construct() {

		add_action( 'init', function(){

			register_meta( 'post', '_' . sd_primary_categories()->fieldname, array(
				'type'		=> 'string',
				'single'	=> true,
				'show_in_rest'	=> true,
				'auth_callback' => function(){
					return current_user_can('edit_posts');
				}
			) );

		});


	}

	/**
	 * Save metabox fields.
	 *
	 * @param  integer $post_id Post ID.
	 * @return void
	 */
	public function save_primary_category( $post_id = 0 ) {

		if ( ! $post_id ) {
			return;
		}

		$post_type = get_post_type( $post_id );

		// Check if post type supports the category
		if ( $this->supports_primary_category( $post_type ) ) {

			// Create the primary category object with post ID
			$primary_category = new SD_Primary_Category( $post_id );

			// Check if it has a value for the field
			$new_primary_category = isset( $_REQUEST[ sd_primary_categories()->fieldname ] ) ? $_REQUEST[ sd_primary_categories()->fieldname ] : false;

			// Update accordingly
			if ( is_int( $new_primary_category ) ) {
				$primary_category->update( $new_primary_category );
			} elseif ( false !== $primary_category->get() ) {
				$primary_category->update( '' );
			}

		}

	}

	/**
	 * Check if Primary Category is supported
	 *
	 * @param  string $post_type Post Type.
	 * @return bool
	 */
	public function supports_primary_category( $post_type ) {
		return apply_filters( "sd_supports_primary_category_{$post_type}", is_object_in_taxonomy( $post_type, sd_primary_categories()->taxonomy ) );
	}

}
