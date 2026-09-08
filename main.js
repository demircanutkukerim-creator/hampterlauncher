const { app, BrowserWindow } = require('electron');
const DiscordRPC = require('discord-rpc');
const path = require('path');

const ClientId = '111111111111111111'; // İstersen kendi Discord Bot ID'ni koyabilirsin
DiscordRPC.register(ClientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    title: "HampterClient",
    autoHideMenuBar: true, // Üstteki File Edit menüsünü gizler
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'HampterClient ile Oyunda',
    state: 'Sunucu: oyna.hamptercinw.com',
    largeImageKey: 'logo',
    largeImageText: 'HampterClient',
    instance: false,
  });
});

app.whenReady().then(() => {
  createWindow();
  rpc.login({ clientId: ClientId }).catch(console.error);
});
