import React from "react";
import "./index.scss";
import {Formik} from "formik";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {CheckboxGlobal, InputGlobal, InputPasswordGlobal} from "@app/components/InputGlobal";
import {HomeFilled, UnlockOutlined, UserOutlined} from "@ant-design/icons";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import ApiUser from "@app/api/ApiUser";
import {useMutation} from "react-query";
import {useDispatch} from "react-redux";
import {loginUser} from "@app/redux/slices/UserSlice";
import {useRouter} from "next/router";
import {Col, Image, Layout, Menu, Row, notification} from "antd";

const { Header} = Layout;

interface UserAccount {
  username: string;
  password: string;
}

export function Login(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues: UserAccount = {
    username: "",
    password: "",
    // remember: false,
    // pass_jwt: "",
  };

  const login = useMutation(ApiUser.login);
  const handleLogin = (value: UserAccount): void => {
    console.log(111);
    login.mutate(
      {
        username: value.username.trim(),
        password: value.password.trim(),
      },
      {
        onSuccess: (res: any) => {
          console.log("res", res?.data);
          // if (res?.data) {
          dispatch(loginUser(res?.data));
          router.push("/");
          notification.success({
            message: "Đăng nhập thành công!",
          });
          // }
        },
      }
    );
  };

  const handleCheckRemember = (checked: boolean): void => {
    if (checked) {
      // dispatch(rememberAccount());
      sessionStorage.removeItem("isRemember");
    } else {
      // dispatch(noRememberAccount());
      sessionStorage.setItem("isRemember", "false");
    }
  };

  return (
    <div className="login-screen">
      <div className="header">
        <div className="logo">
          <img src="/logo_none.png" alt="" width={192}/>
        </div>
        <div className="menu">
          <a className="menu-item" href="#">
            Help
          </a>
          <a className="menu-item" href="#">
            Contact us
          </a>
          <a className="menu-item" href="#">
            <HomeFilled />
          </a>
        </div>
      </div>
      <Row>
        <Col span={12}>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={handleLogin}
              validateOnChange
              validateOnBlur
              // validationSchema={LoginValidation}
              >
              {({handleSubmit}): JSX.Element => {
                return (
                  <div className="login-container">
                    <div className="login-container">
                      <h1>WELCOME BACK</h1>
                      <div className="login-form-item">
                        <label className="label-input">Username</label>
                        <InputGlobal
                          name="username"
                          placeholder="Username"
                          prefix={<UserOutlined />}
                          className="input_login"
                          onPressEnter={(): void => handleSubmit()}
                        />
                        <ErrorMessageGlobal name="username" />
                      </div>

                      <div className="login-form-item">
                        <label className="label-input">Password</label>
                        <InputPasswordGlobal
                          name="password"
                          placeholder="Password"
                          prefix={<UnlockOutlined />}
                          className="input_login"
                          onPressEnter={(): void => handleSubmit()}
                        />
                        <ErrorMessageGlobal name="password" />
                      </div>

                      <div className="forgot-password-wrap">
                        <CheckboxGlobal
                          name="remember"
                          // checked
                          onChange={(e): void => handleCheckRemember(e.target.checked)}
                        >
                        Nhớ tài khoản
                        </CheckboxGlobal>
                        

                        <span className="forgot-password_link">Quên mật khẩu?</span>
                      </div>

                      <ButtonGlobal
                        onClick={handleSubmit}
                        className="btn-login"
                        title="Đăng nhập"
                        type="primary-filled"
                        loading={login.isLoading}
                      />
                    </div>
                  </div>
                );
              }}
            </Formik>
          </div>
        </Col>
        
        <Col span={12}>
          <div>
          <img width={"100%"} src="/img/login_img.png"></img>
          </div>
        </Col>
      </Row>
    </div>
  );
}
