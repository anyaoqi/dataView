ARG IMAGE_FROM
FROM ${IMAGE_FROM}
# 创建目录，并且指定工作目录
WORKDIR /var/www/html

# 将当前目录所有文件复制至工作目录，此处会忽略.dockerignore中的文件或文件夹，COPY和ADD命令都会忽略
COPY ./dist /usr/share/nginx/html
COPY ./APP-META/cloud/nginx.conf /etc/nginx/conf.d/default.conf

#映射4000端口(已经修改项目的默认端口为3004)(指定容器需要映射到宿主机器的端口)
EXPOSE 80

# 运行命令gulp start
CMD ["/usr/sbin/nginx", "-g","daemon off;"]