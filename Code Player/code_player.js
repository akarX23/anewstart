var clicked = true;
var active_edits = 4;
customizeWidth();

function init() {
    $(".lang-toggle").each(function () {
        this.clicked = true;
    });
}

function customizeWidth() {
    var width = $(window).width() / active_edits;

    $(".editor").each(function () {
        $(this).width(width - 2);
        $(this).width($(this).width() - 1);
    });
}

function updateOutput() {
    $("iframe").contents().find("html").html("<html><head><style type='text/css'>" + $("#css-code").val() + "</style></head><body>" + $("#html-code").val() + "</body></html>");

    document.getElementById("result").contentWindow.eval($("#js-code").val());
}

$(".lang-toggle").hover(function () {
    if (!this.clicked) {
        $(this).css("border-top-style", "solid");
    }
}, function () {
    if (!this.clicked) {
        $(this).css("border-top-style", "hidden");
    }
});

$(".lang-toggle").click(function () {
    this.clicked = !this.clicked;
    var id = "#" + $(this).attr("id") + "-edit";
    active_edits = this.clicked ? active_edits + 1 : active_edits - 1;
    $(this).css("border-top-style", this.clicked ? "solid" : "hidden");
    $(id).css("display", this.clicked ? "block" : "none");
    customizeWidth();
});

$("textarea").on("change keyup paste cut copy", function (e) {
    updateOutput();
});

$(document).ready(function () {
    updateOutput();
    $("#js-code").val("//Write Javascript code here");
    init();
});

$(window).resize(function () {
    customizeWidth();
});
