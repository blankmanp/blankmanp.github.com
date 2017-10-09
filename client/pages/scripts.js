window.onhashchange = function(e) {
    let { hash, origin, pathname } = location;
    let jsSrc = '';
    if (hash) {
        jsSrc = `./pages/${hash.substr(1)}/index.js`;
        document.querySelector('script#page').setAttribute('src', jsSrc);
    }
} // 最粗略的按需加载