// ==UserScript==
// @name         依然范特西granbluefantasy
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  4m
// @author       Afurete
// @match        https://game.granbluefantasy.jp/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=granbluefantasy.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    var Rescue = localStorage.getItem('Rescue') != null ? localStorage.getItem('Rescue') : 1;

    var supporters = [];
    var prt_list_data = [];

    var stop = localStorage.getItem('stop') != null ? localStorage.getItem('stop') : 0;


    var multi_jump = localStorage.getItem('multi_jump') != null ? localStorage.getItem('multi_jump') : 0;

    var auto_select = localStorage.getItem('auto_select') != null ? localStorage.getItem('auto_select') : 0;

    var ul_main = document.createElement("ul");


    var auto_multi_attack = localStorage.getItem('jy_name') != null ? localStorage.getItem('jy_name') != '' ? 1 : 0 : 0;


    console.info(stop);

    var li_Rescue = document.createElement("li");
    li_Rescue.style.margin = "10px";
    var Rescue_button = document.createElement("button");
    Rescue_button.innerHTML = Rescue == 1 ? "救援依頼on" : "救援依頼off";
    Rescue_button.onclick = function() {
        if (Rescue == 1) {
            Rescue = 0;
        } else {
            Rescue = 1;
        }
        localStorage.setItem('Rescue', Rescue);
        Rescue_button.innerHTML = Rescue == 1 ? "救援依頼on" : "救援依頼off";
        console.info("救援依頼" + localStorage.getItem('Rescue'));
    };

    li_Rescue.appendChild(Rescue_button);
    var li_1 = document.createElement("li");
    var stop_button = document.createElement("button");
    stop_button.innerHTML = stop == 1 ? "Stop" : "Start";
    stop_button.style.height = "60px";
    stop_button.style.width = "100%";
    stop_button.onclick = function() {
        if (stop == 1) {
            stop = 0;
        } else {
            stop = 1;
        }
        var urldata = location.href.replace('https://game.granbluefantasy.jp/', '').split('/')[0];
        if (urldata == '#raid_multi' || urldata == '#raid') {

            localStorage.setItem('stop' + urldata, stop);
            stop_button.innerHTML = stop == 1 ? "Stop\n" + (urldata == '#raid_multi' ? 'multi' : 'raid') : "Start\n" + (urldata == '#raid_multi' ? 'multi' : 'raid');
        } else {
            localStorage.setItem('stop', stop);
            stop_button.innerHTML = localStorage.getItem('stop') == 1 ? "Stop" : "Start";
        }
    };


    //#raid_multi
    var urldata = location.href.replace('https://game.granbluefantasy.jp/', '').split('/')[0];
    if (urldata == '#raid_multi' || urldata == '#raid') {
        // const bt = urldata.replace('#raid', '').replace('_', '');
        stop = localStorage.getItem('stop' + urldata) != null ? localStorage.getItem('stop' + urldata) : 1;
        stop_button.innerHTML = stop == 1 ? "Stop" : "Start";
    }


    li_1.appendChild(stop_button);
    li_1.style.margin = "10px";

    var li_2 = document.createElement("li");
    var select_box = document.createElement("select");
    select_box.id = "select_box";
    select_box.style.width = "100%";

    select_box.onchange = function() {
        console.info(select_box.selectedOptions[0].value);
        localStorage.setItem("buffer", select_box.selectedOptions[0].value);
    }

    var li_3 = document.createElement("li");
    li_3.style.marginTop = "10px";

    var select_attack = document.createElement("select");
    select_attack.id = "select_attack";
    select_attack.style.width = "100%";

    select_attack.onchange = function() {
        console.info(select_attack.selectedOptions[0].value);
        const header = document.getElementById('prt-head-current').innerHTML;
        localStorage.setItem(header, select_attack.selectedOptions[0].value);
    }

    var auto_multi_jump_button = document.createElement("button");
    auto_multi_jump_button.innerHTML = multi_jump == 1 ? "multi\nJump\non" : "multi\nJump\noff";
    auto_multi_jump_button.style.width = "100%";
    auto_multi_jump_button.onclick = function() {
        if (multi_jump == 1) {
            multi_jump = 0;
        } else {
            multi_jump = 1;
        }
        localStorage.setItem('multi_jump', multi_jump);
        auto_multi_jump_button.innerHTML = multi_jump == 1 ? "multi\nJump\non" : "multi\nJump\noff";
    }


    var auto_select_button = document.createElement("button");
    auto_select_button.innerHTML = auto_select == 1 ? "Auto\nJump\non" : "Auto\nJump\noff";
    // auto_select_button.style.margin = "10px";
    auto_select_button.style.width = "100%";
    auto_select_button.onclick = function() {
        if (auto_select == 1) {
            auto_select = 0;
        } else {
            auto_select = 1;
        }
        localStorage.setItem('auto_select', auto_select);
        auto_select_button.innerHTML = auto_select == 1 ? "Auto\nJump\non" : "Auto\nJump\noff";
        console.info("auto_select:" + localStorage.getItem('auto_select'));
    }

    var child_mode_button = document.createElement("button");
    child_mode_button.style.width = "100%";
    child_mode_button.style.display = 'none';
    // child_mode_button.innerHTML = "当前页\n不可用";
    child_mode_button.onclick = function() {
        var header = document.getElementById('prt-head-current');
        if (header != null)
            if (localStorage.getItem(header.innerHTML) != null) {
                if (localStorage.getItem(header.innerHTML) == 1) {
                    localStorage.setItem(header.innerHTML, 0);
                } else {
                    localStorage.setItem(header.innerHTML, 1);
                }
            } else {
                localStorage.setItem(header.innerHTML, 1);
            }
        child_mode_button.innerHTML = localStorage.getItem(header.innerHTML) == 1 ? "当前页on" : "当前页off";
    }



    var auto_select_ed = document.createElement("input");
    auto_select_ed.id = "auto_select_ed";
    auto_select_ed.type = "text";
    auto_select_ed.value = localStorage.getItem('auto_jump');
    auto_select_ed.style.width = "56px";
    auto_select_ed.onchange = function(el) {
        // try {
        //     const header = document.getElementById('prt-head-current').innerHTML;
        //     const header_s = localStorage.getItem(header);
        //     if (header_s != null) {
        //         localStorage.setItem(header_s, el.target.value.replace(/\s*/g, ""));
        //     }
        // } catch (error) {
        //     el.target.value = 0;
        // }
        localStorage.setItem('auto_jump', el.target.value);
    }


    var gxpt = localStorage.getItem('pt') != null ? localStorage.getItem('pt') : 0;

    var li_gx = document.createElement('li');
    var gx = document.createElement('h5');
    gx.style.color = "#fff"
    var gxpt_ed = document.createElement("input");
    gxpt_ed.type = "number";
    gxpt_ed.style.width = "56px";
    gxpt_ed.value = gxpt;
    gx.style.margin = "0px";
    gx.innerHTML = "贡献设置";
    li_gx.appendChild(gx);
    li_gx.appendChild(gxpt_ed);


    gxpt_ed.onchange = function(el) {

        try {
            var num = el.target.value;
            if (num >= 0) {
                localStorage.setItem('pt', num);
                gxpt = el.target.value;
            } else {
                gxpt_ed.value = 0;
            }

        } catch (error) {
            gxpt_ed.value = 0;
        }

    }

    var jy_name = localStorage.getItem('jy_name') != null ? localStorage.getItem('jy_name') : '';
    var li_jy = document.createElement('li');
    var jy = document.createElement('h5');
    jy.style.color = "#fff"
    var yj_ed = document.createElement("input");
    yj_ed.type = "text";
    yj_ed.style.width = "56px";
    yj_ed.value = jy_name;
    jy.style.margin = "0px";
    jy.innerHTML = "爆本设置";

    var auto_multi_attack_bt = localStorage.getItem('auto_attack_') != null ? localStorage.getItem('auto_attack_') : 0;

    var baobeng_button = document.createElement("button");
    baobeng_button.style.width = "100%";
    baobeng_button.innerHTML = auto_multi_attack_bt == 0 ? "开爆" : "停止";
    baobeng_button.onclick = function() {

        if (auto_multi_attack_bt == 1) {
            auto_multi_attack_bt = 0;
        } else {
            auto_multi_attack_bt = 1;
        }

        localStorage.setItem('auto_attack_', auto_multi_attack_bt);

        baobeng_button.innerHTML = localStorage.getItem('auto_attack_') == 1 ? "停止" : "开爆";
    }


    li_jy.appendChild(jy);
    li_jy.appendChild(baobeng_button);
    li_jy.appendChild(yj_ed);


    yj_ed.onchange = function(el) {
        if (el.target.value.replace(' ', '') != '') {
            auto_multi_attack = 1;
            localStorage.setItem('jy_name', el.target.value);
        } else {
            localStorage.setItem('jy_name', '');
            auto_multi_attack = 0;
        }
    }

    li_3.appendChild(li_jy);
    li_3.appendChild(li_gx);
    li_3.appendChild(auto_multi_jump_button);
    li_3.appendChild(auto_select_button);
    li_3.appendChild(child_mode_button);
    li_3.appendChild(select_attack);
    li_3.appendChild(auto_select_ed);
    li_2.appendChild(select_box);


    ul_main.appendChild(li_1);
    ul_main.appendChild(li_Rescue);
    ul_main.appendChild(li_2);
    ul_main.appendChild(li_3);

    var ui_start_time = setInterval(() => {

        var ul_ui = document.getElementsByTagName('ul')[0];
        if (ul_ui != null) {
            // ul_ui.remove();
            document.getElementsByTagName('nav')[0].prepend(ul_main);
            clearInterval(ui_start_time);
        }


        // var L_ui = document.getElementById('cnt-submenu-navi-vertical');
        // if (L_ui != null) {
        //     document.getElementsByTagName('nav')[0].prepend(ul_main);
        //     clearInterval(ui_start_time);
        // }

    }, 100);

    var temp_button = 1;


    var tanse = function() {

    }




    var auto_select_attack_timer = setInterval(() => {
        var header = document.getElementById('prt-head-current');
        var title = document.getElementsByClassName('prt-popup-header')[0];
        if (header != null) {
            if (header.innerHTML != '') {
                if (auto_select == 1) {
                    if (localStorage.getItem("auto_jump") != '') {
                        if (header.innerHTML == "エクストラクエスト" || header.innerHTML == "クエストリスト") {
                            if (title != null) {
                                if (title.innerHTML != "クエスト再開") {
                                    location.href = localStorage.getItem("auto_jump");
                                }
                            } else {
                                location.href = localStorage.getItem("auto_jump");
                            }
                            if (localStorage.getItem(header.innerHTML) == 0)
                                clearInterval(auto_select_attack_timer);
                        }
                        if (localStorage.getItem(header.innerHTML) == 1 && localStorage.getItem(header.innerHTML) != location.href) {
                            location.href = localStorage.getItem("auto_jump");
                            clearInterval(auto_select_attack_timer);
                        }
                    }
                }
                if (temp_button == 1) {
                    temp_button = 0;
                    child_mode_button.style.display = '';
                    if (localStorage.getItem(header.innerHTML) != null) {
                        child_mode_button.innerHTML = localStorage.getItem(header.innerHTML) == 1 ? "当前页on" : "当前页off";
                    } else {
                        child_mode_button.innerHTML = "当前页off";
                    }
                }
            }
        }
    }, 300);


    var button_stop = setInterval(() => {
        var urldata = location.href.replace('https://game.granbluefantasy.jp/', '').split('/')[0];
        if (urldata == '#raid_multi' || urldata == '#raid') {
            const bt = urldata.replace('#raid', '').replace('_', '');
            stop = localStorage.getItem('stop' + urldata) != null ? localStorage.getItem('stop' + urldata) : 1;
            stop_button.innerHTML = stop == 1 ? "Stop\n" + (urldata == '#raid_multi' ? 'multi' : 'raid') : "Start\n" + (urldata == '#raid_multi' ? 'multi' : 'raid');
        } else {
            stop = localStorage.getItem('stop') != null ? localStorage.getItem('stop') : 0;
            stop_button.innerHTML = localStorage.getItem('stop') == 1 ? "Stop" : "Start";
        }
    }, 300);



    var multi_attack_select = setInterval(() => {
        var title_ = document.getElementById('prt-head-current');

        //爆救援
        if (title_ != null) {
            if (title_.innerHTML == "救援依頼一覧") {
                if (auto_multi_attack == 1 && auto_multi_attack_bt == 1) {
                    // $("#tab-search").trigger("tap");
                    var multi_list = document.getElementsByClassName('prt-button-cover');
                    for (let index = 0; index < multi_list.length; index++) {
                        var data = multi_list[index].parentElement;
                        if (data.getAttribute("data-raid-type") == 1) {
                            if (data.getAttribute("data-chapter-name") == localStorage.getItem("jy_name")) {
                                multi_list[index].id = "attack_this";
                                $("#attack_this").trigger("tap");
                                clearInterval(multi_attack_select);
                                break;
                            }
                        }
                    }

                    if (document.getElementsByClassName('btn-search-refresh disable').length == 0)
                        $(".btn-search-refresh").trigger("tap");
                }


            }
            //转世
            if (title_.innerHTML.split('・')[0] == "エリア") {
                if (auto_multi_attack == 1 && auto_multi_attack_bt == 1)
                    if (document.getElementsByClassName('btn-stage-chest').length > 0) {
                        $(".btn-stage-chest").trigger("tap");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                        clearInterval(multi_attack_select);
                    } else {
                        var lists = document.getElementsByClassName('prt-quest-list');
                        for (let index = 0; index < lists.length; index++) {
                            if (lists[index].getAttribute("data-chapter-name") == "ミミック" || lists[index].getAttribute("data-chapter-name") == localStorage.getItem("jy_name")) {
                                lists[index].id = "attack_this";
                                $("#attack_this").trigger("tap");
                                clearInterval(multi_attack_select);
                                break;
                            }
                        }
                    }

            }

        }



    }, 1000);


    var full = false;

    var longtime_loading = 0;

    var loadinglock = false;
    var attack_timer = setInterval(() => {

        loadinglock = false;

        if (document.getElementById('loading') != null)
            if (document.getElementById('loading').style.display == "none" && document.getElementById('ready').style.display == "none") {
                loadinglock = true;
                longtime_loading = 0;
            } else {
                longtime_loading++;
            }


        if (longtime_loading > 50) {
            setTimeout(() => {
                location.reload();
            }, 300);
            console.info('超时5s');
            clearTimeout(attack_timer);
        }


        if (stop == 1 && loadinglock) {

            var title_ = document.getElementById('prt-head-current');

            if (title_ != null) {
                if (title_.innerHTML == "未確認バトル") {
                    if (document.getElementsByClassName('prt-button-cover').length > 0)
                        $(".prt-button-cover").trigger("tap")[0];
                }
                //共斗
                if (title_.innerHTML == "ルーム") {
                    if (document.getElementsByClassName('btn-quest-start').length > 0)
                        $(".btn-quest-start").trigger("tap")[0]

                }


            }







            var prt_supporter_title = document.getElementsByClassName('prt-supporter-title');
            if (prt_supporter_title.length > 0) {

                var buffer_ = "スキル「闇」「憎悪」「奈落」の効果が150%UP";
                if (localStorage.getItem('buffer') != null) {
                    buffer_ = localStorage.getItem('buffer');
                }

                var isbuff = 0;
                var skill_buffer = document.getElementsByClassName('btn-supporter lis-supporter');
                for (let index = 0; index < skill_buffer.length; index++) {
                    if (skill_buffer[index].children[1].children[1].children[2] != null) {
                        if (skill_buffer[index].children[1].children[1].children[2].innerText == buffer_) {
                            isbuff = 1;
                            tap_2('btn-supporter lis-supporter', index);
                            setTimeout(() => {
                                if (title_ != null)
                                    if (title_.innerHTML == '敵の弱点属性について') {
                                        tap_2("btn-usual-ok", 0);
                                    }
                                tap_('btn-usual-ok se-quest-start');

                            }, 300);
                            break;
                        }
                    }
                }
                if (isbuff == 0) {
                    tap_2('btn-supporter lis-supporter', 0);
                    setTimeout(() => {
                        tap_('btn-usual-ok se-quest-start');
                    }, 300);
                }
            }

            //神滅戦


            if (document.getElementsByClassName('btn-boss-quest').length > 0) {
                tap_("btn-boss-quest");
            }


            //转世开箱



            var header = document.getElementsByClassName('prt-popup-header')[document.getElementsByClassName('prt-popup-header').length - 1];
            if (header != null) {
                console.info(header.innerHTML);
                if (header.innerHTML == "獲得経験値" || header.innerHTML == "エラー" || header.innerHTML == "アイテム入手" || header.innerHTML == "ルリアノート" ||
                    header.innerHTML == "クエスト再開" || header.innerHTML == "スキップ確認" || header.innerHTML == 'ターン処理待機' ||
                    header.innerHTM == "リサイクル使用結果") {
                    tap_("btn-usual-ok");
                    // tap_("btn-retry cnt-quest");
                }
                if (header.innerHTML == 'マルチバトル') {
                    tap_2("btn-usual-ok", 0);

                    if (auto_multi_attack == 1) {
                        setTimeout(() => {
                            location.reload();
                        }, 10 * 1000);
                    }

                }
                if (header.innerHTML.substring(0, 1) == "第") {
                    tap_("btn-usual-ok");
                }
                if (header.innerHTML == "クエスト解放" || header.innerHTML == "はじブルで攻略指南！！" || header.innerHTML == "獲得キャラクター") {
                    tap_("btn-usual-cancel");
                    tap_("btn-usual-close");
                    // tap_2('prt-button-cover', 0);
                }
                if (header.innerHTML == "リベンジボーナス確認") {
                    tap_2("btn-usual-ok", 0);
                }
                if (prt_list_data.length > 0) {
                    for (let index = 0; index < prt_list_data.length; index++) {
                        if (header.innerHTML == prt_list_data[index]) {
                            tap_("btn-usual-ok");
                            break;
                        }
                    }
                }
                if (header.innerHTML == "画像認証") {
                    setTimeout(() => {
                        location.reload();
                    }, 1000 * 60 * 60);
                    clearTimeout(attack_timer);
                }
                if (header.innerHTML == "神滅戦") {
                    $(".btn-set-quest").trigger("tap")[0]
                }
                if (header.innerHTML == "クエストを開始できません") {
                    var noe = new Date().getHours();
                    if (noe == 7) {
                        location.reload();
                        clearTimeout(attack_timer);
                    } else {
                        setTimeout(() => {
                            location.reload();
                        }, 1000 * 60 * 1);
                        console.info("古战场还没开");
                        clearTimeout(attack_timer);
                    }
                }
            }


            // tap_('btn-command-skip');

            if (document.getElementsByClassName('btn-header logView').length > 0) {
                tap_('btn-skip');
                setTimeout(() => {
                    tap_('btn-scene-skip');
                }, 300);
            }



            var pati = document.getElementsByClassName('prt-deck-title');
            if (pati.length > 0) {
                tap_("btn-usual-ok");
                // tap_("btn-retry cnt-quest");
            }


            var ap_aap = document.getElementsByClassName('use-item-num')[1];
            if (ap_aap != null) {
                tap_2('btn-use-item', 1);
            }


            var revival = document.getElementsByClassName('btn-revival')[0];
            if (revival != null) {
                if (revival.style.display == "block") {
                    setTimeout(() => {
                        if (auto_multi_attack_bt == 0) {
                            location.reload();
                        } else {
                            location.href = "https://game.granbluefantasy.jp/#quest/assist";
                            location.reload();
                        }
                    }, 300);
                    clearTimeout(attack_timer);
                }


            }

            var btn_attack_start = document.getElementsByClassName('btn-attack-start display-on')[0];
            if (btn_attack_start != null && !full) {

                if (!full) {
                    full = true;
                    tap_("btn-auto", 0);
                }

                if (document.getElementsByClassName('btn-auto')[0].style.display == '') {
                    tap_("btn-attack-start display-on");
                }


            }

            var urldata = location.href.replace('https://game.granbluefantasy.jp/', '').split('/')[0];

            var reload_ = document.getElementsByClassName('btn-attack-start display-off')[0];
            var reload2 = document.getElementsByClassName('btn-attack-cancel btn-cancel display-off')[0];
            var pt_ = document.getElementsByClassName('txt-point')[0];
            var ptyes = false;
            if (multi_jump == 1 && pt_ != null) {
                if (pt_.innerHTML.replace('pt', '') >= gxpt) {
                    ptyes = true;
                }
            }
            if (gxpt == 0) {
                ptyes = true;
            }


            if (reload_ != null && reload2 != null) {
                setTimeout(() => {
                    if (multi_jump == 1 && urldata == '#raid_multi' && ptyes) {
                        location.href = "https://game.granbluefantasy.jp/#quest/assist";
                    }
                    location.reload();
                }, 300);
                console.info('reload1');
                clearTimeout(attack_timer);
            } else if (document.getElementsByClassName('prt-result-head head-win')[0] != null) {
                if (document.getElementsByClassName('txt-empty-notice').length > 0) {
                    if (document.getElementsByClassName('btn-unclaimed active location-href').length > 0) {
                        tap_('btn-unclaimed active location-href');
                    } else {
                        tap_('btn-control location-href');
                    }
                } else {

                    let neterror = 1;

                    if (document.getElementsByClassName('lis-summon').length > 0) {
                        if (document.getElementsByClassName('lis-summon')[0].getAttribute('summon-name') != null) {
                            neterror = 0;
                        }
                    }

                    if (neterror == 0) {
                        setTimeout(() => {
                            location.reload();
                        }, 300);
                    } else {
                        location.href = 'https://game.granbluefantasy.jp/#quest/index';
                        location.reload();
                    }
                    console.info('reload2');
                    clearTimeout(attack_timer);
                }
            }

        }


        var header2 = document.getElementsByClassName('prt-popup-header')[0];
        if (header2 != null) {
            if (header2.innerHTML == "救援依頼" && Rescue == 1) {
                tap_2('btn-usual-text', 0);
                console.info(document.getElementsByClassName('prt-battle-id')[0].innerHTML);
                location.reload();
                clearTimeout(attack_timer);
            }
            if (header2.innerHTML == "参戦メンバーの応援") {
                tap_2("btn-usual-cancel", 0);
            }
            if (header2.innerHTML == "撤退確認") {
                // tap_2("btn-usual-close", 0);
                // tap_2("btn-cheer", 0);
            }
            if (header2.innerHTML == 'ターン処理待機') {
                if (loadinglock) {
                    tap_2("btn-usual-ok", 0);
                } else {
                    setTimeout(() => {
                        location.href = "https://game.granbluefantasy.jp/#quest/index";
                    }, 300);
                }
            }
            if (header2.innerHTML == '敵の弱点属性について') {
                // tap_2("btn-usual-ok", 0);
            }
            if (header2.innerHTML == "アイテム使用不可") {
                tap_('btn-withdraw-single');
            }
            if (header2.innerHTML == "バトルに勝利！") {
                setTimeout(() => {
                    location.reload();
                    clearInterval(attack_timer);
                }, 300);
            }
        }

    }, 100);



    var supporter_listname = [];

    var supporter_list = setInterval(() => {
        var prt_supporter_title = document.getElementsByClassName('prt-supporter-title');
        if (prt_supporter_title.length > 0) {
            var skill_buffer = document.getElementsByClassName('btn-supporter lis-supporter');
            for (let index = 0; index < skill_buffer.length; index++) {
                if (skill_buffer[index].children[1].children[1].children[2] != null) {
                    supporters.push(skill_buffer[index].children[1].children[1].children[2].innerHTML);
                    supporter_listname.push(skill_buffer[index].children[1].children[1].children[1].children[0].innerHTML + "-" +
                        skill_buffer[index].children[1].children[1].children[1].children[1].innerHTML);
                }
            }
            supporter_listname = unique(supporter_listname);
            supporters = unique(supporters);
            for (let index = 0; index < supporters.length; index++) {
                let data = document.createElement('option');
                data.value = supporters[index];
                data.innerHTML = supporter_listname[index] + ":" + supporters[index];
                document.getElementById('select_box').appendChild(data);
                if (supporters[index] == localStorage.getItem('buffer')) {
                    document.getElementById('select_box').selectedIndex = index;
                }
            }

            clearInterval(supporter_list);
        }
    }, 1000);

    var auto_select_timer = setInterval(() => {
        var prt_list = document.getElementsByClassName('prt-list-contents');
        if (prt_list.length > 0) {
            for (let index = 0; index < prt_list.length; index++) {
                let data = document.createElement('option');
                var titles = prt_list[index].getElementsByClassName('txt-quest-title')[0];
                var title;
                if (titles == null) {
                    title = prt_list[index].children[0].getAttribute('data-quest-name');
                } else {
                    title = titles.innerHTML;
                }
                if (title != null) {
                    data.value = title;
                    data.innerHTML = title;
                    prt_list_data.push(title);
                    document.getElementById('select_attack').appendChild(data);
                }
            }
            clearInterval(auto_select_timer);
        }
    }, 1000);



    var tap_ = function(name) {
        var event = document.createEvent('Events');
        event.initEvent('tap', true, true);
        var button = document.getElementsByClassName(name)[document.getElementsByClassName(name).length - 1];
        if (button != null) {
            button.dispatchEvent(event);
        }
    }

    var tap_2 = function(name, num) {
        var event = document.createEvent('Events');
        event.initEvent('tap', true, true);
        var button = document.getElementsByClassName(name)[num];
        if (button != null) {
            button.dispatchEvent(event);
        }
    }



    function unique(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }


})();