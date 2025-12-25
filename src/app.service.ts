import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly apiVersion = '1.0.0';
  private readonly startTime = new Date();

  getWelcomePage(): string {
    const uptime = this.getUptime();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unventory API - Welcome</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            color: white;
            padding: 40px 20px;
        }
        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .card h2 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 1.8em;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .status-item {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .status-item h3 {
            font-size: 0.9em;
            opacity: 0.9;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .status-item p {
            font-size: 1.5em;
            font-weight: bold;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            background: #10b981;
            color: white;
            border-radius: 20px;
            font-weight: bold;
            font-size: 1.1em;
        }
        .endpoints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .endpoint:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        .endpoint h3 {
            color: #667eea;
            font-size: 1.1em;
            margin-bottom: 8px;
        }
        .endpoint p {
            color: #6c757d;
            font-size: 0.9em;
            margin-bottom: 10px;
        }
        .endpoint-url {
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
            color: #495057;
            background: white;
            padding: 8px;
            border-radius: 4px;
            word-break: break-all;
        }
        .info-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
        }
        .info-item {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .info-item strong {
            color: #667eea;
            display: block;
            margin-bottom: 5px;
        }
        .footer {
            text-align: center;
            color: white;
            padding: 20px;
            margin-top: 40px;
            opacity: 0.8;
        }
        .badge-container {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        .tech-badge {
            background: #e9ecef;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.85em;
            color: #495057;
            font-weight: 600;
        }
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2em;
            }
            .info-section {
                grid-template-columns: 1fr;
            }
            .endpoints-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏭 Unventory API</h1>
            <p>Inventory Management System - RESTful API</p>
        </div>

        <div class="card">
            <h2>📊 System Status</h2>
            <div style="text-align: center; margin: 20px 0;">
                <span class="status-badge">✓ OPERATIONAL</span>
            </div>
            <div class="status-grid">
                <div class="status-item">
                    <h3>API Version</h3>
                    <p>${this.apiVersion}</p>
                </div>
                <div class="status-item">
                    <h3>Uptime</h3>
                    <p>${uptime}</p>
                </div>
                <div class="status-item">
                    <h3>Database</h3>
                    <p>PostgreSQL</p>
                </div>
                <div class="status-item">
                    <h3>Server Time</h3>
                    <p>${new Date().toLocaleTimeString()}</p>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>🔌 API Endpoints</h2>
            <p style="color: #6c757d; margin-bottom: 20px;">Available resource endpoints for the Unventory system</p>
            <div class="endpoints-grid">
                <div class="endpoint">
                    <h3>👤 Users</h3>
                    <p>User authentication and management</p>
                    <div class="endpoint-url">/user</div>
                </div>
                <div class="endpoint">
                    <h3>👨‍💼 Employees</h3>
                    <p>Employee records and information</p>
                    <div class="endpoint-url">/employee</div>
                </div>
                <div class="endpoint">
                    <h3>🏢 Clients</h3>
                    <p>Client/customer management</p>
                    <div class="endpoint-url">/client</div>
                </div>
                <div class="endpoint">
                    <h3>🚚 Suppliers</h3>
                    <p>Supplier records and details</p>
                    <div class="endpoint-url">/supplier</div>
                </div>
                <div class="endpoint">
                    <h3>📦 Products</h3>
                    <p>Product catalog and information</p>
                    <div class="endpoint-url">/product</div>
                </div>
                <div class="endpoint">
                    <h3>📂 Categories</h3>
                    <p>Product categories management</p>
                    <div class="endpoint-url">/category</div>
                </div>
                <div class="endpoint">
                    <h3>🏷️ Brands</h3>
                    <p>Brand information and management</p>
                    <div class="endpoint-url">/brand</div>
                </div>
                <div class="endpoint">
                    <h3>📊 Inventory</h3>
                    <p>Stock levels and inventory tracking</p>
                    <div class="endpoint-url">/inventory</div>
                </div>
                <div class="endpoint">
                    <h3>🔄 Inventory Actions</h3>
                    <p>Inventory movements and adjustments</p>
                    <div class="endpoint-url">/inventory-action</div>
                </div>
                <div class="endpoint">
                    <h3>🛒 Purchases</h3>
                    <p>Purchase orders and records</p>
                    <div class="endpoint-url">/buy</div>
                </div>
                <div class="endpoint">
                    <h3>📝 Purchase Details</h3>
                    <p>Detailed purchase line items</p>
                    <div class="endpoint-url">/buy-detail</div>
                </div>
                <div class="endpoint">
                    <h3>💰 Sales</h3>
                    <p>Sales transactions and orders</p>
                    <div class="endpoint-url">/sale</div>
                </div>
                <div class="endpoint">
                    <h3>📋 Sale Details</h3>
                    <p>Detailed sale line items</p>
                    <div class="endpoint-url">/sale-detail</div>
                </div>
                <div class="endpoint">
                    <h3>📄 Quotes</h3>
                    <p>Price quotes and estimates</p>
                    <div class="endpoint-url">/quote</div>
                </div>
                <div class="endpoint">
                    <h3>📑 Quote Details</h3>
                    <p>Detailed quote line items</p>
                    <div class="endpoint-url">/quote-detail</div>
                </div>
                <div class="endpoint">
                    <h3>📨 Requests</h3>
                    <p>Purchase or service requests</p>
                    <div class="endpoint-url">/request</div>
                </div>
                <div class="endpoint">
                    <h3>📃 Request Details</h3>
                    <p>Detailed request line items</p>
                    <div class="endpoint-url">/request-detail</div>
                </div>
                <div class="endpoint">
                    <h3>💳 Payments</h3>
                    <p>Payment records and processing</p>
                    <div class="endpoint-url">/payment</div>
                </div>
                <div class="endpoint">
                    <h3>💵 Balance</h3>
                    <p>Account balance information</p>
                    <div class="endpoint-url">/balance</div>
                </div>
                <div class="endpoint">
                    <h3>📊 Balance Details</h3>
                    <p>Detailed balance transactions</p>
                    <div class="endpoint-url">/balance-detail</div>
                </div>
                <div class="endpoint">
                    <h3>💸 Expenses</h3>
                    <p>Business expenses tracking</p>
                    <div class="endpoint-url">/expense</div>
                </div>
                <div class="endpoint">
                    <h3>🔔 Notifications</h3>
                    <p>System notifications and alerts</p>
                    <div class="endpoint-url">/notification</div>
                </div>
                <div class="endpoint">
                    <h3>⚙️ Configuration</h3>
                    <p>System configuration settings</p>
                    <div class="endpoint-url">/configuration</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>ℹ️ API Information</h2>
            <div class="info-section">
                <div class="info-item">
                    <strong>Base URL</strong>
                    <span id="baseUrl"></span>
                </div>
                <div class="info-item">
                    <strong>API Version</strong>
                    ${this.apiVersion}
                </div>
                <div class="info-item">
                    <strong>Environment</strong>
                    ${process.env.NODE_ENV || 'development'}
                </div>
                <div class="info-item">
                    <strong>Started At</strong>
                    ${this.startTime.toLocaleString()}
                </div>
            </div>
            <div class="badge-container">
                <span class="tech-badge">NestJS</span>
                <span class="tech-badge">TypeScript</span>
                <span class="tech-badge">TypeORM</span>
                <span class="tech-badge">PostgreSQL</span>
                <span class="tech-badge">REST API</span>
            </div>
        </div>

        <div class="footer">
            <p>© 2024 Unventory API | Built with NestJS</p>
        </div>
    </div>
    
    <script>
        // Set the base URL dynamically
        document.getElementById('baseUrl').textContent = window.location.origin;
    </script>
</body>
</html>
    `;
  }

  private getUptime(): string {
    const uptimeMs = Date.now() - this.startTime.getTime();
    const seconds = Math.floor(uptimeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }
}
