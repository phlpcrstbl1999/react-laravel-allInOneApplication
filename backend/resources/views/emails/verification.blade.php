<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <p>Please click the button below to verify your email address:</p>
    <a href="{{ route('verify-email', $verificationToken) }}">
        <button style="background-color: #4CAF50; /* Green */
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;">Verify Email</button>
    </a>
</body>
</html>