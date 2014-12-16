function tr(s) {
    return WinJS.Resources.getString(s).value;
}
(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: 将数据替换为实际数据。
    // 当异步源中的数据可用时，可以添加此数据。
    generateSampleData().forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.define("Data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });

    // 获取项的引用，以便将组键和项标题用作
    //对可轻松序列化的项的唯一引用。
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // 此功能返回仅包含属于
    // 提供的组的项的 WinJS.Binding.List。
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    // 获取与提供的组键相对应的唯一组。
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // 从提供的字符串数组中获取唯一项，此数组应包含一个
    // 组键和项标题。
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    // 返回可以添加到应用程序的
    // 数据列表中的示例数据数组。
    function generateSampleData() {
        //latex编辑区域
        var latexEditArea = "<textarea id='latex-edit' autofocus='true' cols='61' rows='12'></textarea>";
        //显示图片按钮
//        var clickToShow = "<button id='latex-show' onclick='showPicture();'>click here to show</button><br /><br /><br /><br />";
        //提示
        var remind = "<p>" + tr("remind") + "</p>";
        //生成的图片
        var pictureShow = "<br /><br /><a id='picture'><img id='latex-picture' src='/images/happy.png' / ></a><br /><br /><br />";
        //清除
        var clear = "<button id='latex-clear' onclick=''><span data-win-res=\"{textContent: 'Clear'}\"></span></button><br /><br />";
        //进度条
        var progress = "<div id='progress'><progress class='win-ring'></progress><div><br />";
        //保存图片按钮
        var storePicture = "<button id='latex-store' onclick='save();'><span data-win-res=\"{textContent: 'Save as'}\"></span></button><br /><br />" + tr("Predefined") + "：<br /><br />";
        //下拉框
        var select1 = "<select id='format' title=" + tr('format') + ">" +
                       "<option value='png'>png</option>" +
                       "<option value='gif'>gif</option>" +
                       "<option value='svg'>svg</option>+</select>&nbsp;&nbsp;";
        var select2 = "<select id='font' title=" + tr('font') + ">" +
                       "<option value=''>Latin Modern</option>" + 
                       "<option value='\\fn_jvn'>Verdana</option>" + 
                       "<option value='\\fn_cs'>Comic Sans</option>" +
                       "<option value='\\fn_cm'>Computer Modern</option>" +
                       "<option value='\\fn_phv'>Helvetica</option></select>&nbsp;<br />";
        var select3 = "<select id='fontsize' title=" + tr('fontsize') + ">" +
			           "<option value='\\tiny'>5pt</option>" +
			           "<option value='\\small'>9pt</option>" +
			           "<option value=''>10pt</option>" +
			           "<option value='\\large'>12pt</option>" +
			           "<option value='\\LARGE'>18pt</option>" +
			           "<option value='\\huge'  selected='selected'>20pt</option></select>&nbsp;&nbsp;";
        var select4 = "<select id='dpi' title=" + tr('dpi') + ">" +
                       "<option value='50'>50</option>" +
                       "<option value='80'>80</option>" +
                       "<option value='100'>100</option>" +
                       "<option value='110'>110</option>" +
                       "<option value='120'>120</option>" +
                       "<option value='150'>150</option>" +
                       "<option value='200'>200</option>" +
                       "<option value='300'  selected='selected'>300</option>" + 
                       "<option value='350'>350</option>" +
                       "<option value='400'>400</option>" +
                       "<option value='450'>450</option>" +
                       "<option value='500'>500</option>" +
                       "<option value='600'>600</option>" +
                       "<option value='700'>700</option>" +
                       "<option value='800'>800</option>" +
                       "<option value='900'>900</option>" +
                       "<option value='999'>999</option>" +
                       "</select>&nbsp;&nbsp;";
        var select5 = "<select id='bg' title=" + tr('bg') + ">" +
                       "<option value=''>" + tr('transparent') + "</option>" +
                       "<option value='\\bg_white'>" + tr('white') + "</option>" +
                       "<option value='\\bg_black'>" + tr('black') + "</option>" +
                       "<option value='\\bg_red'>" + tr('red') + "</option>" +
                       "<option value='\\bg_green'>" + tr('green') + "</option>" +
                       "<option value='\\bg_blue'>" + tr('blue') + "</option></select>&nbsp;&nbsp;";
        //item描述
        var itemDescription = tr("LaTeX edit zone");
        //group描述
        var groupDescription1 = tr("Describe");
        var groupDescription2 = tr("Describe2");
        //test
        var test = "<div id='test'></div>";
        //itemdetail--latex显示区域
        var latexShowArea = [
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[0].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[1].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[2].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[3].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[4].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[5].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[6].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[7].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[8].s + " </textarea><br /><br /><br />",
            "<textarea class='latex-code' autofocus='true' cols='65' rows='10' readonly='true'> " + latexDemo[9].s + " </textarea><br /><br /><br />"
        ];

        // 这三个字符串将对占位符图像进行编码。您需要将
        // 实际数据中的 backgroundImage 属性设置为图像的 URL。
        var g1Gray = "/images/black.png";
        var g2Gray = "/images/black4.png";
        var g3Gray = "/images/black3.png";
        var demo1 = "/images/1_1.png";
        var demo2 = "/images/2_1.png";
        var demo3 = "/images/3_1.png";
        var demo4 = "/images/4_1.png";
        var demo5 = "/images/5_1.png";
        var demo6 = "/images/6_1.png";
        var demo7 = "/images/7_1.png";
        var demo8 = "/images/8_1.png";
        var demo9 = "/images/9_1.png";
        var demo10 = "/images/10_1.png";

        //最大的组别
        var sampleGroups = [
            { key: "group1", title: tr("LaTeX edit zone"), subtitle: "", backgroundImage: g1Gray, description: groupDescription1 },
            { key: "group2", title: tr("Ten equations that changed the world"), subtitle: tr("vote"), backgroundImage: g2Gray, description: groupDescription2 }
        ];

        //所有符号按钮
        var allSymbols = createSymbols(greekAlphabetSymbols) + createSymbols(expansionSymbols) + createSymbols(accent) + createSymbols(boundariesSymbol) + createSymbols(extendSymbols) + createSymbols(notSymbols) + createSymbols(relationshipSymbols) + createSymbols(doubleSymbols) + createSymbols(logicSymbols) + createSymbols(arrowSymbols) + createSymbols(choasSymbols);

        //生成所有符号的按钮
        function createSymbols(arrayName) {
            var symbols = "<div class='allsy'>";
            var set = arrayName.data[0].s;
            symbols += "<button class='symbol-set symbol-set-" + arrayName.title + "'><div>"+set+"</div></button><div class='" + arrayName.title + "'>";
            //生成一堆按钮
            for (var i = 1; i < arrayName.data.length; i++) {
                //            var web = encodeURI("http://www.forkosh.com/cgi-bin/mathtex.cgi?" + greekAlphabetSymbols[i].s);
                var web = encodeURI("http://latex.codecogs.com/png.latex?" + arrayName.data[i].s);
                var symbol = "<button class='symbol-button' onclick='fill(" + i + "," + arrayName.title+ ");'><img src=" + web + " /></button>";
                symbols += symbol;
       //         if (i % 4 == 3) symbols += "<br />";
            }
            return symbols + '</div></div><br /><br />';
        }

        //script
        var script = "<img src='/images/logo.png' style='display:none' onload='javascript:initSymbolClick()'></img>" +
                     "<img src='/images/logo.png' style='display:none' onload='javascript:loadPicture()'></img>" +
                     "<img src='/images/logo.png' style='display:none' onload='javascript:processAll()'></img>" +
                     "<img src='/images/logo.png' style='display:none' onload='javascript:clearText()'></img>";

        // 两组中不同分别定义内容
        var sampleItems = [
            { group: sampleGroups[0], title: "", subtitle: "", description: itemDescription, content: script + remind + latexEditArea + clear + select1 + select2 + select3 + select4 + select5 + pictureShow + progress + storePicture + allSymbols, backgroundImage: g3Gray },

            { group: sampleGroups[1], title: "NO.1", subtitle: latexDemo[0].name, description: latexDemo[0].discription, content: latexShowArea[0] + latexDemo[0].discription, backgroundImage: demo1 },
            { group: sampleGroups[1], title: "NO.2", subtitle: latexDemo[1].name, description: latexDemo[1].discription, content: latexShowArea[1] + latexDemo[1].discription, backgroundImage: demo2 },
            { group: sampleGroups[1], title: "NO.3", subtitle: latexDemo[2].name, description: latexDemo[2].discription, content: latexShowArea[2] + latexDemo[2].discription, backgroundImage: demo3 },
            { group: sampleGroups[1], title: "NO.4", subtitle: latexDemo[3].name, description: latexDemo[3].discription, content: latexShowArea[3] + latexDemo[3].discription, backgroundImage: demo4 },
            { group: sampleGroups[1], title: "NO.5", subtitle: latexDemo[4].name, description: latexDemo[4].discription, content: latexShowArea[4] + latexDemo[4].discription, backgroundImage: demo5 },
            { group: sampleGroups[1], title: "NO.6", subtitle: latexDemo[5].name, description: latexDemo[5].discription, content: latexShowArea[5] + latexDemo[5].discription, backgroundImage: demo6 },
            { group: sampleGroups[1], title: "NO.7", subtitle: latexDemo[6].name, description: latexDemo[6].discription, content: latexShowArea[6] + latexDemo[6].discription, backgroundImage: demo7 },
            { group: sampleGroups[1], title: "NO.8", subtitle: latexDemo[7].name, description: latexDemo[7].discription, content: latexShowArea[7] + latexDemo[7].discription, backgroundImage: demo8 },
            { group: sampleGroups[1], title: "NO.9", subtitle: latexDemo[8].name, description: latexDemo[8].discription, content: latexShowArea[8] + latexDemo[8].discription, backgroundImage: demo9 },
            { group: sampleGroups[1], title: "NO.10", subtitle: latexDemo[9].name, description: latexDemo[9].discription, content: latexShowArea[9] + latexDemo[9].discription, backgroundImage: demo10 }

        ];

        return sampleItems;
    }

})();