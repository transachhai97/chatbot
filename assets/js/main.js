function resetPage() {
    window.location.hash = '';
    localStorage.clear();
    location.reload();
}

$(document).ready(function () {
    console.log("------>bidv: convertBotList: ", convertBotList);
    convertBotList.forEach(renderBotList);
    renderRecent();

    if (window.location.hash) {
        let arrHash = window.location.hash.substring(1).split("-");
        let indexKey = convertBotList.findIndex((item) => item.type == arrHash[0] && item.botId == arrHash[1]);
        if (indexKey != -1) {
            setTimeout(() => {
                clickBotItem(indexKey);
            }, 500);
        } else {
            window.location.hash = '';
        }
    } else {
        localStorage.removeItem(keyCurrent);
    }
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

    $('#chat-sidebar').toggleClass('d-none d-sm-block');

    $('#chat-content').hide();
    $('.chat-item').removeClass('active');

    $('#chat-recent--item-' + index).tooltip('hide');

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

    renderRecent();

    window.location.hash = '#' + item.type + '-' + item.botId;
}

function renderRecent() {
    let elmHtml = '';
    let arrRecent = JSON.parse(localStorage.getItem(keyRecent)) || [];
    console.log("------>bidv: arrRecent: ", arrRecent);
    arrRecent = arrRecent.slice(0, recentLength);

    convertBotList.forEach((item, index) => {
        console.log(item, index);
        let classText = '';

        if (arrRecent.includes(index.toString())) {
            if (localStorage.getItem(keyCurrent) == index) {
                classText = 'active';
            }
            elmHtml += '<img id="chat-recent--item-' + index + '" class="p-1 m-1 rounded rounded-circle chat-recent--item ' + classText +
                '"title="' + item.botName +
                '"data-toggle="tooltip" data-placement="top" src="' + item.logo + '" onclick="clickBotItem(`' + index + '`)" ' +
                'onmousemove="hoverItem(`' + index + '`)"/>';
        }
    });

    if (!elmHtml) {
        elmHtml = '<p class="flex-fill my-1 text-truncate text-center text-info">Không có dữ liệu</p>';
    }

    $('#chat-recent').html(elmHtml);
}


function hoverItem(index) {
    $('#chat-recent--item-' + index).tooltip('show');
}

function closeChat() {
    $('#chat-sidebar').toggleClass('d-none d-sm-block');
    $('#chat-content').hide(500);
    $('.chat-item').removeClass('active');
    $('.chat-recent--item').removeClass('active');

    window.location.hash = '';
}