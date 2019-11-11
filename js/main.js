let date = new Date();
let cur_date_time_array = []; //目前日期+時間+星期幾
let cur_time_zone = [
    'Asia/Taipei',
    'Australia/Adelaide',
    'Australia/Melbourne',
    'Asia/Tokyo',
    'America/Los_Angeles'
];
let who = [
    '我們',
    '廖廖',
    '妍寧',
    'PM',
    '米國電商'
];

// let contry_array = []; // 國家
// let city_array = []; // 城市
let gmt_array = [];  // GMT (Greenwich Mean Time) 差
let gmt_en_array = []; // 標準時間名(en)
let gmt_ch_array = []; // 標準時間名(ch)

/* 
    How to get list of all timezones in javascript
    link: https://stackoverflow.com/questions/38399465/how-to-get-list-of-all-timezones-in-javascript
*/
let aryIannaTimeZones =
[
    'Europe/Andorra',
    'Asia/Dubai',
    'Asia/Kabul',
    'Europe/Tirane',
    'Asia/Yerevan',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Antarctica/Mawson',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Cordoba',
    'America/Argentina/Salta',
    'America/Argentina/Jujuy',
    'America/Argentina/Tucuman',
    'America/Argentina/Catamarca',
    'America/Argentina/La_Rioja',
    'America/Argentina/San_Juan',
    'America/Argentina/Mendoza',
    'America/Argentina/San_Luis',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Ushuaia',
    'Pacific/Pago_Pago',
    'Europe/Vienna',
    'Australia/Lord_Howe',
    'Antarctica/Macquarie',
    'Australia/Hobart',
    'Australia/Currie',
    'Australia/Melbourne',
    'Australia/Sydney',
    'Australia/Broken_Hill',
    'Australia/Brisbane',
    'Australia/Lindeman',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Perth',
    'Australia/Eucla',
    'Asia/Baku',
    'America/Barbados',
    'Asia/Dhaka',
    'Europe/Brussels',
    'Europe/Sofia',
    'Atlantic/Bermuda',
    'Asia/Brunei',
    'America/La_Paz',
    'America/Noronha',
    'America/Belem',
    'America/Fortaleza',
    'America/Recife',
    'America/Araguaina',
    'America/Maceio',
    'America/Bahia',
    'America/Sao_Paulo',
    'America/Campo_Grande',
    'America/Cuiaba',
    'America/Santarem',
    'America/Porto_Velho',
    'America/Boa_Vista',
    'America/Manaus',
    'America/Eirunepe',
    'America/Rio_Branco',
    'America/Nassau',
    'Asia/Thimphu',
    'Europe/Minsk',
    'America/Belize',
    'America/St_Johns',
    'America/Halifax',
    'America/Glace_Bay',
    'America/Moncton',
    'America/Goose_Bay',
    'America/Blanc-Sablon',
    'America/Toronto',
    'America/Nipigon',
    'America/Thunder_Bay',
    'America/Iqaluit',
    'America/Pangnirtung',
    'America/Atikokan',
    'America/Winnipeg',
    'America/Rainy_River',
    'America/Resolute',
    'America/Rankin_Inlet',
    'America/Regina',
    'America/Swift_Current',
    'America/Edmonton',
    'America/Cambridge_Bay',
    'America/Yellowknife',
    'America/Inuvik',
    'America/Creston',
    'America/Dawson_Creek',
    'America/Fort_Nelson',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Dawson',
    'Indian/Cocos',
    'Europe/Zurich',
    'Africa/Abidjan',
    'Pacific/Rarotonga',
    'America/Santiago',
    'America/Punta_Arenas',
    'Pacific/Easter',
    'Asia/Shanghai',
    'Asia/Urumqi',
    'America/Bogota',
    'America/Costa_Rica',
    'America/Havana',
    'Atlantic/Cape_Verde',
    'America/Curacao',
    'Indian/Christmas',
    'Asia/Nicosia',
    'Asia/Famagusta',
    'Europe/Prague',
    'Europe/Berlin',
    'Europe/Copenhagen',
    'America/Santo_Domingo',
    'Africa/Algiers',
    'America/Guayaquil',
    'Pacific/Galapagos',
    'Europe/Tallinn',
    'Africa/Cairo',
    'Africa/El_Aaiun',
    'Europe/Madrid',
    'Africa/Ceuta',
    'Atlantic/Canary',
    'Europe/Helsinki',
    'Pacific/Fiji',
    'Atlantic/Stanley',
    'Pacific/Chuuk',
    'Pacific/Pohnpei',
    'Pacific/Kosrae',
    'Atlantic/Faroe',
    'Europe/Paris',
    'Europe/London',
    'Asia/Tbilisi',
    'America/Cayenne',
    'Africa/Accra',
    'Europe/Gibraltar',
    'America/Godthab',
    'America/Danmarkshavn',
    'America/Scoresbysund',
    'America/Thule',
    'Europe/Athens',
    'Atlantic/South_Georgia',
    'America/Guatemala',
    'Pacific/Guam',
    'Africa/Bissau',
    'America/Guyana',
    'Asia/Hong_Kong',
    'America/Tegucigalpa',
    'America/Port-au-Prince',
    'Europe/Budapest',
    'Asia/Jakarta',
    'Asia/Pontianak',
    'Asia/Makassar',
    'Asia/Jayapura',
    'Europe/Dublin',
    'Asia/Jerusalem',
    'Asia/Kolkata',
    'Indian/Chagos',
    'Asia/Baghdad',
    'Asia/Tehran',
    'Atlantic/Reykjavik',
    'Europe/Rome',
    'America/Jamaica',
    'Asia/Amman',
    'Asia/Tokyo',
    'Africa/Nairobi',
    'Asia/Bishkek',
    'Pacific/Tarawa',
    'Pacific/Enderbury',
    'Pacific/Kiritimati',
    'Asia/Pyongyang',
    'Asia/Seoul',
    'Asia/Almaty',
    'Asia/Qyzylorda',
    'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Asia/Aqtobe',
    'Asia/Aqtau',
    'Asia/Atyrau',
    'Asia/Oral',
    'Asia/Beirut',
    'Asia/Colombo',
    'Africa/Monrovia',
    'Europe/Vilnius',
    'Europe/Luxembourg',
    'Europe/Riga',
    'Africa/Tripoli',
    'Africa/Casablanca',
    'Europe/Monaco',
    'Europe/Chisinau',
    'Pacific/Majuro',
    'Pacific/Kwajalein',
    'Asia/Yangon',
    'Asia/Ulaanbaatar',
    'Asia/Hovd',
    'Asia/Choibalsan',
    'Asia/Macau',
    'America/Martinique',
    'Europe/Malta',
    'Indian/Mauritius',
    'Indian/Maldives',
    'America/Mexico_City',
    'America/Cancun',
    'America/Merida',
    'America/Monterrey',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Chihuahua',
    'America/Ojinaga',
    'America/Hermosillo',
    'America/Tijuana',
    'America/Bahia_Banderas',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Africa/Maputo',
    'Africa/Windhoek',
    'Pacific/Noumea',
    'Pacific/Norfolk',
    'Africa/Lagos',
    'America/Managua',
    'Europe/Amsterdam',
    'Europe/Oslo',
    'Asia/Kathmandu',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Auckland',
    'Pacific/Chatham',
    'America/Panama',
    'America/Lima',
    'Pacific/Tahiti',
    'Pacific/Marquesas',
    'Pacific/Gambier',
    'Pacific/Port_Moresby',
    'Pacific/Bougainville',
    'Asia/Manila',
    'Asia/Karachi',
    'Europe/Warsaw',
    'America/Miquelon',
    'Pacific/Pitcairn',
    'America/Puerto_Rico',
    'Asia/Gaza',
    'Asia/Hebron',
    'Europe/Lisbon',
    'Atlantic/Madeira',
    'Atlantic/Azores',
    'Pacific/Palau',
    'America/Asuncion',
    'Asia/Qatar',
    'Indian/Reunion',
    'Europe/Bucharest',
    'Europe/Belgrade',
    'Europe/Kaliningrad',
    'Europe/Moscow',
    'Europe/Simferopol',
    'Europe/Kirov',
    'Europe/Astrakhan',
    'Europe/Volgograd',
    'Europe/Saratov',
    'Europe/Ulyanovsk',
    'Europe/Samara',
    'Asia/Yekaterinburg',
    'Asia/Omsk',
    'Asia/Novosibirsk',
    'Asia/Barnaul',
    'Asia/Tomsk',
    'Asia/Novokuznetsk',
    'Asia/Krasnoyarsk',
    'Asia/Irkutsk',
    'Asia/Chita',
    'Asia/Yakutsk',
    'Asia/Khandyga',
    'Asia/Vladivostok',
    'Asia/Ust-Nera',
    'Asia/Magadan',
    'Asia/Sakhalin',
    'Asia/Srednekolymsk',
    'Asia/Kamchatka',
    'Asia/Anadyr',
    'Asia/Riyadh',
    'Pacific/Guadalcanal',
    'Indian/Mahe',
    'Africa/Khartoum',
    'Europe/Stockholm',
    'Asia/Singapore',
    'America/Paramaribo',
    'Africa/Juba',
    'Africa/Sao_Tome',
    'America/El_Salvador',
    'Asia/Damascus',
    'America/Grand_Turk',
    'Africa/Ndjamena',
    'Indian/Kerguelen',
    'Asia/Bangkok',
    'Asia/Dushanbe',
    'Pacific/Fakaofo',
    'Asia/Dili',
    'Asia/Ashgabat',
    'Africa/Tunis',
    'Pacific/Tongatapu',
    'Europe/Istanbul',
    'America/Port_of_Spain',
    'Pacific/Funafuti',
    'Asia/Taipei',
    'Europe/Kiev',
    'Europe/Uzhgorod',
    'Europe/Zaporozhye',
    'Pacific/Wake',
    'America/New_York',
    'America/Detroit',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/Indiana/Indianapolis',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Vevay',
    'America/Chicago',
    'America/Indiana/Tell_City',
    'America/Indiana/Knox',
    'America/Menominee',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/North_Dakota/Beulah',
    'America/Denver',
    'America/Boise',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Juneau',
    'America/Sitka',
    'America/Metlakatla',
    'America/Yakutat',
    'America/Nome',
    'America/Adak',
    'Pacific/Honolulu',
    'America/Montevideo',
    'Asia/Samarkand',
    'Asia/Tashkent',
    'America/Caracas',
    'Asia/Ho_Chi_Minh',
    'Pacific/Efate',
    'Pacific/Wallis',
    'Pacific/Apia',
    'Africa/Johannesburg'
];

aryIannaTimeZones.sort(); // 重新排序
// aryIannaTimeZones.forEach((timeZone)=>
// {
//     let strTime = date.toLocaleString("zh-TW", {
//         timeZone: `${timeZone}`,
//         timeZoneName: 'short' //(e.g., GMT+1)
//     });
//     let strTime_2 = date.toLocaleString("zh-TW", {
//         timeZone: `${timeZone}`,
//         timeZoneName: 'long' //(e.g., British Summer Time)
//     });
//     let strTime_3 = date.toLocaleString("en-US", {
//         timeZone: `${timeZone}`,
//         timeZoneName: 'long' //(e.g., British Summer Time)
//     });
//     let strTime_4 = date.toLocaleString("zh-TW", {
//         timeZone: `${timeZone}`,
//         weekday: 'long',
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit'
//     });

//     // 目前時間 (每秒抓取)
//     cur_date_time_array.push(strTime_4);

//     // GMT 差
//     let re_gmt = /\[(.+?)\]/g; // 取出中括號的內容
//     let my_gmt = re_gmt.exec(strTime);
//     gmt_array.push(my_gmt[1]);
    
//     // 標準時間名 (ch))
//     let re_gmt_ch = /\[(.+?)\]/g; // 取出中括號的內容
//     let my_gmt_ch = re_gmt_ch.exec(strTime_2);
//     gmt_ch_array.push(my_gmt_ch[1]);

//     // 標準時間名 (en)
//     let re_gmt_en = /(AM(.+)|PM(.+))/g; // 取出 AM 或 PM 後的字串
//     let my_gmt_en = re_gmt_en.exec(strTime_3);
//     gmt_en_array.push(my_gmt_en[2] ? my_gmt_en[2] : my_gmt_en[3]);
// });

// HTML 讀取後執行
$(function(){
    //-------------------
    // 變數宣告
    //-------------------
    let main = $('#main');

    //-------------------
    // 自定義 function
    //-------------------

    /* 刷新資料 */
    function refresh() {
        date = new Date();
        cur_date_time_array = [];

        cur_time_zone.forEach((timeZone)=>{
            let strTime = date.toLocaleString("zh-TW", {
                timeZone: `${timeZone}`,
                timeZoneName: 'short' //(e.g., GMT+1)
            });
            let strTime_2 = date.toLocaleString("zh-TW", {
                timeZone: `${timeZone}`,
                timeZoneName: 'long' //(e.g., British Summer Time)
            });
            let strTime_3 = date.toLocaleString("en-US", {
                timeZone: `${timeZone}`,
                timeZoneName: 'long' //(e.g., British Summer Time)
            });
            
            let strTime_4 = date.toLocaleString("zh-TW", {
                timeZone: `${timeZone}`,
                weekday: 'long',
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
    
            // 目前時間 (每秒抓取)
            cur_date_time_array.push(strTime_4);

            // GMT 差
            let re_gmt = /\[(.+?)\]/g; // 取出中括號的內容
            let my_gmt = re_gmt.exec(strTime);
            gmt_array.push(my_gmt[1]);
            
            // 標準時間名 (ch))
            let re_gmt_ch = /\[(.+?)\]/g; // 取出中括號的內容
            let my_gmt_ch = re_gmt_ch.exec(strTime_2);
            gmt_ch_array.push(my_gmt_ch[1]);

            // 標準時間名 (en)
            let re_gmt_en = /(AM(.+)|PM(.+))/g; // 取出 AM 或 PM 後的字串
            let my_gmt_en = re_gmt_en.exec(strTime_3);
            gmt_en_array.push(my_gmt_en[2] ? my_gmt_en[2] : my_gmt_en[3]);
        });

        // updateCurrentDateTime(); // 更新目前時間
        // setTimeout(refresh(), 1000);
    }

    /* 插入資料 */
    function appendData() {
        for(let i=0;i<cur_time_zone.length;i++){
            main.find('.container').append(
                `<div class="row">
                    <div class="col-lg-1 col-md-1 col-sm-1 col-1">${who[i]}</div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-4">${cur_date_time_array[i]}</div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">${aryIannaTimeZones[i]}</div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-3">${gmt_ch_array[i]}<br>${gmt_en_array[i]}</div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">${gmt_array[i]}</div>
                </div>`
            );
        }
    }

    /* 更新目前資料 */
    // function updateCurrentDateTime() {
    //     for(let i=0;i<cur_time_zone.length;i++){
    //         main.find('.row').eq(i+1).find('div').eq(0).text(cur_date_time_array[i]);
    //     }
    // }

    //-------------------
    // Event Binding
    //-------------------
    $('#refresh-btn').on('click', function(event){
        refresh(); // 刷新資料
        main.find('.row').not(':first-child').remove();
        appendData(); // 插入資料
    });

    //-------------------
    // 初始化
    //-------------------

    refresh(); // 刷新資料
    appendData(); // 插入資料

    
});