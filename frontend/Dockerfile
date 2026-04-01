FROM nginx:1.25-alpine

# Supprimer la config par défaut de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre configuration nginx
COPY nginx.conf /etc/nginx/conf.d/vitalsync.conf

# Copier les fichiers statiques
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
