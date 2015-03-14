
(function() {

    /**
     *
     * 为数组原型拓展方法的工具函数
     * 如果数组的原型中不存在该方法，则将其添加到数组的原型上。
     *
     * @private (私有方法)
     */
    function add(name, method) {
        if( !Array.prototype[name] ) {
            Array.prototype[name] = method;
        }
    }

    /**
     * @name 对数组中的每个元素在指定的上下文中执行给定的回调函数.
     * @param handler: 每个元素执行的句柄函数.
     * @param scope:函数执行的上下文.
     * @return undefined
     *
     */
    add("forEach", function(handler, scope) {
        scope = scope || window;
        for( var i = 0; i < this.length; i++)
            handler.call(scope, this[i], i, this);
    });

    /**
     * @name 判断所有的数组元素是否能通过测试
     * @param handler: 每个元素执行的句柄函数.
     * @param scope:函数执行的上下文.
     * @return Boolean
     */
    add("every", function(handler, scope) {
        scope = scope || window;
        for( var i = 0; i < this.length; i++)
            if( !handler.call(scope, this[i], i, this) )
                return false;
        return true;
    });

    /**
     * 判断数组中的至少有一个元素通过测试
     * @param handler: 每个元素执行的句柄函数.
     * @param scope:函数执行的上下文.
     * @return Boolean
     */
    add("some", function(handler, scope) {
        scope = scope || window;
        for( var i = 0; i < this.length; i++)
            if( handler.call(scope, this[i], i, this) )
                return true;
        return false;
    });

    /**
     * @name 对数组内的元素进行包装后返回新的数组
     * @param handler: 每个元素执行的句柄函数.
     * @param scope:函数执行的上下文.
     * @type Array
     */
    add("map", function(handler, scope) {
        scope = scope || window;
        var r = [];
        for( var i = 0; i < this.length; i++)
            r[r.length] = handler.call(scope, this[i], i, this);
        return r;
    });

    /**
     * @name : 过滤通过测试的数组元素，并返回所有通过测试的元素组成的数组
     * @param handler: 每个元素执行的句柄函数.
     * @param scope:函数执行的上下文.
     * @return Array
     */
    add("filter", function(handler, scope) {
        scope = scope || window;
        var r = [];
        for( var i = 0; i < this.length; i++)
            if( handler.call(scope, this[i], i, this) )
                r[r.length] = this[i];
        return r;
    });

    /**
     * 查找给定元素在指定数组中的位置
     * @param subject:要查找的数组元素
     * @param offset：数组元素开始的偏移量，即从第几个开始查找该元素
     * @return Array
     */
    add("indexOf", function(subject, offset) {
        for( var i = offset || 0; i < this.length; i++)
            if ( this[i] === subject )
                return i;
        return -1;
    });

    /**
     *@name 去除数组元素中重复的元素
     * @return Array
     */
    add("unique", function() {
        return this.filter(function(element, index, array) {
            return array.indexOf(element) >= index;
        });
    });

})();