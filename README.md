# Image Uploader For Markdown Writing

https://img.yusanshi.com/

A simple image hosting service (图床). Drap, paste or browser images files, then get Mardown tags for them.

Based on [uploader](https://github.com/danielm/uploader). I added support for pasting image from clipboard. See my [Pull Request](https://github.com/danielm/uploader/pull/107).

Not finish yet. (Beautifying UI, adding support for manually copying ...)

![](https://img.yusanshi.com/upload/20191116222555855402.png)

With this, when writing Markdown, I use `Windows + Shift + S` to take a screenshot, `Ctrl + V` in the site, wait for it to finishing uploading and automatically copying into my clipboard, then `Ctrl + V` again in my Markdown editor.

## Miscellaneous

### Change file size limit

**PHP**

```
# /etc/php/7.0/fpm/php.ini
upload_max_filesize = 10M
post_max_size = 10M
```

**Nginx**

```
client_max_body_size 10M;
```

**upload.php**

```
$size_limit = 10000000; // 10MB
```

### Only allow `upload.php` to execute

```
location = /upload.php {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/run/php/php7.0-fpm.sock;
}
location ~ \.php$ {
    return 404;
}
```