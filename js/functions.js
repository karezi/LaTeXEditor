//全局变量
var st;

//翻译
function tr(s) {
    return WinJS.Resources.getString(s).value;
}

function processAll() {
    WinJS.Resources.processAll();
}

//初始化预定义字符标题以及动态展示
last = null;
function initSymbolClick() {
    $(".greekAlphabetSymbols").hide();
    $(".symbol-set-greekAlphabetSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".greekAlphabetSymbols").show();
        last = ".greekAlphabetSymbols";
    });
    $(".expansionSymbols").hide();
    $(".symbol-set-expansionSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".expansionSymbols").show();
        last = ".expansionSymbols";
    });
    $(".accent").hide();
    $(".symbol-set-accent").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".accent").show();
        last = ".accent";
    });
    $(".boundariesSymbol").hide();
    $(".symbol-set-boundariesSymbol").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".boundariesSymbol").show();
        last = ".boundariesSymbol";
    });
    $(".extendSymbols").hide();
    $(".symbol-set-extendSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".extendSymbols").show();
        last = ".extendSymbols";
    });
    $(".notSymbols").hide();
    $(".symbol-set-notSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".notSymbols").show();
        last = ".notSymbols";
    });
    $(".doubleSymbols").hide();
    $(".symbol-set-doubleSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".doubleSymbols").show();
        last = ".doubleSymbols";
    });
    $(".relationshipSymbols").hide();
    $(".symbol-set-relationshipSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".relationshipSymbols").show();
        last = ".relationshipSymbols";
    });
    $(".logicSymbols").hide();
    $(".symbol-set-logicSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".logicSymbols").show();
        last = ".logicSymbols";
    });
    $(".arrowSymbols").hide();
    $(".symbol-set-arrowSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".arrowSymbols").show();
        last = ".arrowSymbols";
    });
    $(".choasSymbols").hide();
    $(".symbol-set-choasSymbols").click(function () {
        if (last) {
            $(last).hide();
        }
        $(".choasSymbols").show();
        last = ".choasSymbols";
    });
    //    $(".otherSymbols").hide();
    //    $(".symbol-set-otherSymbols").click(function () {
    //        if (last) {
    //           $(last).hide();
    //       }
    //       $(".otherSymbols").show();
    //        last = ".otherSymbols";
    //    });

}

//填充预定义字符
function fill(index, arrayName) {
    if (document.selection) {
        window.document.getElementById("latex-edit").focus();
        sel = document.selection.createRange();
        sel.text = arrayName.data[index].s;
        sel.select();
        moveCursor(window.document.getElementById("latex-edit"), arrayName.data[index].pos);
    }
    st = getText();
    showPicture();
}

//显示图片
function showPicture() {    
    if (st && st != "") {
        WinJS.xhr({ url: getURI(), responseType: "blob" }).done(function (request) {
            var imageBlob = URL.createObjectURL(request.response);
            var imageTag = document.getElementById("latex-picture");
            imageTag.src = imageBlob;
        });
        $("#latex-picture").show();
    } else {
        $("#latex-picture").attr("src", "/images/none.png");
        $("#latex-picture").show();
    }
}

function showPicture1() {
    if (st && st != "") {
        $("#latex-picture").attr("src", "http://latex.codecogs.com/png.latex?\\huge \\inline \\dpi{300}" + encodeURIComponent(st));
        $("#latex-picture").show();
        //        window.document.getElementById("latex-picture").setAttribute("src", "http://latex.codecogs.com/png.latex?\\huge \\inline \\dpi{300}" + encodeURIComponent(s));
        //        document.getElementById("test").innerHTML = "http://www.forkosh.com/cgi-bin/mathtex.cgi?\\huge \\inline \\dpi{300}" + encodeURIComponent(s);
        //        window.document.getElementById("latex-picture").style.display = "inline";
    }
}

//清空文本
function clearText() {
    $("#latex-clear").click(function () {
        $("#latex-edit").html("");
        $("#latex-picture").attr("src", "/images/none.png");
        $("#latex-picture").show();

    });
}

//移动光标
function moveCursor(obj, j) {
    obj.focus();
    var len = getCursorPos(obj);
    if (document.selection) {
        var sel = obj.createTextRange();
        sel.moveStart('character', len - j);
        sel.collapse();
        sel.select();
    } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
        obj.selectionStart = obj.selectionEnd = len;
    }
}

function getCursorPos(obj) {
    var rngSel = document.selection.createRange();//建立选择域
    var rngTxt = obj.createTextRange();//建立文本域
    var flag = rngSel.getBookmark();//用选择域建立书签
    rngTxt.collapse();//瓦解文本域到开始位,以便使标志位移动
    rngTxt.moveToBookmark(flag);//使文本域移动到书签位
    rngTxt.moveStart('character', -obj.value.length);//获得文本域左侧文本
    str = rngTxt.text.replace(/\r\n/g, '');//替换回车换行符
    return (str.length);//返回文本域文本长度
}

//获取文本
function getText() {
    return window.document.getElementById("latex-edit").innerText;
}

//监视用户行为
function loadPicture() {
//    $("#latex-edit").one("click", function () {
//            $("#latex-edit").html("");
//    });
    $("#latex-edit").change(function () {
        action();
    });
    $("#latex-edit").blur(function () {
        action();
    });
    $("#latex-edit").keyup(function () {
        action();
    });
    $("select").change(function () {
        action();
    });
    $("#latex-edit").mouseleave(function () {
        action();
    });
}

//根据状态加载图片
function action() {
    $(".win-ring").show();
    st = getText();
    showPicture();
    $("#latex-picture").load(function () {
        $(".win-ring").hide();
        $("#latex-picture").show();
    });
}

//获取uri
function getURI() {
    var uri = '';
    st = getText();
    var fontsize = $("#fontsize").val() + " ";
    var font = $("#font").val() + " ";
    var dpi = "\\\dpi{" + $("#dpi").val(); + "}";
    var bg = $("#bg").val() + " ";
    if (st && st != "") {
        if ($("#format").val() == "png")
            uri = "http://latex.codecogs.com/png.latex?" + "\\inline " + dpi + " " + font + bg + fontsize + encodeURIComponent(st);
        else if ($("#format").val() == "gif")
            uri = "http://latex.codecogs.com/gif.latex?" + "\\inline " + dpi + " " + font + bg + fontsize + encodeURIComponent(st);
        else if ($("#format").val() == "svg")
            uri = "http://latex.codecogs.com/svg.latex?" + "\\inline " + dpi + " " + font + bg + fontsize + encodeURIComponent(st);
    }
    return uri;
}

//保存图片
function save() {
    
    var currentState = Windows.UI.ViewManagement.ApplicationView.value;
    if (currentState === Windows.UI.ViewManagement.ApplicationViewState.snapped &&
        !Windows.UI.ViewManagement.ApplicationView.tryUnsnap()) {
        // Fail silently if we can't unsnap
        return;
    }

    // Create the picker object and set options
    var savePicker = new Windows.Storage.Pickers.FileSavePicker();
    savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
    // Dropdown of file types the user can save the file as
    if ($("#format").val() == "png") {
        savePicker.fileTypeChoices.insert("PNG Image", [".png"]);

    } else if ($("#format").val() == "gif") {
        savePicker.fileTypeChoices.insert("GIF Image", [".gif"]);

    } else if ($("#format").val() == "svg") {
        savePicker.fileTypeChoices.insert("SVG Image", [".svg"]);

    }
    // Default file name if the user does not type one in or select a file to replace
    savePicker.suggestedFileName = "image";

    savePicker.pickSaveFileAsync().then(function (file) {
        if (file) {
            var downloader = new Windows.Networking.BackgroundTransfer.BackgroundDownloader();
            download = downloader.createDownload(Windows.Foundation.Uri(getURI()), file);
            promise = download.startAsync().then(function () {
            });
        } else {
            WinJS.log && WinJS.log("Operation cancelled.", "sample", "status");
        }
    });
}

function save1() {
    $("#picture").attr("href", "http://latex.codecogs.com/png.download?\\huge \\dpi{300} " + getText());  
}
