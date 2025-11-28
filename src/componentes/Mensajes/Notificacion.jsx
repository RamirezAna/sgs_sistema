import React from 'react';
import { notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './Mensaje.css';

const Notificacion = {
  success: (mensaje, descripcion = '', duracion = 1.5) => {
    notification.success({
      message: mensaje,
      description: descripcion,
      duration: duracion,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    });
  },

  error: (mensaje, descripcion = '', duracion = 1.5) => {
    notification.error({
      message: mensaje,
      description: descripcion,
      duration: duracion,
      icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
    });
  },

  warning: (mensaje, descripcion = '', duracion = 1.5) => {
    notification.warning({
      message: mensaje,
      description: descripcion,
      duration: duracion,
      icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    });
  },
};

export default Notificacion;