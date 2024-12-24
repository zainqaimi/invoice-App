import React, { useContext, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  ConfigProvider,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/api/AuthContext";
import logo from "../../assets/images/TC-Logo.png";
const { Title } = Typography;
import { createStyles } from "antd-style";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
const Login: React.FC = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { styles } = useStyle();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const onFinish = (values: any) => {
    login(values.email, values.password);
  };
  const handleForgot = () => {
    navigate("/forgotpassword");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg overflow-hidden">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-48 object-contain" />
        </div>
        <Title level={2} className="text-center mb-4">
          Sign In
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <div className="flex justify-end mb-2">
            <a
              href=""
              className="text-blue-500 hover:underline"
              onClick={handleForgot}
            >
              Forgot Password?
            </a>
          </div>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
            >
              Login
            </Button>
          </ConfigProvider>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
