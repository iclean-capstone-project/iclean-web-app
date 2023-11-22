import React from "react";
import "./index.scss";
import {Formik} from "formik";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {InputGlobal, InputPasswordGlobal} from "@app/components/InputGlobal";
import {UnlockOutlined, UserOutlined} from "@ant-design/icons";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import ApiUser from "@app/api/ApiUser";
import {useMutation} from "react-query";
import {useDispatch} from "react-redux";
import {loginUser} from "@app/redux/slices/UserSlice";
import {useRouter} from "next/router";
import {notification} from "antd";

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

  // const handleCheckRemember = (checked: boolean): void => {
  //   if (checked) {
  //     dispatch(rememberAccount());
  //     sessionStorage.removeItem("isRemember");
  //   } else {
  //     dispatch(noRememberAccount());
  //     sessionStorage.setItem("isRemember", "false");
  //   }
  // };

  return (
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
              <div className="login-form-item">
                <InputGlobal
                  name="username"
                  placeholder="username"
                  prefix={<UserOutlined />}
                  className="input_login"
                  onPressEnter={(): void => handleSubmit()}
                />
                <ErrorMessageGlobal name="username" />
              </div>

              <div className="login-form-item">
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
                {/* <CheckboxGlobal */}
                {/*  name="remember" */}
                {/*  checked */}
                {/*  onChange={(e): void => handleCheckRemember(e.target.checked)} */}
                {/* > */}
                {/*  Nhớ tài khoản */}
                {/* </CheckboxGlobal> */}

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
  );
}
