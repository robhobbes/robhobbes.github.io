/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-pencil' : '&#xe00a;',
			'icon-facebook' : '&#xe00c;',
			'icon-facebook-2' : '&#xe00d;',
			'icon-feed' : '&#xe00e;',
			'icon-feed-2' : '&#xe00f;',
			'icon-twitter' : '&#xe010;',
			'icon-twitter-2' : '&#xe011;',
			'icon-github' : '&#xe012;',
			'icon-github-2' : '&#xe014;',
			'icon-stackoverflow' : '&#xe017;',
			'icon-skype' : '&#xe018;',
			'icon-linkedin' : '&#xe019;',
			'icon-reddit' : '&#xe01a;',
			'icon-pinterest' : '&#xe01b;',
			'icon-mail' : '&#xe001;',
			'icon-paperplane' : '&#xe002;',
			'icon-layout' : '&#xe000;',
			'icon-arrow-left' : '&#xe003;',
			'icon-arrow-down' : '&#xe004;',
			'icon-arrow-up' : '&#xe005;',
			'icon-arrow-right' : '&#xe006;',
			'icon-arrow-left-2' : '&#xe007;',
			'icon-arrow-down-2' : '&#xe008;',
			'icon-arrow-up-2' : '&#xe009;',
			'icon-arrow-right-2' : '&#xe01c;',
			'icon-arrow-left-3' : '&#xe01d;',
			'icon-arrow-down-3' : '&#xe01e;',
			'icon-arrow-up-3' : '&#xe01f;',
			'icon-arrow-right-3' : '&#xe020;',
			'icon-tags' : '&#xe00b;',
			'icon-tag' : '&#xe021;',
			'icon-blogger' : '&#xe022;',
			'icon-blogger-2' : '&#xe023;',
			'icon-star' : '&#xe025;',
			'icon-star-2' : '&#xe026;',
			'icon-star-3' : '&#xe027;',
			'icon-heart' : '&#xe028;',
			'icon-heart-2' : '&#xe029;',
			'icon-close' : '&#xe02a;',
			'icon-cancel-circle' : '&#xe02b;',
			'icon-blocked' : '&#xe02c;',
			'icon-notification' : '&#xe02d;',
			'icon-question' : '&#xe02e;',
			'icon-info' : '&#xe02f;',
			'icon-warning' : '&#xe030;',
			'icon-checkmark-circle' : '&#xe031;',
			'icon-info-2' : '&#xe032;',
			'icon-spam' : '&#xe033;',
			'icon-checkmark' : '&#xe034;',
			'icon-checkmark-2' : '&#xe035;',
			'icon-minus' : '&#xe036;',
			'icon-plus' : '&#xe037;',
			'icon-bubbles' : '&#xe038;',
			'icon-bubbles-2' : '&#xe039;',
			'icon-bubble' : '&#xe03a;',
			'icon-bubble-2' : '&#xe03b;',
			'icon-bubbles-3' : '&#xe03c;',
			'icon-bubbles-4' : '&#xe03d;',
			'icon-user' : '&#xe03e;',
			'icon-users' : '&#xe03f;',
			'icon-user-2' : '&#xe040;',
			'icon-users-2' : '&#xe041;',
			'icon-user-3' : '&#xe042;',
			'icon-undo' : '&#xe043;',
			'icon-redo' : '&#xe044;',
			'icon-envelop' : '&#xe045;',
			'icon-phone' : '&#xe046;',
			'icon-phone-hang-up' : '&#xe047;',
			'icon-home' : '&#xe048;',
			'icon-home-2' : '&#xe049;',
			'icon-remove' : '&#xe04a;',
			'icon-remove-2' : '&#xe04b;',
			'icon-lock' : '&#xe04c;',
			'icon-lock-2' : '&#xe04d;',
			'icon-key' : '&#xe04e;',
			'icon-unlocked' : '&#xe04f;',
			'icon-cog' : '&#xe050;',
			'icon-fire' : '&#xe051;',
			'icon-menu' : '&#xe024;',
			'icon-github-3' : '&#xe016;',
			'icon-cloud-download' : '&#xf0ed;',
			'icon-cloud-upload' : '&#xf0ee;',
			'icon-linkedin-2' : '&#xe013;',
			'icon-pinterest-2' : '&#xe015;',
			'icon-list' : '&#xe052;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};