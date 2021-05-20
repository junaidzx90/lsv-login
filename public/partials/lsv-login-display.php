<?php
if(is_user_logged_in(  )){
    wp_safe_redirect( home_url('/') );
}
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Lsv_Login
 * @subpackage Lsv_Login/public/partials
 */
require_once LSV_PATH."public/class-lsv-login-public.php";
class Login_Page_View extends Lsv_Login_Public{
    public $get_post_slug;

    function __construct($page = ''){
        $this->matchfield_login_error = $this->get_post_slug($page);
    }
}
$public_ins = new Login_Page_View();
$public_ins->matchfield_login_error;

?>
<div class="wrapper" style="background-image: linear-gradient(45deg, #292929, #f19d4947),url(<?php echo get_option('lsvbackground_img'); ?>)">
  <div class="container">
    <div class="login-form">
        <?php
        
        if(isset($_GET['reset']) && $_GET['reset'] === 'true' && isset($_GET['email'])){
            $email = sanitize_email( $_GET['email'] );
            if(!get_user_by('email', $email)){
                wp_safe_redirect( home_url($public_ins->get_post_slug(get_option( "lsvlogin_page" ))) );
            }
            ?>
            <h2>Forgot</h2>
            <form>
                <p class="passbox">
                    <label for="password">Password</label>
                    <span class="showhidepass">👁</span>
                    <input id="password" type="password" class="password" placeholder="Password" required>
                    <input type="hidden" class="changableeml" value="<?php echo $email; ?>">
                </p>
                <p class="signinbtn">
                    <input id="changepass" class="btn" type="submit" value="Change Password" />
                </p>
                <p>
                <a href="<?php echo home_url($public_ins->get_post_slug(get_option( "lsvlogin_page" ))); ?>">Login</a>
                </p>
            </form>
        <?php }

        if(isset($_GET['forgot']) && $_GET['forgot'] === 'true'){?>
            <h2>Forgot</h2>
            <form>
                <p>
                    <label for="email">Your Email</label>
                    <input id="email" type="email" placeholder="Your email" required>
                </p>
                <p class="signinbtn">
                    <a class="submitbtn" id="forgotcontinue" href="?" type="submit">Continue</a>
                </p>
                <p>
                <a href="<?php echo home_url($public_ins->get_post_slug(get_option( "lsvlogin_page", true ))); ?>">Login</a>
                </p>
            </form>
            <!-- forgot end -->
        <?php }else{ 
            if(!isset($_GET['reset'])){?>
                <h2>Login</h2>
                <form>
                    <p>
                        <label for="email">Your email</label>
                        <input id="email" type="email" placeholder="Email" required>
                    </p>
                    <p class="passbox">
                        <label for="password">Password</label>
                        <span class="showhidepass">👁</span>
                        <input id="password" type="password" class="password" placeholder="Password" required>
                    </p>
                    <p class="signinbtn">
                        <input id="signinbtn" class="btn" type="submit" value="Sing In" />
                    </p>
                    <p>
                        <a href="?forgot=true">Forget password?</a>
                        <a href="<?php echo home_url($public_ins->get_post_slug(get_option( "lsvregister_page", true ))); ?>">Create an account.</a>
                    </p>
                </form>
                <!-- login end -->
            <?php }
        } ?>
        
    </div>
  </div>
</div>
