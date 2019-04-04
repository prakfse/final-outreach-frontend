FROM httpd:2.4
COPY ./dist/outreachapp/index.html /usr/local/apache2/htdocs/index.html
COPY ./dist/outreachapp/main.js /usr/local/apache2/htdocs/main.js
COPY ./dist/outreachapp/polyfills.js /usr/local/apache2/htdocs/polyfills.js
COPY ./dist/outreachapp/es2015-polyfills.js /usr/local/apache2/htdocs/es2015-polyfills.js
COPY ./dist/outreachapp/runtime.js /usr/local/apache2/htdocs/runtime.js
COPY ./dist/outreachapp/styles.js /usr/local/apache2/htdocs/styles.js
COPY ./dist/outreachapp/vendor.js /usr/local/apache2/htdocs/vendor.js
COPY ./dist/outreachapp/_htaccess /usr/local/apache2/htdocs/
COPY ./dist/outreachapp/httpd.config /usr/local/apache2/conf/httpd.conf
COPY ./dist/outreachapp/ /usr/local/apache2/htdocs/

FROM node:10.15.1

RUN mkdir /usr/src/app

WORKDIR /usr/src/app		

RUN npm cache clean --force

RUN rm -rf node_modules/

RUN npm install -g @angular/cli


COPY . /usr/src/app/

CMD ng serve --host 172.18.2.50:2375 --port 4201

EXPOSE 4201