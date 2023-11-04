<style>
    #preloader {
        overflow: hidden;
        background-color: #fff;
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999999;
    }

    .classy-load {
        -webkit-animation: 2000ms linear 0s normal none infinite running classy-load;
        animation: 2000ms linear 0s normal none infinite running classy-load;
        background: transparent none repeat scroll 0 0;
        border-color: #dddddd #dddddd #111111;
        border-radius: 50%;
        border-style: solid;
        border-width: 2px;
        height: 40px;
        left: calc(50% - 20px);
        position: relative;
        top: calc(50% - 20px);
        width: 40px;
        z-index: 9;
    }

    @-webkit-keyframes classy-load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes classy-load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .navigation {
        width: 100%;
        height: 70px;
        display: table;
        position: relative;
        font-family: inherit;
        background-color: #fff
    }

    .navigation * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent
    }

    .navigation-portrait {
        height: 48px
    }

    .navigation-fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 19998
    }

    .navigation-hidden {
        width: 0 !important;
        height: 0 !important;
        margin: 0 !important;
        padding: 0 !important
    }

    .align-to-right {
        float: right;
        margin-right: 250px;
    }

    .nav-header {
        float: left
    }

    .navigation-hidden .nav-header {
        display: none
    }

    .nav-brand {
        line-height: 70px;
        padding: 0;
        color: #343a40;
        font-size: 24px;
        text-decoration: none !important
    }

    .nav-brand:hover,
    .nav-brand:focus {
        color: #343a40
    }

    .navigation-portrait .nav-brand {
        font-size: 18px;
        line-height: 48px
    }

    .nav-logo>img {
        height: 48px;
        margin: 11px auto;
        padding: 0 15px;
        float: left
    }

    .nav-logo:focus>img {
        outline: initial
    }

    .navigation-portrait .nav-logo>img {
        height: 36px;
        margin: 6px auto 6px 15px;
        padding: 0
    }

    .navigation-portrait .nav-toggle {
        display: block
    }

    .navigation-portrait .nav-menus-wrapper {
        width: 320px;
        height: 100%;
        top: 0;
        left: -400px;
        position: fixed;
        background-color: #fff;
        z-index: 20000;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -webkit-transition-duration: .2s;
        transition-duration: .2s;
        -webkit-transition-timing-function: ease;
        transition-timing-function: ease;
        margin-top: 125px
    }

    .navigation-portrait .nav-menus-wrapper.nav-menus-wrapper-right {
        left: auto;
        right: -400px
    }

    .navigation-portrait .nav-menus-wrapper.nav-menus-wrapper-open {
        left: 0
    }

    .navigation-portrait .nav-menus-wrapper.nav-menus-wrapper-right.nav-menus-wrapper-open {
        left: auto;
        right: 0
    }

    .nav-menus-wrapper-close-button {
        width: 30px;
        height: 40px;
        margin: 10px 7px;
        display: none;
        float: right;
        color: #343a40;
        font-size: 26px;
        cursor: pointer
    }

    .navigation-portrait .nav-menus-wrapper-close-button {
        display: block
    }

    .nav-menu {
        margin: 0;
        padding: 0;
        list-style: none;
        line-height: normal;
        font-size: 0
    }

    .navigation-portrait .nav-menu {
        width: 100%
    }

    .navigation-landscape .nav-menu.nav-menu-centered {
        float: none;
        text-align: center
    }

    .navigation-landscape .nav-menu.nav-menu-centered>li {
        float: none
    }

    .nav-menu>li {
        display: inline-block;
        float: left;
        text-align: left
    }

    .navigation-portrait .nav-menu>li {
        width: 100%;
        position: relative;
        border-top: solid 1px #f0f0f0
    }

    .navigation-portrait .nav-menu>li:last-child {
        border-bottom: solid 1px #f0f0f0
    }

    .nav-menu+.nav-menu>li:first-child {
        border-top: none
    }

    .nav-menu>li>a {
        height: 70px;
        padding: 26px 15px;
        display: inline-block;
        text-decoration: none;
        font-size: 14px;
        color: #343a40;
        -webkit-transition: color .3s, background .3s;
        transition: color .3s, background .3s
    }

    .navigation-portrait .nav-menu>li>a {
        width: 100%;
        height: auto;
        padding: 12px 15px 12px 26px
    }

    .nav-menu>li:hover>a,
    .nav-menu>li.active>a,
    .nav-menu>li.focus>a {
        color: #27ae60
    }

    .nav-menu>li>a>i,
    .nav-menu>li>a>[class*=ion-] {
        width: 18px;
        height: 16px;
        line-height: 16px;
        -webkit-transform: scale(1.4);
        transform: scale(1.4)
    }

    .nav-menu>li>a>[class*=ion-] {
        width: 16px;
        display: inline-block;
        -webkit-transform: scale(1.8);
        transform: scale(1.8)
    }

    .navigation-portrait .nav-menu.nav-menu-social {
        width: 100%;
        text-align: center
    }

    .nav-menu.nav-menu-social>li {
        text-align: center;
        float: none;
        border: none !important
    }

    .navigation-portrait .nav-menu.nav-menu-social>li {
        width: auto
    }

    .nav-menu.nav-menu-social>li>a>[class*=ion-] {
        font-size: 12px
    }

    .nav-menu.nav-menu-social>li>a>.fa {
        font-size: 14px
    }

    .navigation-portrait .nav-menu.nav-menu-social>li>a {
        padding: 15px
    }

    .submenu-indicator {
        margin-left: 6px;
        margin-top: 6px;
        float: right;
        -webkit-transition: all .2s;
        transition: all .2s
    }

    .navigation-portrait .submenu-indicator {
        width: 54px;
        height: 44px;
        margin-top: 0;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        z-index: 20000
    }

    .submenu-indicator-chevron {
        height: 6px;
        width: 6px;
        display: block;
        border-style: solid;
        border-width: 0 1px 1px 0;
        border-color: transparent #70798b #70798b transparent;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-transition: border .2s;
        transition: border .2s
    }

    .navigation-portrait .submenu-indicator-chevron {
        position: absolute;
        top: 18px;
        left: 24px
    }

    .nav-menu>li:hover>a .submenu-indicator-chevron,
    .nav-menu>.active>a .submenu-indicator-chevron,
    .nav-menu>.focus>a .submenu-indicator-chevron {
        border-color: transparent #967adc #967adc transparent
    }

    .navigation-portrait .submenu-indicator.submenu-indicator-up {
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg)
    }

    .nav-overlay-panel {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        display: none;
        z-index: 19999
    }

    .no-scroll {
        width: 100%;
        height: 100%;
        overflow: hidden
    }

    .nav-toggle {
        height: 30px;
        top: 50%;
        margin-top: -14px;
        display: none;
        cursor: pointer;
        right: 0px;
        margin-right: 0px;
        padding-right: 0px;
        position: absolute;
    }

    .navigation-portrait .nav-search-close-button {
        top: 10px;
        right: 14px
    }

    .nav-button {
        margin: 18px 15px 0;
        padding: 8px 14px;
        display: inline-block;
        color: #fff;
        font-size: 14px;
        text-align: center;
        text-decoration: none;
        border-radius: 4px
    }

    .nav-button:hover,
    .nav-button:focus {
        color: #fff;
        text-decoration: none
    }

    .navigation-portrait .nav-button {
        width: calc(100% - 52px);
        margin: 17px 26px
    }

    .nav-text {
        margin: 25px 15px;
        display: inline-block;
        color: #343a40;
        font-size: 14px
    }

    .navigation-portrait .nav-text {
        width: calc(100% - 52px);
        margin: 12px 26px 0
    }

    .navigation-portrait .nav-text+ul {
        margin-top: 15px
    }

    .nav-dropdown {
        min-width: 180px;
        margin: 0;
        padding: 0;
        display: none;
        position: absolute;
        list-style: none;
        z-index: 98;
        white-space: nowrap
    }

    .navigation-portrait .nav-dropdown {
        width: 100%;
        position: static;
        left: 0
    }

    .nav-dropdown .nav-dropdown {
        left: 100%
    }

    .nav-menu>li>.nav-dropdown {
        border-top: solid 1px #f0f0f0
    }

    .nav-dropdown>li {
        width: 100%;
        float: left;
        clear: both;
        position: relative;
        text-align: left
    }

    .nav-dropdown>li>a {
        width: 100%;
        padding: 16px 20px;
        display: inline-block;
        text-decoration: none;
        float: left;
        font-size: 13px;
        color: #343a40;
        background-color: #fdfdfd;
    }

    .nav-dropdown>li:hover>a,
    .nav-dropdown>li.focus>a {
        color: #27ae60
    }

    .nav-dropdown.nav-dropdown-left {
        right: 0
    }

    .nav-dropdown>li>.nav-dropdown-left {
        left: auto;
        right: 100%
    }

    .navigation-landscape .nav-dropdown.nav-dropdown-left>li>a {
        text-align: right
    }

    .navigation-portrait .nav-dropdown>li>a {
        padding: 12px 20px 12px 30px
    }

    .navigation-portrait .nav-dropdown>li>ul>li>a {
        padding-left: 50px
    }

    .navigation-portrait .nav-dropdown>li>ul>li>ul>li>a {
        padding-left: 70px
    }

    .navigation-portrait .nav-dropdown>li>ul>li>ul>li>ul>li>a {
        padding-left: 90px
    }

    .navigation-portrait .nav-dropdown>li>ul>li>ul>li>ul>li>ul>li>a {
        padding-left: 110px
    }

    .nav-dropdown .submenu-indicator {
        right: 15px;
        top: 10px;
        position: absolute
    }

    .navigation-portrait .nav-dropdown .submenu-indicator {
        right: 0;
        top: 0
    }

    .nav-dropdown .submenu-indicator .submenu-indicator-chevron {
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg)
    }

    .navigation-portrait .nav-dropdown .submenu-indicator .submenu-indicator-chevron {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg)
    }

    .nav-dropdown>li:hover>a .submenu-indicator-chevron,
    .nav-dropdown>.focus>a .submenu-indicator-chevron {
        border-color: transparent #27ae60 #27ae60 transparent
    }

    .navigation-landscape .nav-dropdown.nav-dropdown-left .submenu-indicator {
        left: 10px
    }

    .navigation-landscape .nav-dropdown.nav-dropdown-left .submenu-indicator .submenu-indicator-chevron {
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg)
    }

    .nav-dropdown-horizontal {
        width: 100%;
        left: 0;
        background-color: #fdfdfd;
        border-top: solid 1px #f0f0f0
    }

    .nav-dropdown-horizontal .nav-dropdown-horizontal {
        width: 100%;
        top: 100%;
        left: 0
    }

    .navigation-portrait .nav-dropdown-horizontal .nav-dropdown-horizontal {
        border-top: none
    }

    .nav-dropdown-horizontal>li {
        width: auto;
        clear: none;
        position: static
    }

    .navigation-portrait .nav-dropdown-horizontal>li {
        width: 100%
    }

    .nav-dropdown-horizontal>li>a {
        position: relative
    }

    .nav-dropdown-horizontal .submenu-indicator {
        height: 18px;
        top: 11px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg)
    }

    .navigation-portrait .nav-dropdown-horizontal .submenu-indicator {
        height: 42px;
        top: 0;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    .navigation-portrait .nav-dropdown-horizontal .submenu-indicator.submenu-indicator-up {
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg)
    }

    .navigation-landscape .list-col-2 {
        width: 50%
    }

    .navigation-landscape .list-col-3 {
        width: 33%
    }

    .navigation-landscape .list-col-4 {
        width: 25%
    }

    .navigation-landscape .list-col-5 {
        width: 20%
    }

    .nav-menu>li>a {
        color: #343a40;
        text-transform: uppercase;
    }

    .nav-dropdown>li>a {
        color: #343a40;
        padding: 10px 20px;
        border-bottom: 1px solid #f6f6f6;
    }

    .nav-dropdown>li>a:hover,
    .nav-dropdown>li>a:focus {
        color: #27ae60;
    }

    .main_header_area.sticky {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 9999;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
    }

    .transparent-menu {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 99;
    }

    .navigation-portrait .nav-menu>li>a {
        width: 100%;
        height: auto;
        padding: 10px 10px 10px 30px;
    }

    @media only screen and (min-width:320px) and (max-width:767px) {

        .nav-dropdown>li>a,
        .megamenu-list>li>a {
            width: 65%
        }
    }
</style>













<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css'>


<header class="header_area">
    <style>
        .nav-toggle {
            height: 30px;
            top: 50%;
            margin-top: -14px;
            display: none;
            cursor: pointer;
            right: 0px;
            margin-right: 0px;
            padding-right: 0px;
            position: absolute;
        }
    </style>
    <div class="main_header_area animated">
        <div style="margin-top:0px" class="">
            <nav id="navigation1" class="navigation">
                <!-- Logo Area Start -->
                <div class="nav-header">
                    <div class="nav-toggle"><button class="btn btn--border theme-btn--primary-inverse sqs-button-element--primary">Search by Location</button></div>
                </div>
                <!-- Search panel Start -->

                <!-- Main Menus Wrapper -->
                <div class="nav-menus-wrapper">
                    <ul class="nav-menu align-to-right">

                        <li><a href="#">North America</a>
                            <ul class="nav-dropdown">
                                <li><a href="/foodreviews/category/USA">USA</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Austin">Austin</a></li>
                                        <li><a href="/foodreviews/category/Boston">Boston</a></li>
                                        <li><a href="/foodreviews/category/Chicago">Chicago</a></li>
                                        <li><a href="/foodreviews/category/Los+Angeles">Los Angeles</a></li>
                                        <li><a href="/foodreviews/category/New+York">New York</a></li>
                                        <li><a href="/foodreviews/category/Palm+Beach">Palm Beach</a></li>
                                        <li><a href="/foodreviews/category/Palm+Springs">Palm Springs</a></li>
                                        <li><a href="/foodreviews/category/Provincetown">Provincetown</a></li>
                                        <li><a href="/foodreviews/category/San+Diego">San Diego</a></li>
                                        <li><a href="/foodreviews/category/Washington+DC">Washington DC</a></li>
                                        <li><a href="/foodreviews/category/Western+PA">Western PA</a></li>
                                    </ul>
                                </li>
                                <li><a href="/foodreviews/category/Canada">Canada</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Toronto">Toronto</a></li>
                                    </ul>
                                </li>
                                <li><a href="/foodreviews/category/Guatemala">Guatemala</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Antigua">Antigua</a></li>
                                        <li><a href="/foodreviews/category/Guatemala+City">Guatemala City</a></li>
                                    </ul>
                                <li><a href="/foodreviews/category/Mexico">Mexico</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Cabo+San+Lucas">Cabo San Lucas</a></li>
                                        <li><a href="/foodreviews/category/Guadalajara">Guadalajara</a></li>
                                        <li><a href="/foodreviews/category/Holbox">Holbox</a></li>
                                        <li><a href="/foodreviews/category/Mexico+City">Mexico City</a></li>
                                        <li><a href="/foodreviews/category/Puebla">Puebla</a></li>
                                        <li><a href="/foodreviews/category/Tijuana">Tijuana</a></li>
                                        <li><a href="/foodreviews/category/Tulum">Tulum</a></li>
                                        <li><a href="/foodreviews/category/Valle+de+Guadalupe">Valle de Guadalupe</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>


                        <li><a href="#">South America</a>
                            <ul class="nav-dropdown">
                                <li><a href="/foodreviews/category/Argentina">Argentina</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Buenos+Aires">Buenos Aires</a></li>
                                    </ul>
                                </li>
                                <li><a href="/foodreviews/category/Brazil">Brazil</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Sao+Paulo">Sao Paulo</a></li>
                                        <li><a href="/foodreviews/category/Rio+de+Janeiro">Rio de Janeiro</a></li>
                                    </ul>
                                </li>
                                <li><a href="/foodreviews/category/Colombia">Colombia</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Bogota">Bogota</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>


                        <li><a href="#">Europe</a>
                            <ul class="nav-dropdown">
                                <li><a href="/foodreviews/category/Albania">Albania</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Tirana">Tirana</a></li>
                                    </ul>
                                </li>

                                <li><a href="/foodreviews/category/Greece">Greece</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Athens">Athens</a></li>
                                        <li><a href="/foodreviews/category/Nafplio">Nafplio</a></li>
                                        <li><a href="/foodreviews/category/Thessaloniki">Thessaloniki</a></li>
                                    </ul>
                                </li>

                                <li><a href="/foodreviews/category/Georgia">Georgia</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Tbilisi">Tbilisi</a></li>
                                    </ul>
                                </li>
                                <li><a href="/foodreviews/category/Italy">Italy</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Bologna">Bologna</a></li>
                                        <li><a href="/foodreviews/category/Florence">Florence</a></li>
                                        <li><a href="/foodreviews/category/Padua">Padua</a></li>
                                        <li><a href="/foodreviews/category/Rome">Rome</a></li>
                                        <li><a href="/foodreviews/category/Venice">Venice</a></li>
                                    </ul>
                                </li>
                                <li><a href="/foodreviews/category/Ireland">Ireland</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Dublin">Dublin</a></li>
                                    </ul>
                                <li><a href="/foodreviews/category/Montenegro">Montenegro</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Budva">Budva</a></li>
                                        <li><a href="/foodreviews/category/Kotor+Bay">Kotor Bay</a></li>
                                    </ul>

                                </li>
                                <li><a href="/foodreviews/category/San+Marino">San Marino</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/San+Marino">San Marino</a></li>
                                    </ul>

                                <li><a href="/foodreviews/category/Serbia">Serbia</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Belgrade">Belgrade</a></li>
                                    </ul>
                                </li>

                                <li><a href="/foodreviews/category/Spain">Spain</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Barcelona">Barcelona</a></li>
                                        <li><a href="/foodreviews/category/Madrid">Madrid</a></li>
                                        <li><a href="/foodreviews/category/Seville">Seville</a></li>
                                    </ul>
                                </li>
                                <li><a href="/foodreviews/category/Sweden">Sweden</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Malmo">Malmo</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>


                        <li><a href="#">Africa</a>
                            <ul class="nav-dropdown">
                                <li><a href="/foodreviews/category/Egypt">Egypt</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Luxor">Luxor</a></li>
                                        <li><a href="/foodreviews/category/Cairo">Cairo</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>


                        <li><a href="#">Asia</a>
                            <ul class="nav-dropdown">
                                <li><a href="/foodreviews/category/Malaysia">Malaysia</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Kuala+Lumpur">Kuala Lumpur</a></li>
                                    </ul>
                                <li><a href="/foodreviews/category/Taiwan">Taiwan</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Taipei">Taipei</a></li>
                                    </ul>
                                <li><a href="/foodreviews/category/Thailand">Thailand</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Bangkok">Bangkok</a></li>
                                    </ul>
                                <li><a href="/foodreviews/category/UAE">UAE</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Dubai">Dubai</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li><a href="#">Australia</a>
                            <ul class="nav-dropdown">
                                <li><a href="/foodreviews/category/Australia">Australia</a>
                                    <ul class="nav-dropdown">
                                        <li><a href="/foodreviews/category/Melbourne">Melbourne</a></li>
                                    </ul>
                                </li>

                            </ul>
                        </li>

                        <li><a style="color:#ffffff" href="../classy-shortcodes/index.html">Shortcodes <span class="label label-pill label-primary">New</span></a></li>

                    </ul>
                </div>
            </nav>
        </div>
    </div>
</header>