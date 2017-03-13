let config = {};

config.applicationOptions = {
    appTitle: "",
    appDescription: "",
    appKeys: ""
};

config.path = {
    applicationUrl: "http://localhost:3000",
    applicationPath: __dirname,
    webStorage: '/thief-box/',
    zipStorage: '/compressed/',
    downloadPath: '/download/'
};

config.emailTemplates = {
    downloadMsg: {
        subject: "Воришка успешно завершил задачу!",
        message: "Воришка завершил поставленную задачу. Цель загрузка |-target_url-| была успешно завершена." +
                  "Скачать результат вы можете по ссылке: |-result_url-|"
    }
};


module.exports = config;