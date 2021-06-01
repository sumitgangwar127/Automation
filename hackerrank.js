let pup = require("puppeteer");

let gpage;
let gBrowser;
let email = "yewey24093@flmcat.com";
let password = "rahul@00000";

pup
    .launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo: 50,

    })
    .then(function (browser) {
        gBrowser = browser
        return browser.pages();
    })

    .then(function (pagesArr) {
        gpage = pagesArr[0];

        return gpage.goto("https://www.hackerrank.com/auth/login");
    })
    .then(function () {
        return gpage.type("#input-1", email);
    })
    .then(function () {
        return gpage.type("#input-2", password);
    })
    .then(function () {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click("[data-analytics='LoginPassword']"),
        ]);
    })
    .then(function () {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click("[data-attr1='interview-preparation-kit']"),
        ]);
    })
    .then(function () {
        return gpage.waitForSelector("[data-attr1='warmup']");
    })
    .then(function () {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click("[data-attr1='warmup']"),
        ]);
    })
    .then(function () {
        return gpage.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
    })
    .then(function () {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled"),
        ]);
    })
    .then(function () {
        return gpage.waitForSelector("[data-attr2='Editorial']");
    })
    .then(function () {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click("[data-attr2='Editorial']"),
        ]);
    })
    .then(function () {
        return handleLockBtn(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
    })
    .then(function () {
        return gpage.evaluate(function () {
            let allCodes = document.querySelectorAll(".challenge-editorial-block.editorial-setter-code .highlight");
            let allLanguages = document.querySelectorAll(".challenge-editorial-block.editorial-setter-code h3");

            let obj = {};
            obj.code = allCodes[0].innerText;
            obj.language = allLanguages[0].innerText;
            return obj;
        })
    })
    .then(function(obj){
        codeObj = obj;
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click("[data-attr2='Problem']")
        ])
    })
    .then(function(){
        return gpage.click("#tab-1-item-0")
    })
    .then(function () {
        return gpage.waitForSelector(".css-1hwfws3");
    })
    .then(function(){
        return gpage.click(".css-1hwfws3")
    })
    .then(function(){
        return gpage.type(".css-1hwfws3",codeObj.language)
    })
    .then(function(){
        return gpage.keyboard.press("Enter");
    })
    .then(function(){
        return gpage.click(".checkbox-input");
    })
    .then(function () {
        return gpage.waitForSelector("#input-1");
    })
    .then(function () {
        return gpage.type("#input-1",codeObj.code);
    })
    .then(function(){
        return gpage.keyboard.down("Control");
    })
    .then(function(){
        return gpage.keyboard.press("KeyA");
    })
    .then(function(){
        return gpage.keyboard.press("KeyX");
    })
    .then(function(){
        return gpage.keyboard.up("Control");
    })
    .then(function(){
        return gpage.click(".monaco-editor.no-user-select.vs");
    })
    .then(function(){
        return gpage.keyboard.down("Control");
    })
    .then(function(){
        return gpage.keyboard.press("KeyA");
    })
    .then(function(){
        return gpage.keyboard.press("KeyV");
    })
    .then(function(){
        return gpage.keyboard.up("Control");
    })
    .then(function(){
        return gpage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
    })



    
    .catch(function (err) {
        console.log(err);
    });





function handleLockBtn(selector) {
    return new Promise(function (resolve, reject) {
        gpage
            .waitForSelector(selector)
            .then(function () {
                return gpage.click(selector);
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                resolve();
            })
    })
}