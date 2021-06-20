Multi-factor authentication (MFA) | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/dashboard/mfa

# Multi-factor authentication (MFA)

多要素認証(MFA)

Multi-factor Authentication (MFA) allows you to improve the security of your account by requiring an additional form of verification upon sign in using your email and password.

多要素認証（MFA）は、電子メールとパスワードを使ってサインインする際に、追加の認証を必要とすることで、アカウントのセキュリティを向上させることができます。

MFA is currently only available to users who have authenticated via an email/password combination. Users who have authenticated via an identity provider (IdP) — such as [Auth0](https://www.auth0.com/) — can configure MFA through the IdP.

現在、MFAは、電子メールとパスワードの組み合わせで認証を行ったユーザーのみが利用できます。Auth0](https://www.auth0.com/)のようなアイデンティティプロバイダー(IdP)を介して認証を行ったユーザーは、IdPを介してMFAを設定することができます。

## [](#configuring-multi-factor-authentication-mfa)Configuring multi-factor authentication (MFA)

多要素認証(MFA)の設定

1.  Click the user icon in the upper right, then **Account settings** from the dropdown, then **Security** in the left sidebar.

右上のユーザーアイコンをクリックし、ドロップダウンから**Account settings**、左サイドバーの**Security**をクリックします。

    ![The personal security settings screen in Fauna Dashboard](https://docs.fauna.com/fauna/current/integrations/dashboard/mfa../_images/screen-dashboard-enable_mfa.png)

    ![Fauna Dashboardの個人用セキュリティ設定画面](https://docs.fauna.com/fauna/current/integrations/dashboard/mfa../_images/screen-dashboard-enable_mfa.png)

2.  Click the **Set up multi-factor authentication** button at the bottom of the page. You are prompted to enter your password.

ページ下部にある**多要素認証の設定**ボタンをクリックします。パスワードの入力を求められます。

3.  A dialog containing on-screen instructions prompts you to download an one-time password (OTP) app, such as Google Authenticator, to your mobile device: [iOS](https://apps.apple.com/us/app/google-authenticator/id388497605), [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)

Google Authenticatorなどのワンタイムパスワード(OTP)アプリをモバイルデバイスにダウンロードするよう、画面上の説明を含むダイアログが表示されます。[iOS](https://apps.apple.com/us/app/google-authenticator/id388497605), [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)

    ![The Dashboard dialog containing instructions to enable MFA](https://docs.fauna.com/fauna/current/integrations/dashboard/mfa../_images/screen-dashboard-mfa_qrcode.png)

    ![MFA を有効にするための指示を含むダッシュボードダイアログ](https://docs.fauna.com/fauna/current/integrations/dashboard/mfa../_images/screen-dashboard-mfa_qrcode.png)

4.  Follow the instructions in your OTP app to add a new account, or simply open your mobile device’s camera and scan the QR code displayed in the dialog.

OTPアプリの指示に従って新しいアカウントを追加するか、モバイルデバイスのカメラを開いてダイアログに表示されたQRコードを読み取る。

5.  The OTP app on your mobile device displays an OTP that you can use to log in to the Dashboard. Enter the OTP into the dialog.

携帯電話のOTPアプリに、Dashboardへのログインに使用するワンタイムパスワードが表示されます。OTPをダイアログに入力してください。

    OTP codes are time-based. If the timer expires before you use the code, the code changes and you must use the new code.

    OTPコードは時間制です。使用する前にタイマーが切れると、コードが変更され、新しいコードを使用する必要があります。

6.  Next, the Dashboard displays a list of one-time-use recovery codes that can be used to access your account, in case anything happens to your mobile device. Download or write these down, then check the checkbox to confirm that you have done so.

次に、ダッシュボードには、お客様のモバイルデバイスに何かあったときにアカウントにアクセスするために使用できる、1回限りのリカバリーコードのリストが表示されます。これらのコードをダウンロードまたはメモし、チェックボックスにチェックを入れて確認してください。

7.  Finally, click **Enable MFA** and close the dialog. From now on, each login to your Fauna account requires the OTP from your mobile device.

最後に「**MFAを有効にする**」をクリックし、ダイアログを閉じます。今後、Faunaアカウントにログインする際には、携帯電話のOTPが必要になります。

    ![The OTP dialog that appears when you attempt to log in to the Dashboard](https://docs.fauna.com/fauna/current/integrations/dashboard/mfa../_images/screen-dashboard-mfa-login.png)

    ![ダッシュボードにログインしようとすると表示されるOTPダイアログ](https://docs.fauna.com/fauna/current/integrations/dashboard/mfa../_images/screen-dashboard-mfa-login.png)

