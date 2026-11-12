/**
 * Adsterra ad slots.
 * Place <div class="ad-slot" data-ad="TYPE"></div> in a page, where TYPE is:
 *   leaderboard - 728x90 on wide screens, 320x50 on phones
 *   rectangle   - 300x250
 *   native      - Native Banner (use at most once per page)
 * Each banner is rendered inside its own iframe so the global `atOptions`
 * used by Adsterra's code does not clash between several banners on a page.
 */
(function () {
    'use strict';

    var HOST = 'https://bellnewyork.org';
    var BANNERS = {
        lb:   { key: '045166cbc8ddf41ff7be928f4ed6124a', w: 728, h: 90 },
        mb:   { key: '4b2ed24012c928c417719cd2fcaa6aeb', w: 320, h: 50 },
        rect: { key: '0e1023a1be9431ef400f3995451bf2af', w: 300, h: 250 }
    };
    var NATIVE_KEY = '5930c52f1b44f8e9dc1086112d3e8609';

    function renderBanner(slot, b) {
        var frame = document.createElement('iframe');
        frame.width = b.w;
        frame.height = b.h;
        frame.title = 'Advertisement';
        frame.setAttribute('scrolling', 'no');
        frame.setAttribute('frameborder', '0');
        frame.style.border = '0';
        frame.style.maxWidth = '100%';
        slot.appendChild(frame);

        var doc = frame.contentWindow.document;
        doc.open();
        doc.write(
            '<!DOCTYPE html><html><head><base target="_blank"></head><body style="margin:0">' +
            '<script>atOptions={"key":"' + b.key + '","format":"iframe","height":' + b.h +
            ',"width":' + b.w + ',"params":{}};<\/script>' +
            '<script src="' + HOST + '/22/' + b.key + '"><\/script>' +
            '</body></html>'
        );
        doc.close();
    }

    function renderNative(slot) {
        var box = document.createElement('div');
        box.id = 'container-' + NATIVE_KEY;
        slot.appendChild(box);

        var s = document.createElement('script');
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
        s.src = HOST + '/21/' + NATIVE_KEY;
        slot.appendChild(s);
    }

    function init() {
        var nativeDone = false;
        var slots = document.querySelectorAll('.ad-slot[data-ad]');

        for (var i = 0; i < slots.length; i++) {
            var slot = slots[i];
            var type = slot.getAttribute('data-ad');

            if (type === 'leaderboard') {
                var wide = (slot.clientWidth || window.innerWidth) >= 748;
                renderBanner(slot, wide ? BANNERS.lb : BANNERS.mb);
            } else if (type === 'rectangle') {
                renderBanner(slot, BANNERS.rect);
            } else if (type === 'native' && !nativeDone) {
                renderNative(slot);
                nativeDone = true;
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
