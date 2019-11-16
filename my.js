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
      ui_multi_add_file(id, file);

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
      ui_multi_update_file_progress(id, 0, '', true);
      ui_multi_update_file_status(id, 'uploading', 'Uploading...');
    },
    onUploadProgress: function (id, percent) {
      // Updating file progress
      ui_multi_update_file_progress(id, percent);
    },
    onUploadSuccess: function (id, data) {
      // A file was successfully uploaded
      ui_multi_update_file_status(id, 'success', 'Upload Complete');
      ui_multi_update_file_progress(id, 100, 'success', false);
      copy_to_clipboard(data);
    },
    onUploadError: function (id, xhr, status, message) {
      ui_multi_update_file_status(id, 'danger', message);
      ui_multi_update_file_progress(id, 0, 'danger', false);
    }
  });
});


// Creates a new file and add it to our list
function ui_multi_add_file(id, file) {
  var template = $('#files-template').text();
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#files').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#files').prepend(template);
}

// Changes the status messages on our list
function ui_multi_update_file_status(id, status, message) {
  $('#uploaderFile' + id).find('span').html(message).prop('class', 'status text-' + status);
}

// Updates a file progress, depending on the parameters it may animate it or change the color.
function ui_multi_update_file_progress(id, percent, color, active) {
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

// Toggles the disabled status of Star/Cancel buttons on one particual file
function ui_multi_update_file_controls(id, start, cancel, wasError) {
  wasError = (typeof wasError === 'undefined' ? false : wasError);

  $('#uploaderFile' + id).find('button.start').prop('disabled', !start);
  $('#uploaderFile' + id).find('button.cancel').prop('disabled', !cancel);

  if (!start && !cancel) {
    $('#uploaderFile' + id).find('.controls').fadeOut();
  } else {
    $('#uploaderFile' + id).find('.controls').fadeIn();
  }

  if (wasError) {
    $('#uploaderFile' + id).find('button.start').html('Retry');
  }
}


function copy_to_clipboard(text) {

}