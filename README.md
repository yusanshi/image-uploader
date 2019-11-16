# Image Uploader For Markdown Writing


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