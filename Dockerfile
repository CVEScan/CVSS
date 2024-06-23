FROM --platform=linux/amd64 node:12

# Create unprivileged user

RUN groupadd --system cvss && useradd --system --create-home --gid cvss cvss

WORKDIR /home/cvss
COPY ./package*.json /home/cvss
RUN chown cvss:cvss --recursive /home/cvss/

USER cvss
RUN npm install

USER root
COPY . /home/cvss/

RUN chown cvss:cvss --recursive .
USER cvss

CMD ["npm", "start", "--prefix", "/home/cvss"]
