// ==UserScript==
// @name         Kleinanzeigen Prettify
// @namespace    http://tampermonkey.net/
// @version      2
// @description  Make Kleinanzeigen prettier
// @author       Matty
// @match        https://*.kleinanzeigen.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kleinanzeigen.de
// @grant        none
// @updateURL    https://github.com/MathiasLui/kleinanzeigen-prettify/raw/main/kleinanzeigen-prettify.user.js
// @downloadURL  https://github.com/MathiasLui/kleinanzeigen-prettify/raw/main/kleinanzeigen-prettify.user.js
// ==/UserScript==

(function() {
    'use strict';

    function log(message) {
        console.log('[Tampermonkey-Kleinanzeigen-Prettifier] ' + message);
    }

    // JavaScript and styling for the profile page
    log('Applying global options');

    const css = `
    * {
        /*
            Variable suffixes:
            - non suffix: Normal format (#RRGGBB)
            - rgb: RR, GG, BB
            - colors: RR GG BB
        */

        /* Own variables */
        --mat-dark-green-background: #102910;
        --mat-dark-purple-background: #501cbb;
        --mat-light-green-foreground: #3aaf38;

        /* Should be identical */
        --mat-mid-background: #212121;
        --mat-mid-background-colors: 26 26 26;

        /* Should be identical */
        --mat-dark-background: #141414;
        --mat-dark-background-rgb: 20, 20, 20;
        --mat-dark-background-colors: 20 20 20;

        /* Should be identical */
        --mat-light-foreground: #b7b7b7;
        --mat-light-foreground-rgb: 183, 183, 183;
        --mat-light-foreground-colors: 183 183 183;

        /* Should be identical */
        --mat-light-green-background: #29471a;
        --mat-light-green-background-rgb: 41, 71, 26;
        --mat-light-green-background-colors: 41 71 26;

        /* Main site's vars */
        --kds-sema-color-on-primary: #dddddd !important; /* Button texts dark green */
        --kds-sema-color-interactive: #7f7f7f !important; /* Other button texts (registrieren) dark green */
        --kds-sema-color-primary: var(--mat-dark-green-background) !important; /* Green top bar */
        --kds-sema-color-surface: var(--mat-dark-background) !important; /* White very top bar and some backgrounds */
        --kds-sema-color-background-subdued: var(--mat-dark-background) !important; /* White site background */
        --kds-sema-color-on-surface: var(--mat-light-foreground) !important; /* Big headers and top bar text */
        --kds-sema-color-on-surface-subdued: var(--mat-light-foreground) !important; /* List items for categories text */
        --kds-sema-color-utility-nonessential: var(--mat-mid-background) !important; /* Background of dropdowns */
        --kds-sema-color-primary-variant: var(--mat-light-green-background) !important; /* Find button background light green */
        --kds-sema-color-on-primary-variant: var(--mat-light-foreground) !important; /* Find button background light green */
        --kds-sema-color-on-background: var(--mat-light-foreground) !important; /* Neueste Anzeigen title */
        --kds-sema-color-primary-rgb: var(--mat-light-green-background-rgb) !important; /* Nachricht schreiben background */
        --kds-sema-color-on-primary-rgb: var(--mat-light-foreground-rgb) !important; /* Nachricht schreiben text */
        --kds-sema-color-on-accent-container: var(--mat-light-foreground) !important; /* Seller tags text */
        --kds-sema-color-accent-container: var(--mat-dark-purple-background) !important; /* Seller tags background */
        --kds-sema-color-surface-subdued: var(--mat-dark-purple-background) !important; /* Simple tag background */
        --kds-sema-color-secondary-container: var(--mat-light-green-background) !important; /* Login/Register hover background */

        /* Ad page vars */
        --kds-sema-color-primary-container: var(--mat-mid-background) !important; /* Background of Käuferschutz badge below ad */
        --kds-sema-color-on-primary-container: var(--mat-light-green-foreground) !important; /* Text of Käuferschutz badge below ad */

        /* Auth subdomain vars */
        --colors-background: var(--mat-dark-background-colors) !important; /* Background of e.g. login page */
        --colors-on-surface: var(--mat-light-foreground-colors) !important; /* Header of e.g. login */
        --colors-on-background: var(--mat-light-foreground-colors) !important; /* Email, Password and bottom header */
        --colors-surface: var(--mat-mid-background-colors) !important; /* Background of e.g. Email and Password box */
        --colors-main: var(--mat-light-green-background-colors) !important; /* Login button background */
        --colors-on-main: var(--mat-light-foreground-colors) !important; /* Login button text */
        --colors-outline-high: var(--mat-light-foreground-colors) !important; /* Copyright text */

        /* Meine Anzeigen vars */
        --kds-sema-color-utility-subdued: var(--mat-mid-background) !important; /* Background of profile picture badge */
        --kds-sema-color-on-background-subdued: var(--mat-light-foreground) !important; /* Text on top of page */

        /* Einstellungen vars */
        --kds-sema-color-background: rgb(var(--mat-dark-background-rgb)) !important; /* On the original page they use rgba() with RGB values which is probably why it's not parsed correctly */

        /* Anzeige aufgeben vars */
        --kds-sema-color-interactive: var(--mat-light-green-foreground) !important; /* some links and accents */
    }

    #site-logo img,
    header svg {
        filter: brightness(1.5);
    }

    /* (OLD) Home page billboard + offer page billboard + My Ads banner + My Messages banner */
    /*#home-billboard,
    #vip-billboard,
    #my_ads-top-banner,
    #my_messages-top-banner*/

    /* These selectors are used by Kleinanzeigen themselves */
    .liberty-cls-improved,
    [data-liberty-position-name=srpb-top-banner],
    [data-liberty-position-name=zsrp-top-banner],
    [data-liberty-position-name=soi-top-banner],
    [data-liberty-position-name^=vip][data-liberty-position-name$=gallery],
    [data-liberty-position-name=home-billboard],
    [data-liberty-position-name^=my][data-liberty-position-name$=top-banner],
    [data-liberty-position-name^=vip][data-liberty-position-name$=billboard]
    {
        background-color: var(--mat-dark-background) !important;
        min-height: 50px !important;
    }

    #site-mainnav-postad-link {
        filter: brightness(1.5);
    }

    #site-mainnav-my-link {
        filter: brightness(1.5);
    }

    .icon-magnifier-white {
        filter: brightness(0.8);
    }

    .icon {
        filter: brightness(3);
    }

    .galleryimage-large,
    .buyer-protection-info {
        border-radius: 10px !important;
    }

    /* Own classes */
    .mat-deleted-div,
    .mat-reserved-div {
        width: calc(100%-5px); /* 100% minus margin */
        border: 2px solid white;
        border-radius: 10px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 5px;
        back
    }

    .mat-deleted-div {
        border-color: red;
        color: red;
        background-color: #FF00000F;
    }

    .mat-reserved-div {
        border-color: yellow;
        color: yellow;
        background-color: #FFFF000F;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:focus {
        /* This lets us override auto fill color in the next step - Thanks StackOverflow user kostiantyn-ko! */
        transition: background-color 0s 600000s, color 0s 600000s !important;
    }

    input:-internal-autofill-selected {
        color: var(--mat-light-foreground) !important;
    }
    `;

    // Add styles
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    var productElement = document.getElementById('viewad-product');

    if (productElement) {
        log('Found product article');
    }

    // Create a new div element used for "deleted" and "reserved" indication
    var deletedOrReservedDiv = document.createElement('div');
    deletedOrReservedDiv.id = 'mat-ad-deleted-or-reserved-div';
    deletedOrReservedDiv.textContent = 'Gelöscht / Reserviert';
    deletedOrReservedDiv.className = 'is-hidden'; // Hide by default. This uses the website's class

    // Insert the new div as the first child of the productElement
    if (productElement.firstChild) {
        productElement.insertBefore(deletedOrReservedDiv, productElement.firstChild);
    } else {
        productElement.appendChild(deletedOrReservedDiv);
    }

    function applyReservedAndDeletedStyles() {
       // Hide "deleted" veil
        const element = document.querySelector('.imagebox-veil');

        if (element) {
            element.classList.add('is-hidden');
        }

        // Set color of reserved and deleted ad
        const titleElement = document.getElementById('viewad-title');

        if (!titleElement) {
            return;
        }
        log('Found title of ad');

        const spans = titleElement.getElementsByTagName('span');

        if (!spans.length) {
            return;
        }

        log(`Found ${spans.length} spans in title (expected: 2+)`);

        // Iterate over each span and apply styles based on content
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].innerHTML.includes('Reserviert')) {
                // Apply yellow bold font for "Reserviert"
                log('Found span for "reserved", applying styles...');
                spans[i].style.color = 'yellow';
                spans[i].style.fontWeight = 'bold';

                if (!spans[i].classList.contains('is-hidden')) {
                    // Ad is reserved
                    deletedOrReservedDiv.innerHTML = 'Reserviert';
                    deletedOrReservedDiv.className = 'mat-reserved-div';
                }
            } else if (spans[i].innerHTML.includes('Gelöscht')) {
                // Apply red bold font for "Gelöscht"
                log('Found span for "deleted", applying styles...');
                spans[i].style.color = 'red';
                spans[i].style.fontWeight = 'bold';

                if (!spans[i].classList.contains('is-hidden')) {
                    // Ad is deleted
                    deletedOrReservedDiv.innerHTML = 'Gelöscht';
                    deletedOrReservedDiv.className = 'mat-deleted-div';
                }
            }

        }

        clearInterval(intervalId);
    }

    var intervalId = setInterval(applyReservedAndDeletedStyles, 250); // Checks every 100 milliseconds
})();