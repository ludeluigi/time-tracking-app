FROM node:18

WORKDIR /app

# Copie apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o código da aplicação
COPY index.js ./

# Crie um usuário não root para rodar a aplicação
RUN useradd -m myuser
USER myuser

# Exponha a porta
EXPOSE 3000

# Inicie a aplicação
CMD ["node", "index.js"]
