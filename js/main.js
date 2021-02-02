let date = new Date();
let user_list = []; // 使用者清單 {"name": "", "timezone": ""}
let current_list = []; // 畫面時區清單
let aryIannaTimeZones = []; // 下拉式選單時區資料

let hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];


async function getTimeZoneData() {
    let timezoneResponse = await fetch('https://minruxie.github.io/time_zone/data/timezone.json');
    let userdataResponse = await fetch('https://minruxie.github.io/time_zone/data/userdata.json');

    // timezone data
    let timezoneJsonObj = await timezoneResponse.json();
    aryIannaTimeZones = await timezoneJsonObj.aryIannaTimeZones;

    // user data
    userdataJsonObj = await userdataResponse.json();
    userdataJsonObj.forEach((userdata)=>{
        user_list.push({"name": userdata.name, "timezone": userdata.timezone});
    });

    // 重新排序 (升序)
    aryIannaTimeZones.sort();
};


getTimeZoneData().then(
    function(value) {

        // HTML 讀取後執行
        $(function(){
            let add = $('#add');
            let main = $('#main');

            //-------------------
            // 自定義 function
            //-------------------

            /* 刷新資料 */
            function refresh() {
                // 重置
                date = new Date();
                current_list.splice(0, current_list.length); // 清空

                user_list.forEach((user)=>{
                    // 世界時區
                    let strTime = date.toLocaleString("zh-TW", {
                        timeZone: `${user.timezone}`,
                        timeZoneName: 'short' //(e.g., GMT+1)
                    });
                    // 標準時間名稱 (中文)
                    let strTime_2 = date.toLocaleString("zh-TW", {
                        timeZone: `${user.timezone}`,
                        timeZoneName: 'long' //(e.g., 台北標準時間)
                    });
                    // 標準時間名稱 (英文)
                    let strTime_3 = date.toLocaleString("en-US", {
                        timeZone: `${user.timezone}`,
                        timeZoneName: 'long' //(e.g., British Summer Time)
                    });
                    // 年份 (yyyy)
                    let strTime_4_1_1 = date.toLocaleString("en-US", {
                        timeZone: `${user.timezone}`,
                        hourCycle: 'h24', year: 'numeric'
                    });
                    // 月份 (mm)
                    let strTime_4_1_2 = date.toLocaleString("en-US", {
                        timeZone: `${user.timezone}`,
                        hourCycle: 'h24',
                        month: '2-digit'
                    });
                    // 日期 (dd)
                    let strTime_4_1_3 = date.toLocaleString("en-US", {
                        timeZone: `${user.timezone}`,
                        hourCycle: 'h24',
                        day: '2-digit'
                    });
                    // 星期幾 (www)
                    let strTime_4_2 = date.toLocaleString("en-US", {
                        timeZone: `${user.timezone}`,
                        weekday: 'short'
                    });
                    // 時間 (hh:mm:ss)
                    let strTime_4_3 = date.toLocaleString("en-US", {
                        timeZone: `${user.timezone}`,
                        hourCycle: 'h24',
                        hour: '2-digit', minute: '2-digit', second: '2-digit'
                    });

                    // 幾點 (hh)
                    let strTime_5 = date.toLocaleString("en-US", {
                        timeZone: `${user.timezone}`,
                        hourCycle: 'h24',
                        hour: '2-digit'
                    });

                    // 世界時區
                    let re_gmt = /\[(.+?)\]/g; // 取出中括號的內容
                    let my_gmt = re_gmt.exec(strTime);

                    // 標準時間名 (ch)
                    let re_gmt_ch = /\[(.+?)\]/g; // 取出中括號的內容
                    let my_gmt_ch = re_gmt_ch.exec(strTime_2);

                    // 標準時間名 (en)
                    let re_gmt_en = /(AM(.+)|PM(.+))/g; // 取出 AM 或 PM 後的字串
                    let my_gmt_en = re_gmt_en.exec(strTime_3);

                    // 時區表格
                    let cur_time_zone_hours_array = [];
                    let temp_hours = [];
                    for (let j=hours.indexOf(strTime_5) ; j < hours.length ; j++) {
                        // 從目前時間加入
                        temp_hours.push(hours[j]);
                    }
                    if (temp_hours.length < 24) {
                        // 從頭加入
                        for (let t=0 ; t < hours.indexOf(strTime_5) ; t++) {
                            temp_hours.push(hours[t]);
                        }
                    }
                    // 調整順序 (目前時間放在中間)
                    for (let k=0 ; k < 12 ; k++) {
                        temp_hours.unshift(temp_hours.pop());
                    }
                    // 轉換為 HTML
                    let temp_html_hour_array = [];                    
                    for (let c=0 ; c < temp_hours.length ; c++) {
                        let html_str = `<span class="hour c${temp_hours[c]}">${temp_hours[c]}</span>`;
                        // 目前時間
                        if (temp_hours[c] == strTime_5) {
                            html_str = `<span class="hour cur c${temp_hours[c]}">${temp_hours[c]}</span>`;
                        }
                        temp_html_hour_array.push(html_str);
                    }
                    // 轉換為字串
                    cur_time_zone_hours_array.push(temp_html_hour_array.join(""));


                    current_list.push(
                        {
                            // 目前日期時間星期幾 (yyyy/mm/dd www hh:mm:ss)
                            "cur_date_time_array": `${strTime_4_1_1}/${strTime_4_1_2}/${strTime_4_1_3} ${strTime_4_2} ${strTime_4_3}`,
                            // 目前幾點 (hh)
                            "cur_hour": strTime_5,
                            // 時間表格
                            "cur_time_zone_hours_list": cur_time_zone_hours_array,
                            // 世界時區
                            "gmt_array": my_gmt[1],
                            // 標準時間名 (ch)
                            "gmt_ch_array": my_gmt_ch[1],
                            // 標準時間名 (en)
                            "gmt_en_array": my_gmt_en[2] ? my_gmt_en[2] : my_gmt_en[3]
                        }
                    );
                });
            }


            /* 插入資料 */
            function appendData() {
                // 移除第一列以外的所有列
                main.find('.row').not(':first-child').remove(); 

                // 重新加入資料
                for (let i=0 ; i < current_list.length ; i++) {
                    main.find('.container').append(
                        `<div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                ${user_list[i].name}<br>
                                ${current_list[i].cur_date_time_array}<br>
                            </div>
                            <div class="col-lg-7 col-md-7 col-sm-7 col-7">${current_list[i].cur_time_zone_hours_list}</div>
                            <div class="col-lg-1 col-md-1 col-sm-1 col-1">
                                ${user_list[i].timezone}<br>
                                ${current_list[i].gmt_array}
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                ${current_list[i].gmt_ch_array}<br>
                                ${current_list[i].gmt_en_array}
                            </div>
                        </div>`
                    );
                }

                /* 時區欄位 hover 效果 */
                $('.row').each(function(index) {
                    $(this).find('.hour').each(function(index2) {
                        $(this).on('mouseover', function(event) {
                            $('.row').each(function(index3){
                                $(this).find('.hour').each(function(index4) {
                                    if (index2==index4) {
                                        $(this).css('opacity', '0.7');
                                    } else {
                                        $(this).css('opacity', '1');
                                    }
                                });
                            });
                        });
                    });
                });
            }

            /* 新增輸入控件 */
            function buildInput() {
                for (let h=0;h<aryIannaTimeZones.length;h++) {
                    add.find('#timezone select').append(`
                        <option value="${aryIannaTimeZones[h]}">${aryIannaTimeZones[h]}</option>
                    `);
                }
            }

            //-------------------
            // Event Binding
            //-------------------
            
            /* 刷新時間 */
            $('#refresh-btn').on('click', function(event){
                refresh(); // 刷新資料
                appendData(); // 插入資料
            });

            /* 新增成員 */
            $('#add-btn').on('click', function(event){
                let member_name = $('#member_name').val();
                let member_location = $('#member_location :selected').text();
                
                if(member_name != '' && member_location != ''){
                    user_list.push({"name": member_name, "timezone": member_location});
                    
                    refresh(); // 刷新資料
                    appendData(); // 插入資料

                    // 清空
                    $('#member_name').val('');
                    $('#member_location').val('');
                }
            });


            //-------------------
            // 初始化
            //-------------------
            refresh(); // 刷新資料
            appendData(); // 插入資料
            buildInput(); // 新增輸入控件
            
        });
    },
    function(error) { // error }
});