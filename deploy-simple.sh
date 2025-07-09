#!/bin/bash

# Deploy simples para Google Cloud Storage
# DevResult IT Solutions

BUCKET_NAME="devresult-website"
PROJECT_ID=$(gcloud config get-value project)

echo "🚀 Deploy simples no Google Cloud Storage"
echo "📋 Projeto: $PROJECT_ID"
echo "🪣 Bucket: $BUCKET_NAME"

# Criar bucket se não existir
if ! gsutil ls gs://$BUCKET_NAME/ &>/dev/null; then
    echo "📦 Criando bucket..."
    gsutil mb gs://$BUCKET_NAME/
    
    # Configurar para website
    gsutil web set -m index.html -e index.html gs://$BUCKET_NAME/
    
    # Tornar público
    gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME/
fi

# Upload dos arquivos
echo "📤 Fazendo upload dos arquivos..."
gsutil -m cp -r . gs://$BUCKET_NAME/

# Configurar cache
echo "⚡ Configurando cache..."
gsutil -m setmeta -h "Cache-Control:public,max-age=3600" gs://$BUCKET_NAME/*.html
gsutil -m setmeta -h "Cache-Control:public,max-age=86400" gs://$BUCKET_NAME/*.css
gsutil -m setmeta -h "Cache-Control:public,max-age=86400" gs://$BUCKET_NAME/*.js
gsutil -m setmeta -h "Cache-Control:public,max-age=2592000" gs://$BUCKET_NAME/**/*.jpg
gsutil -m setmeta -h "Cache-Control:public,max-age=2592000" gs://$BUCKET_NAME/**/*.avif

echo "✅ Deploy concluído!"
echo "🌐 Site: https://storage.googleapis.com/$BUCKET_NAME/index.html"
echo "🔗 Ou configure um domínio personalizado"