import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.subscribers = []; // Lưu danh sách các subscribe chờ kết nối
    }

    connect(callback) {
        console.log("🔄 Đang kết nối WebSocket...");
        const socket = new SockJS('http://localhost:8080/ws');
        const token = localStorage.getItem("auth_token");
        this.client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}` // Gửi token qua header
            },
            onConnect: () => {
                console.log("✅ WebSocket đã kết nối!");
                if (callback) callback();
            },
            onStompError: (frame) => {
                console.error("❌ Lỗi STOMP:", frame);
            },
            reconnectDelay: 5000, // Tự động kết nối lại sau 5s
        });
        this.client.activate();
    }

    subscribeSocket(callback, typeSocket) {
        if (!this.client || !this.client.connected) {
            console.warn("WebSocket chưa kết nối. Chờ kết nối rồi mới subscribe... ", typeSocket);
            this.subscribers.push(() => this.subscribeSocket(callback)); // Đợi kết nối rồi gọi lại
            return;
        }

        this.client.subscribe(typeSocket, (message) => {
            const newColor = JSON.parse(message.body);
            callback(newColor);
        });
    }


    subscribeToColorUpdates(callback, type) {
        if (type === '/topic/product') {
            console.log('da vao vung san pham')
        }
        if (!this.client || !this.client.connected) {
            console.warn("WebSocket chưa kết nối. Chờ kết nối rồi mới subscribe...");
            this.subscribers.push(() => this.subscribeToColorUpdates(callback)); // Đợi kết nối rồi gọi lại
            return;
        }

        this.client.subscribe('/topic/attribute', (message) => {
            const newColor = JSON.parse(message.body);
            callback(newColor);
        });
    }

    subscribeToProductUpdates(callback) {
        if (!this.client || !this.client.connected) {
            console.warn("WebSocket chưa kết nối. Chờ kết nối rồi mới subscribe...");
            this.subscribers.push(() => this.subscribeToProductUpdates(callback)); // Đợi kết nối rồi gọi lại
            return;
        }

        this.client.subscribe('/topic/product', (message) => {
            const newColor = JSON.parse(message.body);
            callback(newColor);
        });
    }

}

export default new WebSocketService();
