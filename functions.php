<?php
/**
 * DT Website Theme functions and definitions
 *
 * @package DT_Website_Theme
 */

if ( ! defined( '_S_VERSION' ) ) {
	define( '_S_VERSION', '1.0.2' );
}

/**
 * Enqueue scripts and styles.
 */
function dt_website_scripts() {
	wp_enqueue_style( 'dt-website-style', get_stylesheet_uri(), array(), _S_VERSION );
	
	// Enqueue Google Fonts
	wp_enqueue_style( 'dt-google-fonts', 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap', array(), null );

	// Enqueue React & Babel for standalone compiling in browser
	wp_enqueue_script( 'react', 'https://unpkg.com/react@18.3.1/umd/react.development.js', array(), null, false );
	wp_enqueue_script( 'react-dom', 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js', array('react'), null, false );
	wp_enqueue_script( 'babel', 'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js', array(), null, false );

    // Enqueue JSX scripts
    $jsx_files = array( 'tweaks-panel', 'shared', 'nav', 'hero', 'systems', 'proof', 'footer', 'app' );
    foreach ( $jsx_files as $file ) {
        wp_enqueue_script( 'dt-' . $file, get_template_directory_uri() . '/' . $file . '.jsx', array('react', 'react-dom', 'babel'), _S_VERSION, true );
    }
}
add_action( 'wp_enqueue_scripts', 'dt_website_scripts' );

/**
 * Add type="text/babel" to our custom React scripts so Babel standalone processes them.
 */
function dt_add_babel_type( $tag, $handle, $src ) {
    $jsx_scripts = array( 'dt-tweaks-panel', 'dt-shared', 'dt-nav', 'dt-hero', 'dt-systems', 'dt-proof', 'dt-footer', 'dt-app' );
    if ( in_array( $handle, $jsx_scripts ) ) {
        return '<script type="text/babel" src="' . esc_url( $src ) . '"></script>' . "\n";
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'dt_add_babel_type', 10, 3 );
