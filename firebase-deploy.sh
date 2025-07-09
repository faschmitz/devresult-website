#!/bin/bash

# Deploy DevResult IT Solutions no Firebase Hosting

echo "🔥 Deploy Firebase Hosting - DevResult IT Solutions"
echo ""

# Verificar se firebase está instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI não instalado."
    echo "📦 Instalando Firebase CLI..."
    npm install -g firebase-tools
    
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar Firebase CLI."
        echo "Instale manualmente: npm install -g firebase-tools"
        exit 1
    fi
fi

# Instruções de login
echo "🔐 PASSO 1: Faça login no Firebase"
echo "Execute: firebase login"
echo "Depois pressione Enter para continuar..."
read -p ""

# Verificar se está logado
if ! firebase projects:list &>/dev/null; then
    echo "❌ Você precisa fazer login primeiro."
    echo "Execute: firebase login"
    exit 1
fi

# Verificar se o projeto existe
echo "🔍 Verificando projeto devresult-website..."
if ! firebase projects:list | grep -q "devresult-website"; then
    echo "❌ Projeto 'devresult-website' não encontrado."
    echo "📋 Projetos disponíveis:"
    firebase projects:list
    echo ""
    echo "🔧 Certifique-se de que o projeto existe no Firebase Console"
    exit 1
fi

# Configurar projeto
echo "⚙️ Configurando projeto..."
firebase use devresult-website

# Fazer deploy
echo "🚀 Iniciando deploy..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy concluído com sucesso!"
    echo "🌐 Site disponível em: https://devresult-website.web.app"
    echo "🔗 URL alternativa: https://devresult-website.firebaseapp.com"
    echo ""
    echo "📊 Para monitorar: firebase hosting:channel:list"
    echo "🔧 Para configurar domínio personalizado, acesse o Firebase Console"
else
    echo "❌ Erro durante o deploy."
    exit 1
fi