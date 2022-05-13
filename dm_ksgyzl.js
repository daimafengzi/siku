if ($.isNode()) {
  if (process.env.ksjsbCookie && process.env.ksjsbCookie.indexOf('\n') > -1) {
      ksjsbCookies = process.env.ksjsbCookie.split('\n');
  } else {
      ksjsbCookies = process.env.ksjsbCookie.split()
  };
  Object.keys(ksjsbCookies).forEach((item) => {
        if (ksjsbCookies[item]) {
          cookieArr.push(ksjsbCookies[item])
        }
      })
} else {
   cookieArr.push($.getdata('cookie_ks'));
   $.getjson('cookies_ks', []).forEach(cookie => cookieArr.push(cookie));
}
