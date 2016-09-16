FROM ubuntu:14.04

RUN    apt-get update
RUN    apt-get -y upgrade
RUN    apt-get -y install wget vim git libpq-dev make libpcre3 libpcre3-dev  libxml2-dev libxslt1-dev python-dev libgd2-xpm-dev libgeoip-dev

# Openresty (Nginx)
RUN    apt-get -y install nginx
RUN    wget http://openresty.org/download/ngx_openresty-1.4.3.9.tar.gz
RUN    tar xvfz ngx_openresty-1.4.3.9.tar.gz
RUN    cd ngx_openresty-1.4.3.9 ; ./configure --with-luajit  --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_realip_module --with-http_stub_status_module --with-http_ssl_module --with-http_sub_module --with-http_xslt_module --with-ipv6 --with-http_postgres_module --with-pcre-jit;  make ; make install


EXPOSE 8080
CMD /usr/local/openresty/nginx/sbin/nginx -p `pwd` -c nginx.conf