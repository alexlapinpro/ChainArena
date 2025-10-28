# Ubuntu VPS Deployment Guide for Chain Arena Backend

## 📊 Prerequisites
- Ubuntu 20.04+ VPS with at least 2GB RAM
- Domain name pointing to your VPS IP
- Root or sudo access

## 🚀 Step 1: VPS Initial Setup

### Connect to VPS
```bash
ssh root@your-vps-ip
```

### Update system
```bash
apt update && apt upgrade -y
```

### Install essential packages
```bash
apt install -y curl wget git nginx certbot python3-certbot-nginx postgresql postgresql-contrib ufw
```

## 🐘 Step 2: Setup PostgreSQL Database

### Create database and user
```bash
sudo -u postgres psql

-- In PostgreSQL prompt:
CREATE DATABASE chainarena;
CREATE USER chainarena_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE chainarena TO chainarena_user;
\q
```

### Configure PostgreSQL for remote connections (if needed)
```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/12/main/postgresql.conf
# Change: listen_addresses = 'localhost' to listen_addresses = '*'

# Edit pg_hba.conf  
sudo nano /etc/postgresql/12/main/pg_hba.conf
# Add: host chainarena chainarena_user 0.0.0.0/0 md5

sudo systemctl restart postgresql
```

## 🔧 Step 3: Install Go

```bash
# Download and install Go 1.21
wget https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz

# Add to PATH
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc

# Verify installation
go version
```

## 📁 Step 4: Deploy Backend Code

### Clone and setup project
```bash
# Create project directory
mkdir -p /opt/chainarena
cd /opt/chainarena

# Upload your backend code (you can use git clone or scp)
# For now, we'll assume you're uploading files manually
# scp -r ./ChainArena/backend/* root@your-vps-ip:/opt/chainarena/

# Alternative: Initialize new Go project and copy files
go mod init GuildVault
```

### Create environment file
```bash
nano /opt/chainarena/.env
```

Add the following content:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=chainarena_user
DB_PASSWORD=your_secure_password
DB_NAME=chainarena
DB_PORT=5432

# Blockchain Configuration  
PRIVATE_KEY=your_private_key_here
RPC_URL=https://zkrpc-sepolia.xsollazk.com
CHAIN_ID=555776

# Server Configuration
PORT=5050
GIN_MODE=release

# Smart Contract Deployment (set to true for first run)
DEPLOY_CONTRACTS=false

# CORS Origins (your frontend domain)
CORS_ORIGINS=https://your-frontend-domain.com,http://localhost:3000
```

### Install dependencies and build
```bash
cd /opt/chainarena
go mod tidy
go build -o chainarena ./cmd/app
```

### Run database seeding (optional)
```bash
go run cmd/seed/main.go
```

## 🔐 Step 5: Setup NGINX and SSL

### Create NGINX configuration
```bash
nano /etc/nginx/sites-available/chainarena-api
```

Add configuration:
```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:5050;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With' always;
        
        # Handle preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
            add_header 'Access-Control-Allow-Headers' 'Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

### Enable site and setup SSL
```bash
# Enable site
ln -s /etc/nginx/sites-available/chainarena-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Setup SSL with Let's Encrypt
certbot --nginx -d api.your-domain.com

# Verify auto-renewal
certbot renew --dry-run
```

## ⚙️ Step 6: Create Systemd Service

### Create service file
```bash
nano /etc/systemd/system/chainarena.service
```

Add service configuration:
```ini
[Unit]
Description=Chain Arena API Server
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/chainarena
ExecStart=/opt/chainarena/chainarena
Restart=always
RestartSec=5
Environment=PATH=/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
EnvironmentFile=/opt/chainarena/.env

# Security settings
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ReadWritePaths=/opt/chainarena

[Install]
WantedBy=multi-user.target
```

### Start and enable service
```bash
systemctl daemon-reload
systemctl enable chainarena
systemctl start chainarena
systemctl status chainarena
```

## 🔥 Step 7: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS, and PostgreSQL
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 5432/tcp
ufw --force enable
ufw status
```

## 🎯 Step 8: Test API Endpoints

### Health check
```bash
curl https://api.your-domain.com/health
```

### Test items endpoint
```bash
curl https://api.your-domain.com/items
```

### Test CORS
```bash
curl -H "Origin: https://your-frontend-domain.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://api.your-domain.com/items
```

## 📊 Step 9: Monitoring and Logs

### View logs
```bash
# Application logs
journalctl -u chainarena -f

# NGINX logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# PostgreSQL logs
tail -f /var/log/postgresql/postgresql-12-main.log
```

### Setup log rotation
```bash
nano /etc/logrotate.d/chainarena
```

Add:
```
/var/log/chainarena/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        systemctl reload chainarena
    endscript
}
```

## 🔄 Step 10: Deployment Script (Optional)

Create deployment script for easy updates:

```bash
nano /opt/chainarena/deploy.sh
```

```bash
#!/bin/bash
set -e

echo "🚀 Starting Chain Arena deployment..."

# Pull latest changes (if using git)
# git pull origin main

# Build application
echo "📦 Building application..."
go build -o chainarena ./cmd/app

# Restart service
echo "🔄 Restarting service..."
systemctl restart chainarena
systemctl status chainarena

# Test health endpoint
echo "🏥 Testing health endpoint..."
sleep 5
curl -f https://api.your-domain.com/health || {
    echo "❌ Health check failed!"
    exit 1
}

echo "✅ Deployment completed successfully!"
echo "🔗 API is available at: https://api.your-domain.com"
echo "📊 Check status: systemctl status chainarena"
echo "📋 View logs: journalctl -u chainarena -f"
```

```bash
chmod +x /opt/chainarena/deploy.sh
```

## 🎮 API Endpoints Available

After deployment, your API will have these endpoints:

### Authentication
- `GET /auth/nonce?address=0x...` - Get nonce for wallet login
- `POST /auth/login` - Login with wallet signature

### Tournaments  
- `GET /tournaments` - List all tournaments
- `POST /tournament/create` - Create new tournament (authenticated)
- `POST /tournament/join` - Join tournament (authenticated)

### Items
- `GET /items` - List all items (with filters)
- `POST /item/create` - Create new item (authenticated)
- `GET /user/items` - Get user's items (authenticated)

### User
- `GET /user/profile` - Get user profile (authenticated)

### Utility
- `GET /health` - Health check

## 🔗 Frontend Integration

Your VPS API will be available at:
```
https://api.your-domain.com
```

Update your frontend `.env` to point to your VPS:
```env
VITE_API_BASE_URL=https://api.your-domain.com
```

## 🛡️ Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Database**: Use strong passwords and limit access
3. **Firewall**: Only open necessary ports
4. **SSL**: Always use HTTPS in production
5. **Rate Limiting**: Consider adding rate limiting to prevent abuse
6. **Monitoring**: Set up monitoring and alerting
7. **Backups**: Regular database backups
8. **Updates**: Keep system and dependencies updated

## 🔧 Maintenance Commands

```bash
# Update and restart
cd /opt/chainarena && ./deploy.sh

# View logs
journalctl -u chainarena -f

# Restart service
systemctl restart chainarena

# Check database
sudo -u postgres psql chainarena

# Backup database
pg_dump -U chainarena_user chainarena > backup_$(date +%Y%m%d).sql
```

Your Chain Arena backend is now deployed and ready to serve your frontend with full HTTPS support! 🎉