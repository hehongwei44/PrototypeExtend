/**
 * 一周内天数的名称
 */
Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * 一周内天数的简称
 */
Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * 一年内月份的名称
 */
Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * 一年内月份的简称
 */
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * 每周的第一天.
 */
Date.firstDayOfWeek = 1;

/**
 * 日期的格式化规则
 */
Date.format = 'dd/mm/yyyy';
//Date.format = 'mm/dd/yyyy';
//Date.format = 'yyyy-mm-dd';
//Date.format = 'dd mmm yy';

/**
 * 当年分为2位数时，用来判断的标准
 */
Date.fullYearStart = '20';

(function () {

    /**
     * 日期原型的拓展函数
     */
    function add(name, method) {
        if (!Date.prototype[name]) {
            Date.prototype[name] = method;
        }
    }

    /**
     * @name 判断指定年份是否是闰年
     * @return Boolean
     */
    add("isLeapYear", function () {
        var y = this.getFullYear();
        return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    });

    /**
     * @name 判断指定日期是否是周末(即周六或者周日)
     * @return Boolean
     */
    add("isWeekend", function () {
        return this.getDay() == 0 || this.getDay() == 6;
    });

    /**
     * @name 判断是否是工作日
     * @return Boolean
     */
    add("isWeekDay", function () {
        return !this.isWeekend();
    });

    /**
     * @name 获取指定月的总天数
     * @return Number
     */
    add("getDaysInMonth", function () {
        return [31, (this.isLeapYear() ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.getMonth()];
    });

    /**
     * @name 判断指定的日期是星期几.
     * @param abbreviated 设置是否以简称的形式呈现
     * @return String
     */
    add("getDayName", function (abbreviated) {
        return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
    });

    /**
     * @name 获取指定日期的月份名称.
     * @param abbreviated 设置是否以简称的形式呈现
     * @return String
     */
    add("getMonthName", function (abbreviated) {
        return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
    });

    /**
     * @name 指定年已使用的天数
     * @return Number
     */
    add("getDayOfYear", function () {
        var tmpdtm = new Date("1/1/" + this.getFullYear());
        return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
    });

    /**
     * @name 获取指定日期已经使用的周数
     * @return Number
     */
    add("getWeekOfYear", function () {
        return Math.ceil(this.getDayOfYear() / 7);
    });

    /**
     * @name 设置指定时间的日期数
     * @return Date
     */
    add("setDayOfYear", function (day) {
        this.setMonth(0);
        this.setDate(day);
        return this;
    });

    /**
     * @name 添加年数.
     * @return Date
     */
    add("addYears", function (num) {
        this.setFullYear(this.getFullYear() + num);
        return this;
    });

    /**
     * @name 添加月份数
     * @return Date
     */
    add("addMonths", function (num) {
        var tmpdtm = this.getDate();

        this.setMonth(this.getMonth() + num);

        if (tmpdtm > this.getDate())
            this.addDays(-this.getDate());

        return this;
    });

    /**
     * @name 添加天数
     * @return Date
     */
    add("addDays", function (num) {
        var timezoneOffsetBefore = this.getTimezoneOffset(),
            timezoneOffsetAfter;
        this.setTime(this.getTime() + (num * 86400000));
        timezoneOffsetAfter = this.getTimezoneOffset();

        if (timezoneOffsetAfter !== timezoneOffsetBefore) {
            this.setTime(this.getTime() + ((timezoneOffsetAfter - timezoneOffsetBefore) * 60 * 1000));
        }
        return this;
    });

    /**
     * @name 添加小时
     * @return Date
     */
    add("addHours", function (num) {
        this.setHours(this.getHours() + num);
        return this;
    });

    /**
     * @name 添加分钟
     * @return Date
     */
    add("addMinutes", function (num) {
        this.setMinutes(this.getMinutes() + num);
        return this;
    });

    /**
     * @name 添加秒钟
     * @name addSeconds
     * @return Date
     */
    add("addSeconds", function (num) {
        this.setSeconds(this.getSeconds() + num);
        return this;
    });

    /**
     * @name 零区的设置
     * @return Date
     */
    add("zeroTime", function () {
        this.setMilliseconds(0);
        this.setSeconds(0);
        this.setMinutes(0);
        this.setHours(0);
        return this;
    });

    /**
     * @name 转换为指定格式的日期
     * @return Date
     */
    add("asString", function (format) {
        var r = format || Date.format;
        return r
            .split('yyyy').join(this.getFullYear())
            .split('yy').join((this.getFullYear() + '').substring(2))
            .split('dd').join(_zeroPad(this.getDate()))
            .split('d').join(this.getDate())
            .split('DD').join(this.getDayName(false))
            .split('D').join(this.getDayName(true))
            .split('mmmm').join(this.getMonthName(false))
            .split('mmm').join(this.getMonthName(true))
            .split('mm').join(_zeroPad(this.getMonth() + 1))
            .split('hh').join(_zeroPad(this.getHours()))
            .split('min').join(_zeroPad(this.getMinutes()))
            .split('ss').join(_zeroPad(this.getSeconds()));
    });

    /**
     * @name 将字符串格式的日期转换称为真正的日期
     * @return Date
     */
    Date.fromString = function (s, format) {
        var f = format || Date.format,
            d = new Date('01/01/1977'),
            mLength = 0,
            iM, iD, iY,
            i, mStr;

        iM = f.indexOf('mmmm');
        if (iM > -1) {
            for (i = 0; i < Date.monthNames.length; i++) {
                mStr = s.substr(iM, Date.monthNames[i].length);
                if (Date.monthNames[i] == mStr) {
                    mLength = Date.monthNames[i].length - 4;
                    break;
                }
            }
            d.setMonth(i);
        } else {
            iM = f.indexOf('mmm');
            if (iM > -1) {
                mStr = s.substr(iM, 3);
                for (i = 0; i < Date.abbrMonthNames.length; i++) {
                    if (Date.abbrMonthNames[i] == mStr) break;
                }
                d.setMonth(i);
            } else {
                d.setMonth(Number(s.substr(f.indexOf('mm'), 2)) - 1);
            }
        }

        iY = f.indexOf('yyyy');

        if (iY > -1) {
            if (iM < iY) {
                iY += mLength;
            }
            d.setFullYear(Number(s.substr(iY, 4)));
        } else {
            if (iM < iY) {
                iY += mLength;
            }
            // TODO - this doesn't work very well - are there any rules for what is meant by a two digit year?
            d.setFullYear(Number(Date.fullYearStart + s.substr(f.indexOf('yy'), 2)));
        }
        iD = f.indexOf('dd');
        if (iM < iD) {
            iD += mLength;
        }
        d.setDate(Number(s.substr(iD, 2)));
        if (isNaN(d.getTime())) {
            return false;
        }
        return d;
    };

    // 通用的使用方法,个位数进行补零操作
    var _zeroPad = function (num) {
        var s = '0' + num;
        return s.substring(s.length - 2)
        //return ('0'+num).substring(-2); // doesn't work on IE :(
    };

})();
