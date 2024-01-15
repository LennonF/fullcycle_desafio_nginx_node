FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install mysql

RUN git clone https://github.com/vishnubob/wait-for-it.git /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it/wait-for-it.sh

COPY . .

EXPOSE 3000

CMD [ "/usr/local/bin/wait-for-it/wait-for-it.sh", "mysql:3306", "--", "node", "index.js" ]
