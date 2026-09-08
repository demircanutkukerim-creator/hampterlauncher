const { app, BrowserWindow } = require('electron');
const DiscordRPC = require('discord-rpc');

const ClientId = '111111111111111111';
DiscordRPC.register(ClientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    title: "HampterClient"
  });

  win.loadURL('https://mclauncher.com');
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
