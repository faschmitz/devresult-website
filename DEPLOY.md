# 🔥 Deploy Firebase Hosting - DevResult IT Solutions

## 🚀 Deploy Rápido (Método Recomendado)

### 1. Executar Script Automático
```bash
./firebase-deploy.sh
```

### 2. Ou Manual
```bash
# Instalar Firebase CLI (se não tiver)
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

## 📋 Pré-requisitos

### Criar Projeto Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Create Project"
3. Nome: **DevResult IT Solutions**
4. Project ID: **devresult-website**
5. Ative o Hosting

## 🌐 URLs do Site

Após o deploy:
- **Principal**: https://devresult-website.web.app
- **Alternativa**: https://devresult-website.firebaseapp.com

## 🔧 Configurar Domínio Personalizado

```bash
# Adicionar domínio personalizado
firebase hosting:channel:deploy production --only hosting

# Ou no console:
# Firebase Console > Hosting > Add custom domain
```

## 💰 Custos

**Firebase Hosting - Plano Gratuito:**
- ✅ **10 GB** de armazenamento
- ✅ **360 MB/dia** de transferência
- ✅ **SSL** gratuito
- ✅ **CDN global**

**Perfeito para o site da DevResult!**

### Opção 2: Cloud Storage
```bash
# Configurar projeto
gcloud config set project YOUR_PROJECT_ID

# Executar script
./deploy.sh
# Escolher opção 2
```

**Vantagens:**
- ✅ Muito barato
- ✅ Integração com GCP
- ✅ Controle total

## 🔧 Configurações Avançadas

### Configurar Domínio Personalizado
```bash
# Verificar domínio
gcloud domains verify DOMAIN_NAME

# Mapear domínio
gcloud app domain-mappings create DOMAIN_NAME
```

### Configurar SSL (HTTPS)
```bash
# Habilitar SSL gerenciado
gcloud app ssl-certificates create --domains=YOUR_DOMAIN
```

### Configurar CDN
```bash
# Criar bucket para assets estáticos
gsutil mb gs://YOUR_PROJECT_ID-assets

# Configurar Cloud CDN
gcloud compute backend-buckets create website-assets-backend \
    --gcs-bucket-name=YOUR_PROJECT_ID-assets
```

## 📊 Monitoramento

### Verificar Status
```bash
# Ver logs em tempo real
gcloud app logs tail -s default

# Ver versões deployadas
gcloud app versions list

# Ver informações do serviço
gcloud app services list
```

### Métricas
- Acesse [Google Cloud Console](https://console.cloud.google.com)
- Vá para App Engine > Dashboard
- Monitore tráfego, latência e erros

## 🛠️ Troubleshooting

### Problema: Erro de permissões
```bash
# Verificar permissões
gcloud auth list
gcloud projects get-iam-policy PROJECT_ID
```

### Problema: Quota excedida
```bash
# Verificar quotas
gcloud compute project-info describe --format="table(quotas:format='table(metric,limit,usage)')"
```

### Problema: Deploy falha
```bash
# Verificar logs de build
gcloud app logs tail -s default
```

## 💰 Custos

### App Engine Padrão
- **Instâncias F1 (gratuitas)**: 28 horas/dia
- **Bandwidth**: 1GB/dia gratuito
- **Armazenamento**: 1GB gratuito

### Estimativa para site da DevResult
- **Tráfego baixo**: R$ 0-50/mês
- **Tráfego médio**: R$ 50-200/mês
- **Tráfego alto**: R$ 200+/mês

## 📞 Suporte

Para problemas específicos:
1. [Documentação oficial](https://cloud.google.com/appengine/docs)
2. [Stack Overflow](https://stackoverflow.com/questions/tagged/google-app-engine)
3. [Google Cloud Support](https://cloud.google.com/support)

## 🔗 URLs Úteis

- **Console**: https://console.cloud.google.com
- **App Engine**: https://console.cloud.google.com/appengine
- **Monitoramento**: https://console.cloud.google.com/monitoring
- **Billing**: https://console.cloud.google.com/billing

---

**Desenvolvido para DevResult IT Solutions**  
*Transformando dados em resultados* 🚀