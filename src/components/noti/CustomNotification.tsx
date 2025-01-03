import React from 'react';
import { notification, Space, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './CustomNotification.css';

interface NotificationProps {
  message: string;
  description?: string;
  duration?: number;
  pauseOnHover?: boolean;
}

const CustomNotification: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = ({ message, description, duration = 3, pauseOnHover = true }: NotificationProps) => {
    api.open({
      message: message,
      description: description,
      duration: duration,
      icon: <CheckCircleOutlined style={{ color: '#fff', fontSize: '24px' }} />,
      style: {
        backgroundColor: '#2ABF9E',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      className: 'custom-notification',
      pauseOnHover: pauseOnHover,
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button type="primary" onClick={() => showNotification({ message: 'Paused on Hover', description: 'Notification pauses on hover', pauseOnHover: true })}>
          Pause on Hover
        </Button>
        <Button type="primary" onClick={() => showNotification({ message: 'No Pause on Hover', description: 'Notification does not pause on hover', pauseOnHover: false })}>
          Don't Pause on Hover
        </Button>
      </Space>
    </>
  );
};

export default CustomNotification;
