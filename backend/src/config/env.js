// Direct environment configuration
export const config = {
  supabase: {
    url: 'https://kxxpaaepxckfjofnqouo.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eHBhYWVweGNrZmpvZm5xb3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTU5MDUsImV4cCI6MjA3MzQzMTkwNX0.sXuOJYT9FDUFmnMAARkyXPoM-75v3HHXMhS3_rNchlk'
  },
  jwt: {
    secret: 'your-super-secret-jwt-key-here-change-this-in-production',
    expiresIn: '7d'
  },
  app: {
    port: 5000,
    nodeEnv: 'development',
    frontendUrl: 'http://localhost:3000'
  },
  email: {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'pavel.strelnykoov@gmail.com',
    pass: 'rcgr wtma gydb ytsk'
  },
  totp: {
    secret: 'your-totp-secret-key'
  }
}
