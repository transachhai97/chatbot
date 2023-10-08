// Số lượng bot hiển thị gần đây
const recentLength = 2;

const keyRecent = 'arrRecent';
const keyCurrent = 'currentId';

// Danh sách bot
const botList = [
    {
        type: 'private',
        botId: '8658788cd6ffa8a7c4f0065298388f52',
        botName: '[TTT] BOT NỘI BỘ BIDV',
        logo: '',
    },
    {
        type: 'private',
        botId: '8883508d6f0b9256e6c347f49e7728f9',
        botName: '[UAT] BIDV',
        logo: '',
    },
    {
        type: 'public',
        botId: '8f7e0d766ab7df1188a36e71bdcc9faf',
        botName: '[UAT-C] BIDV -ver2',
        logo: '',
    },
];

const styleConfig = {
    // header
    headerBackground: 'linear-gradient(86.7deg, #006B68FF 0.85%, #005452FF 98.94%)',
    headerTextColor: '#ffffffff',
    headerLogoEnable: true,
    headerLogoLink: 'https://chatbot-tools.fpt.ai/livechat-builder/img/theme/bank/logo.svg',
    headerText: 'Live support',
    // main
    primaryColor: '#005452FF',
    secondaryColor: '#D8D8D8FF',
    primaryTextColor: '#ffffffff',
    secondaryTextColor: '#1F1F1FFF',
    buttonColor: '#FFC62FFF',
    buttonTextColor: '#ffffffff',
    bodyBackgroundEnable: true,
    bodyBackgroundLink: 'https://chatbot-tools.fpt.ai/livechat-builder/img/theme/bank/body.png',
    avatarBot: 'https://bidv-livechat.fpt.ai/v36/src/imgBIDV/logo-bidv-full.png',
    sendMessagePlaceholder: 'Enter your message here',
    // float button
    floatButtonLogo: 'https://chatbot-tools.fpt.ai/livechat-builder/img/theme/bank/coin.svg',
    floatButtonTooltip: 'Can I help you?',
    floatButtonTooltipEnable: false,
    // start screen
    customerLogo: 'https://bidv-livechat.fpt.ai/v36/src/imgBIDV/logo-bidv-full.png',
    customerWelcomeText: 'Nhập email của bạn (vd: xxx@bidv.com.vn)',
    customerButtonText: 'Bắt đầu',
    prefixEnable: false,
    prefixType: 'radio',
    prefixOptions: ["Anh", "Chị"],
    prefixPlaceholder: 'Danh xưng',
    // custom css
    css: ''
};

const jsonConfig = {
    "styles": JSON.stringify(styleConfig),
};

const botListLength = botList.length;
const convertBotList = [];

for (let i = 0; i < botListLength; i++) {
    let item = botList[i];
    let newItem = {...item};
    if (!item?.logo) {
        newItem.logo = './assets/images/icon.png';
    }
    convertBotList.push(newItem);
}