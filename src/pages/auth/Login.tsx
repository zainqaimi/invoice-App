import React, { useContext, useEffect } from "react";
import {
  Form,
  Input,
  Card,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/api/AuthContext";
import logo from "../../assets/images/TC-Logo.png";
const { Title } = Typography;


const Login: React.FC = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();


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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#00a8ec] to-[#00a8ec] p-4 ">
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
            <Input placeholder="Enter your email" className="p-2"/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" className="p-2"/>
          </Form.Item>
          <div className="flex justify-end mb-2">
            <a
              href=""
              className="text-[#00a8ec] hover:underline"
              onClick={handleForgot}
            >
              Forgot Password?
            </a>
          </div>
         
        <button  type="submit" className="w-full text-white bg-gradient-to-r from-[#00a8ec] to-[#35c0f7] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 my-2">Login</button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
