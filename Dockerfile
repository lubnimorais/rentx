# IMAGEM DO DOCKER
FROM node

# QUANDO PEDIR PARA RODAR A CRIAÇÃO DO CONTAINER
# VAMOS DFINIR UM DIRETÓRIO ONDE QUEREMOS QUE AS
# INFORMAÇÕES ESTEJAM CONTIDAS. ENTÃO CONSEGUIMOS
# NA CRIAÇÃO DO CONTAINER CONSEGUIMOS CRIAR ESSE
# DIRETOÓRIO DE TRABALHO
WORKDIR /usr/app

# VAI COPIAR O ARQUIVO PARA DENTRO DO DIRETÓRIO
# POSICÇÃO
# COPY DE_ONDE_ESTA_VINDO PARA_ONDE_VAI
COPY package.json ./

# ESTÁ USANDO NPM PORQUE NEM TODAS AS IMAGENS
# JÁ VEM COM O YARN INSTALADO
RUN npm install

# AGORA COPIA TUDO PARA DENTRO DA PASTA DO
# DIRETÓRIO DE TRABALHO (PASTA RAIZ)
COPY . .

# DÁ UM EXPOSE NA PORTA QUE ESTAMOS UTILIZANDO
# DENTRO DO NOSSO CONTAINER (DA APLICAÇÃO)
EXPOSE 3333

# PERMITE QUE A GENTE RODE OS COMANDO QUE PRECISAMOS
# RODAR QUE É O SCRIPT QUE UTILIZAMOS PARA RODAR A
# APLICAÇÃO, SÓ QUE VAMOS RODAR UTILIZANDO O NPM.
# NO CMD SEPARA AS PARTES DO SCRIPT DENTRO DE UM
# ARRAY
CMD ["npm", "run", "dev:server"]