$(function () {
  $('#upload-zone').dmUploader({ //
    url: 'upload.php',
    maxFileSize: 10000000, // 10 Megs 
    allowedTypes: 'image/*',
    extFilter: ["jpg", "jpeg", "bmp", "png", "gif", "tiff", "svg"],
    onDragEnter: function () {
      // Happens when dragging something over the DnD area
      this.addClass('active');
    },
    onDragLeave: function () {
      // Happens when dragging something OUT of the DnD area
      this.removeClass('active');
    },
    onNewFile: function (id, file) {
      // When a new file is added using the file selector or the DnD area
      uiMultiAddFile(id, file);

      if (typeof FileReader !== "undefined") {
        var reader = new FileReader();
        var img = $('#uploaderFile' + id).find('img');

        reader.onload = function (e) {
          img.attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
      }
    },
    onBeforeUpload: function (id) {
      // about tho start uploading a file
      uiMultiUpdateFileProgress(id, 0, '', true);
      uiMultiUpdateFileStatus(id, 'uploading', 'Uploading...');
    },
    onUploadProgress: function (id, percent) {
      // Updating file progress
      uiMultiUpdateFileProgress(id, percent);
    },
    onUploadSuccess: function (id, data) {
      var response = JSON.parse(data);
      if (response.status == 'ok') {
        uiMultiUpdateFileStatus(id, 'success', 'Upload Complete');
        uiMultiUpdateFileProgress(id, 100, 'success', false);
        copyTextToClipboard(toMarkdownTag(response.msg));
      } else {
        uiMultiUpdateFileStatus(id, 'danger', response.msg);
        uiMultiUpdateFileProgress(id, 0, 'danger', false);
      }
    },
    onUploadError: function (id, xhr, status, message) {
      uiMultiUpdateFileStatus(id, 'danger', message);
      uiMultiUpdateFileProgress(id, 0, 'danger', false);
    }
  });
});


// Creates a new file and add it to our list
function uiMultiAddFile(id, file) {
  var template = $('#files-template').text();
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#files').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#files').prepend(template);
}

// Changes the status messages on our list
function uiMultiUpdateFileStatus(id, status, message) {
  $('#uploaderFile' + id).find('span').html(message).prop('class', 'status text-' + status);
}

// Updates a file progress, depending on the parameters it may animate it or change the color.
function uiMultiUpdateFileProgress(id, percent, color, active) {
  color = (typeof color === 'undefined' ? false : color);
  active = (typeof active === 'undefined' ? true : active);

  var bar = $('#uploaderFile' + id).find('div.progress-bar');

  bar.width(percent + '%').attr('aria-valuenow', percent);
  bar.toggleClass('progress-bar-striped progress-bar-animated', active);

  if (percent === 0) {
    bar.html('');
  } else {
    bar.html(percent + '%');
  }

  if (color !== false) {
    bar.removeClass('bg-success bg-info bg-warning bg-danger');
    bar.addClass('bg-' + color);
  }
}


function toMarkdownTag(url) {
  return '![](' + url + ')';
}

function toHTMLTag(url) {
  return '<img src="' + url + '">';
}

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}


