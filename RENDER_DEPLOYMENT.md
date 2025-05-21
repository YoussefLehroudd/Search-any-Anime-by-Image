# Guide de déploiement sur Render

## Étapes de déploiement:

1. **Créer un compte Render**
   - Allez sur [render.com](https://render.com)
   - Cliquez sur "Get Started"
   - Inscrivez-vous avec GitHub pour faciliter la connexion

2. **Déployer le site**
   - Une fois connecté à Render, cliquez sur "New +"
   - Sélectionnez "Static Site"
   - Connectez votre dépôt GitHub si ce n'est pas déjà fait
   - Sélectionnez le dépôt "SauceKudasai-master"

3. **Configuration du déploiement**
   - Nom: "saucekudasai" (ou choisissez votre nom)
   - Branch: main (ou master)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Cliquez sur "Create Static Site"

4. **Vérification**
   - Render va automatiquement déployer votre site
   - Attendez que le déploiement soit terminé
   - Vous recevrez une URL comme: `https://votre-app.onrender.com`

## Notes importantes:
- Le premier déploiement peut prendre quelques minutes
- Render redéploiera automatiquement à chaque push sur la branche principale
- Vous pouvez configurer un domaine personnalisé dans les paramètres du site

## En cas de problème:
- Vérifiez les logs de build dans l'interface Render
- Assurez-vous que tous les fichiers sont bien commités sur GitHub
- Vérifiez que le dossier 'build' est généré correctement localement avec `npm run build`
