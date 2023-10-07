$(function () {
    detectIncognito().then((result) => {
        console.log("------>bidv: browser: ", result.browserName, result.isPrivate);
        if (result.isPrivate) {
            $('#chat-alert').show();
        } else {
            $('#chat-alert').hide();
        }
    });
})