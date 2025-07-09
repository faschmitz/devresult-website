#!/bin/bash

# Deploy do site DevResult IT Solutions
# Opção 1: Firebase Hosting (Recomendado - Mais simples)
# Opção 2: Cloud Storage (Alternativa)

echo "🚀 Deploy DevResult IT Solutions"
echo ""
echo "Escolha uma opção:"
echo "1) Firebase Hosting (Recomendado - Grátis)"
echo "2) Cloud Storage (Alternativa)"
echo ""
read -p "Opção (1 ou 2): " option

case $option in
    1)
        echo "🔥 Usando Firebase Hosting..."
        
        # Verificar se firebase está instalado
        if ! command -v firebase &> /dev/null; then
            echo "❌ Firebase CLI não instalado."
            echo "Instale com: npm install -g firebase-tools"
            exit 1
        fi
        
        # Inicializar se necessário
        if [ ! -f "firebase.json" ]; then
            echo "⚙️ Configurando Firebase..."
            firebase init hosting
        fi
        
        # Deploy
        firebase deploy
        ;;
    2)
        echo "🪣 Usando Cloud Storage..."
        ./deploy-simple.sh
        ;;
    *)
        echo "❌ Opção inválida!"
        exit 1
        ;;
esac