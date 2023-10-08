function resetPage() {
    localStorage.clear();
    location.reload();
}

$(document).ready(function () {
    console.log("------>bidv: convertBotList: ", convertBotList);
    convertBotList.forEach(renderBotList);
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    detectIncognito().then((result) => {
        console.log("------>bidv: browser: ", result.browserName, result.isPrivate);
        if (result.isPrivate) {
            $('#chat-alert').show();
        } else {
            $('#chat-alert').hide();
        }
    });
})

function renderBotList(item, index) {
    console.log("------>bidv: item: ", index, item);

    let elmHtml =
        '<div class="d-flex flex-column p-2 chat-item" data-toggle="tooltip" data-placement="top" title="' + item.botName + '" id="bot-' + index + '" onclick="clickBotItem(`' + index + '`)">' +
        '   <div class="py-2 d-flex align-items-center">' +
        '       <img class="me-2 rounded rounded-circle chat-item--logo" src="' + item.logo + '">' +
        '       <h6 class="flex-fill my-2 text-truncate">' + item.botName + '</h6>' +
        '   </div>' +
        '</div>';

    $('#chat-list').append(elmHtml);
}

function clickBotItem(index) {
    let item = convertBotList[index];

    $('#chat-content').hide();
    $('.chat-item').removeClass('active');

    $('#bot-' + index).addClass('active');

    let url = '';
    switch (item.type) {
        case 'private':
            url = 'https://bidv-livechat.fpt.ai/v36/src/index.html?botcode=' + item.botId;
            break;

        case 'public':
            url = 'https://livechat.fpt.ai/v36/src/index.html?botcode=' + item.botId + '&' + new URLSearchParams(jsonConfig).toString();
            break;

        default:
            alert('Lỗi môi trường');
            return;
    }

    $('#chat-name').text(item.botName);
    $('#chat-icon').attr('src', item.logo);
    $('#chat-box').attr('src', url);

    console.log("------>bidv: urlIframe: ", url);

    $('#chat-content').show(500);

    let arrRecent = JSON.parse(localStorage.getItem(keyRecent)) || [];

    arrRecent.unshift(index);

    arrRecent = [...new Set(arrRecent)];

    localStorage.setItem(keyCurrent, index);

    localStorage.setItem(keyRecent, JSON.stringify(arrRecent.slice(0, recentLength)));
}