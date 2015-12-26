import ip from 'ip';
const serverIp = ip.address();

export default function getServerIP() {
  return serverIp;
}
