# Image Uploader


### Change file size limit

**PHP**

```
# /etc/php/7.0/fpm/php.ini
upload_max_filesize = 100M
post_max_size = 10M
```

**Nginx**

```
client_max_body_size 10M;
```
