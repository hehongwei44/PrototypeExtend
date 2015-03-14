(function () {

    /**
     *
     * 为字符串原型拓展方法的工具函数
     * 如果字符串原型中不存在该方法，则将其添加到数组的原型上。
     *
     * @private (私有方法)
     */
    function add(name, method) {
        if (!String.prototype[name]) {
            String.prototype[name] = method;
        }
    }

    /**
     * @name 去掉字符串中的左右两边的空格
     * @return String
     */
    add("trim", function () {
        return this.replace(/(^\s+|\s+$)/g, "");
    });

    /**
     * @name 讲一个字符串转换成驼峰格式的字符串
     * @return String
     */
    add("camelize", function () {
        return this.replace(/[-_]([a-z])/ig, function (z, b) {
            return b.toUpperCase();
        });
    });

    /**
     * @name 判断一个字符串是否以指定的字符前缀和偏移量开头.
     * @return Boolean
     * @param 要测试的字符前缀
     * @param 字符前缀的偏移量
     */

    add("startsWith", function (prefix, offset) {
        var offset = offset || 0;
        if (offset < 0 || offset > this.length) return false;
        return this.substring(offset, offset + prefix.length) == prefix;
    });

    /**
     * @name 测试字符串是否以指定的字符后缀结尾
     * @return Boolean
     * @param 被测试的字符后缀
     */
    add("endsWith", function (suffix) {
        return this.substring(this.length - suffix.length) == suffix;
    });

    /**
     * @name 字符串的截取功能
     * @return String
     * @param legth: 截取后字符串的最大长度
     * @param suffix：后缀
     */
    add("truncate", function (length, suffix) {
        length = length || 30;
        suffix = suffix === undefined ? "..." : suffix;
        return this.length > length ?
        this.slice(0, length - suffix.length) + suffix : this;
    });

    /**
     * @name 去掉html中的标签元素
     * @return String
     */
    add("stripTags", function () {
        return this.replace(/<\/?[^>]+>/gi, '');
    });

})();