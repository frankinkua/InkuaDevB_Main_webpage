/* simple scripts file for Themes.guide Bootstrap 4 theme templates */

// init Bootstrap tooltips & popovers
$("[data-toggle=popover]").popover();
$("[data-toggle=tooltip]").tooltip();

/* copy demo sources to clipboard */

var modalCode = $('<div id="modalCode" class="modal fade" />');
var modalDialog = $(
  '<div class="modal-dialog modal-dialog-centered modal-lg" />'
);
var modalContent = $('<div class="modal-content" />');

var modalBody = $(
  '<div class="modal-body d-block py-3"><span class="badge badge-dark font-weight-light mb-2">The following markup was copied to the clipboard...</span><textarea id="code" class="form-control" rows="10" wrap="off"></textarea></div>'
);
modalHeader.appendTo(modalContent);
modalBody.appendTo(modalContent);
modalContent.appendTo(modalDialog);
modalDialog.appendTo(modalCode);
modalCode.appendTo("body");

var css =
  ".copyable{position:relative}.copyable .copyable-trigger{color:#333;background-color:rgba(255,255,255,.8);border:1px #888 solid;border-radius:4px;position:absolute;padding:3px 6px;top:0;right:0;z-index:102;text-decoration:none;font-family:monospace;font-size:11px;cursor:pointer;display:none}.copyable:hover .copyable-trigger{display:inline-block}";

$("head").append($(document.createElement("style")).html(css));

$("main")
  .find(
    ".card, .btn-group, .btn, .navbar, .modal, .form-group, .list-group, .alert, .progress, .table-responsive, .jumbotron, .badge, .nav"
  )
  .each(function () {
    var $this = $(this);
    var content = $this.get(0).outerHTML;
    var arrayOfLines = content.match(/[^\r\n]+/g);
    var secondLine = 0;
    for (var l in arrayOfLines) {
      var tabCount;
      if (l > 0) {
        tabCount = ((arrayOfLines[l] || "").match(/[\s{4}|\t{1}]\S/g) || [])
          .length;
        if (l == 1) {
          secondLine = tabCount;
        }
        arrayOfLines[l] = arrayOfLines[l].replace(/\t{1}/g, "~");
        arrayOfLines[l] = arrayOfLines[l].replace(/\s{4}/g, "~");
        for (var i = 0; i < secondLine + 1; i++) {
          arrayOfLines[l] = arrayOfLines[l].replace(/~/, "");
        }
        arrayOfLines[l] = arrayOfLines[l].replace(/~/g, "\t");
      }
    }
    content = arrayOfLines.join("\n");
    var title = "Click to view/copy source";

    $this.addClass("copyable");
    var trigger = $("<a href class='copyable-trigger'>&lt;&gt;</a>");
    $this.append(trigger);

    trigger.tooltip({
      title: title,
      placement: "bottom",
      trigger: "hover",
    });

    trigger.on("click", function (e) {
      copyTextToClipboard(content);
      $("#code").text(content);
      $("#modalCode").modal("show");
      return false;
    });
  });
