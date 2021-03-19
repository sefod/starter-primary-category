<?php
/**
 * Plugin Name: SD Primary Categories
 * Version: 1.0.0
 * Plugin URI: https://www.github.com/
 * Description: Allow selection of a Primary Category for Posts and other content types.
 * Author: Serafin D
 * Author URI: https://ifstudio.co/
 *
 * Text Domain: sd-primary-categories
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Serafin D
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load plugin class files.
require_once 'includes/class-sd-primary-categories.php';

// Load Primary Category class
require_once 'includes/class-sd-primary-category.php';

// Load plugin libraries.
require_once 'includes/lib/class-sd-primary-categories-admin-api.php';

/**
 * Returns the main instance of SD_Primary_Categories to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object SD_Primary_Categories
 */
function sd_primary_categories() {

	$instance = SD_Primary_Categories::instance( __FILE__, '1.0.0' );

	return $instance;
	
}

sd_primary_categories();