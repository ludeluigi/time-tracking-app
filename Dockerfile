# Use imagem oficial Node.js LTS
FROM node:18-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o restante do código da aplicação
COPY . .

# Crie um usuário não root e atribua permissões
RUN useradd -m myuser && chown -R myuser /app

# Troque para o usuário não root
USER myuser

# Exponha a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]

