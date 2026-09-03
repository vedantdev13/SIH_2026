import mongoose from 'mongoose';
import dns from 'dns';

// Override DNS resolution to Google Public DNS & Cloudflare DNS to bypass local Windows DNS SRV blocking
dns.setServers(['8.8.8.8', '1.1.1.1']);

const uri = 'mongodb+srv://itachix07x:ZGrDxaDDhgHxwhnz@cluster0.c4t9l7p.mongodb.net/kaamsetu?retryWrites=true&w=majority';

console.log('Testing Atlas Cloud connection with Google/Cloudflare DNS resolution...');

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 8000,
  family: 4
})
.then(() => {
  console.log('🎉 SUCCESS! Connected to MongoDB Atlas Cloud!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
});
