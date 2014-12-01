(function(){
    var utils = UM.utils;
    function hrefStartWith(href, arr) {
        href = href.replace(/^\s+|\s+$/g, '');
        for (var i = 0, ai; ai = arr[i++];) {
            if (href.indexOf(ai) == 0) {
                return true;
            }
        }
        return false;
    }

    UM.registerWidget('link', {
        tpl: "<div class=\"form-group\">" +
            "<label class=\"col-md-4 control-label\" for=\"href\"><%=lang_input_url%></label>" +
            "<div class=\"col-md-8\"><div class=\"form-control-wrapper\"><input class=\"edui-link-txt form-control\" id=\"edui-link-Jhref\" type=\"text\" /></div></div>" +
            "</div>" +
            "<div class=\"form-group\">" +
            "<label class=\"col-md-4 control-label\" for=\"title\"><%=lang_input_title%></label>" +
            "<div class=\"col-md-8\"><div class=\"form-control-wrapper\"><input class=\"edui-link-txt form-control\" id=\"edui-link-Jtitle\" type=\"text\" /></div></div>" +
            "</div>" +
            "<div class=\"form-group\">" +
            "<div class=\"col-md-offset-4 col-md-8\"><label for=\"target\"><%=lang_input_target%></label><input id=\"edui-link-Jtarget\" type=\"checkbox\"/></div>" +
            "</div>",
        initContent: function (editor) {
            var lang = editor.getLang('link');
            if (lang) {
                var html = $.parseTmpl(this.tpl, lang.static);
            }
            this.root().html(html);
        },
        initEvent: function (editor, $w) {
            var link = editor.queryCommandValue('link');
            if(link){
                $('#edui-link-Jhref',$w).val(utils.html($(link).attr('href')));
                $('#edui-link-Jtitle',$w).val($(link).attr('title'));
                $(link).attr('target') == '_blank' && $('#edui-link-Jtarget').attr('checked',true)
            }
            $('#edui-link-Jhref',$w).focus();
        },
        buttons: {
            'ok': {
                exec: function (editor, $w) {
                    var href = $('#edui-link-Jhref').val().replace(/^\s+|\s+$/g, '');

                    if (href) {
                        editor.execCommand('link', {
                            'href': href,
                            'target': $("#edui-link-Jtarget:checked").length ? "_blank" : '_self',
                            'title': $("#edui-link-Jtitle").val().replace(/^\s+|\s+$/g, ''),
                            '_href': href
                        });
                    }
                }
            },
            'cancel':{}
        },
        width: 500
    })
})();

