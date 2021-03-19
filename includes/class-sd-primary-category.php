<?php
/**
 * Primary Post Category class
 * 
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SD_Primary_Category {

	/**
	 * Post ID for the term.
	 *
	 * @var int
	 */
	protected $post_ID;

	/**
	 * Constructor funtion.
	 *
	 * @param int    $post_id       Post ID for the term.
	 */
	public function __construct( $post_id ) {
		$this->post_ID       = $post_id;
	}

	/**
	 * Returns the primary term ID.
	 *
	 * @return int|bool
	 */
	public function get() {

		$primary_cat = get_post_meta( $this->post_ID, $this->fieldname, true );

        $terms = get_the_terms( $this->post_ID, 'category' );

		if ( ! is_array( $terms ) ) {
			$terms = [];
		}

		if ( ! in_array( (int) $primary_cat, wp_list_pluck( $terms, 'term_id' ), true ) ) {
			$primary_cat = false;
		}

		$primary_cat = (int) $primary_cat;
		return ( $primary_cat ) ? ( $primary_cat ) : false;
	}

	/**
	 * Sets the new primary category ID.
	 *
	 * @param int $new_primary_cat New primary category ID.
	 */
	public function update( $new_primary_cat ) {
		update_post_meta( $this->post_ID, $this->fieldname, $new_primary_cat );
	}

}
