import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, 
  Menu, 
  Select, 
  Card, 
  Row, 
  Col,
  Button,
  message,
  Modal,
  Space,
  Dropdown,
  Radio,
  Progress,
  Statistic,
  Tooltip
} from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  SettingOutlined,
  DownloadOutlined,
  CalendarOutlined,
  FilterOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  RiseOutlined,
  FallOutlined,
  AlertOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import GaugeChart from 'react-gauge-chart';
import './dashboard.css';

const { Header, Sider, Content } = Layout;

const currentYear = new Date().getFullYear();
const years = [];

for (let i = currentYear - 50; i <= currentYear + 1; i++) {
  years.push(i.toString());
}

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

console.log(years);
console.log(quarters);

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const dashboardRef = useRef(null);

  const handleDownload = async () => {
    try {
      const element = dashboardRef.current;
      if (!element) {
        message.error('Dashboard content not found');
        return;
      }

      if (downloadFormat === 'pdf') {
        const opt = {
          margin: 1,
          filename: `dashboard-${selectedYear}-${selectedQuarter}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
        };

        await html2pdf().set(opt).from(element).save();
        message.success('PDF downloaded successfully');
      } else {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        const link = document.createElement('a');
        link.download = `dashboard-${selectedYear}-${selectedQuarter}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
        message.success('JPG downloaded successfully');
      }
    } catch (error) {
      console.error('Download failed:', error);
      message.error('Failed to download dashboard');
    }
  };

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterOk = () => {
    setIsFilterModalVisible(false);
  };

  const handleFilterCancel = () => {
    setIsFilterModalVisible(false);
  };

  const showDownloadModal = () => {
    setIsDownloadModalVisible(true);
  };

  const handleDownloadOk = () => {
    handleDownload();
    setIsDownloadModalVisible(false);
  };

  const handleDownloadCancel = () => {
    setIsDownloadModalVisible(false);
  };

  // Enhanced sample data
  const userData = [
    { name: 'High Risk', value: 400, color: '#ff4d4f' },
    { name: 'Medium Risk', value: 300, color: '#faad14' },
    { name: 'Low Risk', value: 200, color: '#52c41a' },
  ];

  const businessUnitData = [
    { name: 'Finance', value: 35 },
    { name: 'Operations', value: 28 },
    { name: 'IT', value: 22 },
    { name: 'HR', value: 15 },
  ];

  const riskCategoryData = [
    { name: 'Strategic', value: 40 },
    { name: 'Operational', value: 30 },
    { name: 'Financial', value: 20 },
    { name: 'Compliance', value: 10 },
  ];

  const COLORS = ['#ff4d4f', '#faad14', '#52c41a'];

  return (
    <Layout className="dashboard-layout">
      <Sider width={200} className="dashboard-sider">
        <div className="dashboard-logo">
          <img src="/cicgrouplogo.png" alt="Logo" className="dashboard-logo-img" style={{ maxWidth: 48, maxHeight: 48 }} />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          theme="dark"
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="dashboard-header" style={{ background: '#1f1f1f', padding: '0 24px' }}>
          <h2 style={{ margin: 0, color: '#fff' }}>Risk Dashboard</h2>
          <Space>
            <Button 
              type="primary" 
              icon={<FilterOutlined />}
              onClick={showFilterModal}
              style={{ background: '#a71c24', borderColor: '#a71c24' }}
            >
              Filters
            </Button>
            <Button 
              type="primary" 
              icon={<DownloadOutlined />}
              onClick={showDownloadModal}
              style={{ background: '#a71c24', borderColor: '#a71c24' }}
            >
              Download
            </Button>
          </Space>
        </Header>

        <Modal
          title="Dashboard Filters"
          open={isFilterModalVisible}
          onOk={handleFilterOk}
          onCancel={handleFilterCancel}
          footer={[
            <Button key="back" onClick={handleFilterCancel}>
              Cancel
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              onClick={handleFilterOk}
              style={{ background: '#a71c24', borderColor: '#a71c24' }}
            >
              Apply Filters
            </Button>,
          ]}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <label>Year</label>
              <Select
                value={selectedYear}
                onChange={setSelectedYear}
                style={{ width: '100%' }}
                suffixIcon={<CalendarOutlined />}
              >
                {years.map(year => (
                  <Select.Option key={year} value={year}>{year}</Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <label>Quarter</label>
              <Select
                value={selectedQuarter}
                onChange={setSelectedQuarter}
                style={{ width: '100%' }}
                suffixIcon={<CalendarOutlined />}
              >
                {quarters.map(quarter => (
                  <Select.Option key={quarter} value={quarter}>{quarter}</Select.Option>
                ))}
              </Select>
            </div>
          </Space>
        </Modal>

        <Modal
          title="Download Dashboard"
          open={isDownloadModalVisible}
          onOk={handleDownloadOk}
          onCancel={handleDownloadCancel}
          footer={[
            <Button key="back" onClick={handleDownloadCancel}>
              Cancel
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              onClick={handleDownloadOk}
              style={{ background: '#a71c24', borderColor: '#a71c24' }}
            >
              Download
            </Button>,
          ]}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <label>Select Format</label>
              <Radio.Group 
                value={downloadFormat} 
                onChange={(e) => setDownloadFormat(e.target.value)}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <Radio value="pdf" style={{ padding: '12px', border: '1px solid #d9d9d9', borderRadius: '8px' }}>
                  <Space>
                    <FilePdfOutlined style={{ fontSize: '20px', color: '#a71c24' }} />
                    <span>PDF Document</span>
                  </Space>
                </Radio>
                <Radio value="jpg" style={{ padding: '12px', border: '1px solid #d9d9d9', borderRadius: '8px' }}>
                  <Space>
                    <FileImageOutlined style={{ fontSize: '20px', color: '#a71c24' }} />
                    <span>JPG Image</span>
                  </Space>
                </Radio>
              </Radio.Group>
            </div>
          </Space>
        </Modal>

        <Content className="dashboard-content" ref={dashboardRef} style={{ background: '#fff', padding: '24px' }}>
          {/* Top Row: 3 summary cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Card className="dashboard-card summary-card" style={{ background: '#800000', color: '#FFC300', textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: '#FFC300' }}>62</div>
                <div style={{ fontSize: 24, color: '#FFC300', fontWeight: 500 }}>No. of Risks</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="dashboard-card summary-card" style={{ background: '#800000', color: '#FFC300', textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: '#FFC300' }}>63%</div>
                <div style={{ fontSize: 24, color: '#FFC300', fontWeight: 500 }}>Residual Risk Exposure</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="dashboard-card summary-card" style={{ background: '#800000', color: '#FFC300', textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: '#FFC300' }}>39%</div>
                <div style={{ fontSize: 24, color: '#FFC300', fontWeight: 500 }}>Control Effectiveness</div>
              </Card>
            </Col>
          </Row>

          {/* Second Row: 2 Gauge Meters + Pie Chart */}
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Card className="dashboard-card meter-card" style={{ padding: 0, border: 'none' }}>
                <div style={{ background: '#800000', color: '#FFC300', padding: '8px 0', fontWeight: 600, fontSize: 20, textAlign: 'center' }}>Inherent Risk Level</div>
                <div style={{ background: '#fff', padding: '8px 0 0 0', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 0 }}>INHERENT RISK METER</div>
                  <GaugeChart
                    id="inherent-risk-meter"
                    nrOfLevels={5}
                    arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                    colors={["#0074D9", "#2ECC40", "#FFC300", "#FF4136", "#800000"]}
                    percent={0.71}
                    arcPadding={0.02}
                    textColor="#000"
                    formatTextValue={value => `<tspan font-size='28' font-weight='bold'>${value}%</tspan>`}
                  />
                  <div className="gauge-labels-row">
                    <span style={{ color: '#0074D9', fontWeight: 600 }}>Incidental</span>
                    <span style={{ color: '#2ECC40', fontWeight: 600 }}>Moderate Low</span>
                    <span style={{ color: '#FFC300', fontWeight: 600 }}>Moderate High</span>
                    <span style={{ color: '#FF4136', fontWeight: 600 }}>Significant High</span>
                    <span style={{ color: '#800000', fontWeight: 600 }}>Extreme</span>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="dashboard-card meter-card" style={{ padding: 0, border: 'none' }}>
                <div style={{ background: '#800000', color: '#FFC300', padding: '8px 0', fontWeight: 600, fontSize: 20, textAlign: 'center' }}>Residual Risk Level</div>
                <div style={{ background: '#fff', padding: '8px 0 0 0', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 0 }}>RESIDUAL RISK METER</div>
                  <GaugeChart
                    id="residual-risk-meter"
                    nrOfLevels={5}
                    arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                    colors={["#0074D9", "#2ECC40", "#FFC300", "#FF4136", "#800000"]}
                    percent={0.63}
                    arcPadding={0.02}
                    textColor="#000"
                    formatTextValue={value => `<tspan font-size='28' font-weight='bold'>${value}%</tspan>`}
                  />
                  <div className="gauge-labels-row">
                    <span style={{ color: '#0074D9', fontWeight: 600 }}>Incidental</span>
                    <span style={{ color: '#2ECC40', fontWeight: 600 }}>Moderate Low</span>
                    <span style={{ color: '#FFC300', fontWeight: 600 }}>Moderate High</span>
                    <span style={{ color: '#FF4136', fontWeight: 600 }}>Significant High</span>
                    <span style={{ color: '#800000', fontWeight: 600 }}>Extreme</span>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="dashboard-card" style={{ height: '100%' }}>
                <div className="section-title">Inherent Risk Level</div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={userData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Bottom Row: 2 bar charts + 2 summary cards */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={10}>
              <Card className="dashboard-card">
                <div className="section-title">Distribution by Responsible Business Unit</div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={businessUnitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#a71c24" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={10}>
              <Card className="dashboard-card" style={{ background: '#fff', padding: 0 }}>
                <div style={{ background: '#800000', color: '#FFC300', padding: '8px 0', fontWeight: 600, fontSize: 18, textAlign: 'center', marginBottom: 8 }}>
                  Distribution by Risk Category
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={riskCategoryData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    barCategoryGap={12}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#eee" />
                    <XAxis type="number" domain={[0, 'dataMax + 2']} tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 13 }} axisLine={false} tickLine={false} width={130} />
                    <Bar dataKey="value" fill="#800000" barSize={18} radius={[0, 8, 8, 0]} >
                      {/* Value labels at end of bars */}
                      {riskCategoryData.map((entry, index) => (
                        <text
                          key={index}
                          x={0}
                          y={0}
                          dx={0}
                          dy={0}
                        />
                      ))}
                      <LabelList dataKey="value" position="right" style={{ fill: '#800000', fontWeight: 700, fontSize: 15 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={2}>
              <Card className="dashboard-card summary-card" style={{ background: 'linear-gradient(135deg, #6b2223 0%, #8b2c2d 100%)', color: '#ffd700', height: '100%' }}>
                <Statistic
                  title={<span style={{ color: '#ffd700', fontSize: '14px' }}>Risks Above Threshold</span>}
                  value={49}
                  valueStyle={{ color: '#ffd700', fontSize: '24px' }}
                  prefix={<AlertOutlined />}
                />
              </Card>
            </Col>
            <Col span={2}>
              <Card className="dashboard-card summary-card" style={{ background: 'linear-gradient(135deg, #6b2223 0%, #8b2c2d 100%)', color: '#ffd700', height: '100%' }}>
                <Statistic
                  title={<span style={{ color: '#ffd700', fontSize: '14px' }}>Risks Within Threshold</span>}
                  value={13}
                  valueStyle={{ color: '#ffd700', fontSize: '24px' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
