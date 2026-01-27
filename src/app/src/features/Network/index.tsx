import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from 'app/components/shadcn/Card';
import { ControlledInput } from 'app/components/ControlledInput';
import { Switch } from 'app/components/shadcn/Switch';
import Button from 'app/components/Button';
import { FaWifi, FaLock, FaLockOpen, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdSignalWifi4Bar, MdSignalWifi3Bar, MdSignalWifi2Bar, MdSignalWifi1Bar } from 'react-icons/md';

interface WiFiNetwork {
    ssid: string;
    signalStrength: number; // 0-100
    security: 'WPA2' | 'WPA3' | 'Open';
    connected: boolean;
}

const mockWiFiNetworks: WiFiNetwork[] = [
    { ssid: 'HomeNetwork', signalStrength: 85, security: 'WPA2', connected: false },
    { ssid: 'OfficeWiFi', signalStrength: 72, security: 'WPA3', connected: false },
    { ssid: 'GuestNetwork', signalStrength: 45, security: 'Open', connected: false },
    { ssid: 'NeighborWiFi', signalStrength: 30, security: 'WPA2', connected: false },
    { ssid: 'PublicWiFi', signalStrength: 60, security: 'Open', connected: false },
];

const Network = () => {
    // WiFi state
    const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
    const [wifiSSID, setWifiSSID] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [wifiConnected, setWifiConnected] = useState(false);
    const [wifiConnecting, setWifiConnecting] = useState(false);

    // Ethernet state
    const [ethernetMode, setEthernetMode] = useState<'DHCP' | 'Static'>('DHCP');
    const [staticIP, setStaticIP] = useState('');
    const [subnetMask, setSubnetMask] = useState('');
    const [gateway, setGateway] = useState('');
    const [dnsServer, setDnsServer] = useState('');
    const [ethernetConnected, setEthernetConnected] = useState(false);

    const handleNetworkSelect = (network: WiFiNetwork) => {
        setSelectedNetwork(network);
        setWifiSSID(network.ssid);
        setWifiPassword('');
    };

    const handleWiFiConnect = () => {
        if (!wifiSSID) return;
        setWifiConnecting(true);
        // Simulate connection process
        setTimeout(() => {
            setWifiConnecting(false);
            setWifiConnected(true);
            if (selectedNetwork) {
                const updatedNetworks = mockWiFiNetworks.map(net =>
                    net.ssid === selectedNetwork.ssid ? { ...net, connected: true } : { ...net, connected: false }
                );
                // Update mock data (in real implementation, this would be an API call)
            }
        }, 2000);
    };

    const handleEthernetApply = () => {
        // Simulate applying settings
        setEthernetConnected(true);
    };

    const getSignalStrengthIcon = (strength: number) => {
        if (strength >= 75) return <MdSignalWifi4Bar className="w-5 h-5" />;
        if (strength >= 50) return <MdSignalWifi3Bar className="w-5 h-5" />;
        if (strength >= 25) return <MdSignalWifi2Bar className="w-5 h-5" />;
        return <MdSignalWifi1Bar className="w-5 h-5" />;
    };

    const getSecurityIcon = (security: string) => {
        return security === 'Open' ? (
            <FaLockOpen className="w-4 h-4 text-gray-500" />
        ) : (
            <FaLock className="w-4 h-4 text-gray-500" />
        );
    };

    return (
        <div className="bg-white dark:bg-transparent dark:text-white w-full flex flex-col gap-6">
            <p className="text-sm text-gray-500 dark:text-gray-300">
                Configure network settings for your Raspberry Pi including WiFi
                and Ethernet connections.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* WiFi Configuration Section */}
                <Card className="border border-gray-200 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 dark:text-white">
                            <FaWifi className="w-5 h-5" />
                            WiFi Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        {/* Available Networks List */}
                        <div>
                            <h3 className="text-sm font-semibold mb-2 dark:text-white">
                                Available Networks
                            </h3>
                            <div className="border border-gray-200 dark:border-gray-700 rounded-md max-h-48 overflow-y-auto">
                                {mockWiFiNetworks.map((network, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNetworkSelect(network)}
                                        className={`w-full p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                                            selectedNetwork?.ssid === network.ssid
                                                ? 'bg-blue-50 dark:bg-blue-900/20'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="text-gray-600 dark:text-gray-300">
                                                {getSignalStrengthIcon(network.signalStrength)}
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="text-sm font-medium dark:text-white">
                                                    {network.ssid}
                                                </span>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    {getSecurityIcon(network.security)}
                                                    <span>{network.security}</span>
                                                    <span>•</span>
                                                    <span>{network.signalStrength}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        {network.connected && (
                                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                                Connected
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Connection Form */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <h3 className="text-sm font-semibold mb-3 dark:text-white">
                                Connection Settings
                            </h3>
                            <div className="flex flex-col gap-3">
                                <ControlledInput
                                    label="SSID"
                                    value={wifiSSID}
                                    onChange={(e) => setWifiSSID(e.target.value)}
                                    placeholder="Network name"
                                    className="dark:bg-dark dark:text-white dark:border-gray-500"
                                />
                                <div className="relative">
                                    <ControlledInput
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={wifiPassword}
                                        onChange={(e) => setWifiPassword(e.target.value)}
                                        placeholder={
                                            selectedNetwork?.security === 'Open'
                                                ? 'No password required'
                                                : 'Enter password'
                                        }
                                        disabled={selectedNetwork?.security === 'Open'}
                                        className="dark:bg-dark dark:text-white dark:border-gray-500"
                                    />
                                    {selectedNetwork?.security !== 'Open' && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="w-4 h-4" />
                                            ) : (
                                                <FaEye className="w-4 h-4" />
                                            )}
                                        </button>
                                    )}
                                </div>
                                {selectedNetwork && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Security: {selectedNetwork.security}
                                    </div>
                                )}
                                <Button
                                    onClick={handleWiFiConnect}
                                    disabled={!wifiSSID || wifiConnecting || (selectedNetwork?.security !== 'Open' && !wifiPassword)}
                                    variant="primary"
                                >
                                    {wifiConnecting ? 'Connecting...' : wifiConnected ? 'Connected' : 'Connect'}
                                </Button>
                            </div>
                        </div>

                        {/* Connection Status */}
                        {wifiConnected && (
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                                    <span>Connected to {wifiSSID}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Ethernet Configuration Section */}
                <Card className="border border-gray-200 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="dark:text-white">
                            Ethernet Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        {/* Mode Toggle */}
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium dark:text-white">
                                    Configuration Mode
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {ethernetMode === 'DHCP'
                                        ? 'Automatically obtain IP address'
                                        : 'Manually configure IP address'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm ${ethernetMode === 'DHCP' ? 'font-semibold dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                    DHCP
                                </span>
                                <Switch
                                    checked={ethernetMode === 'Static'}
                                    onChange={(checked) =>
                                        setEthernetMode(checked ? 'Static' : 'DHCP')
                                    }
                                    id="ethernet-mode"
                                />
                                <span className={`text-sm ${ethernetMode === 'Static' ? 'font-semibold dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                    Static
                                </span>
                            </div>
                        </div>

                        {/* Static IP Configuration */}
                        {ethernetMode === 'Static' && (
                            <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                                <h3 className="text-sm font-semibold dark:text-white">
                                    Static IP Configuration
                                </h3>
                                <ControlledInput
                                    label="IP Address"
                                    value={staticIP}
                                    onChange={(e) => setStaticIP(e.target.value)}
                                    placeholder="192.168.1.100"
                                    className="dark:bg-dark dark:text-white dark:border-gray-500"
                                />
                                <ControlledInput
                                    label="Subnet Mask"
                                    value={subnetMask}
                                    onChange={(e) => setSubnetMask(e.target.value)}
                                    placeholder="255.255.255.0"
                                    className="dark:bg-dark dark:text-white dark:border-gray-500"
                                />
                                <ControlledInput
                                    label="Gateway"
                                    value={gateway}
                                    onChange={(e) => setGateway(e.target.value)}
                                    placeholder="192.168.1.1"
                                    className="dark:bg-dark dark:text-white dark:border-gray-500"
                                />
                                <ControlledInput
                                    label="DNS Server"
                                    value={dnsServer}
                                    onChange={(e) => setDnsServer(e.target.value)}
                                    placeholder="8.8.8.8"
                                    className="dark:bg-dark dark:text-white dark:border-gray-500"
                                />
                            </div>
                        )}

                        {/* DHCP Info */}
                        {ethernetMode === 'DHCP' && (
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    When using DHCP, your Raspberry Pi will automatically
                                    obtain an IP address, subnet mask, gateway, and DNS
                                    server from your network router.
                                </p>
                            </div>
                        )}

                        {/* Apply Button */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <Button
                                onClick={handleEthernetApply}
                                variant="primary"
                                disabled={ethernetMode === 'Static' && (!staticIP || !subnetMask || !gateway)}
                            >
                                Apply Settings
                            </Button>
                        </div>

                        {/* Connection Status */}
                        {ethernetConnected && (
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                                    <span>
                                        {ethernetMode === 'DHCP'
                                            ? 'Connected via DHCP'
                                            : `Connected with static IP: ${staticIP}`}
                                    </span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Network;
