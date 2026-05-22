<?php
/**
 * The main template file
 *
 * @package DT_Website_Theme
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">

		<?php
		if ( have_posts() ) :
			while ( have_posts() ) :
				the_post();
				?>
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					
					<div class="entry-content">
                        <!-- 
                            For the landing page, we rely on the React application mounted on #root 
                            This is part of the initial design conversion. 
                        -->
						<div id="root"></div>
                        
                        <?php the_content(); ?>
					</div><!-- .entry-content -->
				</article><!-- #post-<?php the_ID(); ?> -->
				<?php
			endwhile;
		endif;
		?>

	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_footer();
