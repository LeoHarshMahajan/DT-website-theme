<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	
	<?php wp_head(); ?>
	<script>
		window.DT_THEME_URL = "<?php echo esc_url( get_template_directory_uri() ); ?>";
	</script>
</head>

<body <?php body_class(); ?> data-screen-label="Home" data-theme="dark">
<?php wp_body_open(); ?>
