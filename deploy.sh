#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Digital Triangle — Hostinger VPS Deploy Script
# Run once on first deploy, then just run: git pull && npm run build && pm2 restart dt-website
# ─────────────────────────────────────────────────────────────

set -e  # exit on any error

APP_DIR="/var/www/dt-website"
LOG_DIR="/var/log/dt-website"
REPO="https://github.com/LeoHarshMahajan/DT-website-theme.git"
NODE_VERSION="20"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Digital Triangle — Production Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. System updates
echo "[1/9] Updating system packages..."
apt-get update -qq && apt-get upgrade -y -qq

# 2. Install Node.js via NVM
echo "[2/9] Installing Node.js $NODE_VERSION..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install $NODE_VERSION
    nvm use $NODE_VERSION
    nvm alias default $NODE_VERSION
fi
echo "   Node: $(node -v) | npm: $(npm -v)"

# 3. Install PM2
echo "[3/9] Installing PM2..."
npm install -g pm2 2>/dev/null
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# 4. Install Nginx
echo "[4/9] Installing Nginx..."
apt-get install -y nginx -qq
systemctl enable nginx

# 5. Clone repo
echo "[5/9] Cloning repository..."
mkdir -p $APP_DIR $LOG_DIR
if [ -d "$APP_DIR/.git" ]; then
    echo "   Repo exists — pulling latest..."
    cd $APP_DIR && git pull origin master
else
    git clone $REPO $APP_DIR
fi
cd $APP_DIR

# 6. Install dependencies & build
echo "[6/9] Installing dependencies..."
npm ci --omit=dev

echo "[6b] Building Next.js..."
npm run build

# 7. Database migration
echo "[7/9] Running Prisma migrations..."
# Ensure DATABASE_URL is set in .env before this step!
if [ -f ".env" ]; then
    npx prisma migrate deploy
    echo "   Migrations applied."
else
    echo "   ⚠ WARNING: .env not found — skipping migrations."
    echo "   Create .env from .env.example and re-run: npx prisma migrate deploy"
fi

# 8. Start / restart with PM2
echo "[8/9] Starting app with PM2..."
if pm2 list | grep -q "dt-website"; then
    pm2 restart dt-website
else
    pm2 start ecosystem.config.js
fi
pm2 save

# 9. Configure Nginx
echo "[9/9] Configuring Nginx..."
NGINX_CONF="/etc/nginx/sites-available/dt-website"
if [ ! -f "$NGINX_CONF" ]; then
    cp $APP_DIR/nginx.conf.example $NGINX_CONF
    ln -sf $NGINX_CONF /etc/nginx/sites-enabled/dt-website
    rm -f /etc/nginx/sites-enabled/default
    echo "   ⚠ Edit $NGINX_CONF and replace 'yourdomain.com' with your actual domain."
fi
nginx -t && systemctl restart nginx

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " ✓ Deploy complete!"
echo ""
echo " Next steps:"
echo "  1. Create .env from .env.example (if not done)"
echo "  2. Edit /etc/nginx/sites-available/dt-website → set your domain"
echo "  3. Run: certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "  4. Create SUPER_ADMIN user in MySQL, then run: npx prisma db seed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
