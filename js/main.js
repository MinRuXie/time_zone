let date = new Date();
let cur_date_time_array = []; // 目前日期+時間+星期幾
let cur_hour = []; // 目前幾點
let cur_time_zone = [
    'Asia/Taipei',
    'Asia/Tokyo',
    'America/Los_Angeles',
    'America/New_York',
    'Australia/Adelaide',
    'Australia/Melbourne'
];
let who = [
    '我們',
    'PM',
    '米國電商',
    '珍珠',
    '廖廖',
    '妍寧'
];

let hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
let gmt_array = [];  // GMT (Greenwich Mean Time) 差
let gmt_en_array = []; // 標準時間名(en)
let gmt_ch_array = []; // 標準時間名(ch)


// 時區資料
let aryIannaTimeZones = [];

async function getTimeZoneData() {
    let res = await fetch('../data/timezone.json');
    let data = await res.json();
    aryIannaTimeZones = await data.aryIannaTimeZones;
    
    // 重新排序 (升序)
    aryIannaTimeZones.sort();
}



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
        cur_date_time_array = [];
        cur_hour = [];
        gmt_array = [];
        gmt_ch_array = [];
        gmt_en_array = [];

        cur_time_zone.forEach((timeZone)=>{
            // 世界時區
            /* 
                GMT(Greenwich Mean Time) 格林威治時間(世界標準時間)
                UTC(Coordinated Univerasl Time) 世界協調時間
                PST/PT(Pacific Standard Time) 太平洋標準時間 (UTC-8)
                MST(Mountain Standard Time) 山區標準時間 (UTC-7)
                CST(Central Standard Time) 中部標準時間 (UTC-6)
                EST(Eastern Standard Time) 東岸標準時間 (UTC-5)
                AKST(Alaska Standard Time) 阿拉斯加標準時間 (UTC-9)
                HAST(Hawaii-Aleutian Standard Time)夏威夷-阿留申標準時間 (UTC-10)
            */
            let strTime = date.toLocaleString("zh-TW", {
                timeZone: `${timeZone}`,
                timeZoneName: 'short' //(e.g., GMT+1)
            });
            // 標準時間名稱 (中文)
            let strTime_2 = date.toLocaleString("zh-TW", {
                timeZone: `${timeZone}`,
                timeZoneName: 'long' //(e.g., 台北標準時間)
            });
            // 標準時間名稱 (英文)
            let strTime_3 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                timeZoneName: 'long' //(e.g., British Summer Time)
            });
            // 年份 (yyyy)
            let strTime_4_1_1 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                hourCycle: 'h24', year: 'numeric'
            });
            // 月份 (mm)
            let strTime_4_1_2 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                hourCycle: 'h24',
                month: '2-digit'
            });
            // 日期 (dd)
            let strTime_4_1_3 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                hourCycle: 'h24',
                day: '2-digit'
            });
            // 星期幾 (www)
            let strTime_4_2 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                weekday: 'short'
            });
            // 時間 (hh:mm:ss)
            let strTime_4_3 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                hourCycle: 'h24',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });

            // 幾點 (hh)
            let strTime_5 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                hourCycle: 'h24',
                hour: '2-digit'
            });
    
            // 目前日期時間星期幾 (yyyy/mm/dd www hh:mm:ss)
            cur_date_time_array.push(`${strTime_4_1_1}/${strTime_4_1_2}/${strTime_4_1_3} ${strTime_4_2} ${strTime_4_3}`);

            // 世界時區
            let re_gmt = /\[(.+?)\]/g; // 取出中括號的內容
            let my_gmt = re_gmt.exec(strTime);
            gmt_array.push(my_gmt[1]);
            
            // 標準時間名 (ch)
            let re_gmt_ch = /\[(.+?)\]/g; // 取出中括號的內容
            let my_gmt_ch = re_gmt_ch.exec(strTime_2);
            gmt_ch_array.push(my_gmt_ch[1]);

            // 標準時間名 (en)
            let re_gmt_en = /(AM(.+)|PM(.+))/g; // 取出 AM 或 PM 後的字串
            let my_gmt_en = re_gmt_en.exec(strTime_3);
            gmt_en_array.push(my_gmt_en[2] ? my_gmt_en[2] : my_gmt_en[3]);

            // 目前幾點 (hh)
            cur_hour.push(strTime_5);
        });
    }

    /* 插入資料 */
    function appendData() {
        let cur_time_zone_hours_array = [];

        for(let i=0;i<cur_time_zone.length;i++){
            let temp_hours = [];
            for(let j=hours.indexOf(cur_hour[i]);j<hours.length;j++){
                // 從目前時間加入
                temp_hours.push(hours[j]);
            }

            if(temp_hours.length<24){
                // 從頭加入
                for(let t=0;t<hours.indexOf(cur_hour[i]);t++){
                    temp_hours.push(hours[t]);
                }
            }

            // 調整順序 (目前時間放在中間)
            for(let k=0;k<12;k++){
                temp_hours.unshift(temp_hours.pop());
            }

            // 轉換為 HTML
            let temp_html_hour_array = [];
            
            for(let c=0;c<temp_hours.length;c++){
                let html_str = `<span class="hour c${temp_hours[c]}">${temp_hours[c]}</span>`;
                // 目前時間
                if(temp_hours[c]==cur_hour[i]){
                    html_str = `<span class="hour cur c${temp_hours[c]}">${temp_hours[c]}</span>`;
                }
                temp_html_hour_array.push(html_str);
            }

            
            // 轉換為字串
            cur_time_zone_hours_array.push(temp_html_hour_array.join(""));

            main.find('.container').append(
                `<div class="row">
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        ${who[i]}<br>
                        ${cur_date_time_array[i]}<br>
                    </div>
                    <div class="col-lg-7 col-md-7 col-sm-7 col-7">${cur_time_zone_hours_array[i]}</div>
                    <div class="col-lg-1 col-md-1 col-sm-1 col-1">
                        ${cur_time_zone[i]}<br>
                        ${gmt_array[i]}
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        ${gmt_ch_array[i]}<br>
                        ${gmt_en_array[i]}
                    </div>
                </div>`
            );
        }

        /* 時區欄位 hover 效果 */
        $('.row').each(function(index){
            $(this).find('.hour').each(function(index2){
                $(this).on('mouseover', function(event){
                    $('.row').each(function(index3){
                        $(this).find('.hour').each(function(index4){
                            if(index2==index4){
                                $(this).css('opacity', '0.7');
                            }
                            else{
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
        for(let h=0;h<aryIannaTimeZones.length;h++){
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
        main.find('.row').not(':first-child').remove(); // 移除第一列以外的所有列
        appendData(); // 插入資料
    });

    /* 新增成員 */
    $('#add-btn').on('click', function(event){
        let member_name = $('#member_name').val();
        let member_location = $('#member_location :selected').text();
        
        if(member_name != '' && member_location != ''){
            cur_time_zone.push(member_location);
            who.push(member_name);
            
            refresh(); // 刷新資料
            main.find('.row').not(':first-child').remove();
            appendData(); // 插入資料

            // 清空
            $('#member_name').val('');
            $('#member_location').val('');
        }
    });

    async function viewInit() {
        await getTimeZoneData();
        buildInput(); // 新增輸入控件
    }

    //-------------------
    // 初始化
    //-------------------

    refresh(); // 刷新資料
    appendData(); // 插入資料
    viewInit(); // 畫面建置
});