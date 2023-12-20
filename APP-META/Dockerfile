FROM nginx
COPY ./dist /usr/share/nginx/html
COPY ./APP-META/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/usr/sbin/nginx", "-g","daemon off;"]
